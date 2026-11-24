import { createClient } from '@supabase/supabase-js';

// L'URL et la cle publiable etaient ecrites en dur. Elles finissent de toute
// facon dans le bundle (la cle publiable est faite pour etre publique), mais
// les lire depuis l'environnement permet de faire tourner la cle ou de
// pointer vers un autre projet sans modifier le code. Les valeurs actuelles
// restent en repli pour que le build ne casse pas la ou les variables ne sont
// pas encore definies.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://nkiigfjmzuqylrsggpsn.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_japAtzl88_5JhV2OLwtw6w_6Jqbe3MC';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Supabase Auth n'est pas utilise : l'admin passe par son propre jeton
    // de session. Sans ce reglage, le client pose quand meme un
    // rafraichissement de jeton en tache de fond et ecrit dans
    // localStorage pour une session qui n'existera jamais.
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

export default customSupabaseClient;

export {
    customSupabaseClient,
    customSupabaseClient as supabase,
};
