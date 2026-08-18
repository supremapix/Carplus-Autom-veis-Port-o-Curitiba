import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronRight, Car, MessageSquare, Clock, MapPin } from 'lucide-react';
import { buildWhatsAppLink, CARPLUS_PHONE_DISPLAY } from '../../lib/whatsapp';
import { Logo } from '../ui/Logo';

export const LOGO_URL = '/images/logos/carplus-autos-logo.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'INÍCIO', path: '/' },
    { name: 'ESTOQUE', path: '/estoque' },
    { name: 'VENDA SEU CARRO', path: '/venda-seu-carro' },
    { name: 'FINANCIAMENTO', path: '/financiamento' },
    { name: 'CONSIGNAÇÃO', path: '/consignacao' },
    { name: 'A EMPRESA', path: '/empresa' },
    { name: 'CONTATO', path: '/contato' },
  ];

  const drawerNavLinks = [
    { name: 'INÍCIO', path: '/' },
    { name: 'ESTOQUE DE VEÍCULOS', path: '/estoque' },
    { name: 'VENDA SEU CARRO', path: '/venda-seu-carro' },
    { name: 'FINANCIAMENTO', path: '/financiamento' },
    { name: 'CONSIGNAÇÃO', path: '/consignacao' },
    { name: 'A EMPRESA', path: '/empresa' },
    { name: 'CONTATO', path: '/contato' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-black border-b border-[#2E2E2E] shadow-xl shadow-black/40 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] sm:h-[86px] lg:h-[104px] gap-2 sm:gap-4">
            {/* Logo Oficial Carplus Autos sobre Fundo Preto */}
            <Link
              to="/"
              className="flex items-center shrink-0 group focus-visible:outline-2 focus-visible:outline-[#F59C00] py-1"
              aria-label="Carplus Autos — Página Inicial"
            >
              <Logo variant="dark" className="h-8 xs:h-9 sm:h-12 lg:h-18 max-w-[130px] xs:max-w-[155px] sm:max-w-[240px] lg:max-w-[360px] transition-transform duration-200 group-hover:scale-105" />
            </Link>

            {/* Desktop Navigation (visível a partir de xl / 1280px para evitar encavalamento) */}
            <nav
              className="hidden xl:flex items-center gap-4 2xl:gap-7 shrink-0"
              aria-label="Menu Principal"
            >
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={active ? 'page' : undefined}
                    className={`text-[13px] 2xl:text-[15px] font-bold uppercase tracking-wider transition-colors py-2 relative select-none whitespace-nowrap ${
                      active
                        ? 'text-[#F59C00]'
                        : 'text-white hover:text-[#F59C00]'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F59C00] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons (xl+) */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <Link
                to="/estoque"
                className="bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-xs 2xl:text-sm tracking-wider uppercase h-11 2xl:h-12 px-5 2xl:px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F59C00]/25 active:scale-95 select-none cursor-pointer whitespace-nowrap"
              >
                <Car className="w-4 h-4 text-black shrink-0" />
                <span>VER ESTOQUE</span>
              </Link>

              <a
                href={buildWhatsAppLink('Olá! Gostaria de falar com um consultor da Carplus Autos.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-black font-display font-bold text-xs 2xl:text-sm tracking-wider uppercase h-11 2xl:h-12 px-4 2xl:px-5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 active:scale-95 select-none whitespace-nowrap"
                aria-label="Conversar pelo WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-black shrink-0 fill-current" />
                <span>WHATSAPP</span>
              </a>
            </div>

            {/* Mobile / Tablet Controls (< xl) */}
            <div className="flex items-center gap-1.5 sm:gap-3 xl:hidden shrink-0">
              {/* Botão Ver Estoque no Tablet */}
              <Link
                to="/estoque"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-xs uppercase px-3.5 h-10 rounded-xl transition-all shadow-xs whitespace-nowrap"
              >
                <Car className="w-4 h-4 text-black shrink-0" />
                <span>ESTOQUE</span>
              </Link>

              {/* Botão LIGAR */}
              <a
                href="tel:+554130827282"
                className="flex items-center justify-center gap-1 bg-[#2A2A2A] hover:bg-[#333333] active:bg-[#404040] text-white border border-[#3E3E3E] font-display font-bold text-[11px] sm:text-xs uppercase px-2.5 sm:px-3.5 h-9 sm:h-10 rounded-lg sm:rounded-xl transition-all shadow-xs select-none whitespace-nowrap"
                aria-label="Ligar para a Carplus Autos"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59C00] shrink-0" />
                <span>LIGAR</span>
              </a>

              {/* Botão MENU */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center justify-center gap-1 bg-[#F59C00] hover:bg-[#F7941D] active:bg-[#E68A00] text-black font-display font-bold text-[11px] sm:text-xs uppercase px-2.5 sm:px-4 h-9 sm:h-10 rounded-lg sm:rounded-xl transition-all shadow-md shadow-[#F59C00]/30 select-none cursor-pointer whitespace-nowrap"
                aria-label="Abrir Menu de Navegação"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" />
                <span>MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Fullscreen (Navegação Espelho do Site Aprovado) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white overflow-hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de Navegação Principal"
        >
          {/* Cabeçalho Preto do Drawer */}
          <div className="bg-black border-b border-[#2E2E2E] px-4 py-4 flex items-center justify-between shrink-0">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
              aria-label="Carplus Autos"
            >
              <Logo variant="dark" className="h-14 sm:h-16 max-w-[240px]" />
            </Link>

            {/* Botão Fechar com Texto */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center justify-center w-14 h-14 bg-[#1A1A1A] hover:bg-[#2A2A2A] active:bg-[#333333] border border-[#2E2E2E] rounded-xl text-white transition-all cursor-pointer select-none"
              aria-label="Fechar Menu"
            >
              <X className="w-6 h-6 text-[#F59C00] stroke-[2.5]" />
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#B3B3B3] mt-0.5">
                FECHAR
              </span>
            </button>
          </div>

          {/* Conteúdo Rolável do Drawer (Fundo Branco com Tipografia Ampla) */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            {/* Kicker Menu Principal */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E7] border border-[#F59C00]/30 text-[#D97706] text-xs font-display font-bold uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F59C00]" />
                <span>MENU PRINCIPAL</span>
              </div>

              {/* Itens de Navegação em Oswald 26px e altura 68px */}
              <nav className="divide-y divide-[#E0E0E0] border-y border-[#E0E0E0]">
                {drawerNavLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between min-h-[68px] py-3 text-left transition-all ${
                        active
                          ? 'text-[#F59C00] font-bold border-l-4 border-[#F59C00] pl-3'
                          : 'text-[#121212] hover:text-[#F59C00] pl-1'
                      }`}
                    >
                      <span className="font-display text-2xl sm:text-[26px] uppercase tracking-wide">
                        {link.name}
                      </span>
                      <ChevronRight
                        className={`w-6 h-6 shrink-0 ${
                          active ? 'text-[#F59C00]' : 'text-[#999999]'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bloco de Contato Rápido (2 Cartões Grandes 80px para Idosos) */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-display font-bold uppercase tracking-widest text-[#666666]">
                ATENDIMENTO IMEDIATO
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Card Ligar */}
                <a
                  href="tel:+554130827282"
                  className="flex items-center gap-3.5 p-4 min-h-[80px] bg-[#F2F2F2] hover:bg-[#EAEAEA] active:bg-[#E0E0E0] border border-[#E0E0E0] rounded-2xl transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-6 h-6 text-[#F59C00]" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg text-[#121212] leading-tight">
                      {CARPLUS_PHONE_DISPLAY}
                    </div>
                    <div className="text-xs text-[#666666] font-medium mt-0.5">
                      Ligar para a loja agora
                    </div>
                  </div>
                </a>

                {/* Card WhatsApp */}
                <a
                  href={buildWhatsAppLink('Olá! Estou pelo site e gostaria de atendimento pelo WhatsApp.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 min-h-[80px] bg-[#E8F8EE] hover:bg-[#D5F2E0] active:bg-[#C2ECCF] border border-[#BDEAC9] rounded-2xl transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-xs">
                    <MessageSquare className="w-6 h-6 text-black fill-current" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg text-[#0F5132] leading-tight">
                      WhatsApp Oficial
                    </div>
                    <div className="text-xs text-[#1E7E34] font-medium mt-0.5">
                      Falar com consultor online
                    </div>
                  </div>
                </a>
              </div>

              {/* Endereço e Horários */}
              <div className="p-4 bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl space-y-2 text-sm text-[#666666]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F59C00] shrink-0 mt-0.5" />
                  <span className="text-[#121212] font-medium">
                    Av. Pres. Arthur da Silva Bernardes, 1323 — Portão, Curitiba - PR
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#F59C00] shrink-0" />
                  <span>Segunda a Sexta: 8h às 18h · Sábado: 8h às 12h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé Fixo do Drawer: Botão Grande de Ver Estoque */}
          <div className="p-4 bg-black border-t border-[#2E2E2E] shrink-0">
            <Link
              to="/estoque"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full h-[60px] bg-[#F59C00] hover:bg-[#F7941D] active:bg-[#E68A00] text-black font-display font-bold text-base tracking-wider uppercase rounded-full flex items-center justify-center gap-2.5 shadow-lg shadow-[#F59C00]/30 transition-all select-none"
            >
              <Car className="w-5 h-5 text-black" />
              <span>VER ESTOQUE COMPLETO</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
