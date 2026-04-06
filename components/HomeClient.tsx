'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import Quiz from '@/components/Quiz';
import { QUIZ_QUESTION_COUNT } from '@/lib/quiz-data';
import type { LandingQuizData } from '@/lib/quiz-data';

type HomeClientProps = {
  quizData: LandingQuizData;
};

export default function HomeClient({ quizData }: HomeClientProps) {
  const [started, setStarted] = useState(false);
  const questionCount = Math.min(QUIZ_QUESTION_COUNT, quizData.questions.length);

  if (started) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-lg">
          <Quiz
            autoStart
            questions={quizData.questions}
            archetypes={quizData.archetypes}
          />
        </div>
      </main>
    );
  }

  return (
    <LandingPage
      onStart={() => setStarted(true)}
      archetypes={quizData.archetypes}
      questionCount={questionCount}
    />
  );
}
