import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const media = (query: string) => typeof window !== 'undefined' && window.matchMedia(query).matches;

export const reducedMotion = () => media('(prefers-reduced-motion: reduce)');

/** Touch-first devices get fewer particles and no custom cursor. */
export const coarsePointer = () => media('(pointer: coarse)') || !media('(hover: hover)');

/** A tiny event bus so the star canvas can react to things that happen anywhere on the page. */
type CosmosEvent = 'meteors' | 'shoot';

export const emit = (name: CosmosEvent) => window.dispatchEvent(new CustomEvent(`cosmos:${name}`));

export const on = (name: CosmosEvent, handler: () => void) => {
  const listener = () => handler();
  window.addEventListener(`cosmos:${name}`, listener);
  return () => window.removeEventListener(`cosmos:${name}`, listener);
};

export { gsap, ScrollTrigger, SplitText };
