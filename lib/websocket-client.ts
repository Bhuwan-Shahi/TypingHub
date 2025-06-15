export interface RaceState {
  id: string
  status: "waiting" | "countdown" | "racing" | "finished"
  players: Player[]
  text: string
  countdown: number
  startTime?: number
  maxPlayers: number
}

export interface Player {
  id: string
  name: string
  progress: number
  wpm: number
  accuracy: number
  position: number
  isFinished: boolean
  isConnected: boolean
}

export interface RaceMessage {
  type: "join" | "leave" | "progress" | "start" | "finish" | "state"
  data: any
}

export class RaceWebSocket {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  constructor(
    private raceId: string,
    private onMessage: (message: RaceMessage) => void,
    private onStateChange: (connected: boolean) => void,
  ) {}

  connect(playerName: string) {
    try {
      // In a real implementation, this would connect to your WebSocket server
      // For demo purposes, we'll simulate WebSocket behavior
      this.simulateWebSocket(playerName)
    } catch (error) {
      console.error("WebSocket connection failed:", error)
      this.handleReconnect()
    }
  }

  private simulateWebSocket(playerName: string) {
    // Simulate WebSocket connection for demo
    this.onStateChange(true)

    // Simulate joining a race
    setTimeout(() => {
      this.onMessage({
        type: "state",
        data: {
          id: this.raceId,
          status: "waiting",
          players: [
            {
              id: "user",
              name: playerName,
              progress: 0,
              wpm: 0,
              accuracy: 100,
              position: 1,
              isFinished: false,
              isConnected: true,
            },
            {
              id: "bot1",
              name: "SpeedTyper",
              progress: 0,
              wpm: 0,
              accuracy: 100,
              position: 2,
              isFinished: false,
              isConnected: true,
            },
            {
              id: "bot2",
              name: "KeyboardNinja",
              progress: 0,
              wpm: 0,
              accuracy: 100,
              position: 3,
              isFinished: false,
              isConnected: true,
            },
          ],
          text: "The art of programming is the skill of controlling complexity. We will either find a way or make one. The best way to predict the future is to invent it. Code is like humor. When you have to explain it, it's bad.",
          countdown: 0,
          maxPlayers: 6,
        },
      })
    }, 500)

    // Start countdown after 2 seconds
    setTimeout(() => {
      this.startCountdown()
    }, 2000)
  }

  private startCountdown() {
    let countdown = 3
    const countdownInterval = setInterval(() => {
      this.onMessage({
        type: "state",
        data: {
          status: "countdown",
          countdown,
        },
      })

      countdown--
      if (countdown < 0) {
        clearInterval(countdownInterval)
        this.startRace()
      }
    }, 1000)
  }

  private startRace() {
    this.onMessage({
      type: "start",
      data: {
        status: "racing",
        startTime: Date.now(),
      },
    })

    // Simulate bot progress
    this.simulateBotProgress()
  }

  private simulateBotProgress() {
    const interval = setInterval(() => {
      const bot1Progress = Math.min(100, Math.random() * 2 + 0.5)
      const bot2Progress = Math.min(100, Math.random() * 1.8 + 0.3)

      this.onMessage({
        type: "progress",
        data: {
          players: [
            {
              id: "bot1",
              progress: bot1Progress,
              wpm: Math.floor(Math.random() * 20 + 70),
              accuracy: Math.floor(Math.random() * 10 + 90),
            },
            {
              id: "bot2",
              progress: bot2Progress,
              wpm: Math.floor(Math.random() * 15 + 65),
              accuracy: Math.floor(Math.random() * 8 + 92),
            },
          ],
        },
      })

      if (bot1Progress >= 100 || bot2Progress >= 100) {
        clearInterval(interval)
      }
    }, 1000)
  }

  sendProgress(progress: number, wpm: number, accuracy: number) {
    // In real implementation, send to WebSocket server
    console.log("Sending progress:", { progress, wpm, accuracy })
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.onStateChange(false)
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`)
        // this.connect() - would need player name
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }
}
