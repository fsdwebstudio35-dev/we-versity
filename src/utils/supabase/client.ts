import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  import.meta.env.VITE_SUPABASE_URL ||
  (import.meta.env as any).NEXT_PUBLIC_SUPABASE_URL ||
  'https://omcvimrnemvahuommvbu.supabase.co';

const supabaseKey =
  (typeof process !== 'undefined' && (process.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY)) ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  (import.meta.env as any).NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_H8IsUdR2bDqeciPmd-2alw_YGfCoveB';

export function createClient(): SupabaseClient {
  try {
    return createBrowserClient(supabaseUrl, supabaseKey);
  } catch {
    return createSupabaseClient(supabaseUrl, supabaseKey);
  }
}

export const createClientComponentClient = createClient;
export default createClient;
