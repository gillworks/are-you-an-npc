'use client';

import { useEffect, useMemo, useState } from 'react';
import { calculateScore, getArchetype, QUIZ_QUESTION_COUNT, selectQuestionsWithSeed } from '@/lib/quiz-data';
import type { Archetype, Question } from '@/lib/quiz-data';
import ProgressBar from '@/components/ProgressBar';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';

const QUIZ_SESSION_STORAGE_KEY = 'npc-quiz-session-v1';

type QuizSession = {
  seed: string;
  active: boolean;
};

type QuizState =
  | { phase: 'intro' }
  | { phase: 'question'; seed: string; index: number; answers: number[]; selectedScore: number | null }
  | { phase: 'result'; seed: string; score: number; answers: number[] };

type QuizProps = {
  autoStart?: boolean;
  questions: Question[];
  archetypes: Archetype[];
};

function createSessionSeed(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readQuizSession(): QuizSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawSession = window.sessionStorage.getItem(QUIZ_SESSION_STORAGE_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(rawSession) as Partial<QuizSession>;
    if (typeof parsedSession.seed === 'string' && typeof parsedSession.active === 'boolean') {
      return { seed: parsedSession.seed, active: parsedSession.active };
    }
  } catch {
    // Ignore malformed client-side storage and fall back to a new session.
  }

  window.sessionStorage.removeItem(QUIZ_SESSION_STORAGE_KEY);
  return null;
}

function saveQuizSession(session: QuizSession): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(QUIZ_SESSION_STORAGE_KEY, JSON.stringify(session));
}

function clearQuizSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(QUIZ_SESSION_STORAGE_KEY);
}

function resolveSeedForStart(): string {
  const existingSession = readQuizSession();
  return existingSession?.active ? existingSession.seed : createSessionSeed();
}

export default function Quiz({ autoStart = false, questions, archetypes }: QuizProps) {
  const quizReady = questions.length > 0 && archetypes.length > 0;
  const questionCount = Math.min(QUIZ_QUESTION_COUNT, questions.length);
  const [state, setState] = useState<QuizState>(() =>
    autoStart && quizReady
      ? { phase: 'question', seed: resolveSeedForStart(), index: 0, answers: [], selectedScore: null }
      : { phase: 'intro' }
  );
  const questionSeed = state.phase === 'intro' ? null : state.seed;
  const activeQuestions = useMemo(
    () => (questionSeed ? selectQuestionsWithSeed(questions, questionCount, questionSeed) : []),
    [questionCount, questionSeed, questions]
  );

  useEffect(() => {
    if (state.phase === 'intro') {
      clearQuizSession();
      return;
    }

    if (state.phase === 'question') {
      saveQuizSession({ seed: state.seed, active: true });
      return;
    }

    saveQuizSession({ seed: state.seed, active: false });
  }, [state]);

  function startQuiz() {
    if (!quizReady) return;
    const seed = resolveSeedForStart();
    setState({ phase: 'question', seed, index: 0, answers: [], selectedScore: null });
  }

  function handleAnswer(score: number) {
    if (state.phase !== 'question') return;

    const totalQuestions = activeQuestions.length;
    if (totalQuestions === 0) return;

    setState({ ...state, selectedScore: score });

    setTimeout(() => {
      const newAnswers = [...state.answers, score];
      const nextIndex = state.index + 1;

      if (nextIndex >= totalQuestions) {
        const finalScore = calculateScore(newAnswers);
        setState({ phase: 'result', seed: state.seed, score: finalScore, answers: newAnswers });
      } else {
        setState({ phase: 'question', seed: state.seed, index: nextIndex, answers: newAnswers, selectedScore: null });
      }
    }, 400);
  }

  function retake() {
    setState({ phase: 'intro' });
  }

  if (!quizReady) {
    return (
      <div className="text-center text-zinc-400 text-sm sm:text-base">
        This quiz is temporarily unavailable.
      </div>
    );
  }

  if (state.phase === 'intro') {
    return (
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Are You an NPC?
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-sm leading-relaxed">
            {questionCount} questions. Find out how scripted your daily life really is.
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
    const archetype = getArchetype(archetypes, state.score);
    return <QuizResult score={state.score} archetype={archetype} answers={state.answers} onRetake={retake} />;
  }

  const question = activeQuestions[state.index];
  if (!question) {
    return (
      <div className="text-center text-zinc-400 text-sm sm:text-base">
        This quiz is temporarily unavailable.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <ProgressBar current={state.index + 1} total={activeQuestions.length} />
      <QuizQuestion
        question={question}
        onAnswer={handleAnswer}
        selectedScore={state.selectedScore}
      />
    </div>
  );
}
