import { gsap, reducedMotion, ScrollTrigger } from './env';

/** Elements marked data-reveal drift up into place as they arrive; reduced motion gets a plain fade. */
export const setupReveals = (scope: Element) => {
  const still = reducedMotion();
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-reveal]', scope).forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: still ? 0 : 48,
        duration: still ? 0.4 : 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  }, scope);
  ScrollTrigger.refresh();
  return () => ctx.revert();
};
