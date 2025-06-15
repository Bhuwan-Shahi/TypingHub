export interface PrivateRoom {
  id: string
  code: string
  hostId: string
  hostName: string
  players: Player[]
  status: "waiting" | "countdown" | "racing" | "finished"
  text: string
  maxPlayers: number
  createdAt: number
  settings: RoomSettings
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
  isHost: boolean
}

export interface RoomSettings {
  textCategory: string
  difficulty: "easy" | "medium" | "hard"
  timeLimit?: number
  customText?: string
}

export class PrivateRoomManager {
  private static rooms = new Map<string, PrivateRoom>()

  static generateRoomCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase()
  }

  static createRoom(hostId: string, hostName: string, settings: RoomSettings): PrivateRoom {
    const code = this.generateRoomCode()
    const room: PrivateRoom = {
      id: `room-${Date.now()}`,
      code,
      hostId,
      hostName,
      players: [
        {
          id: hostId,
          name: hostName,
          progress: 0,
          wpm: 0,
          accuracy: 100,
          position: 1,
          isFinished: false,
          isConnected: true,
          isHost: true,
        },
      ],
      status: "waiting",
      text: this.getTextForSettings(settings),
      maxPlayers: 8,
      createdAt: Date.now(),
      settings,
    }

    this.rooms.set(code, room)
    return room
  }

  static joinRoom(code: string, playerId: string, playerName: string): PrivateRoom | null {
    const room = this.rooms.get(code.toUpperCase())
    if (!room) return null

    if (room.players.length >= room.maxPlayers) return null
    if (room.status !== "waiting") return null

    // Check if player already in room
    const existingPlayer = room.players.find((p) => p.id === playerId)
    if (existingPlayer) {
      existingPlayer.isConnected = true
      return room
    }

    // Add new player
    room.players.push({
      id: playerId,
      name: playerName,
      progress: 0,
      wpm: 0,
      accuracy: 100,
      position: room.players.length + 1,
      isFinished: false,
      isConnected: true,
      isHost: false,
    })

    return room
  }

  static getRoom(code: string): PrivateRoom | null {
    return this.rooms.get(code.toUpperCase()) || null
  }

  static leaveRoom(code: string, playerId: string): void {
    const room = this.rooms.get(code.toUpperCase())
    if (!room) return

    room.players = room.players.filter((p) => p.id !== playerId)

    // If host leaves, assign new host or delete room
    if (room.hostId === playerId) {
      if (room.players.length > 0) {
        const newHost = room.players[0]
        room.hostId = newHost.id
        room.hostName = newHost.name
        newHost.isHost = true
      } else {
        this.rooms.delete(code.toUpperCase())
      }
    }
  }

  static updatePlayerProgress(code: string, playerId: string, progress: number, wpm: number, accuracy: number): void {
    const room = this.rooms.get(code.toUpperCase())
    if (!room) return

    const player = room.players.find((p) => p.id === playerId)
    if (player) {
      player.progress = progress
      player.wpm = wpm
      player.accuracy = accuracy

      if (progress >= 100) {
        player.isFinished = true
      }
    }

    // Update positions
    const sortedPlayers = [...room.players].sort((a, b) => b.progress - a.progress)
    sortedPlayers.forEach((player, index) => {
      player.position = index + 1
    })
  }

  static startRace(code: string): void {
    const room = this.rooms.get(code.toUpperCase())
    if (room) {
      room.status = "countdown"
    }
  }

  private static getTextForSettings(settings: RoomSettings): string {
    if (settings.customText) return settings.customText

    // Sample texts based on category and difficulty
    const texts = {
      quotes: {
        easy: "The only way to do great work is to love what you do.",
        medium: "Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish.",
        hard: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
      },
      programming: {
        easy: "function hello() { return 'Hello World'; }",
        medium: "const fibonacci = (n) => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);",
        hard: "class BinarySearchTree { constructor() { this.root = null; } insert(value) { this.root = this.insertNode(this.root, value); } }",
      },
      literature: {
        easy: "It was the best of times, it was the worst of times.",
        medium:
          "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
        hard: "In the beginning was the Word, and the Word was with God, and the Word was God. All things were made through him, and without him was not any thing made that was made.",
      },
    }

    const categoryTexts = texts[settings.textCategory as keyof typeof texts] || texts.quotes
    return categoryTexts[settings.difficulty] || categoryTexts.medium
  }
}
