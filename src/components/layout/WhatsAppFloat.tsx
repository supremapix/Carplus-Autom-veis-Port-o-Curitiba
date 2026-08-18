import React from 'react';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export function WhatsAppFloat() {
  const link = buildWhatsAppLink('Olá! Gostaria de falar com um consultor da Carplus Autos.');

  return (
    <aside aria-label="Atendimento Rápido WhatsApp" className="hidden lg:block fixed bottom-8 right-8 z-40">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-black rounded-full shadow-2xl shadow-black/60 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-black focus-visible:outline-3 focus-visible:outline-[#F59C00]"
        aria-label="Falar com um consultor da Carplus Autos pelo WhatsApp"
      >
        <MessageSquare className="w-8 h-8 fill-black text-black" />

        {/* Tooltip no Hover (Desktop) */}
        <span className="hidden lg:block absolute right-20 bg-black text-white text-xs font-display font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl border border-[#2E2E2E]">
          Atendimento WhatsApp
        </span>
      </a>
    </aside>
  );
}
