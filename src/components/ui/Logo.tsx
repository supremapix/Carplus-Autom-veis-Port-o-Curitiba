import React from 'react';

export const LOGO_URL = 'https://carplus-pixelperfect.lovable.app/__l5e/assets-v1/a327ddc8-0465-4c4f-87d4-97f5f46faf8e/carplus-autos-logo.png';

export interface LogoProps {
  variant?: 'dark' | 'light' | 'icon';
  className?: string;
  showTagline?: boolean;
}

export function Logo({
  variant = 'dark',
  className = '',
}: LogoProps) {
  return (
    <img
      src={LOGO_URL}
      alt="Carplus Autos - Seminovos Selecionados Curitiba"
      loading="eager"
      decoding="async"
      className={`w-auto object-contain select-none ${className}`}
    />
  );
}

