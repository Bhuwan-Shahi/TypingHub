export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          location: string | null
          bio: string | null
          level: number
          xp: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          location?: string | null
          bio?: string | null
          level?: number
          xp?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          location?: string | null
          bio?: string | null
          level?: number
          xp?: number
          created_at?: string
          updated_at?: string
        }
      }
      typing_tests: {
        Row: {
          id: string
          user_id: string
          wpm: number
          accuracy: number
          duration: number
          errors: number
          correct_chars: number
          total_chars: number
          test_mode: string
          text_content: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          wpm: number
          accuracy: number
          duration: number
          errors: number
          correct_chars: number
          total_chars: number
          test_mode: string
          text_content?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          wpm?: number
          accuracy?: number
          duration?: number
          errors?: number
          correct_chars?: number
          total_chars?: number
          test_mode?: string
          text_content?: string | null
          created_at?: string
        }
      }
      races: {
        Row: {
          id: string
          user_id: string
          race_id: string
          wpm: number
          accuracy: number
          position: number
          total_players: number
          duration: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          race_id: string
          wpm: number
          accuracy: number
          position: number
          total_players: number
          duration: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          race_id?: string
          wpm?: number
          accuracy?: number
          position?: number
          total_players?: number
          duration?: number
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          achievement_name: string
          description: string
          icon: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          achievement_name: string
          description: string
          icon: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          achievement_name?: string
          description?: string
          icon?: string
          unlocked_at?: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type TypingTest = Database["public"]["Tables"]["typing_tests"]["Row"]
export type Race = Database["public"]["Tables"]["races"]["Row"]
export type Achievement = Database["public"]["Tables"]["achievements"]["Row"]
