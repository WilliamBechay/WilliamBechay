// Edge Function: admin-messages
// Publique au transport (verify_jwt: false, car on utilise notre propre
// jeton opaque et non un JWT Supabase Auth), protegee par la verification
// du jeton de session emis par admin-login.
//
// GET    -> liste les messages
// PATCH  -> { id, is_read } marque un message comme lu/non lu
// DELETE -> ?id=<uuid> supprime un message
// POST   -> { action: "logout" } revoque la session courante

import { createClient } from "npm:@supabase/supabase-js@2";
import { handlePreflight, isAllowedOrigin, makeJson, sha256Hex } from "./_shared/http.ts";

const METHODS = "GET, POST, PATCH, DELETE";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req: Request) => {
  const preflight = handlePreflight(req, METHODS);
  if (preflight) return preflight;

  const origin = req.headers.get("origin");
  const json = makeJson(origin, METHODS);

  if (!isAllowedOrigin(origin)) return json({ error: "Forbidden origin" }, 403);

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  // Le jeton fait 64 caracteres hexadecimaux : tout le reste est rejete
  // sans meme interroger la base.
  if (!token || !/^[0-9a-f]{64}$/i.test(token)) {
    return json({ error: "Missing session token" }, 401);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const tokenHash = await sha256Hex(token);
  const { data: session, error: sessionError } = await supabase
    .from("admin_sessions")
    .select("id, expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (sessionError) {
    console.error("Session lookup failed:", sessionError);
    return json({ error: "Internal error" }, 500);
  }
  if (!session || new Date(session.expires_at) < new Date()) {
    // Une session expiree est supprimee des qu'on la croise, au lieu de
    // rester en base jusqu'au prochain login.
    if (session) await supabase.from("admin_sessions").delete().eq("id", session.id);
    return json({ error: "Invalid or expired session" }, 401);
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) return json({ error: "Failed to fetch messages" }, 500);
    return json({ messages: data });
  }

  // Deconnexion : le jeton etait seulement oublie par le navigateur et
  // restait valide en base jusqu'a 12h. Il est maintenant revoque.
  if (req.method === "POST") {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch { /* corps vide accepte */ }
    if (String(body.action ?? "") !== "logout") return json({ error: "Unknown action" }, 400);
    const { error } = await supabase.from("admin_sessions").delete().eq("id", session.id);
    if (error) return json({ error: "Logout failed" }, 500);
    return json({ success: true });
  }

  if (req.method === "PATCH") {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }
    const id = String(body.id ?? "");
    const isRead = Boolean(body.is_read);
    if (!UUID_RE.test(id)) return json({ error: "Missing id" }, 400);

    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: isRead })
      .eq("id", id);
    if (error) return json({ error: "Update failed" }, 500);
    return json({ success: true });
  }

  if (req.method === "DELETE") {
    const id = new URL(req.url).searchParams.get("id") ?? "";
    if (!UUID_RE.test(id)) return json({ error: "Missing id" }, 400);

    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) return json({ error: "Delete failed" }, 500);
    return json({ success: true });
  }

  return json({ error: "Method not allowed" }, 405);
});
