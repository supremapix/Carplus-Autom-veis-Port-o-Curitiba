import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  FileText,
  Car,
  DollarSign,
  FileCheck,
  Building2,
  Navigation,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { SupremaCredit } from './SupremaCredit';
import { CARPLUS_PHONE_DISPLAY, buildWhatsAppLink } from '../../lib/whatsapp';
import { Container } from '../ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white border-t-2 border-[#2E2E2E]">
      {/* ========================================================================= */}
      {/* 1. SEÇÃO DE AJUDA DIRETA: BOTÕES GRANDES PARA CONTATO E LOCALIZAÇÃO       */}
      {/* ========================================================================= */}
      <div className="bg-[#F59C00] text-black py-8 sm:py-10 border-b border-black/10">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-display font-bold uppercase tracking-wider">
                ATENDIMENTO DIRETO EM CURITIBA
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide leading-tight text-black">
                PRECISA DE AJUDA PARA ESCOLHER SEU CARRO?
              </h3>
              <p className="text-base sm:text-lg font-medium text-black/90">
                Fale conosco agora por telefone, WhatsApp ou venha nos visitar no bairro Portão.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
              <a
                href={buildWhatsAppLink('Olá! Gostaria de ajuda para ver os carros disponíveis.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-black hover:bg-[#1A1A1A] active:bg-[#252525] text-white font-display font-bold text-base tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl border-2 border-black active:scale-95 transition-all select-none cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-[#25D366] fill-current" />
                <span>CHAMAR NO WHATSAPP</span>
              </a>

              <a
                href="tel:+5541988740258"
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white hover:bg-[#F2F2F2] active:bg-[#E5E5E5] text-black font-display font-bold text-base tracking-wider uppercase flex items-center justify-center gap-3 border-2 border-black shadow-lg active:scale-95 transition-all select-none cursor-pointer"
              >
                <Phone className="w-5 h-5 text-[#F59C00]" />
                <span>LIGAR: {CARPLUS_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTEÚDO PRINCIPAL DO FOOTER: CLARO, ORGANIZADO E COM TEXTOS GRANDES   */}
      {/* ========================================================================= */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 pb-12 border-b border-[#2E2E2E]">
            {/* Coluna 1: Sobre a Loja & Redes */}
            <div className="space-y-5">
              <Link to="/" className="inline-block" aria-label="Página Inicial Carplus Autos">
                <Logo variant="dark" className="h-16 sm:h-20 max-w-[280px]" />
              </Link>

              <p className="text-base text-[#D0D0D0] leading-relaxed">
                Loja de seminovos selecionados e revisados em Curitiba com procedência, garantia e aprovação rápida de crédito.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-[#F59C00] block">
                  SIGA NOSSAS REDES E CONTATOS
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/carpluscwb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#3A3A3A] hover:border-[#F59C00] flex items-center gap-2 text-white hover:text-[#F59C00] transition-all font-display font-bold text-xs uppercase"
                    aria-label="Instagram Oficial Carplus"
                  >
                    <Instagram className="w-5 h-5 text-[#F59C00]" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Av.+Presidente+Arthur+da+Silva+Bernardes,+1323+-+Port%C3%A3o,+Curitiba+-+PR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#3A3A3A] hover:border-[#F59C00] flex items-center gap-2 text-white hover:text-[#F59C00] transition-all font-display font-bold text-xs uppercase"
                    aria-label="Como chegar pelo Google Maps"
                  >
                    <Navigation className="w-5 h-5 text-[#F59C00]" />
                    <span>Como Chegar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Coluna 2: Páginas do Site (Links Maiores e Fáceis de Clicar) */}
            <div className="space-y-4">
              <h4 className="font-display text-xl uppercase tracking-wider font-extrabold text-[#F59C00] border-b border-[#2E2E2E] pb-2">
                PÁGINAS DO SITE
              </h4>
              <ul className="space-y-3 text-base">
                <li>
                  <Link
                    to="/estoque"
                    className="flex items-center gap-2.5 text-white hover:text-[#F59C00] transition-colors py-1 font-bold"
                  >
                    <Car className="w-5 h-5 text-[#F59C00] shrink-0" />
                    <span>Estoque de Veículos à Venda</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/venda-seu-carro"
                    className="flex items-center gap-2.5 text-[#E0E0E0] hover:text-[#F59C00] transition-colors py-1"
                  >
                    <DollarSign className="w-5 h-5 text-[#F59C00] shrink-0" />
                    <span>Venda seu Carro (Compramos à Vista)</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/financiamento"
                    className="flex items-center gap-2.5 text-[#E0E0E0] hover:text-[#F59C00] transition-colors py-1"
                  >
                    <FileCheck className="w-5 h-5 text-[#F59C00] shrink-0" />
                    <span>Simular Financiamento em até 60x</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/empresa"
                    className="flex items-center gap-2.5 text-[#E0E0E0] hover:text-[#F59C00] transition-colors py-1"
                  >
                    <Building2 className="w-5 h-5 text-[#F59C00] shrink-0" />
                    <span>Sobre a Carplus Autos</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contato"
                    className="flex items-center gap-2.5 text-[#E0E0E0] hover:text-[#F59C00] transition-colors py-1"
                  >
                    <Phone className="w-5 h-5 text-[#F59C00] shrink-0" />
                    <span>Fale Conosco e Endereço</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Endereço & Horário com Letras Maiores e Destacadas */}
            <div className="space-y-4">
              <h4 className="font-display text-xl uppercase tracking-wider font-extrabold text-[#F59C00] border-b border-[#2E2E2E] pb-2">
                ONDE ESTAMOS & HORÁRIOS
              </h4>
              
              <div className="space-y-4">
                {/* Endereço */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#141414] border border-[#2A2A2A]">
                  <div className="w-10 h-10 rounded-xl bg-[#F59C00]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-6 h-6 text-[#F59C00]" />
                  </div>
                  <div>
                    <strong className="text-white text-base block font-bold">
                      Av. Pres. Arthur da Silva Bernardes, 1323
                    </strong>
                    <p className="text-sm text-[#B3B3B3]">
                      Bairro Portão — Curitiba - PR (CEP 80320-300)
                    </p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#141414] border border-[#2A2A2A]">
                  <div className="w-10 h-10 rounded-xl bg-[#F59C00]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-6 h-6 text-[#F59C00]" />
                  </div>
                  <div>
                    <strong className="text-white text-base block font-bold">
                      Horário de Funcionamento
                    </strong>
                    <p className="text-sm text-[#D0D0D0]">Segunda a Sexta: 08:00 às 18:00</p>
                    <p className="text-sm text-[#D0D0D0]">Sábado: 08:00 às 12:00</p>
                  </div>
                </div>

                {/* Oficina Parceira */}
                <a
                  href="https://www.carpluspneuseoficina.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#B3B3B3] hover:text-[#F59C00] transition-colors pt-1 font-medium"
                >
                  <span>Centro Automotivo: Carplus Pneus & Oficina</span>
                  <ExternalLink className="w-4 h-4 text-[#F59C00]" />
                </a>
              </div>
            </div>
          </div>

          {/* Linha de Copyright & Links Legais */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#A0A0A0]">
            <p className="text-center sm:text-left">
              Carplus Autos © {currentYear} · Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center text-sm">
              <Link to="/politica-de-privacidade" className="hover:text-white transition-colors flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F59C00]" />
                <span>Política de Privacidade</span>
              </Link>
              <span className="text-[#444444]">·</span>
              <a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#B3B3B3]" />
                <span>Mapa do Site</span>
              </a>
            </div>
          </div>

          {/* Selo de Crédito */}
          <SupremaCredit />
        </Container>
      </div>
    </footer>
  );
}
