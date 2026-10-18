import React, { useEffect, useRef } from 'react';
import { coarsePointer, gsap, reducedMotion } from './env';

/**
 * Tilts its child in 3D toward the pointer and sweeps a glare across it.
 * The glare follows the --gx/--gy custom properties set here.
 */
const Tilt: React.FC<{ children: React.ReactNode; className?: string; max?: number }> = ({
  children,
  className = '',
  max = 8,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || coarsePointer() || reducedMotion()) return;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    gsap.set(el, { transformPerspective: 1000 });

    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      ry((px - 0.5) * max * 2);
      rx((0.5 - py) * max * 2);
      el.style.setProperty('--gx', `${px * 100}%`);
      el.style.setProperty('--gy', `${py * 100}%`);
      el.style.setProperty('--go', '1');
    };
    const leave = () => {
      rx(0);
      ry(0);
      el.style.setProperty('--go', '0');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [max]);

  return (
    <div ref={ref} className={`relative [transform-style:preserve-3d] ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: 'var(--go, 0)',
          background:
            'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.18), rgba(185,166,255,0.08) 35%, transparent 60%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default Tilt;
