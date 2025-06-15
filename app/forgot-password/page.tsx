import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { Header } from "@/components/header"
import Link from "next/link"
import { Keyboard } from "lucide-react"

export default function ForgotPasswordPage() {
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
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground">Enter your email to receive a password reset link</p>
          </div>
          <ForgotPasswordForm />
        </div>
      </main>
    </div>
  )
}
