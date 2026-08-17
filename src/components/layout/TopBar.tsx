import React from 'react';
import { MapPin, Phone, Clock, Instagram, ExternalLink } from 'lucide-react';
import { CARPLUS_PHONE_DISPLAY } from '../../lib/whatsapp';

export function TopBar() {
  return (
    <div className="bg-black border-b border-[#2E2E2E] text-xs text-[#B3B3B3] py-2.5 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
            <span>Av. Pres. Arthur Bernardes, 1323 · Portão, Curitiba - PR</span>
          </div>
          <span className="text-[#333333]">|</span>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
            <a href="tel:+554130827282" className="hover:text-[#F59C00] transition-colors font-bold text-white tracking-wide">
              {CARPLUS_PHONE_DISPLAY}
            </a>
          </div>
          <span className="text-[#333333]">|</span>
          <div className="flex items-center gap-1.5 text-[#B3B3B3]">
            <Clock className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
            <span>Seg–Sex 8h–18h | Sáb 8h–12h</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://www.carpluspneuseoficina.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#F59C00] transition-colors text-xs font-semibold text-[#B3B3B3]"
            title="Acessar Carplus Centro Automotivo"
          >
            <span>Carplus Pneus & Oficina</span>
            <ExternalLink className="w-3 h-3 text-[#F59C00]" />
          </a>
          <a
            href="https://www.instagram.com/carpluscwb/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#F59C00] transition-colors text-[#B3B3B3]"
            title="Instagram Oficial Carplus"
          >
            <Instagram className="w-3.5 h-3.5 text-[#F59C00]" />
            <span className="text-xs font-semibold">@carpluscwb</span>
          </a>
        </div>
      </div>
    </div>
  );
}
