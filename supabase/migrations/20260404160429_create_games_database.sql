/*
  # Game Akinator Database Schema

  ## Overview
  This migration creates the complete database structure for a game guessing system
  that uses characteristics to identify any game through intelligent questioning.

  ## Tables Created
  
  ### 1. games
  Stores comprehensive information about each game including:
  - Basic info (name, year, developer)
  - Genre and category data
  - Gameplay characteristics
  - Visual style attributes
  - Platform information
  - Popularity metrics
  
  ### 2. game_sessions
  Tracks user game sessions for analytics:
  - Questions asked
  - Final guess
  - Success rate
  - Time taken

  ## Security
  - RLS enabled on all tables
  - Public read access for games (needed for the guessing game)
  - Session tracking with anonymous access

*/

-- Games table with comprehensive attributes
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  year integer,
  developer text,
  
  -- Genre & Category
  primary_genre text NOT NULL,
  secondary_genre text,
  
  -- Gameplay Characteristics
  is_multiplayer boolean DEFAULT false,
  is_singleplayer boolean DEFAULT true,
  is_competitive boolean DEFAULT false,
  is_open_world boolean DEFAULT false,
  has_strong_story boolean DEFAULT false,
  has_character_customization boolean DEFAULT false,
  has_crafting boolean DEFAULT false,
  has_building boolean DEFAULT false,
  has_survival_elements boolean DEFAULT false,
  has_rpg_elements boolean DEFAULT false,
  has_permadeath boolean DEFAULT false,
  
  -- Perspective & Style
  perspective text,
  art_style text,
  
  -- Setting & Theme
  setting text,
  has_magic boolean DEFAULT false,
  has_guns boolean DEFAULT false,
  has_swords boolean DEFAULT false,
  has_vehicles boolean DEFAULT false,
  
  -- Platform & Accessibility
  platform_type text,
  is_indie boolean DEFAULT false,
  is_retro boolean DEFAULT false,
  
  -- Popularity
  popularity_score integer DEFAULT 50,
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Game sessions for analytics
CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guessed_game_id uuid REFERENCES games(id),
  questions_asked integer DEFAULT 0,
  success boolean DEFAULT false,
  duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Games are publicly readable (needed for the game to work)
CREATE POLICY "Games are viewable by everyone"
  ON games FOR SELECT
  TO anon
  USING (true);

-- Sessions can be created by anyone
CREATE POLICY "Anyone can create sessions"
  ON game_sessions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_games_primary_genre ON games(primary_genre);
CREATE INDEX IF NOT EXISTS idx_games_popularity ON games(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_games_year ON games(year);
CREATE INDEX IF NOT EXISTS idx_sessions_created ON game_sessions(created_at DESC);