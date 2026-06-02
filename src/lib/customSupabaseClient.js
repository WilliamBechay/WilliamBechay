import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nkiigfjmzuqylrsggpsn.supabase.co';
const supabaseAnonKey = 'sb_publishable_japAtzl88_5JhV2OLwtw6w_6Jqbe3MC';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
