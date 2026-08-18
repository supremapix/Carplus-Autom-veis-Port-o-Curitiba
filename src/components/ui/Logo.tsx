import React from 'react';

export const LOGO_URL = '/images/logos/carplus-autos-logo.png';

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

