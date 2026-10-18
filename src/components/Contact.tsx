import React from 'react';
import { profile } from '../data';
import { CopyEmail, Icon, Sparkle } from './ui';

const Contact: React.FC = () => (
  <section id="contact" className="page-x pb-28 pt-16">
    <div
      data-reveal
      className="glass relative overflow-hidden rounded-[40px] px-[clamp(24px,5vw,72px)] py-[clamp(40px,7vw,96px)] text-center shadow-[0_0_120px_rgba(110,58,220,0.35)]"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-40%] h-[600px] w-[900px] max-w-[200%] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(150,110,255,0.4), rgba(150,110,255,0))' }}
      />
      <div className="relative">
        <Sparkle className="twinkle mx-auto h-10 w-10" fill="#fff" style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.9))' }} />
        <p className="eyebrow mt-6">
          <span className="text-lav">VI</span> — Contact
        </p>
        <h2 className="glow-text mx-auto mt-6 max-w-[960px] font-serif text-[clamp(52px,7.5vw,112px)] font-extralight leading-none">
          Let’s build something <em>dependable.</em>
        </h2>
        <p className="mx-auto mt-7 max-w-[520px] text-[17px] leading-[1.75] text-soft">
          Hiring for backend or fullstack? I reply within a day — usually faster.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CopyEmail className="btn-light !min-h-[60px] !px-8 text-[clamp(16px,1.8vw,19px)]" />
          <a href={profile.cv} download data-magnetic className="btn-outline !min-h-[60px]">
            Download CV <Icon name="download" />
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-7 text-[15px] text-soft">
          <a href={`tel:${profile.phone}`} className="hover:text-white">
            {profile.phoneDisplay}
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
