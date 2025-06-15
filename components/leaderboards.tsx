"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Crown, Zap, Target, Clock, TrendingUp, RefreshCw, Calendar, Users, Award } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface LeaderboardEntry {
  rank: number
  id: string
  wpm: number
  accuracy: number
  duration: number
  testMode: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface LeaderboardData {
  success: boolean
  data: LeaderboardEntry[]
  meta: {
    timeframe: string
    category: string
    total: number
  }
}

export function Leaderboards() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("all-time")
  const [category, setCategory] = useState("overall")
  const { user } = useAuth()

  const fetchLeaderboards = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/leaderboards?timeframe=${timeframe}&category=${category}&limit=50`)
      const data = await response.json()
      setLeaderboardData(data)
    } catch (error) {
      console.error("Failed to fetch leaderboards:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboards()
  }, [timeframe, category])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return "default"
    if (rank <= 10) return "secondary"
    return "outline"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const userRank = leaderboardData?.data?.find((entry) => entry.user.id === user?.id)?.rank

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Leaderboards
          </h1>
          <p className="text-muted-foreground mt-1">Compete with typists worldwide and climb the rankings</p>
        </div>
        <Button onClick={fetchLeaderboards} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* User's Current Rank */}
      {user && userRank && leaderboardData?.meta?.total && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  {getRankIcon(userRank)}
                </div>
                <div>
                  <div className="font-semibold">Your Current Rank</div>
                  <div className="text-sm text-muted-foreground">
                    #{userRank} out of {leaderboardData.meta.total} players
                  </div>
                </div>
              </div>
              <Badge variant="default" className="text-sm">
                {timeframe === "all-time" ? "All Time" : timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <label className="text-sm font-medium">Timeframe:</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="monthly">This Month</SelectItem>
                  <SelectItem value="weekly">This Week</SelectItem>
                  <SelectItem value="daily">Today</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <label className="text-sm font-medium">Category:</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Overall</SelectItem>
                  <SelectItem value="speed">Speed</SelectItem>
                  <SelectItem value="accuracy">Accuracy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{leaderboardData?.meta?.total || 0} players</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard">
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="top-performers">
            <Award className="h-4 w-4 mr-2" />
            Top Performers
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <TrendingUp className="h-4 w-4 mr-2" />
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Loading leaderboard...</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Typists
                  <Badge variant="secondary" className="ml-auto">
                    {timeframe === "all-time" ? "All Time" : timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboardData?.data.slice(0, 50).map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        entry.user.id === user?.id
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10">{getRankIcon(entry.rank)}</div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{entry.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {entry.user.name}
                            {entry.user.id === user?.id && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {entry.testMode} • {formatDate(entry.createdAt)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-right">
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold text-yellow-600">{entry.wpm}</span>
                          <span className="text-xs text-muted-foreground">WPM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className="font-bold text-green-600">{entry.accuracy}%</span>
                          <span className="text-xs text-muted-foreground">ACC</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span className="font-bold text-blue-600">{entry.duration}s</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!leaderboardData?.data || leaderboardData.data.length === 0) && (
                    <div className="text-center py-12">
                      <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No results yet</h3>
                      <p className="text-muted-foreground mb-4">Be the first to set a record in this category!</p>
                      <Button onClick={() => (window.location.href = "/practice")}>Start Typing</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="top-performers" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Top 3 Cards */}
            {leaderboardData?.data?.slice(0, 3).map((entry, index) => (
              <Card
                key={entry.id}
                className={index === 0 ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20" : ""}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">{getRankIcon(entry.rank)}</div>
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarFallback className="text-lg">{entry.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-2">{entry.user.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold text-2xl text-yellow-600">{entry.wpm}</span>
                      <span className="text-sm text-muted-foreground">WPM</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Target className="h-4 w-4 text-green-500" />
                      <span className="font-bold text-green-600">{entry.accuracy}%</span>
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                    </div>
                  </div>
                  <Badge variant={getRankBadgeColor(entry.rank)} className="mt-4">
                    {entry.testMode}
                  </Badge>
                </CardContent>
              </Card>
            )) || []}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{leaderboardData?.data?.[0]?.wpm || 0}</div>
                <div className="text-sm text-muted-foreground">Highest WPM</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {leaderboardData?.data?.length ? Math.max(...leaderboardData.data.map((d) => d.accuracy)) : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Best Accuracy</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{leaderboardData?.meta?.total || 0}</div>
                <div className="text-sm text-muted-foreground">Total Players</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {leaderboardData?.data?.length
                    ? Math.round(leaderboardData.data.reduce((acc, d) => acc + d.wpm, 0) / leaderboardData.data.length)
                    : 0}
                </div>
                <div className="text-sm text-muted-foreground">Average WPM</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
