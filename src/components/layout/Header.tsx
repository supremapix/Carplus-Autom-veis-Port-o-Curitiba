import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronRight, Car, MessageSquare, Clock, MapPin } from 'lucide-react';
import { buildWhatsAppLink, CARPLUS_PHONE_DISPLAY } from '../../lib/whatsapp';
import { Logo } from '../ui/Logo';

export const LOGO_URL = '/images/logos/carplus-autos-logo.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-black border-b border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] lg:h-[84px] gap-4">
            {/* Logo Oficial Carplus Autos */}
            <Link
              to="/"
              className="flex items-center shrink-0 group focus-visible:outline-2 focus-visible:outline-[#F59C00]"
              aria-label="Carplus Autos — Página Inicial"
            >
              <Logo
                variant="dark"
                className="h-[44px] lg:h-[52px] max-w-[180px] lg:max-w-[240px] transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation (lg / 1024px+) */}
            <nav
              className="hidden lg:flex items-center gap-7 shrink-0"
              aria-label="Menu Principal"
            >
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={active ? 'page' : undefined}
                    className={`text-[14px] font-bold uppercase tracking-[0.06em] transition-colors py-2 relative select-none whitespace-nowrap ${
                      active
                        ? 'text-[#F59C00]'
                        : 'text-white hover:text-[#F59C00]'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F59C00]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons (lg+) */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                to="/estoque"
                className="bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-[13px] tracking-wider uppercase h-10 px-5 rounded-full transition-all flex items-center justify-center gap-2 select-none cursor-pointer whitespace-nowrap"
              >
                <span>VER ESTOQUE</span>
              </Link>

              <div className="relative group">
                <a
                  href={buildWhatsAppLink('Olá! Gostaria de falar com um consultor da Carplus Autos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1A1A1A] hover:bg-[#252525] border border-[#2E2E2E] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Conversar pelo WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366] fill-current" />
                </a>
                <span className="absolute right-full mr-3 px-3 py-1 bg-black text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
                  WhatsApp
                </span>
              </div>
            </div>

            {/* Mobile Controls (< 1024px): LIGAR e MENU compactos (40px) */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              {/* Botão LIGAR */}
              <a
                href="tel:+554130827282"
                className="flex items-center justify-center gap-1.5 bg-[#1A1A1A] hover:bg-[#252525] text-white border border-[#2A2A2A] font-display font-bold text-xs uppercase px-3 h-10 rounded-[10px] transition-all select-none whitespace-nowrap"
                aria-label="Ligar para a Carplus Autos"
              >
                <Phone className="w-[18px] h-[18px] text-[#F59C00] shrink-0" />
                <span>LIGAR</span>
              </a>

              {/* Botão MENU */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center justify-center gap-1.5 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-xs uppercase px-3 h-10 rounded-[10px] transition-all select-none cursor-pointer whitespace-nowrap"
                aria-label="Abrir Menu de Navegação"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-[18px] h-[18px] text-black shrink-0" />
                <span>MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-black border-l border-[#2E2E2E] shadow-2xl flex flex-col z-10 animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-[#2E2E2E]">
              <span className="font-display font-bold uppercase tracking-wider text-sm text-[#F59C00]">
                MENU CARPLUS
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar Menu"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-4">
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider transition-colors ${
                        active
                          ? 'bg-[#F59C00] text-black'
                          : 'text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-4 h-4 ${active ? 'text-black' : 'text-[#888888]'}`} />
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-[#2E2E2E] space-y-3">
                <Link
                  to="/estoque"
                  className="w-full h-12 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
                >
                  <Car className="w-4 h-4" />
                  <span>VER ESTOQUE COMPLETO</span>
                </Link>

                <a
                  href={buildWhatsAppLink('Olá! Vim pelo site e gostaria de atendimento.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 bg-[#25D366] hover:bg-[#20BA5A] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>ATENDIMENTO WHATSAPP</span>
                </a>
              </div>
            </div>

            <div className="p-5 border-t border-[#2E2E2E] text-xs text-white/50 space-y-1">
              <p className="font-semibold text-white/70">Carplus Autos · Curitiba</p>
              <p>Av. Pres. Arthur Bernardes, 1323 · Portão</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
