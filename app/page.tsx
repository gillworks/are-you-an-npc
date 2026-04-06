import HomeClient from '@/components/HomeClient';
import { notFound } from 'next/navigation';
import { DEFAULT_LANDING_PAGE_SLUG, getQuizDataBySlug } from '@/lib/quiz-content';

export default async function Home() {
  const quizData = await getQuizDataBySlug(DEFAULT_LANDING_PAGE_SLUG);

  if (!quizData) {
    notFound();
  }

  return <HomeClient quizData={quizData} />;
}
