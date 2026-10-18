import React, { useRef, useState } from 'react';
import { emit, gsap } from '../motion/env';
import { profile } from '../data';

type IconName = 'arrow' | 'arrowUpRight' | 'download' | 'close' | 'copy';

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  download: <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </>
  ),
};

export const Icon: React.FC<{ name: IconName; className?: string }> = ({ name, className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {paths[name]}
  </svg>
);

export const Sparkle: React.FC<{ className?: string; fill?: string; style?: React.CSSProperties }> = ({
  className = 'h-4 w-4',
  fill = 'currentColor',
  style,
}) => (
  <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
    <path d="M12 0 13.6 10.4 24 12 13.6 13.6 12 24 10.4 13.6 0 12 10.4 10.4z" fill={fill} />
  </svg>
);

export const SectionHeader: React.FC<{ title: React.ReactNode; numeral: string; label: string; className?: string }> = ({
  title,
  numeral,
  label,
  className = 'mb-12 md:mb-14',
}) => (
  <div data-reveal className={`flex flex-wrap items-baseline justify-between gap-6 ${className}`}>
    <h2 className="font-serif text-[clamp(48px,6vw,88px)] font-extralight leading-none">{title}</h2>
    <span className="eyebrow">
      <span className="text-lav">{numeral}</span> — {label}
    </span>
  </div>
);

/** Copies the email instead of opening a mail client, then celebrates with a shooting star. */
export const CopyEmail: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const toastRef = useRef<HTMLSpanElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch (e) {
      window.location.href = `mailto:${profile.email}`;
      return;
    }
    emit('shoot');
    setCopied(true);
    if (toastRef.current) {
      gsap.fromTo(
        toastRef.current,
        { y: 8, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }
      );
      gsap.to(toastRef.current, { opacity: 0, y: -6, delay: 1.8, duration: 0.4 });
    }
    window.setTimeout(() => setCopied(false), 2300);
  };

  return (
    <span className="relative inline-flex">
      <button type="button" onClick={copy} data-magnetic className={className} aria-label={`Copy email address ${profile.email}`}>
        {children ?? profile.email}
        <Icon name="copy" className="h-4 w-4 opacity-70" />
      </button>
      <span className="pointer-events-none absolute inset-x-0 -top-11 flex justify-center">
        <span
          ref={toastRef}
          role="status"
          className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 font-mono text-xs text-deep opacity-0 shadow-[0_0_30px_rgba(185,166,255,0.7)]"
        >
          {copied ? 'Email copied ✦' : ''}
        </span>
      </span>
    </span>
  );
};
