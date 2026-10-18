import React, { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { archive, featured, FeaturedProject } from '../data';
import { gsap, reducedMotion } from '../motion/env';
import { lockScroll } from '../motion/scroll';
import Tilt from '../motion/Tilt';
import { Icon, SectionHeader, Sparkle } from './ui';

const SHOT = 'project-shot';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

/** Runs a DOM update inside a View Transition when the browser supports one. */
const withTransition = (update: () => void) => {
  const doc = document as ViewTransitionDocument;
  if (!doc.startViewTransition || reducedMotion()) {
    update();
    return Promise.resolve();
  }
  return doc.startViewTransition(() => flushSync(update)).finished;
};

const CaseStudy: React.FC<{ project: FeaturedProject; onClose: () => void }> = ({ project, onClose }) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    if (bodyRef.current && !reducedMotion()) {
      gsap.from(bodyRef.current.children, { opacity: 0, y: 30, duration: 0.7, stagger: 0.06, delay: 0.25, ease: 'power3.out' });
    }
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      data-lenis-prevent
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-space/95 backdrop-blur-xl"
    >
      <div className="page-x relative pb-24 pt-6">
        <div className="sticky top-4 z-10 flex justify-end">
          <button
            onClick={onClose}
            data-magnetic
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-space/70 px-5 text-sm backdrop-blur"
          >
            <Icon name="close" /> Close
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-[26px] border border-white/15 p-2.5 shadow-[0_30px_120px_rgba(110,58,220,0.45)]">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="block aspect-[16/9] w-full rounded-[18px] object-cover"
            style={{ objectPosition: project.pos, viewTransitionName: SHOT } as React.CSSProperties}
          />
        </div>

        <div ref={bodyRef} className="mx-auto mt-14 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-lav px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-deep">
              {project.badge}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{project.meta}</span>
          </div>
          <h2 className="mt-5 font-serif text-[clamp(48px,7vw,96px)] font-extralight leading-none">{project.title}</h2>
          <p className="mt-6 font-serif text-[clamp(22px,2.4vw,28px)] font-light italic leading-snug text-pale">{project.desc}</p>

          <h3 className="eyebrow mt-14">The story</h3>
          <div className="mt-5 space-y-5 text-[17px] leading-[1.8] text-soft">
            {project.story.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>

          <h3 className="eyebrow mt-14">Highlights</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {project.highlights.map((h) => (
              <li key={h} className="glass rounded-[18px] p-5 text-[15px] leading-relaxed text-pale">
                <Sparkle className="mb-3 h-3.5 w-3.5" fill="#B9A6FF" />
                {h}
              </li>
            ))}
          </ul>

          <h3 className="eyebrow mt-14">Stack</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="pill !text-xs">
                {t}
              </span>
            ))}
          </div>

          <a href={project.link} target="_blank" rel="noopener noreferrer" data-magnetic className="btn-light mt-12">
            {project.cta} <Icon name="arrowUpRight" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [open, setOpen] = useState<FeaturedProject | null>(null);
  const openRef = useRef<FeaturedProject | null>(null);
  const shots = useRef<Record<string, HTMLImageElement | null>>({});
  openRef.current = open;

  // The clicked screenshot and the case-study hero share one view-transition name,
  // so the browser morphs one into the other instead of cutting between pages.
  const show = useCallback((project: FeaturedProject, push = true) => {
    const img = shots.current[project.slug];
    img?.style.setProperty('view-transition-name', SHOT);
    withTransition(() => {
      img?.style.removeProperty('view-transition-name');
      setOpen(project);
    });
    if (push) window.history.pushState({ project: project.slug }, '', `#work/${project.slug}`);
  }, []);

  const hide = useCallback((pop = false) => {
    const current = openRef.current;
    if (!current) return;
    const img = shots.current[current.slug];
    withTransition(() => {
      setOpen(null);
      img?.style.setProperty('view-transition-name', SHOT);
    }).finally(() => img?.style.removeProperty('view-transition-name'));
    if (!pop) window.history.pushState(null, '', '#work');
  }, []);

  const close = useCallback(() => hide(false), [hide]);

  // Deep links (#work/slug) open a case study; the back button closes it.
  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.match(/^#work\/(.+)$/)?.[1];
      const project = featured.find((p) => p.slug === slug);
      if (project) show(project, false);
      else hide(true);
    };
    if (window.location.hash.startsWith('#work/')) {
      const project = featured.find((p) => `#work/${p.slug}` === window.location.hash);
      if (project) setOpen(project);
    }
    window.addEventListener('popstate', fromHash);
    return () => window.removeEventListener('popstate', fromHash);
  }, [show, hide]);

  return (
    <section id="work" className="page-x py-24">
      <SectionHeader numeral="III" label="20+ real projects shipped" title="Selected work" />

      <div className="flex flex-col gap-24">
        {featured.map((f, i) => (
          <article key={f.slug} className={`flex flex-wrap items-center gap-12 ${i % 2 ? 'flex-row-reverse' : ''}`}>
            <div data-reveal className="min-w-0 flex-[999_1_600px]">
              <Tilt className="rounded-[26px]">
                <button
                  type="button"
                  onClick={() => show(f)}
                  data-cursor
                  aria-label={`Open the ${f.title} case study`}
                  className="group block w-full rounded-[26px] border border-white/15 bg-white/5 p-2.5 shadow-[0_30px_120px_rgba(110,58,220,0.4)]"
                >
                  <span className="block overflow-hidden rounded-[18px]">
                    <img
                      ref={(el) => {
                        shots.current[f.slug] = el;
                      }}
                      src={f.image}
                      alt={`${f.title} screenshot`}
                      loading="lazy"
                      className="block w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ objectPosition: f.pos, aspectRatio: f.ratio }}
                    />
                  </span>
                </button>
              </Tilt>
            </div>
            <div data-reveal className="min-w-0 flex-[1_1_360px]">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-lav px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-deep">
                  {f.badge}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{f.meta}</span>
              </div>
              <h3 className="mt-[18px] font-serif text-[clamp(36px,3.6vw,52px)] font-light leading-none [overflow-wrap:anywhere]">{f.title}</h3>
              <p className="mt-[18px] text-base leading-[1.75] text-soft">{f.desc}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {f.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-pale">
                    <Sparkle className="mt-[7px] h-2.5 w-2.5 shrink-0" fill="#B9A6FF" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {f.stack.map((t) => (
                  <span key={t} className="pill text-pale">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" onClick={() => show(f)} data-magnetic className="btn-light !min-h-[48px] !px-[22px]">
                  Read case study <Icon name="arrow" />
                </button>
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="btn-outline !min-h-[48px] !px-[22px]"
                >
                  {f.cta} <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h3 data-reveal className="eyebrow mb-6 mt-28">
        More from the archive
      </h3>
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
        {archive.map((m) => (
          <div key={m.title} data-reveal>
            <Tilt className="h-full rounded-[22px]" max={6}>
              <a
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass lift block h-full overflow-hidden rounded-[22px]"
              >
                <img src={m.image} alt={`${m.title} screenshot`} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top opacity-90" />
                <div className="p-[22px]">
                  <p className="font-mono text-[11px] text-muted">{m.period}</p>
                  <h4 className="mt-2 font-serif text-[26px] font-light leading-[1.1]">{m.title}</h4>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{m.stack}</p>
                </div>
              </a>
            </Tilt>
          </div>
        ))}
      </div>

      {open && <CaseStudy project={open} onClose={close} />}
    </section>
  );
};

export default Projects;
