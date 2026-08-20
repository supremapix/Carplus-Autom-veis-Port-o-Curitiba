import React from 'react';

export const LOGO_URL = 'https://img.carplusautos.com.br/carplus-autos-logo.png?v=20260820_1';

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
      referrerPolicy="no-referrer"
      className={`w-auto object-contain select-none bg-transparent ${className}`}
    />
  );
}
