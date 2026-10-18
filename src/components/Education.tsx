import React from 'react';
import { awards, certs, education } from '../data';
import { Icon, SectionHeader } from './ui';

const ColumnTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`eyebrow mb-5 ${className}`}>{children}</h3>
);

const Education: React.FC = () => (
  <section id="education" className="page-x py-24">
    <SectionHeader numeral="V" label="Learning" title="Education & recognition" />
    <div className="grid gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
      <div data-reveal>
        <ColumnTitle>Education</ColumnTitle>
        {education.map((e) => (
          <div key={e.degree} className="border-t border-white/[0.12] py-5">
            <p className="font-mono text-[11px] text-muted">{e.period}</p>
            <p className="mt-1.5 font-serif text-2xl font-light leading-tight">{e.degree}</p>
            <p className="mt-1 text-sm text-soft">{e.school}</p>
          </div>
        ))}

        <ColumnTitle className="mt-10">Awards</ColumnTitle>
        {awards.map((a) => (
          <div key={a.title} className="flex gap-5 border-t border-white/[0.12] py-4">
            <span className="font-mono text-xs text-lav">{a.year}</span>
            <span className="text-[15px] leading-normal">{a.title}</span>
          </div>
        ))}
      </div>

      <div data-reveal>
        <ColumnTitle>Certifications</ColumnTitle>
        {certs.map((c) => (
          <a
            key={c.title}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[44px] items-center justify-between gap-4 border-t border-white/[0.12] py-3.5"
          >
            <span>
              <span className="block text-[15px] text-pale transition-colors group-hover:text-white">{c.title}</span>
              <span className="mt-1 block font-mono text-[11px] text-muted">Coursera · {c.year}</span>
            </span>
            <Icon
              name="arrowUpRight"
              className="h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lav"
            />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
