import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = () => {
  return !!(
    supabaseUrl &&
    supabaseKey &&
    supabaseUrl !== "your_supabase_url" &&
    supabaseKey !== "your_supabase_anon_key"
  )
}

// Create a singleton instance to avoid multiple clients
let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export const supabase = (() => {
  if (!isSupabaseConfigured()) {
    console.log("Supabase not configured - running in demo mode")
    return null
  }

  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(supabaseUrl!, supabaseKey!)
  }

  return supabaseInstance
})()

// Export a function to get a fresh client if needed
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null
  }

  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient(supabaseUrl!, supabaseKey!)
  }

  return supabaseInstance
}
