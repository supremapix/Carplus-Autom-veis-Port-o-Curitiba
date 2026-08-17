import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Phone, MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export function BottomNavMobile() {
  const location = useLocation();

  // Do not show on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  // If on vehicle single page, let the page's custom CTA handle it
  if (location.pathname.startsWith('/estoque/') && location.pathname !== '/estoque') {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-black border-t border-[#2E2E2E] shadow-2xl shadow-black pb-safe">
      <div className="grid grid-cols-3 h-16 divide-x divide-[#2E2E2E]">
        {/* Botão Estoque */}
        <Link
          to="/estoque"
          className="flex flex-col items-center justify-center gap-1 text-white hover:text-[#F59C00] active:bg-[#1A1A1A] transition-colors select-none"
        >
          <Car className="w-5 h-5 text-[#F59C00]" />
          <span className="text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider">
            ESTOQUE
          </span>
        </Link>

        {/* Botão Ligar */}
        <a
          href="tel:+554130827282"
          className="flex flex-col items-center justify-center gap-1 text-white hover:text-[#F59C00] active:bg-[#1A1A1A] transition-colors select-none"
        >
          <Phone className="w-5 h-5 text-[#F59C00]" />
          <span className="text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider">
            LIGAR
          </span>
        </a>

        {/* Botão WhatsApp */}
        <a
          href={buildWhatsAppLink('Olá! Estou navegando pelo site da Carplus Autos e gostaria de atendimento.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851] text-black font-extrabold transition-colors select-none"
        >
          <MessageSquare className="w-5 h-5 text-black fill-current" />
          <span className="text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider">
            WHATSAPP
          </span>
        </a>
      </div>
    </div>
  );
}
