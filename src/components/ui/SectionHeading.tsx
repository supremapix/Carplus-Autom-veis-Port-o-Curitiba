import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = theme === 'dark';
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col ${alignClasses} space-y-3.5 ${className}`}>
      {kicker && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-[0.18em] ${
            isDark
              ? 'bg-white/[0.08] backdrop-blur-md border border-white/20 text-[#F59C00] shadow-sm'
              : 'bg-[#FFF8E7] border border-[#F59C00]/40 text-[#B45309]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#F59C00] shadow-[0_0_8px_#F59C00]' : 'bg-[#F59C00]'}`} />
          <span>{kicker}</span>
        </div>
      )}

      <h2
        className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[1.12] [text-wrap:balance] max-w-3xl ${
          isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]' : 'text-[#121212]'
        } ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-base sm:text-lg max-w-2xl leading-relaxed font-normal [text-wrap:balance] ${
            isDark ? 'text-[#D0D0D0]' : 'text-[#4B5563]'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
