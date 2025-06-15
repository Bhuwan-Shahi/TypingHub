"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Keyboard,
  Trophy,
  Target,
  Zap,
  Activity,
  Clock,
  Users,
  Award,
} from "lucide-react"

const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  username: "alexj_typing",
  location: "San Francisco, CA",
  joinDate: "January 15, 2024",
  bio: "Passionate typist working towards 100 WPM. Love competing in races and helping others improve their typing speed.",
  avatar: "/placeholder.svg?height=120&width=120",
  stats: {
    level: 15,
    rank: "Advanced",
    currentWPM: 72,
    bestWPM: 89,
    averageAccuracy: 94,
    totalTests: 156,
    totalRaces: 43,
    racesWon: 12,
    streak: 7,
  },
}

const recentActivity = [
  {
    id: 1,
    type: "test",
    title: "60-second typing test",
    wpm: 75,
    accuracy: 96,
    mode: "Time 60s",
    text: "Lorem ipsum dolor sit amet...",
    timestamp: "2 hours ago",
    date: "2024-01-15",
    duration: 60,
    errors: 8,
  },
  {
    id: 2,
    type: "race",
    title: "Multiplayer race victory",
    wpm: 78,
    accuracy: 94,
    position: 1,
    totalPlayers: 6,
    timestamp: "4 hours ago",
    date: "2024-01-15",
    duration: 45,
  },
  {
    id: 3,
    type: "test",
    title: "Quote practice session",
    wpm: 68,
    accuracy: 92,
    mode: "Quote",
    text: "The quick brown fox jumps...",
    timestamp: "1 day ago",
    date: "2024-01-14",
    duration: 35,
    errors: 12,
  },
  {
    id: 4,
    type: "achievement",
    title: "Speed Demon badge unlocked",
    description: "Reached 80+ WPM for the first time",
    timestamp: "1 day ago",
    date: "2024-01-14",
    badge: "⚡",
  },
  {
    id: 5,
    type: "race",
    title: "Multiplayer race",
    wpm: 71,
    accuracy: 89,
    position: 3,
    totalPlayers: 8,
    timestamp: "2 days ago",
    date: "2024-01-13",
    duration: 52,
  },
  {
    id: 6,
    type: "test",
    title: "Word practice session",
    wpm: 73,
    accuracy: 97,
    mode: "Words 50",
    text: "Common English words practice",
    timestamp: "2 days ago",
    date: "2024-01-13",
    duration: 42,
    errors: 4,
  },
  {
    id: 7,
    type: "test",
    title: "Custom text practice",
    wpm: 69,
    accuracy: 91,
    mode: "Custom",
    text: "Programming code snippets...",
    timestamp: "3 days ago",
    date: "2024-01-12",
    duration: 38,
    errors: 15,
  },
]

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    username: userData.username,
    email: userData.email,
    location: userData.location,
    bio: userData.bio,
  })

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving profile data:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      location: userData.location,
      bio: userData.bio,
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback className="text-2xl">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-muted-foreground">@{userData.username}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Level {userData.stats.level}
                  </Badge>
                  <Badge variant="outline">{userData.stats.rank}</Badge>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{userData.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userData.joinDate}</span>
                </div>
              </div>
            </div>

            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userData.stats.currentWPM}</div>
            <div className="text-sm text-muted-foreground">Current WPM</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userData.stats.bestWPM}</div>
            <div className="text-sm text-muted-foreground">Best WPM</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userData.stats.averageAccuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Keyboard className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{userData.stats.totalTests}</div>
            <div className="text-sm text-muted-foreground">Total Tests</div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Management Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details and profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Full Name</Label>
                      <p className="text-sm text-muted-foreground">{userData.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Username</Label>
                      <p className="text-sm text-muted-foreground">@{userData.username}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm text-muted-foreground">{userData.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Bio</Label>
                    <p className="text-sm text-muted-foreground">{userData.bio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest typing sessions, races, and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {activity.type === "test" && (
                            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                              <Keyboard className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          {activity.type === "race" && (
                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                              <Trophy className="h-4 w-4 text-purple-600" />
                            </div>
                          )}
                          {activity.type === "achievement" && (
                            <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                              <Award className="h-4 w-4 text-yellow-600" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium text-sm">{activity.title}</h4>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>

                        {activity.type === "test" && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-4 text-sm">
                              <Badge variant="outline" className="text-xs">
                                {activity.mode}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                <span className="font-medium">{activity.wpm} WPM</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Target className="h-3 w-3 text-green-500" />
                                <span className="font-medium">{activity.accuracy}% ACC</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 text-blue-500" />
                                <span>{activity.duration}s</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <X className="h-3 w-3 text-red-500" />
                                <span>{activity.errors} errors</span>
                              </div>
                            </div>
                            {activity.text && (
                              <p className="text-xs text-muted-foreground bg-muted p-2 rounded italic">
                                "{activity.text.substring(0, 60)}..."
                              </p>
                            )}
                          </div>
                        )}

                        {activity.type === "race" && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-4 text-sm">
                              <Badge
                                variant={activity.position === 1 ? "default" : "outline"}
                                className={`text-xs ${activity.position === 1 ? "bg-yellow-500 text-white" : ""}`}
                              >
                                #{activity.position} of {activity.totalPlayers}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                <span className="font-medium">{activity.wpm} WPM</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Target className="h-3 w-3 text-green-500" />
                                <span className="font-medium">{activity.accuracy}% ACC</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 text-blue-500" />
                                <span>{activity.duration}s</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3 text-purple-500" />
                                <span>{activity.totalPlayers} players</span>
                              </div>
                            </div>
                            {activity.position === 1 && (
                              <div className="flex items-center space-x-1 text-xs text-yellow-600 font-medium">
                                <Trophy className="h-3 w-3" />
                                <span>Victory! 🎉</span>
                              </div>
                            )}
                          </div>
                        )}

                        {activity.type === "achievement" && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{activity.badge}</span>
                              <div>
                                <p className="text-sm font-medium text-yellow-600">{activity.title}</p>
                                <p className="text-xs text-muted-foreground">{activity.description}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                        {(activity.type === "test" || activity.type === "race") && (
                          <Button variant="ghost" size="sm" className="mt-1 h-6 px-2 text-xs">
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">Load More Activity</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account security and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex space-x-2">
                  <Input type="password" value="••••••••" disabled />
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Privacy settings would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Notification settings would be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
