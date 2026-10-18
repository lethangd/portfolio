import React, { useEffect, useState } from 'react';
import { navItems, profile } from '../data';
import { scrollToId } from '../motion/scroll';
import { Icon, Sparkle } from './ui';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['top', ...navItems.map((n) => n.id), 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? 'border-b border-white/10 bg-space/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="page-x flex items-center justify-between gap-4 py-4 md:py-5" aria-label="Primary">
        <a href="#top" onClick={(e) => go(e, 'top')} className="group flex items-center gap-3">
          <Sparkle className="h-[22px] w-[22px] transition-transform duration-700 group-hover:rotate-180" fill="#fff" />
          <span className="font-serif text-[22px] font-light tracking-[0.02em]">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-7 text-sm lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => go(e, item.id)}
              className={`relative transition-colors ${active === item.id ? 'text-white' : 'text-muted hover:text-white'}`}
            >
              {item.label}
              <span
                className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-lav shadow-[0_0_8px_2px_rgba(185,166,255,0.8)] transition-opacity ${
                  active === item.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            download
            data-magnetic
            className="hidden min-h-[44px] items-center gap-2 rounded-full border border-white/40 px-[22px] text-sm shadow-[0_0_24px_rgba(185,166,255,0.25)] sm:inline-flex"
          >
            Download CV <Icon name="download" className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <Icon name="close" className="h-5 w-5" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden="true">
                <path d="M4 9h16M4 15h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="page-x border-t border-white/10 pb-8 pt-2 lg:hidden">
          <ul>
            {[...navItems, { id: 'contact', label: 'Contact' }].map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => go(e, item.id)} className="flex items-baseline gap-4 border-b border-white/10 py-4">
                  <span className="font-mono text-xs text-lav">{['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</span>
                  <span className="font-serif text-3xl font-extralight">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={profile.cv} download className="btn-outline mt-6 sm:hidden">
            Download CV <Icon name="download" />
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
