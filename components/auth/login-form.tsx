"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn, isConfigured } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConfigured) {
      setError("Please add your Supabase environment variables to .env.local")
      return
    }

    setLoading(true)
    setError("")

    try {
      const { error } = await signIn(email, password)

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError(
            "Invalid email or password. If you just signed up, please check your email and verify your account first.",
          )
        } else if (error.message.includes("Email not confirmed")) {
          setError("Please check your email and click the verification link before signing in.")
        } else if (error.message.includes("Too many requests")) {
          setError("Too many login attempts. Please wait a moment and try again.")
        } else {
          setError(error.message)
        }
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isConfigured && (
            <Alert>
              <AlertDescription>
                <strong>Setup Required:</strong> Please add your Supabase environment variables to continue.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading || !isConfigured}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-sm text-center space-y-2">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </Link>
            <div>
              {"Don't have an account? "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
