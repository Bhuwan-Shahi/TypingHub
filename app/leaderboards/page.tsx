import { Leaderboards } from "@/components/leaderboards"
import { Header } from "@/components/header"

export default function LeaderboardsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Leaderboards />
        </div>
      </main>
    </div>
  )
}
