import { Check, X } from 'lucide-react';
import type { Question } from '../types/game';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
  questionNumber: number;
}

export function QuestionCard({ question, onAnswer, questionNumber }: QuestionCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeInUp">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-fuchsia-500/30 rounded-3xl blur-2xl animate-pulse"></div>

        <div className="relative glass-effect rounded-3xl p-12 shadow-2xl border-2 border-white/20">
          <div className="flex items-center gap-5 mb-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full blur-lg opacity-50"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-2xl drop-shadow-lg">{questionNumber}</span>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-transparent"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-12 text-center leading-tight drop-shadow-xl">
            {question.text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onAnswer(true)}
              className="group relative overflow-hidden rounded-2xl py-8 px-8 font-black text-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"></div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative flex items-center justify-center gap-4 text-white drop-shadow-lg">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Check size={28} className="stroke-[3]" />
                </div>
                <span className="uppercase tracking-wider">YES</span>
              </div>
            </button>

            <button
              onClick={() => onAnswer(false)}
              className="group relative overflow-hidden rounded-2xl py-8 px-8 font-black text-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-red-500 to-rose-600"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"></div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative flex items-center justify-center gap-4 text-white drop-shadow-lg">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <X size={28} className="stroke-[3]" />
                </div>
                <span className="uppercase tracking-wider">NO</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
