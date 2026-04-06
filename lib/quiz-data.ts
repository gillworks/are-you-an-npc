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
  {
    id: 11,
    scenario: "You get a last-minute invite to a party you weren't planning on attending. You:",
    answers: [
      { text: "Say yes immediately and start mentally planning my outfit and opening line.", score: 7 },
      { text: "Say yes if I like the person — I'm usually glad I went.", score: 28 },
      { text: "Need at least 20 minutes to decide. End up going. Fine.", score: 52 },
      { text: "Decline and feel a small wave of relief wash over me.", score: 74 },
      { text: "Don't see the message until the next morning.", score: 94 },
    ],
  },
  {
    id: 12,
    scenario: "You find a $20 bill on the sidewalk. No one's around. You:",
    answers: [
      { text: "Pocket it and immediately decide this is a sign to do something impulsive.", score: 5 },
      { text: "Pocket it, feel a little lucky, use it for something fun.", score: 25 },
      { text: "Pocket it, feel vaguely guilty, buy a coffee.", score: 55 },
      { text: "Look around hoping someone will claim it so I don't have to decide.", score: 75 },
      { text: "Walk past it. Not worth the complication.", score: 92 },
    ],
  },
  {
    id: 13,
    scenario: "A coworker asks you to review their presentation before a big meeting. It needs a lot of work. You:",
    answers: [
      { text: "Rewrite the whole thing with them — we're making this good.", score: 8 },
      { text: "Give honest, specific feedback they can actually use.", score: 30 },
      { text: "Mention the bigger issues and wish them luck with the rest.", score: 55 },
      { text: "Say it looks great, with one small tweak to seem helpful.", score: 78 },
      { text: "Tell them it's fine. It's their problem, not yours.", score: 94 },
    ],
  },
  {
    id: 14,
    scenario: "Someone casually cuts in front of you in a long grocery store line. You:",
    answers: [
      { text: "Calmly but very directly point out what they just did. No scene, but clear.", score: 10 },
      { text: "Clear my throat loudly and make pointed eye contact.", score: 30 },
      { text: "Silently seethe for the next three minutes, do nothing.", score: 58 },
      { text: "Stare at the back of their head and craft a devastating comment I'll never say.", score: 76 },
      { text: "Shrug. Doesn't really matter.", score: 93 },
    ],
  },
  {
    id: 15,
    scenario: "Your favorite show just dropped its final season. You:",
    answers: [
      { text: "Block out the weekend, make an event of it, text the group chat in real-time.", score: 9 },
      { text: "Watch it at a pace I can actually enjoy — no rushing.", score: 28 },
      { text: "Watch it over a few weeks between other things.", score: 54 },
      { text: "Start it, get distracted, still haven't finished three months later.", score: 76 },
      { text: "It's on my list. Has been for a while.", score: 93 },
    ],
  },
  {
    id: 16,
    scenario: "The DJ at a wedding plays your absolute favorite song. You:",
    answers: [
      { text: "I'm already on the dance floor before the first bar ends.", score: 5 },
      { text: "Make a beeline for the floor and pull someone with me.", score: 22 },
      { text: "Nod along at my table. Internally, I'm thriving.", score: 50 },
      { text: "Smile and keep my conversation going, maybe tap my foot.", score: 72 },
      { text: "Register it faintly in the background. Good song.", score: 90 },
    ],
  },
  {
    id: 17,
    scenario: "You get a voicemail from an unknown number. It's just silence, then a hang-up. You:",
    answers: [
      { text: "Call it back immediately. I need to know.", score: 6 },
      { text: "Google the number, then decide whether to call.", score: 28 },
      { text: "Save the number as 'mystery' and wait to see if they call again.", score: 52 },
      { text: "Delete it and never think about it again.", score: 74 },
      { text: "Don't listen to voicemails.", score: 93 },
    ],
  },
  {
    id: 18,
    scenario: "Someone asks where you want to go for dinner. You:",
    answers: [
      { text: "Have a specific place, a backup, and a ranking of both.", score: 8 },
      { text: "Suggest something real within five seconds.", score: 27 },
      { text: "Say 'I'm easy' and mean it, sort of.", score: 52 },
      { text: "Say 'I'm easy,' hope they decide, subtly veto the one place I hate.", score: 74 },
      { text: "Say 'I'm easy,' and eat whatever appears in front of me.", score: 93 },
    ],
  },
  {
    id: 19,
    scenario: "You have 30 free minutes before a meeting. You:",
    answers: [
      { text: "Start something ambitious. I'll either finish it or have an interesting story.", score: 7 },
      { text: "Do a few things from my list — actually productive.", score: 27 },
      { text: "Browse my phone. Not sure what. Time passes.", score: 55 },
      { text: "Worry about the meeting and do nothing useful.", score: 75 },
      { text: "Sit and wait. It's not enough time to do anything real.", score: 92 },
    ],
  },
  {
    id: 20,
    scenario: "The restaurant gets your order wrong. You:",
    answers: [
      { text: "Flag the server, explain what happened, get it sorted with zero drama.", score: 10 },
      { text: "Mention it, accept whatever fix they offer.", score: 30 },
      { text: "Debate whether to say something for so long that the moment has passed.", score: 58 },
      { text: "Eat it anyway. Confrontation sounds worse than this meal.", score: 76 },
      { text: "Eat it and don't fully register it wasn't what I ordered.", score: 94 },
    ],
  },
  {
    id: 21,
    scenario: "You spot someone you vaguely know at the grocery store. You:",
    answers: [
      { text: "Go over, say hi, catch up — turns out we have a lot in common.", score: 7 },
      { text: "Give the 'hey! how are you!' wave and mean it.", score: 26 },
      { text: "Smile and nod and drift toward a different aisle.", score: 52 },
      { text: "Change aisles before they see me.", score: 73 },
      { text: "Don't notice them until they tap me on the shoulder.", score: 92 },
    ],
  },
  {
    id: 22,
    scenario: "Your friends want to do karaoke. You're sober. You:",
    answers: [
      { text: "First up. Fully committed. No notes.", score: 4 },
      { text: "Do one song I actually know and enjoy it.", score: 24 },
      { text: "Wait until later in the night, then do a group song.", score: 50 },
      { text: "Hold the drinks, hold the coats, do not hold the mic.", score: 73 },
      { text: "Observe from a safe distance with a studied expression of mild amusement.", score: 92 },
    ],
  },
  {
    id: 23,
    scenario: "Someone asks for your 'hot take' on something. You:",
    answers: [
      { text: "Have several fully-formed, aggressively specific opinions ready to go.", score: 6 },
      { text: "Share a genuine view, explain my reasoning.", score: 28 },
      { text: "Offer something mild that doesn't risk an argument.", score: 54 },
      { text: "Deflect with a joke, get a laugh, reveal nothing.", score: 74 },
      { text: "Say 'I don't really have strong opinions about stuff like that.'", score: 92 },
    ],
  },
  {
    id: 24,
    scenario: "You're running late and your GPS freezes mid-route. You:",
    answers: [
      { text: "Navigate by instinct. I've been to worse places with less information.", score: 5 },
      { text: "Pull over, restart the app, recalibrate, carry on.", score: 25 },
      { text: "Panic quietly while trying to remember the last instruction.", score: 55 },
      { text: "Call the person I'm meeting to warn them and stall.", score: 74 },
      { text: "Sit in the parking lot of wherever I am and rethink the day.", score: 92 },
    ],
  },
  {
    id: 25,
    scenario: "You notice a stranger sitting alone, visibly upset, in a public place. You:",
    answers: [
      { text: "Sit near them, gently ask if they're okay. Mean it.", score: 8 },
      { text: "Catch their eye, give a small nod that says 'I see you.'", score: 28 },
      { text: "Feel bad for them, think about saying something, keep walking.", score: 55 },
      { text: "Look away quickly — don't want to intrude.", score: 75 },
      { text: "Walk past without processing what I saw.", score: 94 },
    ],
  },
  {
    id: 26,
    scenario: "You wake up from a vivid, deeply weird dream. You:",
    answers: [
      { text: "Write it all down immediately — this is a story.", score: 6 },
      { text: "Tell someone about it. It's genuinely interesting, I think.", score: 26 },
      { text: "Spend five minutes trying to figure out what it means.", score: 52 },
      { text: "Notice it was weird, forget the details by breakfast.", score: 74 },
      { text: "Don't remember my dreams.", score: 93 },
    ],
  },
  {
    id: 27,
    scenario: "A friend shares an article that directly contradicts something you believe. You:",
    answers: [
      { text: "Read it fully, update my view if the evidence holds. My ego will survive.", score: 7 },
      { text: "Engage with it seriously, even if I end up disagreeing.", score: 28 },
      { text: "Skim it, feel vaguely unsettled, change nothing.", score: 55 },
      { text: "Send back a counter-article immediately.", score: 73 },
      { text: "React with a thumbs-up emoji and move on.", score: 92 },
    ],
  },
  {
    id: 28,
    scenario: "You're at an airport and your flight's delayed by two hours. You:",
    answers: [
      { text: "Find the most interesting-looking person nearby and start a conversation.", score: 6 },
      { text: "Explore the terminal, find food, settle into a good spot.", score: 26 },
      { text: "Find a seat, open my phone, power through the wait.", score: 52 },
      { text: "Feel mildly wronged and check the flight status every 12 minutes.", score: 74 },
      { text: "Sit at the gate and wait. That's what you do.", score: 93 },
    ],
  },
  {
    id: 29,
    scenario: "You overhear a fascinating conversation between strangers next to you at a café. You:",
    answers: [
      { text: "Lean slightly in their direction and eventually contribute a thought. Worth it.", score: 5 },
      { text: "Listen, try not to stare, feel like I'm watching a documentary.", score: 27 },
      { text: "Notice it briefly, then tune back into my own thing.", score: 53 },
      { text: "Put headphones in so I don't accidentally hear more.", score: 74 },
      { text: "I was already wearing headphones. I am sealed off.", score: 93 },
    ],
  },
  {
    id: 30,
    scenario: "Someone compliments something you made — a project, a meal, a playlist. You:",
    answers: [
      { text: "Accept it gracefully and tell them the story behind it.", score: 8 },
      { text: "Say 'thank you' and mean it.", score: 27 },
      { text: "Deflect slightly — 'oh it was nothing, really.'", score: 53 },
      { text: "Immediately list everything wrong with it.", score: 74 },
      { text: "Say thanks, feel nothing, move on.", score: 93 },
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
