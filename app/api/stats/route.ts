import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        {
          error: "Database not configured",
          data: getMockStats(),
        },
        { status: 200 },
      )
    }

    const supabase = await createServerClient()

    // Try to get the user from the session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("Session error:", sessionError)
      return NextResponse.json(
        {
          error: "Session error",
          data: getMockStats(),
        },
        { status: 200 },
      )
    }

    if (!session?.user) {
      console.log("No session found, returning mock data")
      return NextResponse.json(
        {
          error: "Not authenticated",
          data: getMockStats(),
        },
        { status: 200 },
      )
    }

    const user = session.user

    // Get typing test stats
    const { data: tests, error: testsError } = await supabase
      .from("typing_tests")
      .select("wpm, accuracy, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (testsError) {
      console.error("Tests error:", testsError)
    }

    // Get race stats
    const { data: races, error: racesError } = await supabase
      .from("races")
      .select("wpm, accuracy, position, total_players, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (racesError) {
      console.error("Races error:", racesError)
    }

    // Get achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from("achievements")
      .select("*")
      .eq("user_id", user.id)
      .order("unlocked_at", { ascending: false })

    if (achievementsError) {
      console.error("Achievements error:", achievementsError)
    }

    // Calculate statistics
    const stats = {
      totalTests: tests?.length || 0,
      totalRaces: races?.length || 0,
      racesWon: races?.filter((race) => race.position === 1).length || 0,
      bestWPM: tests?.length ? Math.max(...tests.map((t) => t.wpm)) : 0,
      currentWPM: tests?.[0]?.wpm || 0,
      averageAccuracy: tests?.length ? Math.round(tests.reduce((sum, t) => sum + t.accuracy, 0) / tests.length) : 0,
      recentTests: tests?.slice(0, 10) || [],
      recentRaces: races?.slice(0, 10) || [],
      achievements: achievements || [],
      streak: calculateStreak(tests || []),
    }

    return NextResponse.json({ data: stats })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        data: getMockStats(),
      },
      { status: 200 },
    )
  }
}

function calculateStreak(tests: any[]): number {
  if (!tests.length) return 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  const currentDate = new Date(today)

  for (let i = 0; i < 30; i++) {
    const dayTests = tests.filter((test) => {
      const testDate = new Date(test.created_at)
      testDate.setHours(0, 0, 0, 0)
      return testDate.getTime() === currentDate.getTime()
    })

    if (dayTests.length > 0) {
      streak++
    } else if (streak > 0) {
      break
    }

    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}

function getMockStats() {
  return {
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
  }
}
