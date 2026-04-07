import { supabase } from './supabase';
import type { Question } from '../types/game';
import type { Language } from '../types/language';

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
  private language: Language;

  constructor(language: Language = 'en') {
    this.currentNodeId = 1;
    this.questionCount = 0;
    this.nodeCache = new Map();
    this.language = language;
  }

  setLanguage(language: Language): void {
    this.language = language;
    this.nodeCache.clear();
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

  async learnNewGame(correctGame: string, wrongGame: string, characteristic: string, translations: Record<Language, { game: string, characteristic: string }>): Promise<void> {
    const currentNode = this.currentNodeId;
    const leftChild = currentNode * 2;
    const rightChild = currentNode * 2 + 1;

    await supabase
      .from('decision_tree')
      .insert([
        { node_id: leftChild, text: translations.en.game, is_question: false },
        { node_id: rightChild, text: wrongGame, is_question: false }
      ]);

    await supabase
      .from('decision_tree')
      .update({ text: translations.en.characteristic, is_question: true })
      .eq('node_id', currentNode);

    const translationInserts = [];
    for (const [lang, trans] of Object.entries(translations)) {
      translationInserts.push(
        { node_id: leftChild, language: lang, text: trans.game },
        { node_id: rightChild, language: lang, text: wrongGame },
        { node_id: currentNode, language: lang, text: trans.characteristic }
      );
    }

    await supabase
      .from('decision_tree_translations')
      .insert(translationInserts);

    this.nodeCache.clear();
  }

  private async fetchNode(nodeId: number): Promise<DecisionTreeNode | null> {
    let node = this.nodeCache.get(nodeId);
    if (!node) {
      const { data: nodeData, error: nodeError } = await supabase
        .from('decision_tree')
        .select('*')
        .eq('node_id', nodeId)
        .maybeSingle();

      if (nodeError || !nodeData) {
        return null;
      }

      const { data: translationData } = await supabase
        .from('decision_tree_translations')
        .select('text')
        .eq('node_id', nodeId)
        .eq('language', this.language)
        .maybeSingle();

      node = {
        ...nodeData,
        text: translationData?.text || nodeData.text
      };

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
