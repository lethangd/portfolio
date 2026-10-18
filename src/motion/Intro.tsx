import React, { useEffect, useRef, useState } from 'react';
import { coarsePointer, reducedMotion } from './env';

const SEEN_KEY = 'cosmos-intro-seen';

const hasSeenIntro = () => {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch (e) {
    return false;
  }
};

const markSeen = () => {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch (e) {
    /* storage unavailable: the intro simply plays again next time */
  }
};

const DURATION = 1250; // ms, the whole big bang
const REVEAL_AT = 520; // ms, when the page behind starts to show through

/**
 * "Big Bang": a point of light bursts and stars rush past like a jump to light speed.
 * Plays once per browser, never blocks content for more than ~0.5s, and can be skipped.
 */
const Intro: React.FC<{ onReveal: () => void }> = ({ onReveal }) => {
  const [active, setActive] = useState(() => !reducedMotion() && !hasSeenIntro());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const revealed = useRef(false);

  const reveal = () => {
    if (revealed.current) return;
    revealed.current = true;
    onReveal();
  };

  const finish = () => {
    markSeen();
    reveal();
    setActive(false);
  };

  useEffect(() => {
    if (!active) {
      reveal();
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = coarsePointer() ? 160 : 360;
    const particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        speed: 0.35 + Math.random() ** 1.5 * 2.2,
        r: 0.4 + Math.random() * 1.4,
        hue: Math.random() < 0.2 ? '243,182,255' : Math.random() < 0.5 ? '200,185,255' : '255,255,255',
      };
    });

    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.hypot(cx, cy);
    const start = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const t = (now - start) / DURATION;
      ctx.clearRect(0, 0, w, h);

      // Backdrop fades away once the burst is under way, revealing the page.
      const back = t < 0.42 ? 1 : Math.max(0, 1 - (t - 0.42) / 0.45);
      ctx.fillStyle = `rgba(7,4,15,${back})`;
      ctx.fillRect(0, 0, w, h);

      // The singularity: a point that swells and flashes.
      const core = t < 0.22 ? t / 0.22 : Math.max(0, 1 - (t - 0.22) / 0.3);
      if (core > 0) {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 + core * 180);
        glow.addColorStop(0, `rgba(255,255,255,${core})`);
        glow.addColorStop(0.25, `rgba(205,190,255,${core * 0.6})`);
        glow.addColorStop(1, 'rgba(110,58,220,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      // The burst: particles accelerate outward and stretch into light-speed streaks.
      if (t > 0.16) {
        const p = (t - 0.16) / 0.84;
        const eased = p * p * (3 - 2 * p);
        for (const s of particles) {
          const dist = eased * maxR * 1.25 * s.speed;
          const len = Math.min(dist * 0.45, 220) * (1 - p * 0.4);
          const x = cx + s.dx * dist;
          const y = cy + s.dy * dist;
          const alpha = Math.min(1, (1 - p) * 1.6);
          ctx.strokeStyle = `rgba(${s.hue},${alpha})`;
          ctx.lineWidth = s.r;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - s.dx * len, y - s.dy * len);
          ctx.stroke();
        }
      }

      if (now - start >= REVEAL_AT) reveal();
      if (t < 1) raf = requestAnimationFrame(frame);
      else finish();
    };

    raf = requestAnimationFrame(frame);
    const skip = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return null;

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[100]" onClick={finish}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <button
        onClick={finish}
        className="absolute bottom-6 right-6 rounded-full border border-white/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white"
      >
        Skip intro
      </button>
    </div>
  );
};

export default Intro;
