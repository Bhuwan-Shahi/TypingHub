import Link from "next/link"
import { Keyboard, Github, Twitter, DiscIcon as Discord } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Keyboard className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">TypingHub</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              The ultimate typing improvement platform with competitive multiplayer racing and comprehensive practice
              tools.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Discord className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Practice</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/practice" className="text-muted-foreground hover:text-primary transition-colors">
                  Typing Tests
                </Link>
              </li>
              <li>
                <Link href="/practice/quotes" className="text-muted-foreground hover:text-primary transition-colors">
                  Quote Mode
                </Link>
              </li>
              <li>
                <Link href="/practice/words" className="text-muted-foreground hover:text-primary transition-colors">
                  Word Mode
                </Link>
              </li>
              <li>
                <Link href="/practice/custom" className="text-muted-foreground hover:text-primary transition-colors">
                  Custom Text
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Compete</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/race" className="text-muted-foreground hover:text-primary transition-colors">
                  Quick Race
                </Link>
              </li>
              <li>
                <Link href="/race/private" className="text-muted-foreground hover:text-primary transition-colors">
                  Private Rooms
                </Link>
              </li>
              <li>
                <Link href="/tournaments" className="text-muted-foreground hover:text-primary transition-colors">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-muted-foreground hover:text-primary transition-colors">
                  Statistics
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-muted-foreground hover:text-primary transition-colors">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-muted-foreground hover:text-primary transition-colors">
                  Premium
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 TypingHub. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
