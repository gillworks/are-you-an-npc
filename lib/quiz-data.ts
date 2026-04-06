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

export const questions: Question[] = [
  {
    id: 1,
    scenario: "Your alarm goes off at 7am. What happens next?",
    answers: [
      { text: "I'm already awake — I had a feeling something interesting would happen today.", score: 5 },
      { text: "I hit snooze once, then get up with a rough plan for the day.", score: 30 },
      { text: "I hit snooze exactly three times. It's tradition.", score: 60 },
      { text: "I wake up, check my phone for 40 minutes, then rush out.", score: 80 },
      { text: "I follow my morning routine down to the minute. Every day.", score: 95 },
    ],
  },
  {
    id: 2,
    scenario: "A stranger drops their coffee on the street right in front of you. You:",
    answers: [
      { text: "Help them, strike up a conversation, and somehow end up at brunch together.", score: 8 },
      { text: "Hand them some napkins and ask if they're okay.", score: 28 },
      { text: "Say 'oh no!' sympathetically, then keep walking.", score: 55 },
      { text: "Step around the puddle and move on — not your problem.", score: 75 },
      { text: "Walk past without really registering what happened.", score: 95 },
    ],
  },
  {
    id: 3,
    scenario: "It's Friday night and your usual plans fall through. What do you do?",
    answers: [
      { text: "Spontaneously drive to a city I've never been to and see what happens.", score: 3 },
      { text: "Text a few people, find something new to do, make it a night.", score: 22 },
      { text: "Order food, watch something on my list, call it a good night.", score: 50 },
      { text: "Get mildly stressed that the routine is broken, then watch the same show I always watch.", score: 72 },
      { text: "Nothing really changes — Friday is just another night.", score: 92 },
    ],
  },
  {
    id: 4,
    scenario: "You're given a free day with zero obligations. How do you spend it?",
    answers: [
      { text: "I say yes to the first weird thing that comes my way.", score: 7 },
      { text: "I have a loose idea and explore from there.", score: 25 },
      { text: "I catch up on the pile of stuff I've been meaning to do.", score: 52 },
      { text: "I feel a bit lost without structure, honestly.", score: 74 },
      { text: "I wait for someone else to suggest something.", score: 93 },
    ],
  },
  {
    id: 5,
    scenario: "Someone at a party tells you about a conspiracy theory. You:",
    answers: [
      { text: "Build on it, add my own wild theory, and nearly convince myself.", score: 10 },
      { text: "Ask curious questions — I find it interesting even if I don't believe it.", score: 30 },
      { text: "Nod politely and redirect the conversation.", score: 55 },
      { text: "Give a rehearsed 'interesting!' and move toward the snack table.", score: 78 },
      { text: "Didn't really absorb it — I was thinking about something else.", score: 95 },
    ],
  },
  {
    id: 6,
    scenario: "Your commute gets disrupted — massive delay, no clear ETA. You:",
    answers: [
      { text: "Treat it as a sign to explore somewhere new and work remotely from a café I've never been to.", score: 6 },
      { text: "Pivot: find another route, adapt, stay calm.", score: 28 },
      { text: "Grumble internally, text someone about it, wait it out.", score: 58 },
      { text: "Feel a low-level dread that your whole day is now off.", score: 76 },
      { text: "Stand in the same spot and wait until it resolves.", score: 94 },
    ],
  },
  {
    id: 7,
    scenario: "Someone asks for your honest opinion on their new haircut (you don't love it). You say:",
    answers: [
      { text: "Exactly what I think, with genuine kindness and specifics on what I'd change.", score: 12 },
      { text: "Something honest but softened — 'It's growing on me' type of thing.", score: 35 },
      { text: "A vague positive response that technically isn't a lie.", score: 58 },
      { text: "The exact compliment they're clearly fishing for.", score: 80 },
      { text: "Whatever gets the conversation past this point the fastest.", score: 96 },
    ],
  },
  {
    id: 8,
    scenario: "You're buying coffee. The barista asks your name. You give them:",
    answers: [
      { text: "A completely different name just to see what it feels like today.", score: 5 },
      { text: "My name — but I'll probably chat with them for a minute.", score: 25 },
      { text: "My name, nothing more.", score: 50 },
      { text: "My name, slightly mumbled so I don't have to repeat it.", score: 72 },
      { text: "Whatever I always say at this point in the routine.", score: 92 },
    ],
  },
  {
    id: 9,
    scenario: "Someone sends you a 'we need to talk' message with no context. Your reaction:",
    answers: [
      { text: "Instant curiosity — I call back immediately and ask what the story is.", score: 8 },
      { text: "A bit anxious, but I respond calmly and ask what's up.", score: 32 },
      { text: "Low-key spiral for 20 minutes, then respond.", score: 60 },
      { text: "Put my phone down, overthink it until they follow up.", score: 78 },
      { text: "I don't notice it for three hours.", score: 95 },
    ],
  },
  {
    id: 10,
    scenario: "A new restaurant opens in your area. You:",
    answers: [
      { text: "Go opening week — I'll try anything once and probably recommend it to ten people.", score: 10 },
      { text: "Add it to my list and get there within a month.", score: 32 },
      { text: "Check the reviews before committing to anything.", score: 56 },
      { text: "Stick with the two restaurants I trust until a friend forces me to try it.", score: 78 },
      { text: "I didn't notice it opened.", score: 96 },
    ],
  },
];

