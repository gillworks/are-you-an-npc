'use client';

import type { Question } from '@/lib/quiz-data';

type QuizQuestionProps = {
  question: Question;
  onAnswer: (score: number) => void;
  selectedScore: number | null;
};

export default function QuizQuestion({ question, onAnswer, selectedScore }: QuizQuestionProps) {
  return (
    <div className="w-full">
      <p className="text-lg sm:text-xl font-medium text-white leading-relaxed mb-8">
        {question.scenario}
      </p>
      <div className="flex flex-col gap-3">
        {question.answers.map((answer, idx) => {
          const isSelected = selectedScore === answer.score;
          return (
            <button
              key={idx}
              onClick={() => onAnswer(answer.score)}
              className={`w-full text-left px-5 py-4 rounded-xl border text-sm sm:text-base leading-snug transition-all duration-200 cursor-pointer
                ${isSelected
                  ? 'border-violet-500 bg-violet-500/20 text-white'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white'
                }`}
            >
              {answer.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
