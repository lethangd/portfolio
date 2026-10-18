import React, { useLayoutEffect, useRef, useState } from 'react';
import { experiences } from '../data';
import { gsap, reducedMotion } from '../motion/env';
import { SectionHeader, Sparkle } from './ui';

type Point = { x: number; y: number }; // percentages of the constellation box

/** Oldest first: the path the constellation traces. */
const majors = [
  { name: 'VNPT-IT', period: '2023 — 2024', at: { x: 10, y: 70 }, align: 'left', halo: 'rgba(185,166,255,0.45)' },
  { name: 'Medicia', period: '2024 — 2026', at: { x: 48, y: 26 }, align: 'center', halo: 'rgba(243,182,255,0.45)' },
  { name: 'MB Bank', period: '2026 — now', at: { x: 88, y: 58 }, align: 'right', halo: 'rgba(185,166,255,0.7)' },
] as const;

const minors = [
  { label: 'HMIS', at: { x: 21, y: 92 }, parent: 0 },
  { label: 'NUHS CARE PLAN', at: { x: 36, y: 6 }, parent: 1 },
  { label: 'SAVANNA', at: { x: 63, y: 8 }, parent: 1 },
  { label: 'BPM KHDN', at: { x: 76, y: 88 }, parent: 2 },
];

const stations = [...experiences].reverse();

const segment = (a: Point, b: Point, size: { w: number; h: number }) => {
  const x1 = (a.x / 100) * size.w;
  const y1 = (a.y / 100) * size.h;
  const x2 = (b.x / 100) * size.w;
  const y2 = (b.y / 100) * size.h;
  return {
    left: x1,
    top: y1,
    width: Math.hypot(x2 - x1, y2 - y1),
    angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
  };
};

