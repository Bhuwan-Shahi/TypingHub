-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  location TEXT,
  bio TEXT,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create typing_tests table
CREATE TABLE IF NOT EXISTS typing_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  wpm INTEGER NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  duration INTEGER NOT NULL,
  errors INTEGER NOT NULL,
  correct_chars INTEGER NOT NULL,
  total_chars INTEGER NOT NULL,
  test_mode TEXT NOT NULL,
  text_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create races table
CREATE TABLE IF NOT EXISTS races (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  race_id TEXT NOT NULL,
  wpm INTEGER NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  position INTEGER NOT NULL,
  total_players INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE typing_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE races ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for typing_tests
CREATE POLICY "Users can view their own typing tests" ON typing_tests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own typing tests" ON typing_tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for races
CREATE POLICY "Users can view their own races" ON races
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own races" ON races
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for achievements
CREATE POLICY "Users can view their own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_typing_tests_user_id ON typing_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_typing_tests_created_at ON typing_tests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_races_user_id ON races(user_id);
CREATE INDEX IF NOT EXISTS idx_races_created_at ON races(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on profiles
DROP TRIGGER IF EXISTS on_profiles_updated ON profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
