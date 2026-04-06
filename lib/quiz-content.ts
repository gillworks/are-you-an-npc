import 'server-only';

import type { LandingQuizData } from '@/lib/quiz-data';
import { supabase } from '@/lib/supabase';

export const DEFAULT_LANDING_PAGE_SLUG = 'are-you-an-npc';

type LandingPageRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
};

type QuestionRow = {
  id: string;
  question_order: number;
  scenario: string;
};

type AnswerRow = {
  question_id: string;
  answer_order: number;
  answer_text: string;
  score: number;
};

type ArchetypeRow = {
  id: string;
  display_order: number;
  range_min: number;
  range_max: number;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
};

export async function getQuizDataBySlug(slug: string): Promise<LandingQuizData | null> {
  const { data: landingPageRaw, error: landingPageError } = await supabase
    .from('landing_pages')
    .select('id, slug, title, description')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (landingPageError) {
    throw new Error(`Failed to load landing page for slug "${slug}": ${landingPageError.message}`);
  }

  if (!landingPageRaw) {
    return null;
  }

  const landingPage = landingPageRaw as LandingPageRow;

  const [{ data: questionsRaw, error: questionsError }, { data: archetypesRaw, error: archetypesError }] =
    await Promise.all([
      supabase
        .from('questions')
        .select('id, question_order, scenario')
        .eq('landing_page_id', landingPage.id)
        .order('question_order', { ascending: true }),
      supabase
        .from('archetypes')
        .select('id, display_order, range_min, range_max, title, subtitle, description, emoji, color')
        .eq('landing_page_id', landingPage.id)
        .order('display_order', { ascending: true }),
    ]);

  if (questionsError) {
    throw new Error(`Failed to load questions for slug "${slug}": ${questionsError.message}`);
  }

  if (archetypesError) {
    throw new Error(`Failed to load archetypes for slug "${slug}": ${archetypesError.message}`);
  }

  const questions = (questionsRaw ?? []) as QuestionRow[];
  const archetypes = (archetypesRaw ?? []) as ArchetypeRow[];

  const questionIds = questions.map((question) => question.id);
  const { data: answersRaw, error: answersError } = questionIds.length
    ? await supabase
        .from('answers')
        .select('question_id, answer_order, answer_text, score')
        .in('question_id', questionIds)
        .order('answer_order', { ascending: true })
    : { data: [], error: null };

  if (answersError) {
    throw new Error(`Failed to load answers for slug "${slug}": ${answersError.message}`);
  }

  const answers = (answersRaw ?? []) as AnswerRow[];
  const answersByQuestionId = new Map<string, { order: number; text: string; score: number }[]>();

  for (const answer of answers) {
    const existing = answersByQuestionId.get(answer.question_id) ?? [];
    existing.push({
      order: answer.answer_order,
      text: answer.answer_text,
      score: answer.score,
    });
    answersByQuestionId.set(answer.question_id, existing);
  }

  return {
    landingPageId: landingPage.id,
    slug: landingPage.slug,
    title: landingPage.title,
    description: landingPage.description,
    questions: questions.map((question) => ({
      id: question.question_order,
      scenario: question.scenario,
      answers: (answersByQuestionId.get(question.id) ?? [])
        .sort((a, b) => a.order - b.order)
        .map((answer) => ({
          text: answer.text,
          score: answer.score,
        })),
    })),
    archetypes: archetypes.map((archetype) => ({
      id: archetype.id,
      range: [archetype.range_min, archetype.range_max] as [number, number],
      title: archetype.title,
      subtitle: archetype.subtitle,
      description: archetype.description,
      emoji: archetype.emoji,
      color: archetype.color,
    })),
  };
}
