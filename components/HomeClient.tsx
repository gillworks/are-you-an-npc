'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import Quiz from '@/components/Quiz';

export default function HomeClient() {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-lg">
          <Quiz autoStart />
        </div>
      </main>
    );
  }

  return <LandingPage onStart={() => setStarted(true)} />;
}
