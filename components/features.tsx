import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Trophy, BarChart3, Palette, Users, Target, Clock, Keyboard, Globe } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Practice",
    description:
      "Multiple test modes with real-time WPM and accuracy tracking. Sub-20ms input response for the smoothest typing experience.",
    badge: "Core Feature",
    color: "text-yellow-500",
  },
  {
    icon: Trophy,
    title: "Competitive Racing",
    description:
      "Join multiplayer races with up to 12 players. Skill-based matchmaking ensures fair and exciting competitions.",
    badge: "Multiplayer",
    color: "text-blue-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Detailed statistics with historical performance graphs, error analysis, and personalized improvement insights.",
    badge: "Analytics",
    color: "text-green-500",
  },
  {
    icon: Palette,
    title: "Deep Customization",
    description:
      "15+ themes, custom fonts, sound effects, and caret styles. Make TypingHub truly yours with extensive personalization.",
    badge: "Customization",
    color: "text-purple-500",
  },
  {
    icon: Users,
    title: "Vibrant Community",
    description:
      "Global leaderboards, achievement system, and social features. Connect with fellow typists and share your progress.",
    badge: "Social",
    color: "text-pink-500",
  },
  {
    icon: Target,
    title: "Precision Training",
    description:
      "Curated content with 10,000+ quotes, difficulty progression, and specialized modes for different typing scenarios.",
    badge: "Training",
    color: "text-orange-500",
  },
  {
    icon: Clock,
    title: "Flexible Modes",
    description:
      "Time-based (15s-120s) and word-based (10-100 words) tests. Custom durations and specialized content categories.",
    badge: "Modes",
    color: "text-indigo-500",
  },
  {
    icon: Keyboard,
    title: "Layout Support",
    description:
      "QWERTY, Dvorak, Colemak, and Workman keyboard layouts. Optimized for different typing preferences and languages.",
    badge: "Accessibility",
    color: "text-teal-500",
  },
  {
    icon: Globe,
    title: "Global Performance",
    description:
      "Sub-100ms multiplayer with latency worldwide. 99.9% uptime with global CDN for the fastest possible experience.",
    badge: "Performance",
    color: "text-red-500",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            ✨ Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Excel</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From precision practice tools to competitive multiplayer racing, TypingHub provides comprehensive features
            for typists of all skill levels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-muted ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
