import { supabase } from '@/lib/supabase';

type SaveQuizResultInput = {
  sessionId: string;
  landingPageId: string;
  archetypeId: string;
  archetype: string;
  score: number;
  answerScores: number[];
};

export async function saveQuizResult({
  sessionId,
  landingPageId,
  archetypeId,
  archetype,
  score,
  answerScores,
}: SaveQuizResultInput): Promise<void> {
  const { error } = await supabase
    .from('results')
    .insert({
      session_id: sessionId,
      landing_page_id: landingPageId,
      archetype_id: archetypeId,
      archetype,
      score,
      answer_scores: answerScores,
      metadata: {
        session_id: sessionId,
        archetype,
      },
    });

  if (error) {
    throw new Error(`Failed to save quiz result: ${error.message}`);
  }
}
