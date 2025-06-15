"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Trophy, Users, Clock, Zap, Crown, Medal, Target, Play, UserPlus, Copy, CheckCircle } from "lucide-react"

interface Player {
  id: string
  name: string
  wpm: number
  accuracy: number
  progress: number
  position: number
  isFinished: boolean
}

const mockPlayers: Player[] = [
  { id: "1", name: "SpeedTyper", wpm: 85, accuracy: 98, progress: 75, position: 1, isFinished: false },
  { id: "2", name: "KeyboardNinja", wpm: 78, accuracy: 96, progress: 68, position: 2, isFinished: false },
  { id: "3", name: "TypingMaster", wpm: 72, accuracy: 94, progress: 62, position: 3, isFinished: false },
  { id: "4", name: "QuickFingers", wpm: 69, accuracy: 92, progress: 58, position: 4, isFinished: false },
  { id: "5", name: "You", wpm: 65, accuracy: 89, progress: 55, position: 5, isFinished: false },
]

const raceText =
  "The art of programming is the skill of controlling complexity. We will either find a way or make one. The best way to predict the future is to invent it. Code is like humor. When you have to explain it, it's bad."

export function MultiplayerRace() {
  const [gameState, setGameState] = useState<"lobby" | "countdown" | "racing" | "finished">("lobby")
  const [players, setPlayers] = useState<Player[]>(mockPlayers)
  const [countdown, setCountdown] = useState(3)
  const [raceTime, setRaceTime] = useState(0)
  const [roomCode] = useState("RACE-2024")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (gameState === "countdown" && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setGameState("racing")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (gameState === "racing") {
      interval = setInterval(() => {
        setRaceTime((prev) => prev + 1)

        // Simulate player progress
        setPlayers((prev) =>
          prev.map((player) => ({
            ...player,
            progress: Math.min(player.progress + Math.random() * 2, 100),
            wpm: Math.max(0, player.wpm + (Math.random() - 0.5) * 3),
            accuracy: Math.max(85, Math.min(100, player.accuracy + (Math.random() - 0.5) * 2)),
          })),
        )
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [gameState, countdown])

  useEffect(() => {
    // Check if race is finished
    const finishedPlayers = players.filter((p) => p.progress >= 100)
    if (finishedPlayers.length > 0 && gameState === "racing") {
      setGameState("finished")
    }
  }, [players, gameState])

  const startRace = () => {
    setGameState("countdown")
    setCountdown(3)
  }

  const joinQuickRace = () => {
    // Simulate joining a race
    startRace()
  }

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-4 w-4 text-yellow-500" />
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />
      case 3:
        return <Medal className="h-4 w-4 text-amber-600" />
      default:
        return <span className="text-sm font-bold">{position}</span>
    }
  }

  if (gameState === "lobby") {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Race
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Join a race with players of similar skill level. Instant matchmaking with 2-6 players.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>2-6 players</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>~60 seconds</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>Skill-based</span>
                </div>
              </div>
              <Button onClick={joinQuickRace} className="w-full" size="lg">
                <Play className="h-4 w-4 mr-2" />
                Join Quick Race
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-500" />
                Private Room
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create or join a private room with friends. Share the room code to invite others.
              </p>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input placeholder="Enter room code" />
                  <Button variant="outline">Join</Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">or</div>
                <Button variant="outline" className="w-full">
                  Create Private Room
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              Recent Races
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">SpeedTyper won</div>
                    <div className="text-sm text-muted-foreground">92 WPM • 2 minutes ago</div>
                  </div>
                </div>
                <Badge variant="secondary">6 players</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>KN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">KeyboardNinja won</div>
                    <div className="text-sm text-muted-foreground">87 WPM • 5 minutes ago</div>
                  </div>
                </div>
                <Badge variant="secondary">4 players</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">TypingMaster won</div>
                    <div className="text-sm text-muted-foreground">95 WPM • 8 minutes ago</div>
                  </div>
                </div>
                <Badge variant="secondary">8 players</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "countdown") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-12">
            <div className="text-8xl font-bold text-primary mb-4 animate-pulse">{countdown}</div>
            <div className="text-xl font-semibold mb-2">Get Ready!</div>
            <div className="text-muted-foreground">
              Race starts in {countdown} second{countdown !== 1 ? "s" : ""}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "racing" || gameState === "finished") {
    const sortedPlayers = [...players].sort((a, b) => b.progress - a.progress)

    return (
      <div className="space-y-6">
        {/* Race Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant={gameState === "racing" ? "default" : "secondary"}>
                  {gameState === "racing" ? "Racing" : "Finished"}
                </Badge>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>
                    {Math.floor(raceTime / 60)}:{(raceTime % 60).toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{players.length} players</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Room:</span>
                <Button variant="outline" size="sm" onClick={copyRoomCode}>
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-1">{roomCode}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Race Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Race Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedPlayers.map((player, index) => (
                <div key={player.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8">{getPositionIcon(index + 1)}</div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round(player.wpm)} WPM • {Math.round(player.accuracy)}% ACC
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{Math.round(player.progress)}%</div>
                      {player.isFinished && (
                        <Badge variant="secondary" className="text-xs">
                          Finished
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={player.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Race Text */}
        <Card>
          <CardHeader>
            <CardTitle>Race Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="typing-text text-lg leading-relaxed p-4 bg-muted rounded-lg">{raceText}</div>
            {gameState === "racing" && <Input className="mt-4" placeholder="Start typing here..." autoFocus />}
          </CardContent>
        </Card>

        {gameState === "finished" && (
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Race Complete!</h3>
              <p className="text-muted-foreground mb-6">
                {sortedPlayers[0].name} won with {Math.round(sortedPlayers[0].wpm)} WPM
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => setGameState("lobby")}>Race Again</Button>
                <Button variant="outline">View Detailed Results</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return null
}
