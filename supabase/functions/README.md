# Edge Functions

Le code deploye sur Supabase vivait uniquement dans le dashboard : rien n'en
etait versionne. Ces fichiers sont la source de verite et correspondent a ce
qui tourne en production.

- `_shared/http.ts` — CORS (liste d'origines), reponses JSON `no-store`,
  resolution de l'IP client, SHA-256. Partage par les trois fonctions.
- `contact-submit` — formulaire de contact (public, `verify_jwt: false`).
- `admin-login` — verification du mot de passe admin, emission du jeton.
- `admin-messages` — lecture/modification des messages + deconnexion.

## Deploiement

```sh
supabase functions deploy contact-submit --no-verify-jwt
supabase functions deploy admin-login    --no-verify-jwt
supabase functions deploy admin-messages --no-verify-jwt
```

Les trois tournent avec `verify_jwt: false` : elles font leur propre
authentification (jeton opaque maison, pas un JWT Supabase Auth). Ne pas
reactiver ce reglage sans revoir `admin-messages`.

## Variables d'environnement (Supabase > Edge Functions > Secrets)

| Nom | Role |
| --- | --- |
| `ADMIN_PASSWORD_HASH` | hash bcrypt du mot de passe admin |
| `RESEND_API_KEY` | notification email a chaque message (optionnel) |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | fournis par la plateforme |

## Origines autorisees

La liste est dans `_shared/http.ts`. Un nouveau domaine pour le site doit y
etre ajoute, sinon le navigateur refusera les appels — et il faut aussi
l'ajouter a `connect-src` dans `vercel.json`.
