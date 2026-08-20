import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Car,
  MessageSquare,
  Home,
  DollarSign,
  FileCheck,
  Building2,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { buildWhatsAppLink, CARPLUS_PHONE_DISPLAY } from '../../lib/whatsapp';
import { Logo } from '../ui/Logo';

export const LOGO_URL = 'https://img.carplusautos.com.br/carplus-autos-logo.png?v=20260820_1';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listener suave de scroll para diminuir a logo e botões quando começa a navegar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Serviços agrupados para o Dropdown Desktop
  const serviceDropdownLinks = [
    {
      name: 'Venda seu Carro',
      path: '/venda-seu-carro',
      desc: 'Compramos ou avaliamos na troca',
      icon: <DollarSign className="w-4 h-4 text-[#F59C00]" />,
    },
    {
      name: 'Simular Financiamento',
      path: '/financiamento',
      desc: 'Crédito facilitado em até 60x',
      icon: <FileCheck className="w-4 h-4 text-[#F59C00]" />,
    },
    {
      name: 'Consignação Segura',
      path: '/consignacao',
      desc: 'Vendemos seu carro no showroom',
      icon: <Sparkles className="w-4 h-4 text-[#F59C00]" />,
    },
  ];

  // Links completos para o Menu Mobile
  const navLinks = [
    { name: 'INÍCIO', path: '/', icon: <Home className="w-6 h-6 text-[#F59C00]" />, desc: 'Página inicial da loja' },
    { name: 'ESTOQUE', path: '/estoque', icon: <Car className="w-6 h-6 text-[#F59C00]" />, desc: 'Ver todos os veículos à venda', highlight: true },
    { name: 'VENDA SEU CARRO', path: '/venda-seu-carro', icon: <DollarSign className="w-6 h-6 text-[#F59C00]" />, desc: 'Avaliamos e compramos seu veículo' },
    { name: 'SIMULAR FINANCIAMENTO', path: '/financiamento', icon: <FileCheck className="w-6 h-6 text-[#F59C00]" />, desc: 'Parcelas em até 60x fáceis' },
    { name: 'CONSIGNAÇÃO', path: '/consignacao', icon: <Sparkles className="w-6 h-6 text-[#F59C00]" />, desc: 'Deixe seu carro para vendermos' },
    { name: 'A EMPRESA', path: '/empresa', icon: <Building2 className="w-6 h-6 text-[#F59C00]" />, desc: 'Quem somos e nossa garantia' },
    { name: 'FALE CONOSCO', path: '/contato', icon: <Phone className="w-6 h-6 text-[#F59C00]" />, desc: 'Telefone, WhatsApp e endereço' },
  ];

  const isServicesActive = serviceDropdownLinks.some((s) => location.pathname.startsWith(s.path));

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-black/95 backdrop-blur-md border-b border-[#2E2E2E] transition-all duration-300 ${
          isScrolled ? 'shadow-2xl shadow-black/90' : 'shadow-none'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
          <div
            className={`flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 w-full ${
              isScrolled
                ? 'h-[48px] sm:h-[54px] lg:h-[58px]'
                : 'h-[74px] sm:h-[84px] lg:h-[94px]'
            }`}
          >
            {/* Logo Oficial Carplus Autos: Sempre shrink-0 para nunca sofrer sobreposição */}
            <Link
              to="/"
              className="flex items-center shrink-0 group focus-visible:outline-2 focus-visible:outline-[#F59C00] py-0.5 z-10"
              aria-label="Carplus Autos — Página Inicial"
            >
              <Logo
                variant="dark"
                className={`transition-all duration-300 group-hover:scale-105 ${
                  isScrolled
                    ? 'h-[28px] sm:h-[32px] lg:h-[36px] max-w-[130px] sm:max-w-[150px] lg:max-w-[170px]'
                    : 'h-[48px] sm:h-[58px] lg:h-[68px] max-w-[170px] sm:max-w-[210px] lg:max-w-[250px]'
                }`}
              />
            </Link>

            {/* Desktop Navigation (lg / 1024px+): Agrupado e Compacto */}
            <nav
              className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0"
              aria-label="Menu Principal"
            >
              {/* Início */}
              <Link
                to="/"
                aria-current={isActive('/') ? 'page' : undefined}
                className={`font-bold uppercase tracking-[0.05em] transition-all py-1 px-1 relative select-none whitespace-nowrap ${
                  isScrolled ? 'text-[11.5px] xl:text-[12.5px]' : 'text-[12px] xl:text-[13px]'
                } ${
                  isActive('/')
                    ? 'text-[#F59C00]'
                    : 'text-white/90 hover:text-[#F59C00]'
                }`}
              >
                INÍCIO
                {isActive('/') && (
                  <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#F59C00]" />
                )}
              </Link>

              {/* Estoque */}
              <Link
                to="/estoque"
                aria-current={isActive('/estoque') ? 'page' : undefined}
                className={`font-bold uppercase tracking-[0.05em] transition-all py-1 px-1 relative select-none whitespace-nowrap ${
                  isScrolled ? 'text-[11.5px] xl:text-[12.5px]' : 'text-[12px] xl:text-[13px]'
                } ${
                  isActive('/estoque')
                    ? 'text-[#F59C00]'
                    : 'text-white/90 hover:text-[#F59C00]'
                }`}
              >
                ESTOQUE
                {isActive('/estoque') && (
                  <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#F59C00]" />
                )}
              </Link>

              {/* Dropdown Agrupado: SERVIÇOS (Venda seu Carro, Financiamento, Consignação) */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  aria-expanded={servicesDropdownOpen}
                  className={`font-bold uppercase tracking-[0.05em] transition-all py-1 px-1.5 rounded flex items-center gap-1 select-none whitespace-nowrap cursor-pointer ${
                    isScrolled ? 'text-[11.5px] xl:text-[12.5px]' : 'text-[12px] xl:text-[13px]'
                  } ${
                    isServicesActive || servicesDropdownOpen
                      ? 'text-[#F59C00]'
                      : 'text-white/90 hover:text-[#F59C00]'
                  }`}
                >
                  <span>SERVIÇOS</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#F59C00]' : 'text-white/60'
                    }`}
                  />
                  {isServicesActive && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-[#F59C00]" />
                  )}
                </button>

                {/* Dropdown Menu Flutuante */}
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-[#141414] border border-[#2E2E2E] rounded-xl shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-md">
                    {serviceDropdownLinks.map((service) => {
                      const active = isActive(service.path);
                      return (
                        <Link
                          key={service.path}
                          to={service.path}
                          onClick={() => setServicesDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors group ${
                            active
                              ? 'bg-[#F59C00]/15 text-[#F59C00]'
                              : 'hover:bg-white/5 text-white'
                          }`}
                        >
                          <div className="p-1.5 rounded-md bg-black/60 border border-white/10 shrink-0 group-hover:border-[#F59C00]/40 transition-colors">
                            {service.icon}
                          </div>
                          <div>
                            <span className="font-display font-bold text-xs uppercase tracking-wide block group-hover:text-[#F59C00] transition-colors">
                              {service.name}
                            </span>
                            <span className="text-[11px] text-white/60 block leading-tight font-normal">
                              {service.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* A Empresa */}
              <Link
                to="/empresa"
                aria-current={isActive('/empresa') ? 'page' : undefined}
                className={`font-bold uppercase tracking-[0.05em] transition-all py-1 px-1 relative select-none whitespace-nowrap ${
                  isScrolled ? 'text-[11.5px] xl:text-[12.5px]' : 'text-[12px] xl:text-[13px]'
                } ${
                  isActive('/empresa')
                    ? 'text-[#F59C00]'
                    : 'text-white/90 hover:text-[#F59C00]'
                }`}
              >
                A EMPRESA
                {isActive('/empresa') && (
                  <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#F59C00]" />
                )}
              </Link>

              {/* Contato */}
              <Link
                to="/contato"
                aria-current={isActive('/contato') ? 'page' : undefined}
                className={`font-bold uppercase tracking-[0.05em] transition-all py-1 px-1 relative select-none whitespace-nowrap ${
                  isScrolled ? 'text-[11.5px] xl:text-[12.5px]' : 'text-[12px] xl:text-[13px]'
                } ${
                  isActive('/contato')
                    ? 'text-[#F59C00]'
                    : 'text-white/90 hover:text-[#F59C00]'
                }`}
              >
                CONTATO
                {isActive('/contato') && (
                  <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#F59C00]" />
                )}
              </Link>
            </nav>

            {/* Desktop Action Buttons (lg+) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
              <Link
                to="/estoque"
                className={`bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold tracking-wider uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 select-none cursor-pointer whitespace-nowrap shadow-sm hover:shadow-[0_0_20px_rgba(245,156,0,0.4)] active:scale-95 ${
                  isScrolled
                    ? 'h-8 px-3.5 text-[11px] xl:text-[11.5px]'
                    : 'h-9 px-4 xl:px-4.5 text-[11.5px] xl:text-[12px]'
                }`}
              >
                <span>VER ESTOQUE</span>
              </Link>

              <div className="relative group">
                <a
                  href={buildWhatsAppLink('Olá! Gostaria de falar com um consultor da Carplus Autos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full bg-[#1A1A1A] hover:bg-[#252525] border border-[#2E2E2E] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 ${
                    isScrolled ? 'w-8 h-8' : 'w-9 h-9'
                  }`}
                  aria-label="Conversar pelo WhatsApp"
                >
                  <MessageSquare className={`${isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-[#25D366] fill-current transition-all`} />
                </a>
                <span className="absolute right-full mr-3 px-3 py-1 bg-black text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
                  WhatsApp
                </span>
              </div>
            </div>

            {/* Mobile Controls (< 1024px): LIGAR e MENU ultra compactos no scroll */}
            <div className="flex items-center gap-1 sm:gap-1.5 lg:hidden shrink-0">
              {/* Botão LIGAR */}
              <a
                href="tel:+5541988740258"
                className={`flex items-center justify-center gap-1 bg-[#1A1A1A] hover:bg-[#252525] text-white border border-[#3A3A3A] font-display font-bold uppercase rounded-lg transition-all duration-300 select-none whitespace-nowrap active:scale-95 ${
                  isScrolled ? 'h-7 px-2 text-[9.5px]' : 'h-10 sm:h-10.5 px-2.5 sm:px-3 text-[11px] sm:text-xs'
                }`}
                aria-label="Ligar para a Carplus Autos"
              >
                <Phone className={`${isScrolled ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5 sm:w-4 sm:h-4'} text-[#F59C00] shrink-0 transition-all`} />
                <span>LIGAR</span>
              </a>

              {/* Botão MENU */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={`flex items-center justify-center gap-1 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold uppercase rounded-lg transition-all duration-300 select-none cursor-pointer whitespace-nowrap shadow-md active:scale-95 ${
                  isScrolled ? 'h-7 px-2 text-[9.5px]' : 'h-10 sm:h-10.5 px-3 sm:px-3.5 text-[11px] sm:text-xs'
                }`}
                aria-label="Abrir Menu de Opções"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className={`${isScrolled ? 'w-3 h-3' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'} text-black shrink-0 transition-all`} />
                <span>MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MENU MOBILE SUPER ACESSÍVEL (DESIGN FOCADO EM IDOSOS E FACILIDADE TOTAL)   */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Painel do Menu Completo */}
          <div className="absolute inset-x-0 top-0 bottom-0 max-w-md ml-auto bg-[#0F0F0F] border-l border-[#333333] shadow-2xl flex flex-col z-10 animate-fade-in">
            {/* Cabeçalho do Menu com botão FECHAR bem grande */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-[#161616] border-b border-[#2E2E2E]">
              <div>
                <span className="font-display font-extrabold uppercase tracking-wide text-base sm:text-lg text-[#F59C00] block">
                  OPÇÕES DO SITE
                </span>
                <span className="text-xs text-white/70">
                  Toque onde você deseja ir
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar Menu"
                className="h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center gap-1.5 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer border border-white/20 active:scale-95 transition-transform"
              >
                <X className="w-5 h-5 text-white" />
                <span>FECHAR</span>
              </button>
            </div>

            {/* Ações Rápidas em Destaque no Topo do Menu */}
            <div className="p-3 sm:p-4 bg-[#141414] border-b border-[#2E2E2E] grid grid-cols-2 gap-2.5">
              <a
                href="tel:+5541988740258"
                className="flex items-center justify-center gap-2 h-13 rounded-2xl bg-[#1E1E1E] hover:bg-[#252525] border-2 border-[#444444] text-white active:scale-95 transition-all text-center"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59C00]" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-[#F59C00] block leading-none">TELEFONE</span>
                  <span className="text-xs font-display font-bold uppercase text-white">LIGAR AGORA</span>
                </div>
              </a>

              <a
                href={buildWhatsAppLink('Olá! Estou com o menu aberto no site e gostaria de atendimento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-13 rounded-2xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border-2 border-[#25D366] text-white active:scale-95 transition-all text-center"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] fill-current" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-[#25D366] block leading-none">CONVERSAR</span>
                  <span className="text-xs font-display font-bold uppercase text-white">WHATSAPP</span>
                </div>
              </a>
            </div>

            {/* Lista de Páginas em Botões Grandes, Altos e com Textos Legíveis */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all active:scale-98 ${
                        active
                          ? 'bg-[#F59C00] border-[#F59C00] text-black shadow-lg shadow-[#F59C00]/20'
                          : link.highlight
                          ? 'bg-[#1C1A14] border-[#F59C00]/60 text-white hover:bg-[#252219]'
                          : 'bg-[#181818] border-[#2A2A2A] text-white hover:bg-[#222222]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            active
                              ? 'bg-black text-[#F59C00]'
                              : 'bg-black/60 border border-white/10 text-[#F59C00]'
                          }`}
                        >
                          {link.icon}
                        </div>
                        <div className="text-left">
                          <span
                            className={`font-display font-extrabold text-sm sm:text-base uppercase tracking-wide block leading-tight ${
                              active ? 'text-black' : 'text-white'
                            }`}
                          >
                            {link.name}
                          </span>
                          <span
                            className={`text-[11px] sm:text-xs block mt-0.5 ${
                              active ? 'text-black/80 font-medium' : 'text-[#A0A0A0]'
                            }`}
                          >
                            {link.desc}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                          active ? 'bg-black text-white' : 'bg-white/10 text-white'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Informações da Loja Físicas Claras no Rodapé do Drawer */}
            <div className="p-3.5 bg-[#141414] border-t border-[#2E2E2E] text-xs text-white/80 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F59C00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Carplus Autos Curitiba</strong>
                  <span>Av. Pres. Arthur Bernardes, 1323 — Bairro Portão</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4 text-[#F59C00]" />
                <span>Seg a Sex: 08h às 18h | Sáb: 08h às 12h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
