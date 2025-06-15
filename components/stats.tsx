"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { label: "Active Users", value: 50000, suffix: "+", color: "text-blue-600" },
  { label: "Tests Completed", value: 1000000, suffix: "+", color: "text-green-600" },
  { label: "Races Finished", value: 250000, suffix: "+", color: "text-purple-600" },
  { label: "Average Improvement", value: 25, suffix: "%", color: "text-orange-600" },
  { label: "Countries Served", value: 150, suffix: "+", color: "text-pink-600" },
  { label: "Uptime", value: 99.9, suffix: "%", color: "text-teal-600" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K"
    }
    return num.toString()
  }

  return (
    <span>
      {value >= 1000 ? formatNumber(displayValue) : displayValue}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            📊 Platform Statistics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Typists Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who have already improved their typing speed and accuracy with TypingHub.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Global community</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Growing daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
