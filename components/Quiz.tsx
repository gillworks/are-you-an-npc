'use client';

import { useState } from 'react';
import { questions, calculateScore, getArchetype } from '@/lib/quiz-data';
import ProgressBar from '@/components/ProgressBar';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';

type QuizState =
  | { phase: 'intro' }
  | { phase: 'question'; index: number; answers: number[]; selectedScore: number | null }
  | { phase: 'result'; score: number };

export default function Quiz() {
  const [state, setState] = useState<QuizState>({ phase: 'intro' });

  function startQuiz() {
    setState({ phase: 'question', index: 0, answers: [], selectedScore: null });
  }

  function handleAnswer(score: number) {
    if (state.phase !== 'question') return;

    setState({ ...state, selectedScore: score });

    setTimeout(() => {
      const newAnswers = [...state.answers, score];
      const nextIndex = state.index + 1;

      if (nextIndex >= questions.length) {
        const finalScore = calculateScore(newAnswers);
        setState({ phase: 'result', score: finalScore });
      } else {
        setState({ phase: 'question', index: nextIndex, answers: newAnswers, selectedScore: null });
      }
    }, 400);
  }

  function retake() {
    setState({ phase: 'intro' });
  }

  if (state.phase === 'intro') {
    return (
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Are You an NPC?
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-sm leading-relaxed">
            10 questions. Find out how scripted your daily life really is.
          </p>
        </div>
        <button
          onClick={startQuiz}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-base hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-violet-900/30"
        >
          Take the quiz →
        </button>
        <p className="text-xs text-zinc-600">No sign-up. No data collected. Just vibes.</p>
      </div>
    );
  }

  if (state.phase === 'result') {
    const archetype = getArchetype(state.score);
    return <QuizResult score={state.score} archetype={archetype} onRetake={retake} />;
  }

  const question = questions[state.index];

  return (
    <div className="w-full flex flex-col gap-8">
      <ProgressBar current={state.index + 1} total={questions.length} />
      <QuizQuestion
        question={question}
        onAnswer={handleAnswer}
        selectedScore={state.selectedScore}
      />
    </div>
  );
}
