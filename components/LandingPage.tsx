'use client';

import type { Archetype } from '@/lib/quiz-data';

type LandingPageProps = {
  onStart: () => void;
  archetypes: Archetype[];
  questionCount: number;
};

const PIXEL_PARTICLES = [
  { top: '12%', left: '7%', size: 5, color: '#8b5cf6', delay: '0s', duration: '4s' },
  { top: '22%', left: '88%', size: 4, color: '#06b6d4', delay: '0.8s', duration: '5.5s' },
  { top: '38%', left: '4%', size: 6, color: '#ec4899', delay: '1.4s', duration: '3.8s' },
  { top: '55%', left: '92%', size: 3, color: '#8b5cf6', delay: '0.3s', duration: '6s' },
  { top: '70%', left: '10%', size: 5, color: '#06b6d4', delay: '2.1s', duration: '4.5s' },
  { top: '80%', left: '85%', size: 4, color: '#a78bfa', delay: '1s', duration: '5s' },
  { top: '18%', left: '50%', size: 3, color: '#ec4899', delay: '3s', duration: '4.2s' },
  { top: '65%', left: '60%', size: 4, color: '#8b5cf6', delay: '1.7s', duration: '5.8s' },
];

const ARCHETYPE_GRADIENT_MAP: Record<string, string> = {
  'from-yellow-400 to-orange-500': 'from-yellow-400 to-orange-500',
  'from-green-400 to-teal-500': 'from-green-400 to-teal-500',
  'from-blue-400 to-indigo-500': 'from-blue-400 to-indigo-500',
  'from-purple-400 to-violet-500': 'from-purple-400 to-violet-500',
  'from-slate-400 to-gray-500': 'from-slate-400 to-gray-500',
  'from-zinc-400 to-stone-500': 'from-zinc-400 to-stone-500',
};

export default function LandingPage({ onStart, archetypes, questionCount }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f1a] text-white">
      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 overflow-hidden">
        {/* Pixel grid background */}
        <div className="absolute inset-0 pixel-grid" />

        {/* Radial glow blobs */}
        <div
          className="hero-glow absolute rounded-full pointer-events-none"
          style={{
            width: '600px',
            height: '600px',
            top: '50%',
            left: '50%',
            transform: 'translate(-60%, -55%)',
            background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)',
          }}
        />
        <div
          className="hero-glow absolute rounded-full pointer-events-none"
          style={{
            width: '400px',
            height: '400px',
            top: '50%',
            left: '50%',
            transform: 'translate(10%, 5%)',
            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
            animationDelay: '1.5s',
          }}
        />

        {/* Floating pixel particles */}
        {PIXEL_PARTICLES.map((p, i) => (
          <span
            key={i}
            className="pixel-float absolute pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-7 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-widest uppercase"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="w-1.5 h-1.5 rounded-none bg-violet-400 inline-block" />
            Trending Quiz
          </div>

          <h1
            className="glitch-text text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none"
            style={{ textShadow: '0 0 60px rgba(139,92,246,0.3)' }}
          >
            Are You an{' '}
            <span
              className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
            >
              NPC?
            </span>
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl max-w-md leading-relaxed">
            Take the quiz. Find out if you&apos;re living on autopilot.
          </p>

          <button
            onClick={onStart}
            className="group relative mt-2 px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-base tracking-wide hover:opacity-90 transition-all duration-200 cursor-pointer shadow-lg shadow-violet-900/40"
            style={{ boxShadow: '0 0 30px rgba(139,92,246,0.4), 0 4px 20px rgba(0,0,0,0.4)' }}
          >
            Start the Quiz
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </button>

          <p className="text-xs text-zinc-600">{questionCount} questions · No sign-up · No data collected</p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1">
          <span className="text-zinc-600 text-xs uppercase tracking-widest">scroll</span>
          <svg
            className="scroll-cue w-4 h-4 text-zinc-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── EXPLAINER ── */}
      <section className="px-6 py-20 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: '🎮',
              title: `${questionCount} Scenarios`,
              body: 'Everyday situations you\'ll definitely recognize. Your honest answers reveal more than you think.',
            },
            {
              icon: '🧠',
              title: '6 Archetypes',
              body: 'From Main Character to Decoration — discover which NPC type matches your patterns.',
            },
            {
              icon: '⚡',
              title: 'Instant Results',
              body: 'No email. No account. No data harvested. Just a snapshot of how scripted your life really is.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-3 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors duration-200"
            >
              <span className="text-3xl">{card.icon}</span>
              <h3 className="font-bold text-white text-base">{card.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CULTURAL HOOK ── */}
      <section className="px-6 py-16 max-w-3xl mx-auto w-full text-center">
        <div className="flex flex-col gap-6 p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 relative overflow-hidden">
          {/* Decorative glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 flex flex-col gap-4">
            <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest">
              The Internet Has a Theory
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              GTA 6 dropped a{' '}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                hyper-realistic NPC system
              </span>
              {' '}and people started asking the wrong question.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-2xl mx-auto">
              Instead of &ldquo;are the NPCs realistic?&rdquo; everyone started asking: <em className="text-zinc-200">what if I&rsquo;m one of them?</em>
              {' '}The same routes. The same lines. The same reactions on loop.
              This quiz was built to find out — with science-adjacent vibes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              {['#NPC', '#GTA6', '#AreYouAnNPC', '#MainCharacter'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHETYPE TEASERS ── */}
      <section className="px-6 py-16 max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center flex flex-col gap-2">
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium">Which one are you?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The 6 NPC Archetypes</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {archetypes.map((archetype) => (
              <div
                key={archetype.title}
                className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                onClick={onStart}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)',
                  }}
                />
                <span className="text-4xl" style={{ filter: 'drop-shadow(0 0 12px rgba(139,92,246,0.3))' }}>
                  {archetype.emoji}
                </span>
                <div className="flex flex-col items-center gap-1 text-center relative z-10">
                  <span className="font-bold text-white text-sm">{archetype.title}</span>
                  <span
                    className={`text-xs bg-gradient-to-r ${ARCHETYPE_GRADIENT_MAP[archetype.color] ?? 'from-violet-400 to-fuchsia-400'} bg-clip-text text-transparent font-medium leading-snug`}
                  >
                    {archetype.subtitle}
                  </span>
                </div>
                <span className="relative z-10 mt-1 text-xs text-zinc-600 group-hover:text-violet-400 transition-colors duration-200">
                  Take quiz to find out →
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="mt-2 px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-base hover:opacity-90 transition-opacity duration-200 cursor-pointer shadow-lg shadow-violet-900/30"
          >
            Find Out Which One You Are →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="mt-auto px-6 py-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span className="font-semibold text-zinc-500">areyouannpc.com</span>
          <div className="flex items-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Are you an NPC? Find out → areyouannpc.com #NPC #GTA6')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.859L1.254 2.25H8.08l4.214 5.571zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </a>
            <span>·</span>
            <span>Inspired by the GTA 6 NPC trend</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
