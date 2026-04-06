import { supabase } from './supabase';
import type { Question } from '../types/game';

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

  constructor() {
    this.currentNodeId = 1;
    this.questionCount = 0;
    this.nodeCache = new Map();
  }

  async getNextQuestion(): Promise<Question | { type: 'game', name: string } | null> {
    const node = await this.fetchNode(this.currentNodeId);

    if (!node) {
      return null;
    }

    if (!node.is_question) {
      return { type: 'game', name: node.text };
    }

    return {
      node_id: node.node_id,
      text: node.text,
      is_question: node.is_question,
      game_id: node.game_id
    } as Question;
  }

  async answerQuestion(answer: boolean): Promise<void> {
    this.questionCount++;

    if (answer) {
      this.currentNodeId = this.currentNodeId * 2;
    } else {
      this.currentNodeId = this.currentNodeId * 2 + 1;
    }
  }

  async learnNewGame(correctGame: string, wrongGame: string, characteristic: string): Promise<void> {
    const currentNode = this.currentNodeId;
    const leftChild = currentNode * 2;
    const rightChild = currentNode * 2 + 1;

    await supabase
      .from('decision_tree')
      .insert([
        { node_id: leftChild, text: correctGame, is_question: false },
        { node_id: rightChild, text: wrongGame, is_question: false }
      ]);

    await supabase
      .from('decision_tree')
      .update({ text: characteristic, is_question: true })
      .eq('node_id', currentNode);

    this.nodeCache.clear();
  }

  private async fetchNode(nodeId: number): Promise<DecisionTreeNode | null> {
    let node = this.nodeCache.get(nodeId);
    if (!node) {
      const { data, error } = await supabase
        .from('decision_tree')
        .select('*')
        .eq('node_id', nodeId)
        .maybeSingle();

      if (error || !data) {
        return null;
      }
      node = data;
      this.nodeCache.set(nodeId, node);
    }
    return node;
  }

  getCurrentNodeId(): number {
    return this.currentNodeId;
  }

  getQuestionCount(): number {
    return this.questionCount;
  }

  reset(): void {
    this.currentNodeId = 1;
    this.questionCount = 0;
    this.nodeCache.clear();
  }
}
