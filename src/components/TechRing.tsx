import React, { useEffect, useRef, useState } from 'react';
import { techRing } from '../data';
import { reducedMotion } from '../motion/env';

const DOTS = ['#B9A6FF', '#F3B6FF', '#8FD8FF', '#FFFFFF'];
const BASE_SPEED = -0.13; // degrees per frame ≈ one turn every 46s

/**
 * A ring of real tools orbiting a planet. Drag or swipe to spin it (it coasts to a stop
 * with inertia); hover or tap a chip to stop the ring and see where that tool was used.
 */
const TechRing: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [radius, setRadius] = useState(570);
  const state = useRef({ angle: 0, velocity: BASE_SPEED, dragging: false, lastX: 0, paused: false, moved: 0 });

  useEffect(() => {
    state.current.paused = active !== null;
  }, [active]);

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;
    const s = state.current;
    const still = reducedMotion();

    const fit = () => setRadius(Math.max(240, Math.min(570, stage.clientWidth * 0.42)));
    fit();
    window.addEventListener('resize', fit);

    let raf = 0;
    let visible = false;
    const tick = () => {
      if (!s.dragging) {
        if (s.paused) s.velocity *= 0.85;
        else s.velocity += ((still ? 0 : BASE_SPEED) - s.velocity) * 0.02;
        s.angle += s.velocity;
      }
      ring.style.transform = `rotateX(-13deg) rotateY(${s.angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    observer.observe(stage);

    const down = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.moved = 0;
    };
    const move = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      s.lastX = e.clientX;
      s.moved += Math.abs(dx);
      // Capture only once it is clearly a drag, so a plain tap still reaches the chip.
      if (s.moved > 6 && !stage.hasPointerCapture(e.pointerId)) stage.setPointerCapture(e.pointerId);
      s.angle += dx * 0.25;
      s.velocity = dx * 0.25;
      if (s.moved > 6) setActive(null);
    };
    const up = (e: PointerEvent) => {
      s.dragging = false;
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
    };
    stage.addEventListener('pointerdown', down);
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerup', up);
    stage.addEventListener('pointercancel', up);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', fit);
      stage.removeEventListener('pointerdown', down);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerup', up);
      stage.removeEventListener('pointercancel', up);
    };
  }, []);

  const current = active !== null ? techRing[active] : null;

  return (
    <section aria-label="Tech universe" className="relative pb-2 pt-6">
      <div data-reveal className="page-x text-center">
        <p className="eyebrow">My tech universe</p>
        <p className="mt-3 font-serif text-[clamp(22px,2.4vw,30px)] font-light italic">Twenty tools, always in orbit.</p>
        <p className="mt-2 font-mono text-[11px] text-muted">Drag to spin · hover a tool to see where I used it</p>
      </div>

      <div
        ref={stageRef}
        className="relative h-[520px] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing [perspective-origin:50%_35%] [perspective:1600px]"
        data-cursor
      >
        <div className="absolute left-1/2 top-[40%] h-0 w-0 [transform-style:preserve-3d]">
          <div
            aria-hidden="true"
            className="planet-glow absolute -left-[120px] -top-[120px] h-[240px] w-[240px] rounded-full"
            style={{
              background: 'radial-gradient(circle at 34% 30%, #F1ECFF 0%, #B9A6FF 18%, #6B46E8 48%, #2A1270 78%, #12062E 100%)',
            }}
          />
          <div ref={ringRef} className="absolute left-0 top-0 [transform-style:preserve-3d]" style={{ transform: 'rotateX(-13deg)' }}>
            <div
              aria-hidden="true"
              className="absolute rounded-full border border-lav/30"
              style={{ left: -radius + 30, top: -radius + 30, width: (radius - 30) * 2, height: (radius - 30) * 2, transform: 'rotateX(90deg)' }}
            />
            <div
              aria-hidden="true"
              className="absolute rounded-full border border-dashed border-white/[0.12]"
              style={{ left: -radius - 30, top: -radius - 30, width: (radius + 30) * 2, height: (radius + 30) * 2, transform: 'rotateX(90deg)' }}
            />
            {techRing.map((t, i) => (
              <span
                key={t.label}
                className="absolute left-0 top-0 [backface-visibility:hidden]"
                style={{ transform: `rotateY(${(i * 360) / techRing.length}deg) translateZ(${radius}px) translate(-50%, -50%)` }}
              >
                <button
                  type="button"
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setActive(null)}
                  onClick={() => state.current.moved < 6 && setActive(active === i ? null : i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  aria-label={`${t.label}: used at ${t.usedAt.join(', ')}`}
                  className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-5 py-3 text-[17px] font-medium transition-[background-color,border-color,box-shadow] duration-300 ${
                    active === i
                      ? 'border-white bg-white text-deep shadow-[0_0_40px_rgba(255,255,255,0.7)]'
                      : 'border-white/25 bg-[rgba(22,12,46,0.86)] text-white shadow-[0_0_28px_rgba(150,110,255,0.4)]'
                  }`}
                >
                  <span
                    className="h-[7px] w-[7px] rounded-full"
                    style={{ background: DOTS[i % DOTS.length], boxShadow: `0 0 10px 2px ${DOTS[i % DOTS.length]}` }}
                  />
                  {t.label}
                </button>
              </span>
            ))}
          </div>
        </div>

        <div
          aria-live="polite"
          className="pointer-events-none absolute left-1/2 top-[40%] flex w-[220px] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
        >
          {current && (
            <span className="flex flex-col items-center rounded-2xl bg-deep/75 px-4 py-3 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-pale">Used at</span>
              <span className="mt-1 font-serif text-2xl font-light text-white">{current.label}</span>
              <span className="mt-2 text-[13px] leading-snug text-white">{current.usedAt.join(' · ')}</span>
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechRing;
