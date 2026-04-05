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

export class GameEngine {
  private allGames: Game[] = [];
  private possibleGames: Game[] = [];
  private askedQuestions: Set<string> = new Set();
  private questionCount = 0;
  private answers: Map<string, boolean> = new Map();

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
    if (this.possibleGames.length <= 1) return null;

    const allQuestions = this.generateAllQuestions();
    if (allQuestions.length === 0) return null;

    const scoredQuestions = allQuestions.map(q => ({
      question: q,
      score: this.calculateQuestionScore(q),
    }));

    scoredQuestions.sort((a, b) => {
      if (Math.abs(a.score - b.score) < 0.01) {
        return Math.random() - 0.5;
      }
      return b.score - a.score;
    });

    return scoredQuestions[0].question;
  }

  private generateAllQuestions(): Question[] {
    const questions: Question[] = [];

    for (const [attr, text] of Object.entries(BOOLEAN_QUESTIONS)) {
      const key = `bool_${attr}_true`;
      if (!this.askedQuestions.has(key) && !this.askedQuestions.has(`bool_${attr}_false`)) {
        const yesGames = this.possibleGames.filter(g => g[attr as keyof Game] === true);
        const noGames = this.possibleGames.filter(g => g[attr as keyof Game] === false);

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
    this.possibleGames.forEach(g => {
      if (g.primary_genre) genres.add(g.primary_genre);
      if (g.secondary_genre) genres.add(g.secondary_genre);
    });

    genres.forEach(genre => {
      const key = `genre_${genre}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = this.possibleGames.filter(
          g => g.primary_genre === genre || g.secondary_genre === genre
        );
        if (matchingGames.length > 0 && matchingGames.length < this.possibleGames.length) {
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
    this.possibleGames.forEach(g => {
      if (g.perspective) perspectives.add(g.perspective);
    });

    perspectives.forEach(perspective => {
      const key = `perspective_${perspective}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = this.possibleGames.filter(g => g.perspective === perspective);
        if (matchingGames.length > 0 && matchingGames.length < this.possibleGames.length) {
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
    this.possibleGames.forEach(g => {
      if (g.setting) settings.add(g.setting);
    });

    settings.forEach(setting => {
      const key = `setting_${setting}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = this.possibleGames.filter(g => g.setting === setting);
        if (matchingGames.length > 0 && matchingGames.length < this.possibleGames.length) {
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
    this.possibleGames.forEach(g => {
      if (g.art_style) artStyles.add(g.art_style);
    });

    artStyles.forEach(style => {
      const key = `art_${style}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = this.possibleGames.filter(g => g.art_style === style);
        if (matchingGames.length > 0 && matchingGames.length < this.possibleGames.length) {
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

    const platforms = new Set<string>();
    this.possibleGames.forEach(g => {
      if (g.platform_type) platforms.add(g.platform_type);
    });

    platforms.forEach(platform => {
      const key = `platform_${platform}`;
      if (!this.askedQuestions.has(key)) {
        const matchingGames = this.possibleGames.filter(g => g.platform_type === platform);
        if (matchingGames.length > 0 && matchingGames.length < this.possibleGames.length) {
          questions.push({
            id: key,
            text: `Is your game available on ${platform}?`,
            attribute: 'platform_type',
            value: platform,
            type: 'string',
          });
        }
      }
    });

    return questions;
  }

  private calculateQuestionScore(question: Question): number {
    let yesCount = 0;
    let noCount = 0;

    for (const game of this.possibleGames) {
      if (this.gameMatchesQuestion(game, question)) {
        yesCount++;
      } else {
        noCount++;
      }
    }

    const total = this.possibleGames.length;
    const balance = Math.min(yesCount, noCount) / total;

    return balance;
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
    this.answers.set(question.id, answer);

    this.possibleGames = this.possibleGames.filter(game => {
      const matches = this.gameMatchesQuestion(game, question);
      return answer ? matches : !matches;
    });

    if (this.possibleGames.length === 0) {
      this.possibleGames = [...this.allGames];
      this.recalculateBasedOnAllAnswers();
    }
  }

  private recalculateBasedOnAllAnswers(): void {
    const scoredGames = this.allGames.map(game => ({
      game,
      score: this.calculateGameScore(game),
    }));

    scoredGames.sort((a, b) => {
      if (Math.abs(b.score - a.score) < 0.01) {
        return b.game.popularity_score - a.game.popularity_score;
      }
      return b.score - a.score;
    });

    if (scoredGames.length > 0 && scoredGames[0].score > 0) {
      this.possibleGames = [scoredGames[0].game];
    } else {
      this.possibleGames = this.allGames
        .sort((a, b) => b.popularity_score - a.popularity_score)
        .slice(0, 5);
    }
  }

  private calculateGameScore(game: Game): number {
    let matchCount = 0;
    let totalQuestions = 0;

    this.answers.forEach((answer, questionId) => {
      totalQuestions++;

      const question = this.reconstructQuestion(questionId);
      if (question) {
        const gameMatches = this.gameMatchesQuestion(game, question);
        if ((answer && gameMatches) || (!answer && !gameMatches)) {
          matchCount++;
        }
      }
    });

    return totalQuestions > 0 ? matchCount / totalQuestions : 0;
  }

  private reconstructQuestion(questionId: string): Question | null {
    if (questionId.startsWith('bool_')) {
      const parts = questionId.split('_');
      const attr = parts.slice(1, -1).join('_');
      const value = parts[parts.length - 1] === 'true';

      return {
        id: questionId,
        text: BOOLEAN_QUESTIONS[attr] || '',
        attribute: attr as keyof Game,
        value,
        type: 'boolean',
      };
    }

    if (questionId.startsWith('genre_')) {
      const genre = questionId.substring(6);
      return {
        id: questionId,
        text: `Is your game's genre ${genre}?`,
        attribute: 'primary_genre',
        value: genre,
        type: 'string',
      };
    }

    if (questionId.startsWith('perspective_')) {
      const perspective = questionId.substring(12);
      return {
        id: questionId,
        text: `Is your game played from ${perspective} perspective?`,
        attribute: 'perspective',
        value: perspective,
        type: 'string',
      };
    }

    if (questionId.startsWith('setting_')) {
      const setting = questionId.substring(8);
      return {
        id: questionId,
        text: `Is your game set in ${setting}?`,
        attribute: 'setting',
        value: setting,
        type: 'string',
      };
    }

    if (questionId.startsWith('art_')) {
      const style = questionId.substring(4);
      return {
        id: questionId,
        text: `Is your game's art style ${style}?`,
        attribute: 'art_style',
        value: style,
        type: 'string',
      };
    }

    if (questionId.startsWith('platform_')) {
      const platform = questionId.substring(9);
      return {
        id: questionId,
        text: `Is your game available on ${platform}?`,
        attribute: 'platform_type',
        value: platform,
        type: 'string',
      };
    }

    return null;
  }

  getFinalGuess(): Game | null {
    if (this.possibleGames.length === 1) {
      return this.possibleGames[0];
    }

    if (this.possibleGames.length === 0) {
      this.recalculateBasedOnAllAnswers();
    }

    return this.possibleGames.sort((a, b) => b.popularity_score - a.popularity_score)[0] || this.allGames[0];
  }

  getPossibleGames(): Game[] {
    return [...this.possibleGames];
  }

  reset(games: Game[]): void {
    this.allGames = games;
    this.possibleGames = [...games];
    this.askedQuestions.clear();
    this.questionCount = 0;
    this.answers.clear();
  }
}
