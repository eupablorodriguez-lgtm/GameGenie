import { Check, X } from 'lucide-react';
import type { Question } from '../types/game';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
  questionNumber: number;
}

export function QuestionCard({ question, onAnswer, questionNumber }: QuestionCardProps) {
  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/98 rounded-3xl p-10 shadow-2xl border-2 border-orange-500/40 backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-1 rounded-full bg-slate-950 flex items-center justify-center">
                  <span className="text-white font-black text-lg drop-shadow-lg">{questionNumber}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 via-amber-500/30 to-transparent"></div>
          </div>

          <h2 className="text-4xl font-black text-white mb-10 text-center leading-tight drop-shadow-lg">
            {question.text}
          </h2>

          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={() => onAnswer(true)}
              className="group relative overflow-hidden rounded-2xl py-6 px-6 font-black text-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 group-hover:from-emerald-400 group-hover:to-green-500 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] transition-shadow duration-300"></div>

              <div className="relative flex items-center justify-center gap-3 text-white drop-shadow-lg">
                <Check size={32} className="stroke-[3]" />
                <span className="uppercase tracking-wider">TRUE</span>
              </div>
            </button>

            <button
              onClick={() => onAnswer(false)}
              className="group relative overflow-hidden rounded-2xl py-6 px-6 font-black text-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-rose-600 group-hover:from-red-400 group-hover:to-rose-500 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] transition-shadow duration-300"></div>

              <div className="relative flex items-center justify-center gap-3 text-white drop-shadow-lg">
                <X size={32} className="stroke-[3]" />
                <span className="uppercase tracking-wider">FALSE</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
