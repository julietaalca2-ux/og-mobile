const SUPABASE_URL = "https://axxafvggyetnnaumqefi.supabase.co";
const SUPABASE_KEY = "sb_publishable_O4wRZft0LCo3DYiCWT4iqg_E5_c8B2A";

export const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  }
});

window.db = db;
