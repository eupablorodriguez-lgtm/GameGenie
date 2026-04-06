import type { Game, Question } from '../types/game';
import { Bolt Database } from './supabase';

interface TreeNode {
  node_id: number;
  text: string;
  is_question: boolean;
  game_id: string | null;
}

export class GameEngine {
  private currentNodeId: number = 1;
  private questionCount: number = 0;
  private nodeCache: Map<number, TreeNode> = new Map();

  constructor() {
    this.reset();
  }

  async loadNode(nodeId: number): Promise<TreeNode | null> {
    if (this.nodeCache.has(nodeId)) {
      return this.nodeCache.get(nodeId)!;
    }

    const { data, error } = await Bolt Database
      .from('decision_tree')
      .select('*')
      .eq('node_id', nodeId)
      .maybeSingle();

    if (error || !data) {
      console.error('Error loading node:', error);
      return null;
    }

    this.nodeCache.set(nodeId, data);
    return data;
  }

  getPossibleGamesCount(): number {
    return Math.max(1, 10 - this.questionCount);
  }

  getQuestionCount(): number {
    return this.questionCount;
  }

  async getBestQuestion(): Promise<Question | null> {
    const node = await this.loadNode(this.currentNodeId);

    if (!node) {
      return null;
    }

    if (!node.is_question) {
      return null;
    }

    return {
      id: `node_${node.node_id}`,
      text: node.text,
      attribute: 'id' as any,
      value: true,
      type: 'boolean',
    };
  }

  async answerQuestion(question: Question, answer: boolean): Promise<void> {
    this.questionCount++;

    const nextNodeId = answer 
      ? this.currentNodeId * 2 
      : this.currentNodeId * 2 + 1;

    this.currentNodeId = nextNodeId;
  }

  async getFinalGuess(): Promise<Game | null> {
    const node = await this.loadNode(this.currentNodeId);

    if (!node || !node.game_id) {
      const fallbackGames = await Bolt Database
        .from('games')
        .select('*')
        .order('popularity_score', { ascending: false })
        .limit(1);

      return fallbackGames.data?.[0] || null;
    }

    const { data: game } = await Bolt Database
      .from('games')
      .select('*')
      .eq('id', node.game_id)
      .maybeSingle();

    return game;
  }

  getPossibleGames(): Game[] {
    return [];
  }

  reset(): void {
    this.currentNodeId = 1;
    this.questionCount = 0;
    this.nodeCache.clear();
  }
}
