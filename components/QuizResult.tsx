'use client';

import type { Archetype } from '@/lib/quiz-data';

type QuizResultProps = {
  score: number;
  archetype: Archetype;
  onRetake: () => void;
};

export default function QuizResult({ score, archetype, onRetake }: QuizResultProps) {
  return (
    <div className="w-full flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <span className="text-6xl">{archetype.emoji}</span>
        <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gradient-to-r ${archetype.color} text-white`}>
          NPC Score: {score}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">{archetype.title}</h2>
        <p className={`text-base font-medium bg-gradient-to-r ${archetype.color} bg-clip-text text-transparent`}>
          {archetype.subtitle}
        </p>
      </div>

      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm">
        {archetype.description}
      </p>

      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs text-zinc-500 mb-2">
          <span>Main Character</span>
          <span>Full NPC</span>
        </div>
        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${archetype.color} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <button
        onClick={onRetake}
        className="mt-2 px-8 py-3 rounded-full bg-zinc-800 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-700 hover:border-zinc-500 transition-all duration-200 cursor-pointer"
      >
        Retake the quiz
      </button>
    </div>
  );
}
