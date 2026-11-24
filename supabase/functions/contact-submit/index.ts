// Edge Function: contact-submit
// Publique (verify_jwt: false) — appelee par le formulaire de contact.
// Validation serveur, honeypot, rate-limit par IP, insertion via
// service_role, notification email via Resend.

import { createClient } from "npm:@supabase/supabase-js@2";
import { clientIp, handlePreflight, isAllowedOrigin, makeJson } from "./_shared/http.ts";

const METHODS = "POST";

const ADMIN_NOTIFY_EMAIL = "williambechay@hotmail.com";
const RESEND_FROM = "William Bechay <onboarding@resend.dev>";

const RATE_LIMIT_MAX = 3;          // messages max
const RATE_LIMIT_WINDOW_MIN = 60;  // par fenetre de 60 minutes
const RATE_LIMIT_KEEP_HOURS = 24;  // au-dela, les lignes ne servent plus

const REASON_VALUES = ["project", "bug", "collaboration", "general"];
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

Deno.serve(async (req: Request) => {
  const preflight = handlePreflight(req, METHODS);
  if (preflight) return preflight;

  const origin = req.headers.get("origin");
  const json = makeJson(origin, METHODS);

  // Une origine non autorisee est refusee cote serveur et pas seulement par
  // le navigateur : sinon la requete s'execute (insertion, email) et seule
  // la lecture de la reponse est bloquee.
  if (!isAllowedOrigin(origin)) return json({ error: "Forbidden origin" }, 403);
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // Un corps enorme ne doit pas etre lu en entier avant d'etre rejete.
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > 32_000) return json({ error: "Payload too large" }, 413);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  // Honeypot : champ invisible pour les humains, rempli par les bots.
  // On repond "succes" sans rien faire pour ne pas reveler la detection.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ success: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const reason = body.reason ? String(body.reason).trim() : null;
  const message = String(body.message ?? "").trim();

  // Validation serveur (defense en profondeur en plus des CHECK en base)
  if (name.length < 1 || name.length > 100) return json({ error: "Invalid name" }, 400);
  if (email.length > 254 || !EMAIL_REGEX.test(email)) return json({ error: "Invalid email" }, 400);
  if (subject.length > 200) return json({ error: "Invalid subject" }, 400);
  if (reason !== null && !REASON_VALUES.includes(reason)) return json({ error: "Invalid reason" }, 400);
  if (message.length < 1 || message.length > 5000) return json({ error: "Invalid message" }, 400);

  const ip = clientIp(req);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // --- Rate limiting par IP ---
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MIN * 60_000).toISOString();
  const { count, error: countError } = await supabase
    .from("contact_rate_limit")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("created_at", windowStart);

  if (countError) {
    console.error("Rate limit check failed:", countError);
    return json({ error: "Internal error" }, 500);
  }
  if ((count ?? 0) >= RATE_LIMIT_MAX) {
    return json({ error: "Too many requests. Please try again later." }, 429);
  }

  await supabase.from("contact_rate_limit").insert({ ip });

  // --- Insertion du message ---
  const { error: insertError } = await supabase
    .from("contact_messages")
    .insert([{ name, email, subject, reason, message, ip_address: ip }]);

  if (insertError) {
    console.error("Insert failed:", insertError);
    return json({ error: "Could not save message" }, 500);
  }

  // Purge best-effort : la table de rate-limit grossissait sans fin.
  await supabase
    .from("contact_rate_limit")
    .delete()
    .lt("created_at", new Date(Date.now() - RATE_LIMIT_KEEP_HOURS * 3_600_000).toISOString());

  // --- Notification email via Resend (best-effort) ---
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (resendKey) {
    try {
      // Les valeurs vont dans un corps texte, jamais dans un en-tete : un
      // retour a la ligne dans le sujet aurait sinon permis d'injecter des
      // en-tetes (Bcc, etc.). On neutralise quand meme les sauts de ligne
      // de ce qui part dans le sujet.
      const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: [ADMIN_NOTIFY_EMAIL],
          reply_to: email,
          subject: `[Contact] ${oneLine(subject) || "Nouveau message"} — ${oneLine(name)}`,
          text:
            `Nouveau message via le formulaire de contact\n\n` +
            `Nom: ${name}\n` +
            `Email: ${email}\n` +
            `Raison: ${reason ?? "-"}\n` +
            `Sujet: ${subject || "-"}\n\n` +
            `Message:\n${message}\n\n` +
            `IP: ${ip}`,
        }),
      });
      if (!resp.ok) console.error("Resend error:", resp.status, await resp.text());
    } catch (e) {
      console.error("Resend request failed:", e);
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipping email notification");
  }

  return json({ success: true });
});
