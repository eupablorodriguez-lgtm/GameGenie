import type { Game, Question } from '../types/game';

const BOOLEAN_QUESTIONS: Record<string, string> = {
  is_multiplayer: 'Does your game have multiplayer mode?',
  is_singleplayer: 'Can your game be played solo/singleplayer?',
  is_competitive: 'Is your game competitive (PvP/ranked)?',
  is_open_world: 'Is your game open world?',
  has_strong_story: 'Does your game have a strong narrative/story?',
  has_character_customization: 'Can you customize your character?',
  has_crafting: 'Does your game have crafting mechanics?',
  has_building: 'Can you build structures in your game?',
  has_survival_elements: 'Does your game have survival elements?',
  has_rpg_elements: 'Does your game have RPG elements (leveling, skills, etc)?',
  has_permadeath: 'Does your game have permadeath/roguelike elements?',
  has_magic: 'Does your game feature magic/spells?',
  has_guns: 'Are there guns/firearms in your game?',
  has_swords: 'Are there swords/melee weapons in your game?',
  has_vehicles: 'Can you drive/pilot vehicles in your game?',
  is_indie: 'Is your game an indie game?',
  is_retro: 'Is your game a retro/classic game (pre-2000)?',
};

interface GameScore {
  game: Game;
  score: number;
}

export class GameEngine {
  private allGames: Game[] = [];
  private gameScores: GameScore[] = [];
  private askedQuestions: Set<string> = new Set();
  private questionCount = 0;

  constructor(games: Game[]) {
    this.allGames = games;
    this.gameScores = games.map(game => ({
      game,
      score: 100,
    }));
  }

  getPossibleGamesCount(): number {
    return this.gameScores.filter(gs => gs.score > 20).length;
  }

  getQuestionCount(): number {
    return this.questionCount;
  }

  getBestQuestion(): Question | null {
    const topGames = this.gameScores
      .filter(gs => gs.score > 20)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);

    if (topGames.length <= 1) return null;

    const allQuestions = this.generateAllQuestions(topGames.map(gs => gs.game));
    if (allQuestions.length === 0) return null;

    const scoredQuestions = allQuestions.map(q => ({
      question: q,
      score: this.calculateQuestionEntropy(q, topGames.map(gs => gs.game)),
    }));

    scoredQuestions.sort((a, b) => b.score - a.score);

    return scoredQuestions[0].question;
  }

  private generateAllQuestions(topGames: Game[]): Question[] {
    const questions: Question[] = [];

    for (const [attr, text] of Object.entries(BOOLEAN_QUESTIONS)) {
      const key = `bool_${attr}`;
      if (!this.askedQuestions.has(key)) {
        const yesGames = topGames.filter(g => g[attr as keyof Game] === true);
        const noGames = topGames.filter(g => g[attr as keyof Game] === false);

        if (yesGames.length > 0 && noGames.length > 0) {
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

    const genres = new Set<string>();
    topGames.forEach(g => {
      if (g.primary_genre) genres.add(g.primary_genre);
      if (g.secondary_genre) genres.add(g.secondary_genre);
    });

    genres.forEach(genre => {
      const key = `genre_${genre}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = topGames.filter(
          g => g.primary_genre === genre || g.secondary_genre === genre
        );
        if (matchingGames.length > 0 && matchingGames.length < topGames.length) {
          questions.push({
            id: key,
            text: `Is your game's genre ${genre}?`,
            attribute: 'primary_genre',
            value: genre,
            type: 'string',
          });
        }
      }
    });

    const perspectives = new Set<string>();
    topGames.forEach(g => {
      if (g.perspective) perspectives.add(g.perspective);
    });

    perspectives.forEach(perspective => {
      const key = `perspective_${perspective}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = topGames.filter(g => g.perspective === perspective);
        if (matchingGames.length > 0 && matchingGames.length < topGames.length) {
          questions.push({
            id: key,
            text: `Is your game played from ${perspective} perspective?`,
            attribute: 'perspective',
            value: perspective,
            type: 'string',
          });
        }
      }
    });

    const settings = new Set<string>();
    topGames.forEach(g => {
      if (g.setting) settings.add(g.setting);
    });

    settings.forEach(setting => {
      const key = `setting_${setting}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = topGames.filter(g => g.setting === setting);
        if (matchingGames.length > 0 && matchingGames.length < topGames.length) {
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

    const artStyles = new Set<string>();
    topGames.forEach(g => {
      if (g.art_style) artStyles.add(g.art_style);
    });

    artStyles.forEach(style => {
      const key = `art_${style}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = topGames.filter(g => g.art_style === style);
        if (matchingGames.length > 0 && matchingGames.length < topGames.length) {
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

  private calculateQuestionEntropy(question: Question, topGames: Game[]): number {
    let yesCount = 0;
    let noCount = 0;

    for (const game of topGames) {
      if (this.gameMatchesQuestion(game, question)) {
        yesCount++;
      } else {
        noCount++;
      }
    }

    const total = topGames.length;
    if (total === 0) return 0;

    const yesRatio = yesCount / total;
    const noRatio = noCount / total;

    const entropy = Math.min(yesRatio, noRatio);

    return entropy;
  }

  private gameMatchesQuestion(game: Game, question: Question): boolean {
    const gameValue = game[question.attribute];

    if (question.type === 'boolean') {
      return gameValue === question.value;
    }

    if (question.type === 'string') {
      if (question.attribute === 'primary_genre') {
        return game.primary_genre === question.value || game.secondary_genre === question.value;
      }
      return gameValue === question.value;
    }

    return false;
  }

  answerQuestion(question: Question, answer: boolean): void {
    this.askedQuestions.add(question.id);
    this.questionCount++;

    for (const gameScore of this.gameScores) {
      const matches = this.gameMatchesQuestion(gameScore.game, question);

      if (answer && matches) {
        gameScore.score += 20;
      } else if (answer && !matches) {
        gameScore.score -= 15;
      } else if (!answer && matches) {
        gameScore.score -= 15;
      } else if (!answer && !matches) {
        gameScore.score += 20;
      }

      if (gameScore.score < 0) gameScore.score = 0;
      if (gameScore.score > 200) gameScore.score = 200;
    }

    this.gameScores.sort((a, b) => b.score - a.score);
  }

  getFinalGuess(): Game | null {
    const topScored = this.gameScores
      .filter(gs => gs.score > 0)
      .sort((a, b) => {
        if (Math.abs(b.score - a.score) < 5) {
          return b.game.popularity_score - a.game.popularity_score;
        }
        return b.score - a.score;
      });

    if (topScored.length > 0) {
      return topScored[0].game;
    }

    return this.allGames.sort((a, b) => b.popularity_score - a.popularity_score)[0] || null;
  }

  getPossibleGames(): Game[] {
    return this.gameScores
      .filter(gs => gs.score > 20)
      .sort((a, b) => b.score - a.score)
      .map(gs => gs.game);
  }

  reset(games: Game[]): void {
    this.allGames = games;
    this.gameScores = games.map(game => ({
      game,
      score: 100,
    }));
    this.askedQuestions.clear();
    this.questionCount = 0;
  }
}
