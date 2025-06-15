import { EnhancedMultiplayerRace } from "@/components/enhanced-multiplayer-race"
import { Header } from "@/components/header"

export default function RacePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Multiplayer Racing</h1>
            <p className="text-muted-foreground">Compete against other typists in real-time races</p>
          </div>
          <EnhancedMultiplayerRace />
        </div>
      </main>
    </div>
  )
}
