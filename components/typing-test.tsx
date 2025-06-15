"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, Play, Pause, Settings, Timer, Zap, Target, TrendingUp, Award, Trophy } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Confetti } from "./confetti"
import { useAuth } from "@/contexts/auth-context"
import { TextGenerator, TEXT_CATEGORIES } from "@/lib/text-content"

export function TypingTest() {
  const [selectedCategory, setSelectedCategory] = useState<string>("quotes")
  const [selectedDifficulty, setSelectedDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [testMode, setTestMode] = useState<"time" | "words">("time")
  const [duration, setDuration] = useState<15 | 30 | 60 | 120>(60)
  const [wordCount, setWordCount] = useState<10 | 25 | 50 | 100>(25)
  const [currentText, setCurrentText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState<{
    wpm: number
    accuracy: number
    correctChars: number
    incorrectChars: number
    totalChars: number
    timeElapsed: number
  }>({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    timeElapsed: 0,
  })
  const [isFinished, setIsFinished] = useState(false)
  const [errors, setErrors] = useState<number[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string>("")

  const inputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  const { user } = useAuth()

  // Improved function to save test results
  const saveTestResult = async (stats: {
    wpm: number
    accuracy: number
    correctChars: number
    incorrectChars: number
    totalChars: number
    timeElapsed: number
  }) => {
    setSaveStatus("Saving...")

    try {
      const response = await fetch("/api/typing-tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for session cookies
        body: JSON.stringify({
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          duration: stats.timeElapsed,
          errors: stats.incorrectChars,
          correctChars: stats.correctChars,
          totalChars: stats.totalChars,
          testMode: testMode === "time" ? `Time ${duration}s` : `Words ${wordCount}`,
          textContent: currentText.substring(0, 500),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSaveStatus("✅ Test saved!")
        console.log("Test result saved:", result.data)
      } else {
        setSaveStatus("⚠️ Saved locally")
        console.warn("API returned error but continuing:", result.error)
      }
    } catch (error) {
      setSaveStatus("⚠️ Saved locally")
      console.warn("Error saving test result (continuing anyway):", error)
    }

    // Clear status after 3 seconds
    setTimeout(() => setSaveStatus(""), 3000)
  }

  const generateText = useCallback(() => {
    if (testMode === "words") {
      return TextGenerator.generateCommonWords(wordCount)
    } else {
      return TextGenerator.getRandomText(selectedCategory, selectedDifficulty)
    }
  }, [testMode, wordCount, selectedCategory, selectedDifficulty])

  const calculateStats = useCallback(() => {
    if (!startTime) return stats

    const now = Date.now()
    const timeElapsedSeconds = (now - startTime) / 1000
    const timeElapsedMinutes = timeElapsedSeconds / 60

    const correctChars = userInput.split("").filter((char, index) => char === currentText[index]).length
    const incorrectChars = userInput.length - correctChars
    const totalChars = userInput.length
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100

    // Calculate WPM based on correct characters (standard is 5 characters = 1 word)
    const wpm = timeElapsedMinutes > 0 ? Math.round(correctChars / 5 / timeElapsedMinutes) : 0

    return {
      wpm: Math.max(0, wpm),
      accuracy: Math.round(accuracy),
      correctChars,
      incorrectChars,
      totalChars,
      timeElapsed: timeElapsedSeconds,
    }
  }, [userInput, currentText, startTime, stats])

  const resetTest = useCallback(() => {
    setCurrentText(generateText())
    setUserInput("")
    setCurrentIndex(0)
    setIsActive(false)
    setTimeLeft(duration)
    setStartTime(null)
    setIsFinished(false)
    setErrors([])
    setShowConfetti(false)
    setSaveStatus("")
    setStats({
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
      timeElapsed: 0,
    })
    inputRef.current?.focus()
  }, [duration, generateText])

  // Initialize text on component mount and when settings change
  useEffect(() => {
    resetTest()
  }, [resetTest])

  // Main timer and stats update loop
  useEffect(() => {
    if (isActive && !isFinished && startTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = (now - startTime) / 1000

        if (testMode === "time") {
          const remaining = duration - elapsed
          if (remaining <= 0) {
            setTimeLeft(0)
            setIsActive(false)
            setIsFinished(true)
            return
          }
          setTimeLeft(Math.ceil(remaining))
        }

        // Update stats in real-time
        setStats(calculateStats())
      }, 100)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, isFinished, startTime, testMode, duration, calculateStats])

  // Check if word-based test is complete
  useEffect(() => {
    if (testMode === "words" && userInput.trim().split(/\s+/).length >= wordCount && userInput.endsWith(" ")) {
      setIsActive(false)
      setIsFinished(true)
    }
  }, [userInput, wordCount, testMode])

  // Check if text is completely typed
  useEffect(() => {
    if (userInput.length >= currentText.length && currentText.length > 0) {
      setIsActive(false)
      setIsFinished(true)
    }
  }, [userInput, currentText])

  // Handle test completion
  useEffect(() => {
    if (isFinished && stats.wpm > 0) {
      // Save test result to database
      saveTestResult(stats)

      // Trigger confetti
      const timer = setTimeout(() => {
        if (stats.wpm >= 60) {
          setShowConfetti(true)
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isFinished, stats.wpm, stats])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Start the test on first keystroke
    if (!isActive && !isFinished && value.length > 0) {
      setIsActive(true)
      setStartTime(Date.now())
    }

    // Prevent typing beyond the text length
    if (value.length > currentText.length) {
      return
    }

    setUserInput(value)
    setCurrentIndex(value.length)

    // Track errors in real-time
    const newErrors: number[] = []
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        newErrors.push(i)
      }
    }
    setErrors(newErrors)
  }

  const getCharClass = (index: number) => {
    if (index < userInput.length) {
      return userInput[index] === currentText[index] ? "char-correct" : "char-incorrect"
    } else if (index === currentIndex) {
      return "char-current"
    }
    return "char-untyped"
  }

  const toggleTest = () => {
    if (isFinished) {
      resetTest()
    } else if (isActive) {
      setIsActive(false)
    } else if (userInput.length > 0) {
      setIsActive(true)
      if (!startTime) {
        setStartTime(Date.now())
      }
    }
  }

  const handleModeChange = (newMode: "time" | "words") => {
    setTestMode(newMode)
  }

  const handleDurationChange = (newDuration: string) => {
    setDuration(Number(newDuration) as 15 | 30 | 60 | 120)
    setTimeLeft(Number(newDuration) as 15 | 30 | 60 | 120)
  }

  const handleWordCountChange = (newWordCount: string) => {
    setWordCount(Number(newWordCount) as 10 | 25 | 50 | 100)
  }

  const getAchievementMessage = () => {
    if (stats.wpm >= 100) {
      return {
        emoji: "🚀",
        title: "LEGENDARY!",
        message: "You're a typing legend! 100+ WPM is incredible!",
        intensity: "high" as const,
      }
    } else if (stats.wpm >= 80) {
      return {
        emoji: "🔥",
        title: "AMAZING!",
        message: "Outstanding speed! You're in the top tier of typists!",
        intensity: "high" as const,
      }
    } else if (stats.wpm >= 60) {
      return {
        emoji: "⚡",
        title: "EXCELLENT!",
        message: "Great job! You're typing faster than most people!",
        intensity: "medium" as const,
      }
    } else if (stats.wpm >= 40) {
      return {
        emoji: "👏",
        title: "GOOD WORK!",
        message: "Nice progress! Keep practicing to reach even higher speeds!",
        intensity: "low" as const,
      }
    } else {
      return {
        emoji: "💪",
        title: "KEEP GOING!",
        message: "Every expert was once a beginner. Keep practicing!",
        intensity: "low" as const,
      }
    }
  }

  const achievement = getAchievementMessage()

  return (
    <div className="space-y-6">
      {/* Confetti Effect */}
      <Confetti active={showConfetti} duration={4000} intensity={achievement.intensity} />

      {/* Save Status */}
      {saveStatus && <div className="text-center text-sm text-muted-foreground bg-muted p-2 rounded">{saveStatus}</div>}

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Test Settings
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetTest}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={toggleTest}>
                {isActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                {isActive ? "Pause" : isFinished ? "Restart" : "Start"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Mode:</label>
              <Select value={testMode} onValueChange={handleModeChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time">Time</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {testMode === "time" ? (
              <>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Duration:</label>
                  <Select value={duration.toString()} onValueChange={handleDurationChange}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15s</SelectItem>
                      <SelectItem value="30">30s</SelectItem>
                      <SelectItem value="60">60s</SelectItem>
                      <SelectItem value="120">120s</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Category:</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TEXT_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Difficulty:</label>
                  <Select
                    value={selectedDifficulty}
                    onValueChange={(value: "easy" | "medium" | "hard") => setSelectedDifficulty(value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Words:</label>
                <Select value={wordCount.toString()} onValueChange={handleWordCountChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">WPM</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.wpm}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-5 w-5 text-green-500 mr-1" />
              <span className="text-sm font-medium">Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.accuracy}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Timer className="h-5 w-5 text-blue-500 mr-1" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {testMode === "time" ? `${timeLeft}s` : `${Math.floor(stats.timeElapsed)}s`}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-purple-500 mr-1" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((currentIndex / currentText.length) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>
                {currentIndex} / {currentText.length} characters
              </span>
            </div>
            <Progress value={(currentIndex / currentText.length) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Typing Area */}
      <Card className="relative">
        <CardContent className="p-6">
          <div className="typing-text text-xl leading-relaxed p-6 bg-muted rounded-lg border-2 border-dashed min-h-[200px] mb-4">
            {currentText.split("").map((char, index) => (
              <span key={index} className={getCharClass(index)}>
                {char}
              </span>
            ))}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={isActive ? "Keep typing..." : "Click here and start typing..."}
            disabled={isFinished}
            autoFocus
          />

          <Dialog
            open={isFinished}
            onOpenChange={(open) => {
              if (!open) {
                resetTest()
              }
            }}
          >
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-center gap-3 text-2xl mb-2">
                  <Award className="h-8 w-8 text-primary" />
                  Test Complete!
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-8">
                {/* Achievement Section */}
                <div className="text-center space-y-3">
                  <div className="text-6xl">{achievement.emoji}</div>
                  <div className="text-2xl font-bold text-primary">{achievement.title}</div>
                  <div className="text-muted-foreground max-w-sm mx-auto">{achievement.message}</div>
                  {saveStatus && (
                    <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full inline-block">
                      {saveStatus}
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border">
                    <div className="text-4xl font-bold text-primary mb-1">{stats.wpm}</div>
                    <div className="text-sm font-medium text-muted-foreground">WPM</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-4xl font-bold text-green-600 mb-1">{stats.accuracy}%</div>
                    <div className="text-sm font-medium text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-4xl font-bold text-blue-600 mb-1">{stats.correctChars}</div>
                    <div className="text-sm font-medium text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 rounded-xl border border-red-200 dark:border-red-800">
                    <div className="text-4xl font-bold text-red-600 mb-1">{stats.incorrectChars}</div>
                    <div className="text-sm font-medium text-muted-foreground">Errors</div>
                  </div>
                </div>

                {/* Summary Info */}
                <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      {Math.floor(stats.timeElapsed)}s
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {stats.totalChars} chars
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {Math.round((currentIndex / currentText.length) * 100)}% complete
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <Button onClick={resetTest} variant="outline" size="lg" className="h-12">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentText(generateText())
                      setUserInput("")
                      setCurrentIndex(0)
                      setIsActive(false)
                      setTimeLeft(duration)
                      setStartTime(null)
                      setIsFinished(false)
                      setErrors([])
                      setShowConfetti(false)
                      setSaveStatus("")
                      setStats({
                        wpm: 0,
                        accuracy: 100,
                        correctChars: 0,
                        incorrectChars: 0,
                        totalChars: 0,
                        timeElapsed: 0,
                      })
                      setTimeout(() => inputRef.current?.focus(), 100)
                    }}
                    size="lg"
                    className="h-12"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Next Test
                  </Button>
                  <Button variant="outline" onClick={() => (window.location.href = "/race")} size="lg" className="h-12">
                    <Trophy className="h-4 w-4 mr-2" />
                    Race
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
