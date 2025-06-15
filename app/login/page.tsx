import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/header"
import Link from "next/link"
import { Keyboard } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <Keyboard className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">TypingHub</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue your typing journey</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
