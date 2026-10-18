import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { facts, heroOrbit, profile, stats } from '../data';
import CountUp from '../motion/CountUp';
import { coarsePointer, gsap, reducedMotion, SplitText } from '../motion/env';
import { scrollToId } from '../motion/scroll';
import { CopyEmail, Icon } from './ui';

const Hero: React.FC<{ revealed: boolean }> = ({ revealed }) => {
  const rootRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const splitRef = useRef<SplitText | null>(null);

  // Hide the pieces that will animate before the first paint, so nothing flashes.
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    ctxRef.current = gsap.context(() => {
      if (nameRef.current) {
        splitRef.current = SplitText.create(nameRef.current, { type: 'chars' });
        // A sliver of opacity keeps the name painted from the first frame (and counted as LCP).
        gsap.set(splitRef.current.chars, { opacity: 0.02, y: 40, filter: 'blur(14px)' });
      }
      gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
      gsap.set(orbitRef.current, { opacity: 0, scale: 0.86, rotate: -8 });
    }, rootRef);
    return () => {
      ctxRef.current?.revert();
      splitRef.current?.revert();
    };
  }, []);

  // Once the intro opens up, the name sharpens letter by letter and the rest settles in.
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!revealed || !ctx) return;
    ctx.add(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (splitRef.current) {
        tl.to(splitRef.current.chars, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.045 });
      }
      tl.to(orbitRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: 'expo.out' }, 0.05);
      tl.to('[data-hero-fade]', { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.25);
    });
  }, [revealed]);

  // The portrait system drifts gently against the mouse for depth.
  useEffect(() => {
    const el = orbitRef.current?.parentElement;
    if (!el || coarsePointer() || reducedMotion()) return;
    const x = gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' });
    const move = (e: PointerEvent) => {
      x((e.clientX / window.innerWidth - 0.5) * -24);
      y((e.clientY / window.innerHeight - 0.5) * -18);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <section id="top" ref={rootRef} className="page-x relative pb-14 pt-28 md:pt-32">
      <div className="flex flex-wrap items-center gap-10">
        <div className="min-w-0 flex-[999_1_520px]">
          <div
            data-hero-fade
            className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-2 pl-3 pr-4 text-[13px] text-pale"
          >
            <span className="pulse-live h-2 w-2 rounded-full bg-live" />
            Open to opportunities · now at <span className="font-medium text-white">MB Bank</span>
          </div>

          <h1
            ref={nameRef}
            className="glow-text mt-8 font-serif text-[clamp(72px,10vw,156px)] font-extralight leading-[0.92] tracking-[-0.02em]"
          >
            Lê Minh
            <br />
            <em className="font-extralight">Thắng</em>
          </h1>

          <p data-hero-fade className="mt-7 font-mono text-[13px] uppercase tracking-[0.2em] text-lav">
            Fullstack Developer · Backend-heavy
          </p>
          <p
            data-hero-fade
            className="mt-[18px] max-w-[600px] font-serif text-[clamp(24px,2.6vw,34px)] font-light italic leading-[1.3]"
          >
            I build systems banks and hospitals trust — and ship real products on the side.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
            <a
              href="#work"
              data-magnetic
              onClick={(e) => {
                e.preventDefault();
                scrollToId('work');
              }}
              className="btn-light"
            >
              Explore my work <Icon name="arrow" />
            </a>
            <CopyEmail className="btn-outline" />
          </div>
        </div>

        <div className="flex flex-[1_1_440px] justify-center">
          <div ref={orbitRef} className="relative aspect-square w-[min(600px,84%)] sm:w-[min(600px,100%)]">
            <div className="spin-70 absolute inset-0 rounded-full border border-dashed border-white/20">
              {heroOrbit.outer.map((o) => (
                <span key={o.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: o.x, top: o.y }}>
                  <span className="spin-70r inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-[rgba(20,12,40,0.82)] px-3 py-[7px] font-mono text-xs shadow-[0_0_18px_rgba(185,166,255,0.35)]">
                    <span className="h-[5px] w-[5px] rounded-full bg-lav" />
                    {o.label}
                  </span>
                </span>
              ))}
            </div>
            <div className="spin-45 absolute inset-[12%] rounded-full border border-white/[0.14]">
              {heroOrbit.inner.map((o) => (
                <span key={o.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: o.x, top: o.y }}>
                  <span className="spin-45r inline-flex whitespace-nowrap rounded-full border border-white/20 bg-[rgba(20,12,40,0.82)] px-[11px] py-1.5 font-mono text-[11px] text-pale">
                    {o.label}
                  </span>
                </span>
              ))}
            </div>
            <div aria-hidden="true" className="spin-30 absolute inset-[20%] rounded-full border border-dashed border-lav/30">
              <span className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.85)]" />
              <span className="absolute bottom-[12%] right-[6%] h-1.5 w-1.5 rounded-full bg-pinkstar shadow-[0_0_10px_3px_rgba(243,182,255,0.8)]" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-[22%] scale-125 rounded-full"
              style={{ background: 'radial-gradient(closest-side, rgba(150,110,255,0.55), rgba(150,110,255,0))' }}
            />
            <div className="absolute inset-[24%] overflow-hidden rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_0_0_10px_rgba(255,255,255,0.06),0_0_80px_16px_rgba(140,100,255,0.5)]">
              <img src={profile.portrait} alt="Portrait of Lê Minh Thắng" className="h-full w-full object-cover object-top" />
            </div>
          </div>
        </div>
      </div>

      <dl data-hero-fade className="glass mt-14 grid overflow-hidden rounded-3xl [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
        {facts.map((f) => (
          <div key={f.k} className="border-r border-white/[0.08] px-6 py-[22px]">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{f.k}</dt>
            <dd className="mt-2 text-base font-normal leading-snug">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 grid border-y border-white/[0.12] [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
        {stats.map((s) => (
          <div key={s.label} data-reveal className="py-9 pr-6">
            <CountUp
              value={s.value}
              suffix={s.suffix}
              className="block font-serif text-[76px] font-extralight leading-none [text-shadow:0_0_28px_rgba(185,166,255,0.55)]"
            />
            <p className="mt-3 text-[15px] leading-normal text-soft">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
