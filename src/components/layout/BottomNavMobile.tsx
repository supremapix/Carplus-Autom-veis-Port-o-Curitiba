import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Phone, MessageSquare, Sparkles } from 'lucide-react';
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
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#222222] shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-safe select-none">
      <div className="flex items-center justify-between h-[68px] px-3 gap-2">
        {/* Botão Ligar (Estilo Glass Escuro Minimalista) */}
        <a
          href="tel:+5541988740258"
          className="flex-1 flex items-center justify-center gap-2 h-[48px] rounded-xl bg-[#141414] hover:bg-[#1E1E1E] active:bg-[#252525] border border-white/10 text-white/90 transition-all active:scale-95 shadow-sm"
        >
          <Phone className="w-4 h-4 text-white/70" />
          <span className="text-[11px] font-display font-bold uppercase tracking-wider text-white">
            LIGAR
          </span>
        </a>

        {/* Botão Principal ESTOQUE (Amarelo Carplus #F59C00, Alto Relevo, Efeito Glow & Shimmer) */}
        <Link
          to="/estoque"
          className="relative flex-[1.4] flex items-center justify-center gap-2 h-[52px] -mt-2 rounded-2xl bg-gradient-to-b from-[#FFB32C] via-[#F59C00] to-[#E68A00] text-black font-display font-bold uppercase tracking-wider text-xs border border-[#FFD066]/50 shadow-[0_0_22px_rgba(245,156,0,0.6),0_6px_14px_rgba(0,0,0,0.4)] active:scale-95 transition-transform overflow-hidden animate-pulse-glow group"
        >
          {/* Shimmer de luz passando */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000" />
          
          <div className="w-6 h-6 rounded-lg bg-black/15 flex items-center justify-center shrink-0">
            <Car className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <span className="font-display font-extrabold text-[13px] tracking-wide text-black drop-shadow-xs">
            ESTOQUE
          </span>
          <Sparkles className="w-3.5 h-3.5 text-black/70 animate-bounce" />
        </Link>

        {/* Botão WhatsApp (Verde Oficial com Glass) */}
        <a
          href={buildWhatsAppLink('Olá! Estou navegando pelo site da Carplus Autos e gostaria de atendimento.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 h-[48px] rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 active:bg-[#25D366]/35 border border-[#25D366]/40 text-[#25D366] transition-all active:scale-95 shadow-sm"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
          <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#25D366]">
            WHATSAPP
          </span>
        </a>
      </div>
    </div>
  );
}
