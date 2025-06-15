"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

interface UserStats {
  totalTests: number
  totalRaces: number
  racesWon: number
  bestWPM: number
  currentWPM: number
  averageAccuracy: number
  recentTests: any[]
  recentRaces: any[]
  achievements: any[]
  streak: number
}

export function useUserStats() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isConfigured } = useAuth()

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // If Supabase isn't configured, return mock data
      if (!isConfigured) {
        setStats({
          totalTests: 0,
          totalRaces: 0,
          racesWon: 0,
          bestWPM: 0,
          currentWPM: 0,
          averageAccuracy: 0,
          recentTests: [],
          recentRaces: [],
          achievements: [],
          streak: 0,
        })
        setLoading(false)
        return
      }

      // Always fetch stats, even if user is null (API will handle it)
      const response = await fetch("/api/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: include cookies for auth
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      // Always set the data, even if there was an error
      setStats(result.data)

      if (result.error) {
        console.log("Stats API info:", result.error)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      console.error("Error fetching user stats:", err)

      // Set empty stats as fallback
      setStats({
        totalTests: 0,
        totalRaces: 0,
        racesWon: 0,
        bestWPM: 0,
        currentWPM: 0,
        averageAccuracy: 0,
        recentTests: [],
        recentRaces: [],
        achievements: [],
        streak: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [user, isConfigured])

  const refetch = () => {
    fetchStats()
  }

  return { stats, loading, error, refetch }
}
