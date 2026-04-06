import { supabase } from './supabase';
import type { Game, Question } from '../types/game';

interface DecisionTreeNode {
  node_id: number;
  text: string;
  is_question: boolean;
  game_id: string | null;
}

export class GameEngine {
  private currentNodeId: number;
  private questionCount: number;
  private nodeCache: Map<number, DecisionTreeNode>;
  private possibleGames: Game[];
  private allGames: Game[];

  constructor(allGames: Game[]) {
    this.currentNodeId = 1;
    this.questionCount = 0;
    this.nodeCache = new Map();
    this.allGames = allGames;
    this.possibleGames = allGames; // Initially, all games are possible
  }

  async getNextQuestion(): Promise<Question | Game | null> {
    if (this.possibleGames.length === 0) {
      return null; // No more possible games
    }

    // If only one game remains, guess it
    if (this.possibleGames.length === 1) {
      const finalGame = this.possibleGames[0];
      const node: DecisionTreeNode = {
        node_id: -1, // Sentinel value for a guessed game
        text: finalGame.name,
        is_question: false,
        game_id: finalGame.id,
      };
      return node as Game; // Return the game directly
    }

    let node = this.nodeCache.get(this.currentNodeId);
    if (!node) {
      const { data, error } = await supabase
        .from<DecisionTreeNode>('decision_tree')
        .select('*')
        .eq('node_id', this.currentNodeId)
        .single();

      if (error || !data) {
        console.error('Error fetching decision tree node:', error);
        return null; // Or handle error appropriately
      }
      node = data;
      this.nodeCache.set(this.currentNodeId, node);
    }

    if (!node.is_question) {
      // If it's a leaf node, it's a guessed game
      return this.allGames.find(game => game.id === node!.game_id) || null;
    }

    return node as Question;
  }

  async answerQuestion(answer: boolean): Promise<void> {
    this.questionCount++;
    const currentNode = this.nodeCache.get(this.currentNodeId);

    if (!currentNode || !currentNode.is_question) {
      console.error('Attempted to answer a non-question node or missing node.');
      return;
    }

    // Update currentNodeId based on the answer
    if (answer) {
      this.currentNodeId = this.currentNodeId * 2;
    } else {
      this.currentNodeId = this.currentNodeId * 2 + 1;
    }

    // Filter possible games based on the answer to the current question
    // This is a simplified filtering. A more robust solution would involve
    // mapping questions to game characteristics and filtering based on those.
    // For now, we'll assume the decision tree guides us directly.
    // If the decision tree leads to a game, that game becomes the only possible game.
    const nextQuestionOrGame = await this.getNextQuestion();
    if (nextQuestionOrGame && !('is_question' in nextQuestionOrGame)) {
      this.possibleGames = [nextQuestionOrGame as Game];
    } else if (nextQuestionOrGame === null) {
      this.possibleGames = []; // No path found
    } else {
      // If it's still a question, we don't filter possible games at this stage
      // The decision tree structure implicitly handles the filtering by guiding to the next node.
      // For a more explicit filtering, we'd need a more complex characteristic mapping.
    }
  }

  getPossibleGamesCount(): number {
    return this.possibleGames.length;
  }

  getQuestionCount(): number {
    return this.questionCount;
  }

  reset(): void {
    this.currentNodeId = 1;
    this.questionCount = 0;
    this.nodeCache.clear();
    this.possibleGames = this.allGames; // Reset possible games to all games
  }
}
