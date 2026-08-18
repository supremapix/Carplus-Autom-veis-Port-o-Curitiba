import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Share2, Phone, MessageCircle, ArrowUp, X as CloseIcon, Copy, Check } from 'lucide-react';
import { SHARE_MESSAGES } from '../../data/share-messages';
import { CARPLUS_PHONE_DISPLAY, CARPLUS_PHONE } from '../../lib/whatsapp';

export function FloatingActions() {
  const location = useLocation();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [businessOpen, setBusinessOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isAdmin = location.pathname.startsWith('/admin');

  // Business hours check (Mon-Fri 8h-18h, Sat 8h-12h)
  useEffect(() => {
    const checkBusinessHours = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'America/Sao_Paulo',
          weekday: 'short',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(now);
        let weekday = '';
        let hour = 0;
        let minute = 0;
        for (const part of parts) {
          if (part.type === 'weekday') weekday = part.value;
          if (part.type === 'hour') hour = parseInt(part.value, 10);
          if (part.type === 'minute') minute = parseInt(part.value, 10);
        }

        const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);
        const isSat = weekday === 'Sat';
        const timeNum = hour * 60 + minute;
        const startWork = 8 * 60;
        const endWeekday = 18 * 60;
        const endSat = 12 * 60;

        if (isWeekday && timeNum >= startWork && timeNum <= endWeekday) {
          setBusinessOpen(true);
        } else if (isSat && timeNum >= startWork && timeNum <= endSat) {
          setBusinessOpen(true);
        } else {
          setBusinessOpen(false);
        }
      } catch {
        const h = new Date().getHours();
        setBusinessOpen(h >= 8 && h < 18);
      }
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top visibility (> 300px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Message rotation every 15s
  useEffect(() => {
    if (!showShareModal) return;
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % SHARE_MESSAGES.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [showShareModal]);

  // Esc key & click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showShareModal) {
        setShowShareModal(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShareModal]);

  if (isAdmin) return null;

  const getCleanUrl = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('utm_source');
      url.searchParams.delete('utm_medium');
      url.searchParams.delete('utm_campaign');
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  const currentUrl = getCleanUrl();
  const pageTitle = document.title;
  const currentMsg = SHARE_MESSAGES[currentMessageIndex];
  const shareText = encodeURIComponent(currentMsg);
  const encodedUrl = encodeURIComponent(currentUrl);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pageTitle,
          text: currentMsg,
          url: currentUrl,
        });
        setShowShareModal(false);
      } catch {
        // cancelled
      }
    }
  };

  const handleCopyLink = () => {
    const copyText = `${pageTitle} — ${currentUrl}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyText).then(() => {
        setCopied(true);
        setToastMessage('Link copiado com sucesso!');
        setTimeout(() => {
          setCopied(false);
          setToastMessage(null);
        }, 2500);
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white border border-[#333333] px-5 py-2.5 rounded-xl shadow-2xl text-xs font-medium tracking-wide animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Canto Esquerdo Inferior: Compartilhar */}
      <div className="fixed bottom-20 lg:bottom-6 left-4 z-30">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setShowShareModal(true)}
          className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/85 backdrop-blur-md border border-white/12 shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center text-white hover:border-[#F59C00] hover:scale-[1.06] transition-all cursor-pointer"
          aria-label="Compartilhar página"
        >
          <Share2 className="w-5 h-5 stroke-[1.75]" />
        </button>
      </div>

      {/* Canto Direito Inferior: Desktop (Ligar, WhatsApp, Topo) / Mobile (Só Topo pois a barra inferior já tem Ligar e WhatsApp) */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 z-30 flex flex-col gap-2.5 items-end">
        {/* Desktop apenas: Ligar */}
        <a
          href="tel:+554130827282"
          className="hidden lg:flex w-12 h-12 rounded-full bg-black/85 backdrop-blur-md border border-white/12 shadow-[0_8px_24px_rgba(0,0,0,0.35)] items-center justify-center text-white hover:border-[#F59C00] hover:scale-[1.06] transition-all cursor-pointer relative group"
          aria-label="Ligar para a Carplus Autos"
        >
          <Phone className="w-5 h-5 text-[#F59C00] stroke-[1.75]" />
          <span className="absolute right-full mr-3 px-3 py-1 bg-black text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
            Ligar: {CARPLUS_PHONE_DISPLAY}
          </span>
        </a>

        {/* Desktop apenas: WhatsApp */}
        <a
          href={`https://wa.me/${CARPLUS_PHONE}?text=${encodeURIComponent('Olá! Gostaria de atendimento via WhatsApp da Carplus Autos.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex w-12 h-12 rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.35)] items-center justify-center text-black hover:scale-[1.06] transition-all cursor-pointer relative group"
          aria-label="Atendimento via WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current stroke-[1.75]" />
          {/* Ponto indicador de horário */}
          <span className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-black ${businessOpen ? 'bg-emerald-400' : 'bg-gray-400'}`} />
          <span className="absolute right-full mr-3 px-3 py-1 bg-black text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
            {businessOpen ? 'Atendimento Online' : 'Fora do Horário'}
          </span>
        </a>

        {/* Voltar ao Topo (Visível ao rolar a página) */}
        {showScrollTop && (
          <button
            type="button"
            onClick={handleScrollToTop}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-black/85 backdrop-blur-md border border-white/12 shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center text-white hover:border-[#F59C00] hover:scale-[1.06] transition-all cursor-pointer"
            aria-label="Voltar ao topo da página"
          >
            <ArrowUp className="w-5 h-5 stroke-[1.75]" />
          </button>
        )}
      </div>

      {/* Modal de Compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowShareModal(false)}
          />

          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl shadow-2xl p-6 text-white space-y-5 animate-fade-in focus:outline-none"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
              <div>
                <h3 className="font-display font-bold text-sm tracking-widest text-[#F59C00] uppercase">
                  COMPARTILHAR
                </h3>
                <p className="text-xs text-[#888888] mt-0.5">Indique este conteúdo para amigos ou redes</p>
              </div>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 transition-colors cursor-pointer"
                aria-label="Fechar modal"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Frase sugerida */}
            <div className="bg-[#141414] border border-[#222222] p-3.5 rounded-xl">
              <p className="text-xs text-[#AAAAAA] mb-1 uppercase font-display tracking-wider">Sugestão de mensagem:</p>
              <p className="text-sm font-normal text-white italic">"{currentMsg}"</p>
            </div>

            {/* Grade 3x2 de opções de compartilhamento */}
            <div className="grid grid-cols-3 gap-3">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%2520-%2520${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareModal(false)}
                className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-colors group cursor-pointer"
                aria-label="Compartilhar no WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] text-[#AAAAAA] font-medium">WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareModal(false)}
                className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-colors group cursor-pointer"
                aria-label="Compartilhar no Facebook"
              >
                <Share2 className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] text-[#AAAAAA] font-medium">Facebook</span>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareModal(false)}
                className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-colors group cursor-pointer"
                aria-label="Compartilhar no X (Twitter)"
              >
                <Share2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-[11px] text-[#AAAAAA] font-medium">X / Twitter</span>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareModal(false)}
                className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-colors group cursor-pointer"
                aria-label="Compartilhar no LinkedIn"
              >
                <Share2 className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] text-[#AAAAAA] font-medium">LinkedIn</span>
              </a>

              {/* E-mail */}
              <a
                href={`mailto:?subject=${encodeURIComponent(pageTitle)}&body=${shareText}%0A%0A${encodedUrl}`}
                onClick={() => setShowShareModal(false)}
                className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-colors group cursor-pointer"
                aria-label="Compartilhar por E-mail"
              >
                <Share2 className="w-5 h-5 text-[#F59C00] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] text-[#AAAAAA] font-medium">E-mail</span>
              </a>

              {/* Native Share (se disponível) */}
              {typeof navigator !== 'undefined' && 'share' in navigator ? (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-colors group cursor-pointer"
                  aria-label="Mais opções"
                >
                  <Share2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] text-[#AAAAAA] font-medium">Mais</span>
                </button>
              ) : (
                <div className="h-16 rounded-xl bg-[#141414]/40 border border-[#222222]/50 flex flex-col items-center justify-center gap-1.5 opacity-40 cursor-not-allowed">
                  <Share2 className="w-5 h-5 text-white/40" />
                  <span className="text-[11px] text-white/40">Outros</span>
                </div>
              )}
            </div>

            {/* Botão Copiar Link Largo */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full h-12 bg-black hover:bg-[#151515] text-white border border-[#333333] rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#F59C00]" />}
              <span>{copied ? 'Link Copiado!' : 'Copiar Link da Página'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
