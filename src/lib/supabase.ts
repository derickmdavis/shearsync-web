import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function hasSupabaseBrowserConfig() {
  // Only NEXT_PUBLIC Supabase values belong in this client bundle; service-role
  // keys must stay server-side and are intentionally not referenced here.
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  // Reuse one browser client so auth subscriptions and session storage are not
  // duplicated across account/login screens.
  browserClient ??= createClient(supabaseUrl, supabaseAnonKey);

  return browserClient;
}
