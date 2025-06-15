"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Zap, Users, Trophy } from "lucide-react"

export function Hero() {
  const [currentWPM, setCurrentWPM] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTyping) {
        setCurrentWPM((prev) => Math.min(prev + Math.random() * 5, 85))
      } else {
        setCurrentWPM(0)
        setTimeout(() => setIsTyping(true), 1000)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isTyping])

  useEffect(() => {
    if (currentWPM >= 80) {
      setIsTyping(false)
    }
  }, [currentWPM])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
      <div className="container px-4 py-24 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                🚀 Now in Beta - Join 10,000+ Typists
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Master Your
                <span className="text-primary block">Typing Speed</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Improve your typing with precision practice tools, competitive multiplayer racing, and detailed
                analytics. Join the ultimate typing improvement platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/practice">
                  <Play className="mr-2 h-5 w-5" />
                  Start Practicing
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="/race">
                  <Trophy className="mr-2 h-5 w-5" />
                  Join Race
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Tests Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card border rounded-lg p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Live Demo</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>{Math.round(currentWPM)} WPM</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-green-500" />
                    <span>98% ACC</span>
                  </div>
                </div>
              </div>

              <div className="typing-text text-lg p-4 bg-muted rounded border-2 border-dashed min-h-[120px] flex items-center">
                <div className="space-y-2">
                  <div>
                    <span className="char-correct">The quick brown fox jumps over</span>
                    <span className="char-current"> </span>
                    <span className="char-untyped">
                      the lazy dog. This pangram contains every letter of the alphabet.
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Keep typing to see your speed improve in real-time!
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/practice">Try Full Version</Link>
                </Button>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg animate-bounce">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-full p-3 shadow-lg animate-pulse">
              <Zap className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
