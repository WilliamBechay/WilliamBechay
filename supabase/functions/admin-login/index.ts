// Edge Function: admin-login
// Publique (verify_jwt: false) — verifie le mot de passe admin et emet un
// jeton de session opaque (stocke hashe en base, expire apres 12h).
// Anti brute-force : max 5 tentatives echouees / 15 min / IP.

import { createClient } from "npm:@supabase/supabase-js@2";
import bcrypt from "npm:bcryptjs@2.4.3";
import { clientIp, handlePreflight, isAllowedOrigin, makeJson, sha256Hex } from "./_shared/http.ts";

const METHODS = "POST";

const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MIN = 15;
const ATTEMPT_KEEP_HOURS = 24;
const SESSION_DURATION_HOURS = 12;

Deno.serve(async (req: Request) => {
  const preflight = handlePreflight(req, METHODS);
  if (preflight) return preflight;

  const origin = req.headers.get("origin");
  const json = makeJson(origin, METHODS);

  // Refus cote serveur, pas seulement cote navigateur : avec "*" en CORS,
  // n'importe quelle page tierce pouvait faire essayer des mots de passe
  // depuis le navigateur de ses visiteurs, donc depuis autant d'IP
  // differentes — ce qui contourne de fait le comptage par IP.
  if (!isAllowedOrigin(origin)) return json({ success: false, error: "Forbidden origin" }, 403);
  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

  const passwordHash = Deno.env.get("ADMIN_PASSWORD_HASH");
  if (!passwordHash) {
    console.error("ADMIN_PASSWORD_HASH is not configured");
    return json({ success: false, error: "Server not configured" }, 500);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, error: "Invalid JSON body" }, 400);
  }

  const password = String(body.password ?? "");
  // bcrypt ignore ce qui depasse 72 octets : un mot de passe de 10 Mo ne
  // sert qu'a faire travailler la fonction pour rien.
  if (password.length > 200) return json({ success: false, error: "Invalid password" }, 401);

  const ip = clientIp(req);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // --- Anti brute-force ---
  const windowStart = new Date(Date.now() - ATTEMPT_WINDOW_MIN * 60_000).toISOString();
  const { count, error: countError } = await supabase
    .from("admin_login_attempts")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("success", false)
    .gte("attempted_at", windowStart);

  if (countError) {
    console.error("Attempt check failed:", countError);
    return json({ success: false, error: "Internal error" }, 500);
  }
  if ((count ?? 0) >= MAX_ATTEMPTS) {
    return json({ success: false, error: "Too many attempts. Try again later." }, 429);
  }

  const valid = password.length > 0 && await bcrypt.compare(password, passwordHash);

  await supabase.from("admin_login_attempts").insert({ ip, success: valid });

  if (!valid) {
    return json({ success: false, error: "Invalid password" }, 401);
  }

  // --- Emission du jeton de session ---
  // 256 bits tires du CSPRNG. randomUUID n'offrait que 122 bits par UUID et
  // encode une version/variante fixe : autant prendre les octets directement.
  const raw = new Uint8Array(32);
  crypto.getRandomValues(raw);
  const rawToken = Array.from(raw).map((b) => b.toString(16).padStart(2, "0")).join("");
  const tokenHash = await sha256Hex(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 3_600_000).toISOString();

  const { error: insertError } = await supabase
    .from("admin_sessions")
    .insert({ token_hash: tokenHash, expires_at: expiresAt });

  if (insertError) {
    console.error("Session creation failed:", insertError);
    return json({ success: false, error: "Internal error" }, 500);
  }

  // Nettoyage best-effort : sessions expirees et vieilles tentatives.
  await supabase.from("admin_sessions").delete().lt("expires_at", new Date().toISOString());
  await supabase
    .from("admin_login_attempts")
    .delete()
    .lt("attempted_at", new Date(Date.now() - ATTEMPT_KEEP_HOURS * 3_600_000).toISOString());

  return json({ success: true, token: rawToken, expires_at: expiresAt });
});
