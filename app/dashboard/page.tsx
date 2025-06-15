import { Dashboard } from "@/components/dashboard/dashboard"
import { Header } from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Dashboard />
      </main>
    </div>
  )
}
