export interface Game {
  id: string;
  name: string;
  year: number | null;
  developer: string | null;
  primary_genre: string;
  secondary_genre: string | null;
  is_multiplayer: boolean;
  is_singleplayer: boolean;
  is_competitive: boolean;
  is_open_world: boolean;
  has_strong_story: boolean;
  has_character_customization: boolean;
  has_crafting: boolean;
  has_building: boolean;
  has_survival_elements: boolean;
  has_rpg_elements: boolean;
  has_permadeath: boolean;
  perspective: string | null;
  art_style: string | null;
  setting: string | null;
  has_magic: boolean;
  has_guns: boolean;
  has_swords: boolean;
  has_vehicles: boolean;
  platform_type: string | null;
  is_indie: boolean;
  is_retro: boolean;
  popularity_score: number;
}

export interface Question {
  id: string;
  text: string;
  attribute: keyof Game;
  value: boolean | string | number;
  type: 'boolean' | 'string' | 'number';
}

export interface GameState {
  possibleGames: Game[];
  askedQuestions: Question[];
  currentQuestion: Question | null;
  guessedGame: Game | null;
  questionCount: number;
}
