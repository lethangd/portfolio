import React, { useEffect, useRef } from 'react';
import { coarsePointer, on, reducedMotion } from './env';

interface Star {
  x: number; // position relative to screen centre, in px
  y: number;
  depth: number; // 0.15 (far) … 1 (near)
  r: number;
  phase: number;
  tint: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  len: number;
}

const TINTS = ['255,255,255', '255,255,255', '230,220,255', '210,200,255', '243,182,255'];

/**
 * The living backdrop: layered stars that shift with the mouse (parallax),
 * stretch into warp streaks when the page scrolls fast, and host meteors.
 * Everything is one canvas; the loop pauses while the tab is hidden.
 */
const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = reducedMotion();
    const mobile = coarsePointer();
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    const meteors: Meteor[] = [];

    const spawn = (anywhere: boolean): Star => {
      const spread = anywhere ? 1 : 0.12;
      return {
        x: (Math.random() - 0.5) * w * spread * 1.1,
        y: (Math.random() - 0.5) * h * spread * 1.1,
        depth: 0.15 + Math.random() ** 2 * 0.85,
        r: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
      };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((w * h) / (1440 * 900)) * (mobile ? 140 : 280));
      stars = Array.from({ length: Math.max(80, Math.min(count, 420)) }, () => spawn(true));
    };
    resize();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / w - 0.5) * 2;
      mouse.ty = (e.clientY / h - 0.5) * 2;
    };

    let lastScroll = window.scrollY;
    let velocity = 0;

    const addMeteor = (fromTop = false) => {
      const angle = (Math.PI / 180) * (200 + Math.random() * 20);
      const speed = 14 + Math.random() * 10;
      meteors.push({
        x: fromTop ? Math.random() * w * 1.2 : w * (0.75 + Math.random() * 0.2),
        y: fromTop ? -20 - Math.random() * h * 0.3 : h * (0.08 + Math.random() * 0.15),
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed * 0.55 + (fromTop ? 4 : 2),
        life: 0,
        max: 60 + Math.random() * 30,
        len: 120 + Math.random() * 120,
      });
    };

    let showerLeft = 0;
    const offShoot = on('shoot', () => addMeteor(false));
    const offShower = on('meteors', () => {
      showerLeft = 46;
    });

    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      const scrollY = window.scrollY;
      const delta = scrollY - lastScroll;
      lastScroll = scrollY;
      velocity += (delta - velocity) * 0.18;
      const warp = still ? 0 : Math.min(Math.abs(velocity), 90);

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const cx = w / 2;
      const cy = h / 2;

      for (const s of stars) {
        if (warp > 0.4) {
          // Fly forward: stars rush outward from the centre, nearer ones faster.
          const dist = Math.hypot(s.x, s.y) || 1;
          const push = warp * s.depth * 0.06 * (0.3 + dist / Math.max(w, h));
          s.x += (s.x / dist) * push * 6;
          s.y += (s.y / dist) * push * 6;
          if (Math.abs(s.x) > w * 0.6 || Math.abs(s.y) > h * 0.6) Object.assign(s, spawn(false));
        }

        const px = cx + s.x - mouse.x * 26 * s.depth;
        const py = cy + s.y - mouse.y * 18 * s.depth;
        const twinkle = still ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.02 + s.phase);
        const alpha = (0.25 + s.depth * 0.75) * twinkle;

        if (warp > 1.2) {
          const dist = Math.hypot(s.x, s.y) || 1;
          const len = Math.min(warp * s.depth * 2.4, 160);
          ctx.strokeStyle = `rgba(${s.tint},${alpha})`;
          ctx.lineWidth = s.r * s.depth * 1.4;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - (s.x / dist) * len, py - (s.y / dist) * len);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${s.tint},${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, s.r * (0.6 + s.depth), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (showerLeft > 0 && t % 3 === 0) {
        addMeteor(true);
        showerLeft -= 1;
      }

      for (let i = meteors.length - 1; i >= 0; i -= 1) {
        const m = meteors[i];
        m.life += 1;
        m.x += m.vx;
        m.y += m.vy;
        const fade = 1 - m.life / m.max;
        if (fade <= 0) {
          meteors.splice(i, 1);
          continue;
        }
        const speed = Math.hypot(m.vx, m.vy);
        const tx = m.x - (m.vx / speed) * m.len;
        const ty = m.y - (m.vy / speed) * m.len;
        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, `rgba(255,255,255,${fade})`);
        grad.addColorStop(0.3, `rgba(220,200,255,${fade * 0.5})`);
        grad.addColorStop(1, 'rgba(185,166,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${fade})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      lastScroll = window.scrollY;
      raf = requestAnimationFrame(draw);
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    // Let the first paint and the hero settle before the backdrop starts drawing.
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const boot = window.setTimeout(() => (idle ? idle(start, { timeout: 1200 }) : start()), 250);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearTimeout(boot);
      cancelAnimationFrame(raf);
      offShoot();
      offShower();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
};

export default Starfield;
