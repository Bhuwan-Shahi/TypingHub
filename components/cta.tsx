import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Trophy, Zap, ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container px-4 mx-auto">
        <Card className="relative overflow-hidden border-2 border-primary/20">
          <CardContent className="p-12 text-center">
            <Badge variant="secondary" className="mb-6">
              🎯 Ready to Start?
            </Badge>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">Begin Your Typing Journey</h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users improving their typing speed every day. Start with our free practice mode or jump
              into competitive racing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/practice">
                  <Play className="mr-2 h-5 w-5" />
                  Start Free Practice
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link href="/race">
                  <Trophy className="mr-2 h-5 w-5" />
                  Join Multiplayer Race
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Instant Start</h3>
                <p className="text-sm text-muted-foreground text-center">
                  No downloads required. Start typing immediately in your browser.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-green-500/10 rounded-full">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Free Forever</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Core features are completely free. Premium options available.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <Play className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">All Skill Levels</h3>
                <p className="text-sm text-muted-foreground text-center">
                  From beginners to experts, everyone can improve their typing.
                </p>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-secondary rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent rounded-full animate-ping"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
