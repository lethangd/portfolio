import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Starfield from './motion/Starfield';
import Intro from './motion/Intro';
import Cursor from './motion/Cursor';
import { ScrollTrigger } from './motion/env';
import { setupReveals } from './motion/reveal';
import { startSmoothScroll } from './motion/scroll';
import { installEasterEggs } from './motion/easterEggs';

const BelowFold = lazy(() => import('./components/BelowFold'));

/** Soft nebulae drifting behind the content, placed down the length of the page. */
const nebulae = [
  { style: { top: '-2%', left: '-14%', width: 900, height: 900 }, color: '110,58,220', a: 0.42 },
  { style: { top: '1%', right: '-15%', width: 900, height: 900 }, color: '196,72,190', a: 0.24 },
  { style: { top: '23%', left: '20%', width: 1100, height: 700 }, color: '76,52,200', a: 0.3 },
  { style: { top: '37%', left: '-15%', width: 1000, height: 900 }, color: '170,70,210', a: 0.22 },
  { style: { top: '50%', right: '-10%', width: 900, height: 900 }, color: '150,60,210', a: 0.24 },
  { style: { bottom: '-3%', left: '-10%', width: 1200, height: 800 }, color: '100,64,230', a: 0.36 },
];

function App() {
  const [revealed, setRevealed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stopScroll = startSmoothScroll();
    const removeEggs = installEasterEggs();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      stopScroll();
      removeEggs();
    };
  }, []);

  // The hero's own stats reveal here; the lazy sections set up theirs when they mount.
  useLayoutEffect(() => {
    const hero = rootRef.current?.querySelector('#top');
    return hero ? setupReveals(hero) : undefined;
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-clip bg-space text-white">
      <Starfield />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {nebulae.map((n, i) => (
          <div
            key={i}
            className="absolute max-w-[160vw] rounded-full"
            style={{
              ...n.style,
              background: `radial-gradient(closest-side, rgba(${n.color},${n.a}), rgba(${n.color},0) 72%)`,
            }}
          />
        ))}
      </div>

      <Intro onReveal={() => setRevealed(true)} />
      <Cursor />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero revealed={revealed} />
          <Suspense fallback={<div className="min-h-screen" />}>
            <BelowFold />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
