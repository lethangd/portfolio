import React, { useLayoutEffect, useRef } from 'react';
import TechRing from './TechRing';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Education from './Education';
import Contact from './Contact';
import { setupReveals } from '../motion/reveal';

/** Everything after the hero, loaded as its own chunk so the first screen paints sooner. */
const BelowFold: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => (ref.current ? setupReveals(ref.current) : undefined), []);

  return (
    <div ref={ref}>
      <TechRing />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
};

export default BelowFold;
