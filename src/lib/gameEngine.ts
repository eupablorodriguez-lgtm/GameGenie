import type { Game, Question } from '../types/game';

const QUESTION_TEMPLATES: Record<string, string> = {
  is_multiplayer: 'Does your game have multiplayer?',
  is_singleplayer: 'Is your game playable solo?',
  is_competitive: 'Is your game competitive/PvP?',
  is_open_world: 'Is your game open world?',
  has_strong_story: 'Does your game have a strong story?',
  has_character_customization: 'Can you customize your character?',
  has_crafting: 'Does your game have crafting?',
  has_building: 'Can you build in your game?',
  has_survival_elements: 'Does your game have survival elements?',
  has_rpg_elements: 'Does your game have RPG elements?',
  has_permadeath: 'Does your game have permadeath/roguelike?',
  has_magic: 'Does your game feature magic?',
  has_guns: 'Are there guns in your game?',
  has_swords: 'Are there swords/melee weapons?',
  has_vehicles: 'Can you drive vehicles?',
  is_indie: 'Is your game indie?',
  is_retro: 'Is your game retro/classic?',
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
    // If only 1 or fewer games left, make a guess
    if (this.possibleGames.length <= 1) {
      return null;
    }

    // Get all valid questions (not already asked)
    const validQuestions = this.getValidQuestions();

    if (validQuestions.length === 0) {
      return null;
    }

    // Score each question by how well it splits the remaining games
    const scoredQuestions = validQuestions.map(q => ({
      question: q,
      score: this.scoreQuestion(q),
    }));

    // Sort by score descending
    scoredQuestions.sort((a, b) => b.score - a.score);

    return scoredQuestions[0]?.question || null;
  }

  private getValidQuestions(): Question[] {
    const questions: Question[] = [];

    // Boolean attribute questions
    for (const [attr, text] of Object.entries(QUESTION_TEMPLATES)) {
      const key = `bool_${attr}`;
      if (!this.askedQuestions.has(key)) {
        const yesCount = this.possibleGames.filter(
          g => (g[attr as keyof Game] as boolean) === true
        ).length;
        const noCount = this.possibleGames.filter(
          g => (g[attr as keyof Game] as boolean) === false
        ).length;

        // Only ask if it splits the games (both yes and no answers exist)
        if (yesCount > 0 && noCount > 0) {
          questions.push({
            id: key,
            text,
            attribute: attr as keyof Game,
            value: true,
            type: 'boolean',
          });
        }
      }
    }

    // Genre questions
    const genres = new Set<string>();
    this.possibleGames.forEach(g => {
      if (g.primary_genre) genres.add(g.primary_genre);
      if (g.secondary_genre) genres.add(g.secondary_genre);
    });

    genres.forEach(genre => {
      const key = `genre_${genre}`;
      if (!this.askedQuestions.has(key)) {
        const matchCount = this.possibleGames.filter(
          g => g.primary_genre === genre || g.secondary_genre === genre
        ).length;

        if (matchCount > 0 && matchCount < this.possibleGames.length) {
          questions.push({
            id: key,
            text: `Is your game's main genre ${genre}?`,
            attribute: 'primary_genre',
            value: genre,
            type: 'string',
          });
        }
      }
    });

    // Perspective questions
    const perspectives = new Set<string>();
    this.possibleGames.forEach(g => {
      if (g.perspective) perspectives.add(g.perspective);
    });

    perspectives.forEach(perspective => {
      const key = `perspective_${perspective}`;
      if (!this.askedQuestions.has(key)) {
        const matchCount = this.possibleGames.filter(
          g => g.perspective === perspective
        ).length;

        if (matchCount > 0 && matchCount < this.possibleGames.length) {
          questions.push({
            id: key,
            text: `Is your game played in ${perspective} perspective?`,
            attribute: 'perspective',
            value: perspective,
            type: 'string',
          });
        }
      }
    });

    // Setting questions
    const settings = new Set<string>();
    this.possibleGames.forEach(g => {
      if (g.setting) settings.add(g.setting);
    });

    settings.forEach(setting => {
      const key = `setting_${setting}`;
      if (!this.askedQuestions.has(key)) {
        const matchCount = this.possibleGames.filter(
          g => g.setting === setting
        ).length;

        if (matchCount > 0 && matchCount < this.possibleGames.length) {
          questions.push({
            id: key,
            text: `Is your game set in ${setting}?`,
            attribute: 'setting',
            value: setting,
            type: 'string',
          });
        }
      }
    });

    // Art style questions
    const artStyles = new Set<string>();
    this.possibleGames.forEach(g => {
      if (g.art_style) artStyles.add(g.art_style);
    });

    artStyles.forEach(style => {
      const key = `art_${style}`;
      if (!this.askedQuestions.has(key)) {
        const matchCount = this.possibleGames.filter(
          g => g.art_style === style
        ).length;

        if (matchCount > 0 && matchCount < this.possibleGames.length) {
          questions.push({
            id: key,
            text: `Is your game's art style ${style}?`,
            attribute: 'art_style',
            value: style,
            type: 'string',
          });
        }
      }
    });

    return questions;
  }

  private scoreQuestion(question: Question): number {
    let yesCount = 0;
    let noCount = 0;

    for (const game of this.possibleGames) {
      if (this.gameMatchesQuestion(game, question)) {
        yesCount++;
      } else {
        noCount++;
      }
    }

    // Perfect 50/50 split = score 1.0
    // Any deviation from 50/50 = lower score
    const total = this.possibleGames.length;
    const ratio = Math.min(yesCount, noCount) / total;

    return ratio;
  }

  private gameMatchesQuestion(game: Game, question: Question): boolean {
    const gameValue = game[question.attribute];

    if (question.type === 'boolean') {
      return gameValue === true;
    }

    if (question.type === 'string') {
      if (question.attribute === 'primary_genre') {
        return (
          game.primary_genre === question.value ||
          game.secondary_genre === question.value
        );
      }
      return gameValue === question.value;
    }

    return false;
  }

  answerQuestion(question: Question, answer: boolean): void {
    this.askedQuestions.add(question.id);
    this.questionCount++;

    // Filter games based on answer
    this.possibleGames = this.possibleGames.filter(game => {
      const matches = this.gameMatchesQuestion(game, question);
      // If answer is YES, keep games that match
      // If answer is NO, keep games that don't match
      return answer ? matches : !matches;
    });

    // Safety: if no games left, reset to all games
    if (this.possibleGames.length === 0) {
      this.possibleGames = [...this.allGames];
    }
  }

  getFinalGuess(): Game | null {
    if (this.possibleGames.length === 0) {
      return this.allGames.sort(
        (a, b) => b.popularity_score - a.popularity_score
      )[0] || null;
    }

    // Return the most popular game from remaining possibilities
    return this.possibleGames.sort(
      (a, b) => b.popularity_score - a.popularity_score
    )[0];
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
