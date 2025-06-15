import { UserStats } from "@/components/user-stats"
import { Header } from "@/components/header"

export default function StatsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Statistics</h1>
            <p className="text-muted-foreground">Track your typing progress and performance over time</p>
          </div>
          <UserStats />
        </div>
      </main>
    </div>
  )
}
