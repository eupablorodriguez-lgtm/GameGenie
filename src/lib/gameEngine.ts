import type { Game, Question } from '../types/game';

const QUESTION_TEMPLATES = {
  is_multiplayer: 'Does your game have multiplayer?',
  is_singleplayer: 'Can your game be played solo?',
  is_competitive: 'Is your game competitive/PvP focused?',
  is_open_world: 'Is your game open world?',
  has_strong_story: 'Does your game have a strong narrative/story?',
  has_character_customization: 'Can you customize your character?',
  has_crafting: 'Does your game have crafting mechanics?',
  has_building: 'Can you build structures in your game?',
  has_survival_elements: 'Does your game have survival elements?',
  has_rpg_elements: 'Does your game have RPG elements?',
  has_permadeath: 'Does your game have permadeath/roguelike elements?',
  has_magic: 'Does your game feature magic?',
  has_guns: 'Are there guns/firearms in your game?',
  has_swords: 'Are there swords/melee weapons in your game?',
  has_vehicles: 'Can you drive/pilot vehicles?',
  is_indie: 'Is your game an indie game?',
  is_retro: 'Is your game a retro/classic game?',
};

const GENRE_QUESTIONS = {
  'FPS': 'Is your game a First-Person Shooter?',
  'RPG': 'Is your game an RPG?',
  'MOBA': 'Is your game a MOBA?',
  'Battle Royale': 'Is your game a Battle Royale?',
  'Platformer': 'Is your game a Platformer?',
  'Fighting': 'Is your game a Fighting game?',
  'Racing': 'Is your game a Racing game?',
  'Sports': 'Is your game a Sports game?',
  'Strategy': 'Is your game a Strategy game?',
  'Roguelike': 'Is your game a Roguelike/Roguelite?',
  'Survival': 'Is your game a Survival game?',
  'Horror': 'Is your game a Horror game?',
  'Sandbox': 'Is your game a Sandbox game?',
};

const PERSPECTIVE_QUESTIONS = {
  'First Person': 'Is your game played in first-person perspective?',
  'Third Person': 'Is your game played in third-person perspective?',
  'Top-down': 'Is your game played from a top-down view?',
  'Side-scrolling': 'Is your game a side-scrolling game?',
};

const SETTING_QUESTIONS = {
  'Fantasy': 'Is your game set in a fantasy world?',
  'Sci-Fi': 'Is your game set in a sci-fi/futuristic setting?',
  'Modern': 'Is your game set in modern times?',
  'Medieval': 'Is your game set in medieval times?',
  'Post-Apocalyptic': 'Is your game set in a post-apocalyptic world?',
};

export class GameEngine {
  private allGames: Game[] = [];
  private possibleGames: Game[] = [];
  private askedQuestions: Set<string> = new Set();
  private questionCount = 0;

  constructor(games: Game[]) {
    this.allGames = games;
    this.possibleGames = [...games];
  }

  getPossibleGamesCount(): number {
    return this.possibleGames.length;
  }

  getQuestionCount(): number {
    return this.questionCount;
  }

  getBestQuestion(): Question | null {
    if (this.possibleGames.length === 0) return null;
    if (this.possibleGames.length === 1) return null;

    const questions = this.generateAllPossibleQuestions();
    const scoredQuestions = questions.map(q => ({
      question: q,
      score: this.scoreQuestion(q),
    }));

    scoredQuestions.sort((a, b) => b.score - a.score);
    return scoredQuestions[0]?.question || null;
  }

  private generateAllPossibleQuestions(): Question[] {
    const questions: Question[] = [];

    for (const [attr, text] of Object.entries(QUESTION_TEMPLATES)) {
      const key = `bool_${attr}`;
      if (!this.askedQuestions.has(key)) {
        questions.push({
          id: key,
          text,
          attribute: attr as keyof Game,
          value: true,
          type: 'boolean',
        });
      }
    }

    for (const [genre, text] of Object.entries(GENRE_QUESTIONS)) {
      const key = `genre_${genre}`;
      if (!this.askedQuestions.has(key)) {
        const hasGames = this.possibleGames.some(
          g => g.primary_genre === genre || g.secondary_genre === genre
        );
        if (hasGames) {
          questions.push({
            id: key,
            text,
            attribute: 'primary_genre',
            value: genre,
            type: 'string',
          });
        }
      }
    }

    for (const [perspective, text] of Object.entries(PERSPECTIVE_QUESTIONS)) {
      const key = `perspective_${perspective}`;
      if (!this.askedQuestions.has(key)) {
        const hasGames = this.possibleGames.some(g => g.perspective === perspective);
        if (hasGames) {
          questions.push({
            id: key,
            text,
            attribute: 'perspective',
            value: perspective,
            type: 'string',
          });
        }
      }
    }

    for (const [setting, text] of Object.entries(SETTING_QUESTIONS)) {
      const key = `setting_${setting}`;
      if (!this.askedQuestions.has(key)) {
        const hasGames = this.possibleGames.some(g => g.setting?.includes(setting));
        if (hasGames) {
          questions.push({
            id: key,
            text,
            attribute: 'setting',
            value: setting,
            type: 'string',
          });
        }
      }
    }

    return questions;
  }

  private scoreQuestion(question: Question): number {
    let yesCount = 0;
    let noCount = 0;

    for (const game of this.possibleGames) {
      const matches = this.gameMatchesQuestion(game, question);
      if (matches) {
        yesCount++;
      } else {
        noCount++;
      }
    }

    const balance = Math.min(yesCount, noCount) / this.possibleGames.length;
    return balance;
  }

  private gameMatchesQuestion(game: Game, question: Question): boolean {
    const gameValue = game[question.attribute];

    if (question.type === 'boolean') {
      return gameValue === question.value;
    }

    if (question.type === 'string') {
      if (question.attribute === 'primary_genre' || question.attribute === 'secondary_genre') {
        return game.primary_genre === question.value || game.secondary_genre === question.value;
      }
      if (question.attribute === 'setting') {
        return typeof gameValue === 'string' && gameValue.includes(question.value as string);
      }
      return gameValue === question.value;
    }

    return false;
  }

  answerQuestion(question: Question, answer: boolean): void {
    this.askedQuestions.add(question.id);
    this.questionCount++;

    this.possibleGames = this.possibleGames.filter(game => {
      const matches = this.gameMatchesQuestion(game, question);
      return answer ? matches : !matches;
    });
  }

  getFinalGuess(): Game | null {
    if (this.possibleGames.length === 0) {
      return this.allGames.sort((a, b) => b.popularity_score - a.popularity_score)[0] || null;
    }

    if (this.possibleGames.length === 1) {
      return this.possibleGames[0];
    }

    return this.possibleGames.sort((a, b) => b.popularity_score - a.popularity_score)[0];
  }

  getPossibleGames(): Game[] {
    return [...this.possibleGames];
  }

  reset(games: Game[]): void {
    this.allGames = games;
    this.possibleGames = [...games];
    this.askedQuestions.clear();
    this.questionCount = 0;
  }
}
