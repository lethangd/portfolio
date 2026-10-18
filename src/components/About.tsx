import React from 'react';
import { pillars } from '../data';
import { Sparkle } from './ui';

const About: React.FC = () => (
  <section id="about" className="page-x py-24">
    <div className="flex flex-wrap gap-12">
      <p data-reveal className="eyebrow m-0 flex-[1_1_220px]">
        <span className="text-lav">I</span> — About
      </p>
      <div className="min-w-0 flex-[999_1_560px]">
        <p data-reveal className="m-0 font-serif text-[clamp(30px,3.4vw,46px)] font-light leading-[1.25]">
          I build quiet, reliable backends for systems people depend on — hospital care plans in Singapore, a national
          health system in Việt Nam, and today, <em className="text-lav">corporate credit at MB Bank.</em> After hours, I
          ship for real clients and my own photobooth startup.
        </p>
        <div className="mt-12 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
          {pillars.map((p) => (
            <div key={p.title} data-reveal className="glass lift rounded-[20px] p-6">
              <Sparkle className="h-4 w-4" fill="#B9A6FF" />
              <h3 className="mt-3.5 text-base font-medium">{p.title}</h3>
              <p className="mt-2 text-sm leading-[1.7] text-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
