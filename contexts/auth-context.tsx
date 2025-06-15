"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  loading: boolean
  isConfigured: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const configured = isSupabaseConfigured()

  useEffect(() => {
    if (!configured) {
      console.log("Supabase not configured - running in demo mode")
      setLoading(false)
      return
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error getting session:", error)
      }
      console.log("Initial session:", session ? "Found" : "Not found")
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session ? "Session exists" : "No session")
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [configured])

  const signUp = async (email: string, password: string, fullName?: string) => {
    const supabase = getSupabaseClient()
    if (!supabase) return { error: { message: "Supabase not configured" } }

    console.log("Attempting signup for:", email)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      console.error("Signup error:", error)
    } else {
      console.log("Signup successful:", data)
    }

    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabaseClient()
    if (!supabase) return { error: { message: "Supabase not configured" } }

    console.log("Attempting signin for:", email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Signin error:", error)
    } else {
      console.log("Signin successful:", data)
    }

    return { error }
  }

  const signOut = async () => {
    const supabase = getSupabaseClient()
    if (!supabase) return { error: { message: "Supabase not configured" } }

    console.log("Signing out...")
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Signout error:", error)
    } else {
      console.log("Signout successful")
    }

    return { error }
  }

  const value = {
    user,
    loading,
    isConfigured: configured,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
