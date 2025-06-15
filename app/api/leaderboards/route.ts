import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const timeframe = searchParams.get("timeframe") || "all-time"
  const category = searchParams.get("category") || "overall"
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  // Mock data for demonstration
  const mockLeaderboardData = [
    {
      rank: 1,
      id: "1",
      wpm: 120,
      accuracy: 98,
      duration: 60,
      testMode: "Practice",
      createdAt: new Date().toISOString(),
      user: {
        id: "user1",
        name: "Speed Demon",
        email: "speed@example.com",
      },
    },
    {
      rank: 2,
      id: "2",
      wpm: 115,
      accuracy: 97,
      duration: 60,
      testMode: "Race",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      user: {
        id: "user2",
        name: "Fast Fingers",
        email: "fast@example.com",
      },
    },
    {
      rank: 3,
      id: "3",
      wpm: 110,
      accuracy: 99,
      duration: 60,
      testMode: "Practice",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      user: {
        id: "user3",
        name: "Accuracy Master",
        email: "accurate@example.com",
      },
    },
    {
      rank: 4,
      id: "4",
      wpm: 105,
      accuracy: 96,
      duration: 60,
      testMode: "Race",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      user: {
        id: "user4",
        name: "Typing Pro",
        email: "pro@example.com",
      },
    },
    {
      rank: 5,
      id: "5",
      wpm: 100,
      accuracy: 95,
      duration: 60,
      testMode: "Practice",
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      user: {
        id: "user5",
        name: "Keyboard Warrior",
        email: "warrior@example.com",
      },
    },
  ]

  // Filter based on timeframe (mock filtering)
  let filteredData = mockLeaderboardData

  // Apply limit
  filteredData = filteredData.slice(0, limit)

  const response = {
    success: true,
    data: filteredData,
    meta: {
      timeframe,
      category,
      total: mockLeaderboardData.length,
    },
  }

  return NextResponse.json(response)
}
