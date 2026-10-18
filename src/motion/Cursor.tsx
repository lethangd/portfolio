import React, { useEffect, useRef, useState } from 'react';
import { coarsePointer, gsap, reducedMotion } from './env';

const INTERACTIVE = 'a, button, [data-cursor]';

/**
 * A small star follows the pointer and sheds stardust. Over links and buttons it
 * blooms into a halo, and anything marked data-magnetic is pulled toward it.
 * Fine pointers only; touch devices keep the system behaviour.
 */
const Cursor: React.FC = () => {
  const [enabled] = useState(() => !coarsePointer() && !reducedMotion());
  const starRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const star = starRef.current;
    const halo = haloRef.current;
    const canvas = dustRef.current;
    const ctx = canvas?.getContext('2d');
    if (!star || !halo || !canvas || !ctx) return;

    document.documentElement.classList.add('has-cursor');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const starX = gsap.quickTo(star, 'x', { duration: 0.12, ease: 'power3' });
    const starY = gsap.quickTo(star, 'y', { duration: 0.12, ease: 'power3' });
    const haloX = gsap.quickTo(halo, 'x', { duration: 0.35, ease: 'power3' });
    const haloY = gsap.quickTo(halo, 'y', { duration: 0.35, ease: 'power3' });

    const dust: { x: number; y: number; vx: number; vy: number; life: number; r: number }[] = [];
    let last = { x: -100, y: -100 };
    let magnet: HTMLElement | null = null;
    let raf = 0;
    let running = false;

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = dust.length - 1; i >= 0; i -= 1) {
        const d = dust[i];
        d.life -= 0.022;
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.015;
        if (d.life <= 0) {
          dust.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(215,200,255,${d.life * 0.8})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * d.life, 0, Math.PI * 2);
        ctx.fill();
      }
      if (dust.length) raf = requestAnimationFrame(loop);
      else running = false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = e;
      starX(x);
      starY(y);
      haloX(x);
      haloY(y);
      gsap.to([star, halo], { opacity: 1, duration: 0.2, overwrite: 'auto' });

      const moved = Math.hypot(x - last.x, y - last.y);
      const spawn = Math.min(4, Math.floor(moved / 9));
      for (let i = 0; i < spawn; i += 1) {
        dust.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          life: 1,
          r: 0.8 + Math.random() * 1.6,
        });
      }
      last = { x, y };
      if (!running && dust.length) {
        running = true;
        raf = requestAnimationFrame(loop);
      }

      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const dx = x - (rect.left + rect.width / 2);
        const dy = y - (rect.top + rect.height / 2);
        gsap.to(magnet, { x: dx * 0.3, y: dy * 0.35, duration: 0.4, ease: 'power3.out' });
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(INTERACTIVE);
      gsap.to(halo, { scale: interactive ? 1 : 0.35, opacity: interactive ? 1 : 0.6, duration: 0.35, ease: 'power3.out' });
      gsap.to(star, { scale: interactive ? 0.6 : 1, duration: 0.3 });
      const nextMagnet = target.closest<HTMLElement>('[data-magnetic]');
      if (magnet && magnet !== nextMagnet) {
        gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
      }
      magnet = nextMagnet;
    };

    const onLeave = () => gsap.to([star, halo], { opacity: 0, duration: 0.2 });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={dustRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] h-full w-full" />
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[91] -ml-6 -mt-6 h-12 w-12 rounded-full border border-lav/70 opacity-0"
        style={{ transform: 'scale(0.35)', boxShadow: '0 0 24px rgba(185,166,255,0.45), inset 0 0 12px rgba(185,166,255,0.25)' }}
      />
      <div ref={starRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[92] -ml-2 -mt-2 h-4 w-4 opacity-0">
        <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))' }}>
          <path d="M12 0 13.6 10.4 24 12 13.6 13.6 12 24 10.4 13.6 0 12 10.4 10.4z" fill="#fff" />
        </svg>
      </div>
    </>
  );
};

export default Cursor;
