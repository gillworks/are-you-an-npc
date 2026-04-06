export type Answer = {
  text: string;
  score: number; // 0 = Main Character, 100 = Full NPC
};

export type Question = {
  id: number;
  scenario: string;
  answers: Answer[];
};

export type Archetype = {
  range: [number, number];
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
};

export type LandingQuizData = {
  slug: string;
  title: string;
  description: string;
  questions: Question[];
  archetypes: Archetype[];
};

export function getArchetype(archetypes: Archetype[], score: number): Archetype {
  if (archetypes.length === 0) {
    throw new Error('No archetypes are configured for this quiz');
  }

  return (
    archetypes.find((archetype) => score >= archetype.range[0] && score <= archetype.range[1]) ??
    archetypes[archetypes.length - 1]
  );
}

export function calculateScore(answers: number[]): number {
  if (answers.length === 0) return 0;
  const total = answers.reduce((sum, score) => sum + score, 0);
  return Math.round(total / answers.length);
}
