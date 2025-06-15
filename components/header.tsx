"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Keyboard, Menu, X, Zap, Trophy, BarChart3, User, Settings, LogOut, Home, Crown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut, loading, isConfigured } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Keyboard className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">TypingHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/practice"
            className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
          >
            <Zap className="h-4 w-4" />
            <span>Practice</span>
          </Link>
          <Link
            href="/race"
            className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
          >
            <Trophy className="h-4 w-4" />
            <span>Race</span>
          </Link>
          <Link
            href="/leaderboards"
            className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
          >
            <Crown className="h-4 w-4" />
            <span>Leaderboards</span>
          </Link>
          <Link
            href="/stats"
            className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Stats</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : user && isConfigured ? (
            <div className="hidden md:flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary/20 focus:border-primary focus:outline-none transition-colors">
                  <Avatar className="h-full w-full">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" sideOffset={5}>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="flex items-center w-full">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            <Link
              href="/practice"
              className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Zap className="h-4 w-4" />
              <span>Practice</span>
            </Link>
            <Link
              href="/race"
              className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Trophy className="h-4 w-4" />
              <span>Race</span>
            </Link>
            <Link
              href="/leaderboards"
              className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Crown className="h-4 w-4" />
              <span>Leaderboards</span>
            </Link>
            <Link
              href="/stats"
              className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Stats</span>
            </Link>

            {user && isConfigured ? (
              <div className="space-y-4 pt-4 border-t">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="justify-start p-0 h-auto">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2 pt-4 border-t">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
