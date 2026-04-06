export interface Game {
  id: string;
  name: string;
  year?: number;
  developer?: string;
  publisher?: string;
  primary_genre?: string;
  secondary_genre?: string;
  platform_pc?: boolean;
  platform_console?: boolean;
  platform_mobile?: boolean;
  is_multiplayer?: boolean;
  is_singleplayer?: boolean;
  is_open_world?: boolean;
  has_rpg_elements?: boolean;
  has_building_mechanics?: boolean;
  is_battle_royale?: boolean;
  is_moba?: boolean;
  is_fps?: boolean;
  is_tps?: boolean;
  is_fantasy?: boolean;
  is_sci_fi?: boolean;
  is_horror?: boolean;
  is_puzzle?: boolean;
  is_simulation?: boolean;
  is_sports?: boolean;
  is_strategy?: boolean;
  is_adventure?: boolean;
  is_action?: boolean;
  is_indie?: boolean;
  popularity_score?: number;
  created_at?: string;
}

export interface Question {
  node_id: number;
  text: string;
  is_question: boolean;
  game_id: string | null;
}
