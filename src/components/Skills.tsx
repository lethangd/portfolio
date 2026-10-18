import React from 'react';
import { skills } from '../data';
import { SectionHeader } from './ui';

const Skills: React.FC = () => (
  <section id="skills" className="page-x py-24">
    <SectionHeader numeral="IV" label="Skills" title="Toolkit" />
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
      {skills.map((g) => (
        <div key={g.title} data-reveal className="glass lift rounded-[22px] p-7">
          <h3 className="font-serif text-[28px] font-light">{g.title}</h3>
          <div className="mt-[18px] flex flex-wrap gap-2">
            {g.primary.map((t) => (
              <span key={t} className="rounded-full bg-white/[0.92] px-3 py-1.5 text-[13px] font-medium text-deep">
                {t}
              </span>
            ))}
            {g.secondary.map((t) => (
              <span key={t} className="rounded-full border border-white/25 px-3 py-1.5 text-[13px] text-pale">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
