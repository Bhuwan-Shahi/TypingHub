"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Trophy,
  Users,
  Clock,
  Zap,
  Crown,
  Medal,
  Target,
  Play,
  UserPlus,
  Copy,
  CheckCircle,
  Wifi,
  WifiOff,
  RotateCcw,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PrivateRoomDialog } from "@/components/private-room-dialog"

// Mock WebSocket types for development
interface RaceState {
  id: string
  text: string
  status: "waiting" | "countdown" | "racing" | "finished"
  players: Array<{
    id: string
    name: string
    progress: number
    wpm: number
    accuracy: number
    isFinished: boolean
    isConnected: boolean
  }>
  countdown?: number
  isPrivate?: boolean
  settings?: {
    category: string
    difficulty: string
    timeLimit?: number
    customText?: string
  }
}

interface RaceMessage {
  type: "state" | "start" | "progress" | "finish" | "countdown"
  data: any
}

// Mock WebSocket class for development
class RaceWebSocket {
  private raceId: string
  private onMessage: (message: RaceMessage) => void
  private onConnectionChange: (connected: boolean) => void
  private connected = false
  private mockPlayers: Array<any> = []

  constructor(
    raceId: string,
    onMessage: (message: RaceMessage) => void,
    onConnectionChange: (connected: boolean) => void,
  ) {
    this.raceId = raceId
    this.onMessage = onMessage
    this.onConnectionChange = onConnectionChange
  }

  connect(playerName: string) {
    this.connected = true
    this.onConnectionChange(true)

    // Add user player
    this.mockPlayers = [
      {
        id: "user",
        name: playerName,
        progress: 0,
        wpm: 0,
        accuracy: 100,
        isFinished: false,
        isConnected: true,
      },
    ]

    // Add some bot players for testing
    const botNames = ["SpeedTyper", "KeyboardNinja", "TypingMaster", "QuickFingers"]
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      this.mockPlayers.push({
        id: `bot-${i}`,
        name: botNames[i],
        progress: 0,
        wpm: 0,
        accuracy: 95 + Math.random() * 5,
        isFinished: false,
        isConnected: true,
      })
    }

    // Send initial state
    setTimeout(() => {
      this.onMessage({
        type: "state",
        data: {
          id: this.raceId,
          text: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice.",
          status: "countdown",
          players: this.mockPlayers,
          countdown: 3,
        },
      })

      // Start countdown
      this.startCountdown()
    }, 1000)
  }

  private startCountdown() {
    let count = 3
    const countdownInterval = setInterval(() => {
      count--
      if (count > 0) {
        this.onMessage({
          type: "countdown",
          data: { countdown: count },
        })
      } else {
        clearInterval(countdownInterval)
        this.onMessage({ type: "start", data: {} })
        this.startBotSimulation()
      }
    }, 1000)
  }

  private startBotSimulation() {
    // Simulate bot typing progress
    const interval = setInterval(() => {
      if (!this.connected) {
        clearInterval(interval)
        return
      }

      this.mockPlayers = this.mockPlayers.map((player) => {
        if (player.id !== "user" && !player.isFinished) {
          const progressIncrease = Math.random() * 3 + 1
          const newProgress = Math.min(100, player.progress + progressIncrease)
          const newWpm = Math.floor(Math.random() * 20) + 60 + newProgress / 2

          return {
            ...player,
            progress: newProgress,
            wpm: newWpm,
            isFinished: newProgress >= 100,
          }
        }
        return player
      })

      this.onMessage({
        type: "progress",
        data: { players: this.mockPlayers },
      })

      // Check if race is finished
      const allFinished = this.mockPlayers.every((p) => p.isFinished || p.id === "user")
      if (allFinished) {
        clearInterval(interval)
        setTimeout(() => {
          this.onMessage({ type: "finish", data: {} })
        }, 2000)
      }
    }, 1000)
  }

  sendProgress(progress: number, wpm: number, accuracy: number) {
    const userIndex = this.mockPlayers.findIndex((p) => p.id === "user")
    if (userIndex !== -1) {
      this.mockPlayers[userIndex] = {
        ...this.mockPlayers[userIndex],
        progress,
        wpm,
        accuracy,
        isFinished: progress >= 100,
      }
    }
  }

  disconnect() {
    this.connected = false
    this.onConnectionChange(false)
  }
}

