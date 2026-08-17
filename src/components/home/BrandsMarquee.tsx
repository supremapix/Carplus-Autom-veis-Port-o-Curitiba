import React from 'react';
import { Link } from 'react-router-dom';

export function BrandsMarquee() {
  const brands = [
    'TOYOTA',
    'HONDA',
    'VOLKSWAGEN',
    'CHEVROLET',
    'HYUNDAI',
    'JEEP',
    'FIAT',
    'NISSAN',
    'RENAULT',
    'BMW',
    'MERCEDES-BENZ',
    'FORD',
    'MITSUBISHI',
    'AUDI',
    'PEUGEOT',
    'CITROËN',
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 py-3.5 overflow-hidden select-none shadow-xs">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {brands.concat(brands).map((brand, index) => (
            <Link
              key={index}
              to={`/estoque?marca=${brand.charAt(0) + brand.slice(1).toLowerCase()}`}
              className="flex items-center gap-8 text-slate-500 hover:text-[#d97706] transition-colors"
            >
              <span className="font-display font-bold text-xs sm:text-sm tracking-widest text-slate-700 hover:text-slate-950">
                {brand}
              </span>
              <span className="text-[#F59C00] text-xs opacity-70">◆</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
