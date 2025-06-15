"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { UserPlus, Settings, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface PrivateRoomDialogProps {
  onCreateRoom: (settings: RoomSettings) => void
  onJoinRoom: (code: string) => void
}

interface RoomSettings {
  textCategory: string
  difficulty: "easy" | "medium" | "hard"
  timeLimit?: number
  customText?: string
}

export function PrivateRoomDialog({ onCreateRoom, onJoinRoom }: PrivateRoomDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<"join" | "create">("join")
  const [joinCode, setJoinCode] = useState("")
  const [settings, setSettings] = useState<RoomSettings>({
    textCategory: "quotes",
    difficulty: "medium",
  })
  const [useCustomText, setUseCustomText] = useState(false)
  const { user } = useAuth()

  const handleJoinRoom = () => {
    if (joinCode.trim()) {
      onJoinRoom(joinCode.trim().toUpperCase())
      setIsOpen(false)
      setJoinCode("")
    }
  }

  const handleCreateRoom = () => {
    onCreateRoom(settings)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <UserPlus className="h-4 w-4 mr-2" />
          Private Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Private Room
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="flex gap-2">
            <Button
              variant={mode === "join" ? "default" : "outline"}
              onClick={() => setMode("join")}
              className="flex-1"
            >
              Join Room
            </Button>
            <Button
              variant={mode === "create" ? "default" : "outline"}
              onClick={() => setMode("create")}
              className="flex-1"
            >
              Create Room
            </Button>
          </div>

          {/* Join Room */}
          {mode === "join" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="room-code">Room Code</Label>
                <Input
                  id="room-code"
                  placeholder="Enter 6-digit room code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="text-center text-lg font-mono tracking-wider"
                />
              </div>
              <Button onClick={handleJoinRoom} className="w-full" disabled={joinCode.length !== 6}>
                <Users className="h-4 w-4 mr-2" />
                Join Room
              </Button>
            </div>
          )}

          {/* Create Room */}
          {mode === "create" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text Category</Label>
                <Select
                  value={settings.textCategory}
                  onValueChange={(value) => setSettings({ ...settings, textCategory: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quotes">Inspirational Quotes</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select
                  value={settings.difficulty}
                  onValueChange={(value: "easy" | "medium" | "hard") => setSettings({ ...settings, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy (Short & Simple)</SelectItem>
                    <SelectItem value="medium">Medium (Moderate Length)</SelectItem>
                    <SelectItem value="hard">Hard (Long & Complex)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="custom-text" checked={useCustomText} onCheckedChange={setUseCustomText} />
                <Label htmlFor="custom-text">Use Custom Text</Label>
              </div>

              {useCustomText && (
                <div className="space-y-2">
                  <Label htmlFor="custom-text-input">Custom Text</Label>
                  <Textarea
                    id="custom-text-input"
                    placeholder="Enter your custom text for the race..."
                    value={settings.customText || ""}
                    onChange={(e) => setSettings({ ...settings, customText: e.target.value })}
                    rows={4}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="time-limit">Time Limit (optional)</Label>
                <Select
                  value={settings.timeLimit?.toString() || "none"}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      timeLimit: value === "none" ? undefined : Number.parseInt(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Time Limit</SelectItem>
                    <SelectItem value="60">1 Minute</SelectItem>
                    <SelectItem value="120">2 Minutes</SelectItem>
                    <SelectItem value="300">5 Minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleCreateRoom} className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Create Private Room
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
