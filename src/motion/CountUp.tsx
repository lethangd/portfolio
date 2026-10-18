import React, { useEffect, useRef } from 'react';
import { gsap, reducedMotion, ScrollTrigger } from './env';

/** Counts from 0 to `value` the first time it scrolls into view. */
const CountUp: React.FC<{ value: number; suffix?: string; className?: string }> = ({ value, suffix = '', className }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const counter = { n: 0 };
    el.textContent = `0${suffix}`;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(counter, {
          n: value,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = `${Math.round(counter.n)}${suffix}`;
          },
        }),
    });
    return () => {
      trigger.kill();
      el.textContent = `${value}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
};

export default CountUp;
