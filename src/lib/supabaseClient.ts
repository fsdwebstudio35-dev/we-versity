import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  (import.meta.env as any).NEXT_PUBLIC_SUPABASE_URL || 
  'https://omcvimrnemvahuommvbu.supabase.co';

export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  (import.meta.env as any).NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  'sb_publishable_H8IsUdR2bDqeciPmd-2alw_YGfCoveB';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (url?: string, anonKey?: string): SupabaseClient => {
  const targetUrl = url || SUPABASE_URL;
  const targetKey = anonKey || SUPABASE_ANON_KEY;

  if (!supabaseInstance || (url && anonKey)) {
    supabaseInstance = createClient(targetUrl, targetKey);
  }
  return supabaseInstance;
};

export const initClientSupabase = (url: string, anonKey: string): SupabaseClient => {
  supabaseInstance = createClient(url, anonKey);
  return supabaseInstance;
};

// Default singleton client instance ready to use
export const supabase = getSupabaseClient();
