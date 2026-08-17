import React from 'react';
import { Link } from 'react-router-dom';

export function BrandsMarquee() {
  const brands = [
    'TOYOTA',
    'LAND ROVER',
    'BMW',
    'NISSAN',
    'FORD',
    'VOLKSWAGEN',
    'CHEVROLET',
    'HYUNDAI',
    'JEEP',
    'HONDA',
    'AUDI',
    'MERCEDES-BENZ',
  ];

  return (
    <div className="bg-black border-y border-[#2E2E2E] py-4 overflow-hidden select-none">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
          {brands.concat(brands).concat(brands).map((brand, index) => (
            <Link
              key={index}
              to={`/estoque?marca=${encodeURIComponent(brand.charAt(0) + brand.slice(1).toLowerCase())}`}
              className="flex items-center gap-10 text-[#666666] hover:text-[#F59C00] transition-colors group"
            >
              <span className="font-display font-bold text-sm sm:text-base tracking-widest italic uppercase group-hover:text-white transition-colors">
                {brand}
              </span>
              <span className="text-[#F59C00] text-xs opacity-60">◆</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
