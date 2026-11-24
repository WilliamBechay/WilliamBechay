// Reponses HTTP et CORS partages par les trois Edge Functions.
//
// Pourquoi une liste d'origines et non "*": ces trois fonctions sont
// publiques au transport (verify_jwt: false). Avec Access-Control-Allow-Origin: *,
// n'importe quelle page web pouvait faire appeler admin-login par le
// navigateur d'un visiteur — autant de tentatives de mot de passe depuis
// autant d'adresses IP — et arroser contact-submit depuis un site tiers.
// Le navigateur n'autorise maintenant la lecture de la reponse que depuis
// les origines du site.

const ALLOWED_ORIGINS = [
  "https://williambechay.com",
  "https://www.williambechay.com",
];

// Previsualisations Vercel et developpement local.
const ALLOWED_PATTERNS = [
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/i,
  /^http:\/\/localhost(:\d+)?$/i,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // appel hors navigateur : pas de CORS a appliquer
  return ALLOWED_ORIGINS.includes(origin) || ALLOWED_PATTERNS.some((re) => re.test(origin));
}

export function corsHeaders(origin: string | null, methods: string): Record<string, string> {
  const headers: Record<string, string> = {
    // La reponse depend de l'origine : sans Vary, un cache intermediaire
    // pourrait servir a un site tiers la reponse autorisee d'un autre.
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": `${methods}, OPTIONS`,
    "Access-Control-Max-Age": "86400",
  };
  if (origin && isAllowedOrigin(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

export function makeJson(origin: string | null, methods: string) {
  return (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {
        ...corsHeaders(origin, methods),
        "Content-Type": "application/json",
        // Rien ici n'a vocation a etre mis en cache : ni les messages de
        // l'admin, ni un jeton de session.
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
}

export function handlePreflight(req: Request, methods: string): Response | null {
  if (req.method !== "OPTIONS") return null;
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) return new Response("Forbidden origin", { status: 403 });
  return new Response(null, { status: 204, headers: corsHeaders(origin, methods) });
}

// IP du client. cf-connecting-ip est pose par Cloudflare devant Supabase et
// ecrase toute valeur envoyee par le client ; c'est la seule source de
// verite. x-forwarded-for sert de repli.
export function clientIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip")?.trim() ||
    req.headers.get("sb-forwarded-for")?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