/** A faint guide line between two stars, laid out in pixels so it stays crisp at any size. */
const Line: React.FC<{ from: Point; to: Point; size: { w: number; h: number }; dashed?: boolean }> = ({
  from,
  to,
  size,
  dashed,
}) => {
  const s = segment(from, to, size);
  return (
    <div
      aria-hidden="true"
      className="absolute origin-left"
      style={{ left: s.left, top: s.top, width: s.width, transform: `rotate(${s.angle}deg)` }}
    >
      <div className={dashed ? 'border-t border-dashed border-white/20' : 'h-px bg-white/[0.12]'} />
    </div>
  );
};

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [still] = useState(reducedMotion);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => setSize({ w: box.clientWidth, h: box.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  // Pin the constellation and let scrolling draw the career path, star by star.
  useLayoutEffect(() => {
    if (still || !size.w) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      gsap.set(q('[data-line]'), { scaleX: 0 });
      gsap.set(q('[data-star="1"], [data-star="2"]'), { opacity: 0.25, scale: 0.55 });
      gsap.set(q('[data-minor="1"], [data-minor="2"]'), { opacity: 0 });
      gsap.set(q('[data-card="1"], [data-card="2"]'), { opacity: 0, x: 140, rotateY: -25 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      [1, 2].forEach((i) => {
        tl.to(q(`[data-line="${i}"]`), { scaleX: 1, duration: 1 })
          .to(q(`[data-star="${i}"]`), { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(3)' })
          .to(q(`[data-minor="${i}"]`), { opacity: 1, duration: 0.25, stagger: 0.08 }, '<')
          .to(q(`[data-card="${i - 1}"]`), { opacity: 0, x: -140, rotateY: 25, duration: 0.45, ease: 'power2.in' }, '<-0.1')
          .to(q(`[data-card="${i}"]`), { opacity: 1, x: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' }, '>-0.15');
      });
      tl.to({}, { duration: 0.4 });
    }, sectionRef);
    return () => ctx.revert();
  }, [still, size.w]);

  return (
    <section id="experience" ref={sectionRef} className="relative">
      <div ref={pinRef} className={`page-x flex flex-col justify-center pb-12 pt-24 ${still ? '' : 'min-h-screen'}`}>
        <SectionHeader numeral="II" label="Experience · 2023 → now" title="My constellation" className="mb-0" />

        <div ref={boxRef} className="relative mx-4 mb-6 mt-14 h-[240px] md:mx-0 md:h-[300px]">
          {size.w > 0 && (
            <>
              {[1, 2].map((i) => (
                <Line key={i} from={majors[i - 1].at} to={majors[i].at} size={size} />
              ))}
              {minors.map((m) => (
                <div key={m.label} data-minor={m.parent}>
                  <Line from={majors[m.parent].at} to={m.at} size={size} dashed />
                </div>
              ))}
            </>
          )}
          {/* The bright line segments that scrolling draws; they sit over the faint guides above. */}
          {size.w > 0 &&
            [1, 2].map((i) => {
              const s = segment(majors[i - 1].at, majors[i].at, size);
              return (
                <div
                  key={`draw-${i}`}
                  aria-hidden="true"
                  className="absolute origin-left"
                  style={{ left: s.left, top: s.top, width: s.width, transform: `rotate(${s.angle}deg)` }}
                >
                  <div data-line={i} className="h-[1.5px] origin-left bg-white shadow-[0_0_10px_2px_rgba(185,166,255,0.9)]" />
                </div>
              );
            })}

          {minors.map((m) => (
            <span
              key={m.label}
              data-minor={m.parent}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
              style={{ left: `${m.at.x}%`, top: `${m.at.y}%` }}
            >
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]" />
              <span className="hidden whitespace-nowrap font-mono text-[10px] tracking-[0.1em] text-muted sm:inline">{m.label}</span>
            </span>
          ))}

          {majors.map((s, i) => (
            <span key={s.name} className="absolute" style={{ left: `${s.at.x}%`, top: `${s.at.y}%` }}>
              <span data-star={i} className="absolute -left-[7px] -top-[7px] block h-3.5 w-3.5">
                <span
                  className="twinkle block h-3.5 w-3.5 rounded-full bg-white"
                  style={{ boxShadow: `0 0 12px 4px rgba(255,255,255,0.8), 0 0 36px 12px ${s.halo}` }}
                />
              </span>
              <span
                className="absolute top-[18px] whitespace-nowrap"
                style={{
                  left: 0,
                  transform: `translateX(${s.align === 'left' ? '-20%' : s.align === 'center' ? '-50%' : '-80%'})`,
                  textAlign: s.align,
                }}
              >
                <span className="block font-serif text-xl font-light md:text-[26px]">{s.name}</span>
                <span className="mt-0.5 block font-mono text-[10px] tracking-[0.12em] text-muted">{s.period}</span>
              </span>
            </span>
          ))}
        </div>

        <div className={still ? 'grid gap-4 md:grid-cols-3' : 'grid [perspective:1200px]'}>
          {stations.map((exp, i) => (
            <article
              key={exp.company}
              data-card={i}
              className={`glass rounded-[24px] p-6 md:p-7 ${still ? '' : '[grid-area:1/1]'}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-serif text-[32px] font-light leading-none md:text-[40px]">{exp.company}</h3>
                <span className="font-mono text-xs tracking-[0.08em] text-muted">{exp.period}</span>
              </div>
              <p className="mt-2 text-[15px] text-lav">{exp.role}</p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-pale">{exp.short}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.projects.map((p) => (
                  <span key={p.title} className="pill">
                    {p.title.replace(/ \(.*\)$/, '')}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        {!still && (
          <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Scroll to trace the journey ↓
          </p>
        )}
      </div>

      <div className="page-x flex flex-col gap-4 pb-24 pt-8">
        {experiences.map((exp) => (
          <article key={exp.company} data-reveal className="glass lift flex flex-wrap gap-10 rounded-[28px] p-6 md:p-10">
            <div className="flex-[1_1_260px]">
              <p className="font-mono text-xs tracking-[0.08em] text-muted">{exp.period}</p>
              <h3 className="mt-3 font-serif text-[44px] font-light leading-none">{exp.company}</h3>
              <p className="mt-2.5 text-[15px] text-lav">{exp.role}</p>
              {exp.current && (
                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-live/35 bg-live/10 px-3 py-1.5 font-mono text-[11px] text-[#9DF3C6]">
                  <span className="pulse-live h-1.5 w-1.5 rounded-full bg-live" />
                  Current role
                </span>
              )}
            </div>
            <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-8">
              {exp.projects.map((p) => (
                <div key={p.title}>
                  <h4 className="text-[19px] font-medium leading-snug">{p.title}</h4>
                  <p className="mt-2 font-serif text-[19px] font-light italic leading-[1.45] text-soft">{p.context}</p>
                  <ul className="mt-[18px] flex flex-col gap-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3.5 text-[15px] leading-[1.7] text-pale">
                        <Sparkle className="mt-2 h-2.5 w-2.5 shrink-0" fill="#B9A6FF" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-[18px] flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
