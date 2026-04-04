import { createClient } from '@supabase/supabase-js';
import type { Game } from '../types/game';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getAllGames(): Promise<Game[]> {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('popularity_score', { ascending: false });

  if (error) {
    console.error('Error fetching games:', error);
    return [];
  }

  return data || [];
}

export async function saveGameSession(
  guessedGameId: string | null,
  questionsAsked: number,
  success: boolean,
  durationSeconds: number
) {
  const { error } = await supabase.from('game_sessions').insert({
    guessed_game_id: guessedGameId,
    questions_asked: questionsAsked,
    success,
    duration_seconds: durationSeconds,
  });

  if (error) {
    console.error('Error saving session:', error);
  }
}
