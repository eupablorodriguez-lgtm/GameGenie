import { Check, X } from 'lucide-react';
import type { Question } from '../types/game';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
  questionNumber: number;
}

export function QuestionCard({ question, onAnswer, questionNumber }: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-in">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-cyan-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {questionNumber}
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-8 text-center leading-tight">
          {question.text}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onAnswer(true)}
            className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-2xl py-6 px-8 font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Check size={28} className="stroke-[3]" />
              <span>YES</span>
            </div>
          </button>

          <button
            onClick={() => onAnswer(false)}
            className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white rounded-2xl py-6 px-8 font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-3">
              <X size={28} className="stroke-[3]" />
              <span>NO</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
