import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (url?: string, anonKey?: string): SupabaseClient | null => {
  const targetUrl = url || import.meta.env.VITE_SUPABASE_URL;
  const targetKey = anonKey || import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (targetUrl && targetKey) {
    if (!supabaseInstance) {
      supabaseInstance = createClient(targetUrl, targetKey);
    }
    return supabaseInstance;
  }
  return null;
};

export const initClientSupabase = (url: string, anonKey: string): SupabaseClient | null => {
  if (url && anonKey) {
    supabaseInstance = createClient(url, anonKey);
    return supabaseInstance;
  }
  return null;
};
