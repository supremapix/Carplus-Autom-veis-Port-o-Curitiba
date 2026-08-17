import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Menu, X, Car } from 'lucide-react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export const LOGO_URL = 'https://carplus-pixelperfect.lovable.app/__l5e/assets-v1/a327ddc8-0465-4c4f-87d4-97f5f46faf8e/carplus-autos-logo.png';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'INÍCIO', path: '/' },
    { name: 'ESTOQUE', path: '/estoque' },
    { name: 'VENDA SEU CARRO', path: '/venda-seu-carro' },
    { name: 'FINANCIAMENTO', path: '/financiamento' },
    { name: 'CONSIGNAÇÃO', path: '/consignacao' },
    { name: 'EMPRESA', path: '/empresa' },
    { name: 'CONTATO', path: '/contato' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/30 py-3'
            : 'bg-black border-b border-slate-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo oficial da Carplus Autos */}
            <Link to="/" className="flex items-center shrink-0 group">
              <img
                src={LOGO_URL}
                alt="Carplus Autos"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                      active
                        ? 'text-[#F59C00]'
                        : 'text-slate-300 hover:text-[#F59C00]'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F59C00] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/estoque"
                className="bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all transform active:scale-95 shadow-md shadow-[#F59C00]/25 flex items-center gap-1.5"
              >
                <Car className="w-4 h-4" />
                <span>VER ESTOQUE</span>
              </Link>

              <a
                href={buildWhatsAppLink('Olá! Gostaria de falar com um consultor da Carplus Autos.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-[#F59C00] border border-[#F59C00]/60 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#F59C00]" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                to="/estoque"
                className="sm:hidden bg-[#F59C00] text-black font-display font-bold text-xs px-2.5 py-1.5 rounded-lg"
              >
                ESTOQUE
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white focus:outline-none"
                aria-label="Abrir Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#F59C00]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-slate-950 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto text-white">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <img
                  src={LOGO_URL}
                  alt="Carplus Autos"
                  className="h-8 w-auto"
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 rounded-xl text-sm font-bold tracking-wide uppercase transition-colors ${
                        active
                          ? 'bg-slate-900 text-[#F59C00] border-l-4 border-[#F59C00]'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
              <Link
                to="/estoque"
                className="w-full bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F59C00]/20"
              >
                <Car className="w-4 h-4" />
                <span>VER ESTOQUE COMPLETO</span>
              </Link>

              <a
                href={buildWhatsAppLink('Olá! Gostaria de atendimento via WhatsApp.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800 text-[#F59C00] border border-[#F59C00] font-semibold text-sm py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#F59C00]" />
                <span>Falar no WhatsApp</span>
              </a>

              <div className="text-center text-xs text-slate-400 pt-2">
                <p className="font-medium text-slate-200">📍 Av. Pres. Arthur Bernardes, 1323</p>
                <p className="mt-0.5 text-slate-400">Portão, Curitiba/PR</p>
                <p className="mt-1 font-bold text-[#F59C00]">(41) 3082-7282</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
