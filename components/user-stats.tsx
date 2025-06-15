"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Zap, Trophy, Calendar, Award, Clock, BarChart3 } from "lucide-react"

const mockStats = {
  currentWPM: 72,
  bestWPM: 89,
  averageAccuracy: 94,
  totalTests: 156,
  totalRaces: 43,
  racesWon: 12,
  timeSpent: 2340, // minutes
  streak: 7,
  level: 15,
  nextLevelProgress: 65,
}

const recentTests = [
  { date: "2024-01-15", wpm: 75, accuracy: 96, mode: "Time 60s" },
  { date: "2024-01-15", wpm: 68, accuracy: 92, mode: "Words 50" },
  { date: "2024-01-14", wpm: 72, accuracy: 94, mode: "Time 30s" },
  { date: "2024-01-14", wpm: 71, accuracy: 95, mode: "Quote" },
  { date: "2024-01-13", wpm: 69, accuracy: 93, mode: "Time 60s" },
]

const achievements = [
  { name: "Speed Demon", description: "Reach 80+ WPM", icon: "⚡", unlocked: true },
  { name: "Accuracy Master", description: "95%+ accuracy for 10 tests", icon: "🎯", unlocked: true },
  { name: "Consistent Typist", description: "7-day typing streak", icon: "🔥", unlocked: true },
  { name: "Race Winner", description: "Win 10 multiplayer races", icon: "🏆", unlocked: true },
  { name: "Marathon Typist", description: "Complete 100 typing tests", icon: "🏃", unlocked: true },
  { name: "Lightning Fast", description: "Reach 100+ WPM", icon: "⚡", unlocked: false },
]

export function UserStats() {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{mockStats.currentWPM}</div>
            <div className="text-sm text-muted-foreground">Current WPM</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{mockStats.bestWPM}</div>
            <div className="text-sm text-muted-foreground">Best WPM</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{mockStats.averageAccuracy}%</div>
            <div className="text-sm text-muted-foreground">Avg Accuracy</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{mockStats.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xl font-bold text-blue-600">{mockStats.totalTests}</div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xl font-bold text-purple-600">{mockStats.totalRaces}</div>
                <div className="text-sm text-muted-foreground">Total Races</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xl font-bold text-green-600">{mockStats.racesWon}</div>
                <div className="text-sm text-muted-foreground">Races Won</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-xl font-bold text-orange-600">{Math.round(mockStats.timeSpent / 60)}h</div>
                <div className="text-sm text-muted-foreground">Time Spent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Level {mockStats.level}</div>
              <div className="text-sm text-muted-foreground mb-4">
                {mockStats.nextLevelProgress}% to Level {mockStats.level + 1}
              </div>
              <Progress value={mockStats.nextLevelProgress} className="h-3" />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Keep practicing to unlock new achievements and reach the next level!
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">{test.date}</div>
                  <Badge variant="outline">{test.mode}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>{test.wpm} WPM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-green-500" />
                    <span>{test.accuracy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  achievement.unlocked
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    : "bg-muted border-muted-foreground/20"
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div
                    className={`font-medium ${achievement.unlocked ? "text-green-700 dark:text-green-300" : "text-muted-foreground"}`}
                  >
                    {achievement.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
                {achievement.unlocked && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Unlocked
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
