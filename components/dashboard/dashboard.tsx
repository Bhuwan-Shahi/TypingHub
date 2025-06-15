"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserStats } from "@/hooks/use-user-stats"
import { useAuth } from "@/contexts/auth-context"
import { Trophy, Target, Zap, Calendar, TrendingUp, Award, RefreshCw } from "lucide-react"
import Link from "next/link"

export function Dashboard() {
  const { stats, loading, error, refetch } = useUserStats()
  const { user, isConfigured } = useAuth()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isConfigured) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Demo Mode</CardTitle>
            <CardDescription>Database not configured. Set up Supabase to see real statistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              To enable full functionality, add your Supabase credentials to your environment variables.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/practice">Try Practice Mode</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/race">Join a Race</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Welcome to TypingHub</CardTitle>
            <CardDescription>Sign in to track your progress and compete with others.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error && !stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Error Loading Dashboard</CardTitle>
            <CardDescription>We encountered an issue loading your statistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Error: {error}</p>
            <Button onClick={refetch} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">No statistics available.</p>
          <Button onClick={refetch} className="mt-4">
            Refresh
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="text-lg">{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user.user_metadata?.full_name || user.email?.split("@")[0] || "Typist"}!
            </h1>
            <p className="text-muted-foreground">Ready to improve your typing skills?</p>
          </div>
        </div>
        <Button onClick={refetch} variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best WPM</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bestWPM}</div>
            <p className="text-xs text-muted-foreground">Personal record</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTests}</div>
            <p className="text-xs text-muted-foreground">Total practice sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageAccuracy}%</div>
            <p className="text-xs text-muted-foreground">Across all tests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Keep practicing to improve your skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Speed Progress</span>
                    <span>{stats.currentWPM} / 100 WPM</span>
                  </div>
                  <Progress value={(stats.currentWPM / 100) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Accuracy</span>
                    <span>{stats.averageAccuracy}%</span>
                  </div>
                  <Progress value={stats.averageAccuracy} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump into practice or compete with others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/practice">Start Practice Session</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/race">Join Multiplayer Race</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/stats">View Detailed Stats</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
              <CardDescription>Your latest typing practice sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.recentTests.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentTests.slice(0, 5).map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{test.wpm} WPM</p>
                        <p className="text-sm text-muted-foreground">{test.accuracy}% accuracy</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(test.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No typing tests yet</p>
                  <Button asChild>
                    <Link href="/practice">Take Your First Test</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your typing milestones and badges</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Award className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="font-medium">{achievement.achievement_name}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No achievements yet</p>
                  <p className="text-sm text-muted-foreground">
                    Complete typing tests to unlock your first achievement!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
