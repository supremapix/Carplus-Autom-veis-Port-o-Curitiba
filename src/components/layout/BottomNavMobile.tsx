import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Phone, MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export function BottomNavMobile() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  if (location.pathname.startsWith('/estoque/') && location.pathname !== '/estoque') {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0A0A0A] border-t border-[#2E2E2E] shadow-2xl pb-safe">
      <div className="grid grid-cols-3 h-[60px] divide-x divide-[#2E2E2E]">
        {/* Botão Estoque */}
        <Link
          to="/estoque"
          className="flex flex-col items-center justify-center gap-0.5 text-white hover:text-[#F59C00] active:bg-white/5 transition-colors select-none"
        >
          <Car className="w-5 h-5 text-[#F59C00]" />
          <span className="text-[11px] font-display font-bold uppercase tracking-wider">
            ESTOQUE
          </span>
        </Link>

        {/* Botão Ligar */}
        <a
          href="tel:+5541988740258"
          className="flex flex-col items-center justify-center gap-0.5 text-white hover:text-[#F59C00] active:bg-white/5 transition-colors select-none"
        >
          <Phone className="w-5 h-5 text-[#F59C00]" />
          <span className="text-[11px] font-display font-bold uppercase tracking-wider">
            LIGAR
          </span>
        </a>

        {/* Botão WhatsApp */}
        <a
          href={buildWhatsAppLink('Olá! Estou navegando pelo site da Carplus Autos e gostaria de atendimento.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-[#25D366] hover:text-[#20BA5A] active:bg-white/5 transition-colors select-none"
        >
          <MessageSquare className="w-5 h-5 text-[#25D366] fill-current" />
          <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#25D366]">
            WHATSAPP
          </span>
        </a>
      </div>
    </div>
  );
}
