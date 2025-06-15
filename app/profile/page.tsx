import { UserProfile } from "@/components/profile/user-profile"
import { Header } from "@/components/header"

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">User Profile</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
          <UserProfile />
        </div>
      </main>
    </div>
  )
}