export function EnhancedMultiplayerRace() {
  const [gameState, setGameState] = useState<"lobby" | "waiting" | "countdown" | "racing" | "finished">("lobby")
  const [raceState, setRaceState] = useState<RaceState | null>(null)
  const [userInput, setUserInput] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [userStats, setUserStats] = useState({ wpm: 0, accuracy: 100, progress: 0 })
  const [isConnected, setIsConnected] = useState(false)
  const [roomCode] = useState("RACE-" + Math.random().toString(36).substr(2, 4).toUpperCase())
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<number[]>([])
  const [joinRoomCode, setJoinRoomCode] = useState("")
  const [showPrivateDialog, setShowPrivateDialog] = useState(false)

  const wsRef = useRef<RaceWebSocket | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()

  const playerName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Anonymous"

  const handleWebSocketMessage = useCallback((message: RaceMessage) => {
    switch (message.type) {
      case "state":
        setRaceState((prev) => ({ ...prev, ...message.data }))
        if (message.data.status) {
          setGameState(message.data.status)
        }
        break
      case "start":
        setGameState("racing")
        setStartTime(Date.now())
        setTimeout(() => inputRef.current?.focus(), 100)
        break
      case "countdown":
        setRaceState((prev) => (prev ? { ...prev, countdown: message.data.countdown } : prev))
        break
      case "progress":
        setRaceState((prev) => {
          if (!prev) return prev
          const updatedPlayers = prev.players.map((player) => {
            const update = message.data.players.find((p: any) => p.id === player.id)
            return update ? { ...player, ...update } : player
          })
          return { ...prev, players: updatedPlayers }
        })
        break
      case "finish":
        setGameState("finished")
        break
    }
  }, [])

  const handleConnectionChange = useCallback((connected: boolean) => {
    setIsConnected(connected)
  }, [])

  const joinQuickRace = () => {
    const raceId = "race-" + Date.now()
    wsRef.current = new RaceWebSocket(raceId, handleWebSocketMessage, handleConnectionChange)
    wsRef.current.connect(playerName)
    setGameState("waiting")
  }

  const joinPrivateRoom = () => {
    if (!joinRoomCode.trim()) return

    const raceId = "private-" + joinRoomCode
    wsRef.current = new RaceWebSocket(raceId, handleWebSocketMessage, handleConnectionChange)
    wsRef.current.connect(playerName)
    setGameState("waiting")
    setJoinRoomCode("")
  }

  const handlePrivateRoomCreate = (settings: any) => {
    const raceId = "private-" + settings.roomCode
    wsRef.current = new RaceWebSocket(raceId, handleWebSocketMessage, handleConnectionChange)
    wsRef.current.connect(playerName)
    setGameState("waiting")
    setShowPrivateDialog(false)
  }

  const calculateUserStats = useCallback(() => {
    if (!raceState?.text || !startTime) return

    const text = raceState.text
    const timeElapsed = (Date.now() - startTime) / 1000 / 60 // minutes

    const correctChars = userInput.split("").filter((char, index) => char === text[index]).length
    const incorrectChars = userInput.length - correctChars
    const accuracy = userInput.length > 0 ? (correctChars / userInput.length) * 100 : 100
    const wpm = timeElapsed > 0 ? Math.round(correctChars / 5 / timeElapsed) : 0
    const progress = (userInput.length / text.length) * 100

    const newStats = {
      wpm: Math.max(0, wpm),
      accuracy: Math.round(accuracy),
      progress: Math.min(100, progress),
    }

    setUserStats(newStats)

    // Send progress to other players
    if (wsRef.current) {
      wsRef.current.sendProgress(newStats.progress, newStats.wpm, newStats.accuracy)
    }

    // Check if race is finished
    if (progress >= 100) {
      setGameState("finished")
    }
  }, [userInput, raceState?.text, startTime])

  useEffect(() => {
    if (gameState === "racing") {
      calculateUserStats()
    }
  }, [userInput, gameState, calculateUserStats])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== "racing") return

    const value = e.target.value
    const text = raceState?.text || ""

    // Prevent typing beyond text length
    if (value.length > text.length) return

    setUserInput(value)
    setCurrentIndex(value.length)

    // Track errors
    const newErrors: number[] = []
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) {
        newErrors.push(i)
      }
    }
    setErrors(newErrors)
  }

  const getCharClass = (index: number) => {
    if (!raceState?.text) return "char-untyped"

    if (index < userInput.length) {
      return userInput[index] === raceState.text[index] ? "char-correct" : "char-incorrect"
    } else if (index === currentIndex) {
      return "char-current"
    }
    return "char-untyped"
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

  const resetRace = () => {
    setGameState("lobby")
    setRaceState(null)
    setUserInput("")
    setCurrentIndex(0)
    setStartTime(null)
    setUserStats({ wpm: 0, accuracy: 100, progress: 0 })
    setErrors([])
    if (wsRef.current) {
      wsRef.current.disconnect()
      wsRef.current = null
    }
  }

  // Lobby State
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
                  <Input
                    placeholder="Enter room code"
                    value={joinRoomCode}
                    onChange={(e) => setJoinRoomCode(e.target.value)}
                    maxLength={6}
                  />
                  <Button variant="outline" onClick={joinPrivateRoom} disabled={!joinRoomCode.trim()}>
                    Join
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">or</div>
                <Button variant="outline" className="w-full" onClick={() => setShowPrivateDialog(true)}>
                  Create Private Room
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Races */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              Recent Races
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { winner: "SpeedTyper", wpm: 92, players: 6, time: "2 minutes ago" },
                { winner: "KeyboardNinja", wpm: 87, players: 4, time: "5 minutes ago" },
                { winner: "TypingMaster", wpm: 95, players: 8, time: "8 minutes ago" },
              ].map((race, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{race.winner.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{race.winner} won</div>
                      <div className="text-sm text-muted-foreground">
                        {race.wpm} WPM • {race.time}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{race.players} players</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Private Room Dialog */}
        <PrivateRoomDialog
          open={showPrivateDialog}
          onOpenChange={setShowPrivateDialog}
          onCreateRoom={handlePrivateRoomCreate}
        />
      </div>
    )
  }

  // Waiting/Countdown/Racing States
  if (gameState === "waiting" || gameState === "countdown" || gameState === "racing") {
    return (
      <div className="space-y-6">
        {/* Connection Status */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {isConnected ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={gameState === "racing" ? "default" : "secondary"}>
                    {gameState === "waiting" && "Waiting for players..."}
                    {gameState === "countdown" && `Starting in ${raceState?.countdown || 3}...`}
                    {gameState === "racing" && "Racing!"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{raceState?.players.length || 0} players</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Room:</span>
                <Button variant="outline" size="sm" onClick={copyRoomCode}>
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-1">{roomCode}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={resetRace}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Countdown Display */}
        {gameState === "countdown" && (
          <div className="flex items-center justify-center min-h-[200px]">
            <Card className="w-full max-w-md text-center">
              <CardContent className="p-12">
                <div className="text-8xl font-bold text-primary mb-4 animate-pulse">{raceState?.countdown || 3}</div>
                <div className="text-xl font-semibold mb-2">Get Ready!</div>
                <div className="text-muted-foreground">
                  Race starts in {raceState?.countdown || 3} second{(raceState?.countdown || 3) !== 1 ? "s" : ""}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Race Progress */}
        {(gameState === "racing" || gameState === "waiting") && (
          <Card>
            <CardHeader>
              <CardTitle>Race Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {raceState?.players
                  .sort((a, b) => b.progress - a.progress)
                  .map((player, index) => (
                    <div key={player.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8">{getPositionIcon(index + 1)}</div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {player.name}
                              {player.id === "user" && (
                                <Badge variant="outline" className="text-xs">
                                  You
                                </Badge>
                              )}
                              {!player.isConnected && (
                                <Badge variant="destructive" className="text-xs">
                                  Disconnected
                                </Badge>
                              )}
                            </div>
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
        )}

        {/* Race Text */}
        {gameState === "racing" && raceState?.text && (
          <Card>
            <CardHeader>
              <CardTitle>Race Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="typing-text text-lg leading-relaxed p-4 bg-muted rounded-lg mb-4">
                {raceState.text.split("").map((char, index) => (
                  <span key={index} className={getCharClass(index)}>
                    {char}
                  </span>
                ))}
              </div>
              <Input
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                className="text-lg p-4"
                autoFocus
              />
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // Finished State
  if (gameState === "finished") {
    const sortedPlayers = raceState?.players.sort((a, b) => b.progress - a.progress) || []
    const userPlayer = sortedPlayers.find((p) => p.id === "user")
    const userPosition = sortedPlayers.findIndex((p) => p.id === "user") + 1

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Race Complete!</h3>
            <p className="text-muted-foreground mb-6">
              {sortedPlayers[0]?.name} won with {Math.round(sortedPlayers[0]?.wpm || 0)} WPM
            </p>

            {userPlayer && (
              <div className="bg-muted p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Your Result</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">#{userPosition}</div>
                    <div className="text-sm text-muted-foreground">Position</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{Math.round(userPlayer.wpm)}</div>
                    <div className="text-sm text-muted-foreground">WPM</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{Math.round(userPlayer.accuracy)}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <Button onClick={joinQuickRace}>Race Again</Button>
              <Button variant="outline" onClick={resetRace}>
                Back to Lobby
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Final Results */}
        <Card>
          <CardHeader>
            <CardTitle>Final Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedPlayers.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">{getPositionIcon(index + 1)}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {player.name}
                        {player.id === "user" && (
                          <Badge variant="outline" className="text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(player.wpm)} WPM • {Math.round(player.accuracy)}% ACC
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{Math.round(player.progress)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
