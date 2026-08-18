import React from 'react';
import { Link } from 'react-router-dom';
import { CAR_BRANDS } from '../../data/brands';

export function BrandsMarquee() {
  return (
    <div className="w-full relative overflow-hidden py-3 sm:py-3.5 select-none pointer-events-auto">
      {/* Gradientes laterais suaves para fade out elegante */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center gap-10 sm:gap-14 whitespace-nowrap">
          {CAR_BRANDS.concat(CAR_BRANDS).map((brand, index) => (
            <Link
              key={`${brand.name}-${index}`}
              to={`/estoque?marca=${encodeURIComponent(brand.name)}`}
              className="group flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer"
              title={`Ver estoque ${brand.name}`}
            >
              {/* O fundo branco perfeito camufla 100% qualquer borda da imagem, dando a sensação de logo flutuante */}
              <div className="h-8 sm:h-9 max-w-[70px] sm:max-w-[90px] flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={`Logo ${brand.name}`}
                  className="max-h-full max-w-full object-contain filter transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
