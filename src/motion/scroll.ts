import Lenis from 'lenis';
import { gsap, ScrollTrigger, reducedMotion } from './env';

let lenis: Lenis | null = null;

/** Smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis stay in lockstep. */
export const startSmoothScroll = () => {
  if (lenis || reducedMotion()) return () => {};

  const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  const raf = (time: number) => instance.raf(time * 1000);
  instance.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  lenis = instance;

  return () => {
    gsap.ticker.remove(raf);
    instance.destroy();
    lenis = null;
  };
};

export const scrollToId = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
  else target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
};

export const lockScroll = (locked: boolean) => {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
};
