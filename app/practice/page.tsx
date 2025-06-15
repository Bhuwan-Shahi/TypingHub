import { TypingTest } from "@/components/typing-test"
import { Header } from "@/components/header"

export default function PracticePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Typing Practice</h1>
            <p className="text-muted-foreground">
              Improve your typing speed and accuracy with our advanced practice tools
            </p>
          </div>
          <TypingTest />
        </div>
      </main>
    </div>
  )
}