export const archetypes: Archetype[] = [
  {
    range: [0, 15],
    title: "Main Character",
    subtitle: "You break every script. Chaos follows you.",
    description: "You don't just live outside the algorithm — you are the anomaly. People remember you. Strange things happen around you. You have somehow ended up at three different weddings this year by accident.",
    emoji: "⭐",
    color: "from-yellow-400 to-orange-500",
  },
  {
    range: [16, 35],
    title: "Side Quest Giver",
    subtitle: "Interesting enough to talk to, weird enough to remember.",
    description: "You're the person who makes things interesting without quite being the protagonist. You hand out lore, spark unexpected conversations, and occasionally send people on journeys they didn't ask for.",
    emoji: "🗺️",
    color: "from-green-400 to-teal-500",
  },
  {
    range: [36, 55],
    title: "Merchant",
    subtitle: "Reliable, transactional, always at your post.",
    description: "You show up. You deliver. You have strong opinions about your area of expertise and almost none about everything else. People know where to find you. That's not nothing.",
    emoji: "🪙",
    color: "from-blue-400 to-indigo-500",
  },
  {
    range: [56, 75],
    title: "Guard",
    subtitle: "Same route, same lines, every single day.",
    description: "You have a system and you trust it. Your day has a shape. You've said 'I can't, I have a thing' more times than you can count, and the thing is always the same thing.",
    emoji: "🛡️",
    color: "from-purple-400 to-violet-500",
  },
  {
    range: [76, 90],
    title: "Background NPC",
    subtitle: "You walk the same path. Nobody notices.",
    description: "Your existence is ambient. You are the hum of a refrigerator in a room full of people. You have a route. You take it. The world scrolls past and you scroll with it.",
    emoji: "🚶",
    color: "from-slate-400 to-gray-500",
  },
  {
    range: [91, 100],
    title: "Decoration",
    subtitle: "You might actually be a lamp post with a hat.",
    description: "Scientists are divided on whether you have an inner monologue. You have been in the same place at the same time for so long that people use you as a landmark. This is fine. Everything is fine.",
    emoji: "🪴",
    color: "from-zinc-400 to-stone-500",
  },
];

export function getArchetype(score: number): Archetype {
  return archetypes.find(a => score >= a.range[0] && score <= a.range[1]) ?? archetypes[archetypes.length - 1];
}

export function calculateScore(answers: number[]): number {
  if (answers.length === 0) return 0;
  const total = answers.reduce((sum, s) => sum + s, 0);
  return Math.round(total / answers.length);
}
