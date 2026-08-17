import React from 'react';
import { MapPin, Phone, Clock, Instagram, ExternalLink } from 'lucide-react';
import { CARPLUS_PHONE_DISPLAY } from '../../lib/whatsapp';

export function TopBar() {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#F59C00]" />
            <span>Av. Pres. Arthur Bernardes, 1323 · Portão, Curitiba/PR</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#F59C00]" />
            <a href="tel:4130827282" className="hover:text-white transition-colors font-semibold">{CARPLUS_PHONE_DISPLAY}</a>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-[#F59C00]" />
            <span>Seg–Sex 8h–18h | Sáb 8h–12h</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.carpluspneuseoficina.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#F59C00] transition-colors text-[11px] font-medium text-slate-300"
          >
            <span>Carplus Pneus & Oficina</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.instagram.com/carpluscwb/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#F59C00] transition-colors text-slate-300"
            title="Instagram Carplus"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span className="text-[11px]">@carpluscwb</span>
          </a>
        </div>
      </div>
    </div>
  );
}
