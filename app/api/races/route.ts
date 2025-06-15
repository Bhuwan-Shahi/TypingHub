import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const raceData = await request.json()

    const { data, error } = await supabase
      .from("races")
      .insert({
        user_id: user.id,
        race_id: raceData.raceId,
        wpm: raceData.wpm,
        accuracy: raceData.accuracy,
        position: raceData.position,
        total_players: raceData.totalPlayers,
        duration: raceData.duration,
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving race:", error)
      return NextResponse.json({ error: "Failed to save race" }, { status: 500 })
    }

    // Check for race achievements
    if (raceData.position === 1) {
      await checkRaceAchievements(supabase, user.id)
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error in race API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function checkRaceAchievements(supabase: any, userId: string) {
  // Count total race wins
  const { data: wins } = await supabase.from("races").select("id").eq("user_id", userId).eq("position", 1)

  const winCount = wins?.length || 0

  const achievements = []

  if (winCount >= 10) {
    achievements.push({
      achievement_type: "racing",
      achievement_name: "Race Winner",
      description: "Win 10 multiplayer races",
      icon: "🏆",
    })
  }

  // Insert new achievements
  for (const achievement of achievements) {
    const { data: existing } = await supabase
      .from("achievements")
      .select("id")
      .eq("user_id", userId)
      .eq("achievement_name", achievement.achievement_name)
      .single()

    if (!existing) {
      await supabase.from("achievements").insert({
        user_id: userId,
        ...achievement,
      })
    }
  }
}
