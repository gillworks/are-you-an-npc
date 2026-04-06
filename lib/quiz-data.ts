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

export const QUIZ_QUESTION_COUNT = 10;

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

function createSeedHasher(seed: string): () => number {
  let hash = 1779033703 ^ seed.length;

  for (let i = 0; i < seed.length; i += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(i), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }

  return function hashValue() {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    hash ^= hash >>> 16;
    return hash >>> 0;
  };
}

function createSeededRandom(seed: string): () => number {
  let value = createSeedHasher(seed)();

  return function random() {
    value += 0x6d2b79f5;
    let temp = value;
    temp = Math.imul(temp ^ (temp >>> 15), temp | 1);
    temp ^= temp + Math.imul(temp ^ (temp >>> 7), temp | 61);
    return ((temp ^ (temp >>> 14)) >>> 0) / 4294967296;
  };
}

export function selectQuestionsWithSeed(questions: Question[], count: number, seed: string): Question[] {
  const limit = Math.min(Math.max(0, count), questions.length);

  if (limit === 0) {
    return [];
  }

  const shuffledQuestions = [...questions];
  const random = createSeededRandom(seed);

  for (let i = shuffledQuestions.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
  }

  return shuffledQuestions.slice(0, limit);
}
