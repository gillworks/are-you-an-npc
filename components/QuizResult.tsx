'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import type { Archetype } from '@/lib/quiz-data';

type QuizResultProps = {
  score: number;
  archetype: Archetype;
  answers: number[];
  onRetake: () => void;
};

// Maps Tailwind gradient classes to canvas-compatible hex pairs
const ARCHETYPE_HEX: Record<string, [string, string]> = {
  'from-yellow-400 to-orange-500': ['#facc15', '#f97316'],
  'from-green-400 to-teal-500': ['#4ade80', '#14b8a6'],
  'from-blue-400 to-indigo-500': ['#60a5fa', '#6366f1'],
  'from-purple-400 to-violet-500': ['#c084fc', '#8b5cf6'],
  'from-slate-400 to-gray-500': ['#94a3b8', '#6b7280'],
  'from-zinc-400 to-stone-500': ['#a1a1aa', '#78716c'],
};

function getHexColors(color: string): [string, string] {
  return ARCHETYPE_HEX[color] ?? ['#8b5cf6', '#ec4899'];
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
): void {
  const words = text.split(' ');
  let line = '';
  let y = startY;
  let linesDrawn = 0;
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
      linesDrawn++;
      if (linesDrawn >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && linesDrawn < maxLines) ctx.fillText(line, x, y);
}

export default function QuizResult({ score, archetype, answers, onRetake }: QuizResultProps) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Count answers that lean NPC (score >= 70)
  const npcAnswerCount = answers.filter((s) => s >= 70).length;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;

    const [c1, c2] = getHexColors(archetype.color);

    // Background
    ctx.fillStyle = '#0f0f1a';
    ctx.fillRect(0, 0, W, H);

    // Left-side gradient panel
    const panelGrad = ctx.createLinearGradient(0, 0, W * 0.46, H);
    panelGrad.addColorStop(0, c1 + '33');
    panelGrad.addColorStop(1, '#0f0f1a00');
    ctx.fillStyle = panelGrad;
    ctx.fillRect(0, 0, W * 0.46, H);

    // Soft glow behind emoji
    const glow = ctx.createRadialGradient(W * 0.23, H * 0.44, 0, W * 0.23, H * 0.44, 240);
    glow.addColorStop(0, c1 + '44');
    glow.addColorStop(1, '#0f0f1a00');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W * 0.46, H);

    // Divider line
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W * 0.46, 60);
    ctx.lineTo(W * 0.46, H - 60);
    ctx.stroke();

    // Emoji
    ctx.font = '130px serif';
    ctx.textAlign = 'center';
    ctx.fillText(archetype.emoji, W * 0.23, H * 0.45);

    // Score pill
    const pillX = W * 0.23 - 110;
    const pillY = H * 0.63;
    const pillW = 220;
    const pillH = 42;
    const pillGrad = ctx.createLinearGradient(pillX, 0, pillX + pillW, 0);
    pillGrad.addColorStop(0, c1);
    pillGrad.addColorStop(1, c2);
    ctx.fillStyle = pillGrad;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, pillH / 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px system-ui, -apple-system, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`NPC SCORE: ${score} / 100`, W * 0.23, pillY + 27);

    // Right side — Archetype title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px system-ui, -apple-system, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(archetype.title, W * 0.5, H * 0.3);

    // Subtitle
    const subGrad = ctx.createLinearGradient(W * 0.5, 0, W * 0.92, 0);
    subGrad.addColorStop(0, c1);
    subGrad.addColorStop(1, c2);
    ctx.fillStyle = subGrad;
    ctx.font = '26px system-ui, -apple-system, Arial, sans-serif';
    ctx.fillText(archetype.subtitle, W * 0.5, H * 0.42);

    // Description (wrapped)
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '20px system-ui, -apple-system, Arial, sans-serif';
    wrapText(ctx, archetype.description, W * 0.5, H * 0.545, W * 0.44, 30, 4);

    // Score bar
    const barX = W * 0.5;
    const barY = H * 0.76;
    const barW = W * 0.42;
    const barH = 10;
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, barH / 2);
    ctx.fill();
    const barFill = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    barFill.addColorStop(0, c1);
    barFill.addColorStop(1, c2);
    ctx.fillStyle = barFill;
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW * (score / 100), barH, barH / 2);
    ctx.fill();
    ctx.fillStyle = '#52525b';
    ctx.font = '14px system-ui, -apple-system, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Main Character', barX, barY + 28);
    ctx.textAlign = 'right';
    ctx.fillText('Full NPC', barX + barW, barY + 28);

    // Branding
    ctx.fillStyle = '#3f3f46';
    ctx.font = '18px system-ui, -apple-system, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('areyouannpc.com', W - 48, H - 32);
  }, [score, archetype]);

  useEffect(() => {
    drawCard();
  }, [drawCard]);

  function downloadCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `npc-${archetype.title.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function shareOnTwitter() {
    const text = `I got "${archetype.title}" on the Are You an NPC? quiz!\nNPC Score: ${score}/100 — ${archetype.subtitle}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={`w-full flex flex-col items-center gap-7 text-center transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {/* Archetype reveal */}
      <div className="flex flex-col items-center gap-3">
        <span
          className="text-7xl"
          style={{ filter: 'drop-shadow(0 0 28px rgba(139,92,246,0.45))' }}
        >
          {archetype.emoji}
        </span>
        <div
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gradient-to-r ${archetype.color} text-white`}
        >
          NPC Score: {score} / 100
        </div>
      </div>

      {/* Title + subtitle */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">{archetype.title}</h2>
        <p
          className={`text-base font-medium bg-gradient-to-r ${archetype.color} bg-clip-text text-transparent`}
        >
          {archetype.subtitle}
        </p>
      </div>

      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm">
        {archetype.description}
      </p>

      {/* Score meter */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-xs text-zinc-500 mb-2">
          <span>Main Character</span>
          <span>Full NPC</span>
        </div>
        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${archetype.color} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: visible ? `${score}%` : '0%' }}
          />
        </div>
      </div>

      {/* Fun stat */}
      <p className="text-zinc-500 text-sm -mt-2">
        You answered like an NPC on{' '}
        <span className="text-white font-semibold">
          {npcAnswerCount}/{answers.length}
        </span>{' '}
        questions.
      </p>

      {/* Share buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={shareOnTwitter}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.859L1.254 2.25H8.08l4.214 5.571zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </button>
        <button
          onClick={copyLink}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-200 cursor-pointer"
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4 shrink-0 text-green-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>

      {/* Download card */}
      <button
        onClick={downloadCard}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200 cursor-pointer -mt-1"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download card image
      </button>

      {/* Retake */}
      <button
        onClick={onRetake}
        className="mt-1 px-8 py-3 rounded-full bg-zinc-800 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-700 hover:border-zinc-500 transition-all duration-200 cursor-pointer"
      >
        Retake the quiz
      </button>

      {/* Hidden canvas used for card generation */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}
