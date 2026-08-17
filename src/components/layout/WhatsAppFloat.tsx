import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export function WhatsAppFloat() {
  const link = buildWhatsAppLink('Olá! Gostaria de falar com um consultor da Carplus Autos.');

  return (
    <aside aria-label="Atendimento Rápido WhatsApp" className="fixed bottom-6 right-6 z-50">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#F59C00] hover:bg-[#F7941D] text-black rounded-full shadow-2xl shadow-black/40 hover:scale-105 transition-all duration-300 border-2 border-black"
        aria-label="Falar no WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-black text-black" />
        
        {/* Tooltip Hover */}
        <span className="absolute right-16 bg-black text-white text-xs font-bold font-display px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md border border-slate-800">
          Atendimento WhatsApp
        </span>
      </a>
    </aside>
  );
}
