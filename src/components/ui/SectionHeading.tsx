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
    <div className={`flex flex-col ${alignClasses} space-y-3 ${className}`}>
      {kicker && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-widest ${
            isDark
              ? 'bg-[#1A1A1A] border border-[#2E2E2E] text-[#F59C00]'
              : 'bg-[#FFF8E7] border border-[#F59C00]/30 text-[#D97706]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#F59C00]" />
          <span>{kicker}</span>
        </div>
      )}

      <h2
        className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide leading-[1.1] ${
          isDark ? 'text-white' : 'text-[#121212]'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-base sm:text-lg max-w-3xl leading-relaxed ${
            isDark ? 'text-[#B3B3B3]' : 'text-[#666666]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
