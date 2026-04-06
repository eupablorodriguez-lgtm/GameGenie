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

    // First, try to get the node from the decision tree based on currentNodeId
    let node = await this.fetchNode(this.currentNodeId);

    if (!node) {
      // If no node is found, it means we've reached an end of the tree path
      // and should try to guess from remaining possible games.
      if (this.possibleGames.length === 1) {
        return this.possibleGames[0];
      } else if (this.possibleGames.length > 1) {
        // If there are still multiple possible games but no more questions in the tree,
        // we might need a fallback mechanism or declare a failure.
        // For now, let's return null to indicate no more questions.
        return null;
      } else {
        return null; // No possible games left
      }
    }

    if (!node.is_question) {
      // If it's a leaf node, it's a guessed game
      const guessedGame = this.allGames.find(game => game.id === node!.game_id);
      if (guessedGame) {
        this.possibleGames = [guessedGame]; // Narrow down to the guessed game
        return guessedGame;
      } else {
        // Game not found in allGames, this indicates a data inconsistency
        console.error(`Game with ID ${node.game_id} not found in allGames.`);
        return null;
      }
    }

    // If it's a question, return it
    return node as Question;
  }

  async answerQuestion(answer: boolean): Promise<void> {
    this.questionCount++;
    const currentNode = await this.fetchNode(this.currentNodeId);

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

    // After updating currentNodeId, we need to re-evaluate possible games.
    // This is the critical part for narrowing down the choices.
    // A proper implementation would filter `this.allGames` based on the characteristics
    // implied by the path taken through the decision tree.
    // For this specific decision tree structure, where leaf nodes directly point to games,
    // the `getNextQuestion` method will handle the final game identification.
    // However, to make the `getPossibleGamesCount` accurate during the game,
    // we need a way to filter `possibleGames` more dynamically.

    // For now, a simplified approach: if the next node is a game, narrow down `possibleGames`.
    // Otherwise, `possibleGames` remains all games until a leaf node is hit.
    // This is a limitation of the current decision tree structure not directly linking questions to game characteristics.
    const nextNode = await this.fetchNode(this.currentNodeId);
    if (nextNode && !nextNode.is_question && nextNode.game_id) {
      this.possibleGames = this.allGames.filter(game => game.id === nextNode.game_id);
    } else if (!nextNode) {
      // If the path leads to a dead end (no node), then no games are possible down this path.
      this.possibleGames = [];
    } else {
      // If it's still a question, we need to filter `possibleGames` based on the characteristics
      // implied by the current question and answer. This is complex without explicit characteristic mapping.
      // For now, we'll keep `possibleGames` as is, relying on the decision tree to eventually lead to a single game.
      // The `getPossibleGamesCount` will be less accurate until a game is almost guessed.
    }
  }

  private async fetchNode(nodeId: number): Promise<DecisionTreeNode | null> {
    let node = this.nodeCache.get(nodeId);
    if (!node) {
      const { data, error } = await supabase
        .from<DecisionTreeNode>('decision_tree')
        .select('*')
        .eq('node_id', nodeId)
        .single();

      if (error || !data) {
        // console.error('Error fetching decision tree node:', error);
        return null; 
      }
      node = data;
      this.nodeCache.set(nodeId, node);
    }
    return node;
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
