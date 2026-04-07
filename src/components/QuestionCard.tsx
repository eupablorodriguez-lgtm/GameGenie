import { Check, X } from 'lucide-react';
import type { Question } from '../types/game';
import { useLanguage } from '../contexts/LanguageContext';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
  questionNumber: number;
}

export function QuestionCard({ question, onAnswer, questionNumber }: QuestionCardProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeInUp">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-violet-500/30 to-fuchsia-500/30 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl animate-pulse"></div>

        <div className="relative glass-effect rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-white/20">
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full blur-md opacity-50"></div>
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-lg md:text-xl drop-shadow-lg">{questionNumber}</span>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-transparent"></div>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-white mb-8 md:mb-10 text-center leading-tight drop-shadow-xl px-2">
            {question.text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <button
              onClick={() => onAnswer(true)}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl py-5 md:py-7 px-6 md:px-8 font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"></div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative flex items-center justify-center gap-3 text-white drop-shadow-lg">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Check size={24} className="md:w-7 md:h-7 stroke-[3]" />
                </div>
                <span className="uppercase tracking-wider">{t.question.yes}</span>
              </div>
            </button>

            <button
              onClick={() => onAnswer(false)}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl py-5 md:py-7 px-6 md:px-8 font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-red-500 to-rose-600"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"></div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <div className="relative flex items-center justify-center gap-3 text-white drop-shadow-lg">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <X size={24} className="md:w-7 md:h-7 stroke-[3]" />
                </div>
                <span className="uppercase tracking-wider">{t.question.no}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
