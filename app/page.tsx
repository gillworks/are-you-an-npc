import Quiz from '@/components/Quiz';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen px-6 py-16">
      <div className="w-full max-w-lg">
        <Quiz />
      </div>
    </main>
  );
}
