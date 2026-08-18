import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, MessageSquare, ExternalLink, Lock, ShieldCheck, FileText } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { SupremaCredit } from './SupremaCredit';
import { CARPLUS_PHONE_DISPLAY, buildWhatsAppLink } from '../../lib/whatsapp';
import { Container } from '../ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const brands = [
    { name: 'Toyota', count: '1 veículo' },
    { name: 'Land Rover', count: '1 veículo' },
    { name: 'BMW', count: '1 veículo' },
    { name: 'Nissan', count: '1 veículo' },
    { name: 'Ford', count: '1 veículo' },
  ];

  return (
    <footer className="bg-black text-white border-t border-[#2E2E2E]">
      {/* Faixa Laranja CTA Pré-Footer (Idêntica à do Site Aprovado) */}
      <div className="bg-[#F59C00] text-black py-10 sm:py-12 border-b border-black/10">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-1.5 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-xs font-display font-bold uppercase tracking-wider mb-1">
                ATENDIMENTO DIRETO EM CURITIBA
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide leading-tight text-black">
                QUER COMPRAR, VENDER OU TROCAR SEU CARRO?
              </h3>
              <p className="text-sm sm:text-base font-semibold text-black/85">
                Avaliação justa no seu usado, laudo cautelar aprovado e aprovação rápida de financiamento.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
              <a
                href={buildWhatsAppLink('Olá! Gostaria de uma consultoria para comprar ou vender meu veículo.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-black hover:bg-[#151515] text-white font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-black/20 border border-black hover:border-black/80 transition-all duration-300 transform hover:-translate-y-0.5 select-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#25D366] fill-current" />
                </div>
                <span>WHATSAPP AGORA</span>
              </a>

              <a
                href="tel:+5541988740258"
                className="w-full sm:w-auto h-14 px-7 rounded-2xl bg-white hover:bg-[#F8F9FA] text-black font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 border border-black/15 hover:border-black shadow-lg shadow-black/5 transition-all duration-300 transform hover:-translate-y-0.5 select-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#F59C00]" />
                </div>
                <span>{CARPLUS_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Grid Principal de 4 Colunas do Footer */}
      <div className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#2E2E2E]">
            {/* Coluna 1: Sobre & Logo Oficial */}
            <div className="space-y-5">
              <Link to="/" className="inline-block" aria-label="Página Inicial Carplus Autos">
                <Logo variant="dark" className="h-16 sm:h-20 lg:h-24 max-w-[340px] sm:max-w-[380px]" />
              </Link>
              <p className="text-sm text-[#B3B3B3] leading-relaxed">
                Compra, venda e troca de veículos em Curitiba com segurança e transparência.
              </p>

              {/* Redes Sociais em Círculos de 48px */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.instagram.com/carpluscwb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#F59C00] flex items-center justify-center text-white hover:text-[#F59C00] transition-all"
                  aria-label="Instagram Oficial Carplus"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={buildWhatsAppLink('Olá! Vim através do site e gostaria de atendimento.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#25D366] flex items-center justify-center text-[#25D366] transition-all"
                  aria-label="WhatsApp Oficial"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                </a>
                <a
                  href="https://maps.google.com/?q=Av.+Presidente+Arthur+da+Silva+Bernardes,+1323+-+Port%C3%A3o,+Curitiba+-+PR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#F59C00] flex items-center justify-center text-white hover:text-[#F59C00] transition-all"
                  aria-label="Localização no Google Maps"
                >
                  <MapPin className="w-5 h-5 text-[#F59C00]" />
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação Institucional */}
            <div className="space-y-4">
              <h4 className="font-display text-lg uppercase tracking-wider font-bold text-[#F59C00]">
                NAVEGAÇÃO
              </h4>
              <ul className="space-y-2 text-base text-[#E0E0E0]">
                <li>
                  <Link to="/" className="hover:text-[#F59C00] transition-colors inline-block py-1">
                    Início
                  </Link>
                </li>
                <li>
                  <Link to="/estoque" className="hover:text-[#F59C00] transition-colors inline-block py-1 font-semibold text-white">
                    Estoque de Veículos
                  </Link>
                </li>
                <li>
                  <Link to="/venda-seu-carro" className="hover:text-[#F59C00] transition-colors inline-block py-1">
                    Venda seu Carro
                  </Link>
                </li>
                <li>
                  <Link to="/financiamento" className="hover:text-[#F59C00] transition-colors inline-block py-1">
                    Simular Financiamento
                  </Link>
                </li>
                <li>
                  <Link to="/consignacao" className="hover:text-[#F59C00] transition-colors inline-block py-1">
                    Consignação Segura
                  </Link>
                </li>
                <li>
                  <Link to="/empresa" className="hover:text-[#F59C00] transition-colors inline-block py-1">
                    A Empresa
                  </Link>
                </li>
                <li>
                  <Link to="/contato" className="hover:text-[#F59C00] transition-colors inline-block py-1">
                    Fale Conosco
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Estoque por Marca */}
            <div className="space-y-4">
              <h4 className="font-display text-lg uppercase tracking-wider font-bold text-[#F59C00]">
                ESTOQUE POR MARCA
              </h4>
              <ul className="space-y-2.5 text-base text-[#E0E0E0]">
                {brands.map((b) => (
                  <li key={b.name}>
                    <Link
                      to={`/estoque?marca=${encodeURIComponent(b.name)}`}
                      className="hover:text-[#F59C00] transition-colors flex items-center justify-between group py-1"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{b.name}</span>
                      <span className="text-xs text-[#B3B3B3] bg-[#1A1A1A] px-2.5 py-0.5 rounded-full border border-[#2E2E2E]">
                        {b.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link
                  to="/estoque"
                  className="text-xs font-display font-bold text-[#F59C00] hover:text-[#F7941D] uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <span>VER TODO O ESTOQUE</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Coluna 4: Onde Estamos & Contato Direto */}
            <div className="space-y-4">
              <h4 className="font-display text-lg uppercase tracking-wider font-bold text-[#F59C00]">
                ONDE ESTAMOS
              </h4>
              <div className="space-y-4 text-base">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#F59C00]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold leading-snug">
                      Av. Pres. Arthur da Silva Bernardes, 1323
                    </p>
                    <p className="text-sm text-[#B3B3B3]">
                      Portão — Curitiba - PR · CEP 80320-300
                    </p>
                  </div>
                </div>

                {/* Telefone em Destaque Oswald 28px */}
                <div className="p-3.5 bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl">
                  <div className="text-xs font-display font-bold uppercase tracking-wider text-[#B3B3B3] mb-0.5">
                    TELEFONE & WHATSAPP
                  </div>
                  <a
                    href="tel:+5541988740258"
                    className="font-display font-bold text-2xl sm:text-[28px] text-[#F59C00] hover:text-[#F7941D] transition-colors block tracking-wide"
                  >
                    {CARPLUS_PHONE_DISPLAY}
                  </a>
                </div>

                <div className="flex items-start gap-3 text-sm text-[#B3B3B3]">
                  <Clock className="w-5 h-5 text-[#F59C00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Segunda a Sexta: 08:00 – 18:00</p>
                    <p>Sábado: 08:00 – 12:00</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2E2E2E]">
                  <a
                    href="https://www.carpluspneuseoficina.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B3B3B3] hover:text-[#F59C00] transition-colors font-medium"
                  >
                    <span>Carplus Pneus & Oficina (Centro Automotivo)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#F59C00]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Linha de Copyright & Links Legais */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#B3B3B3]">
            <p className="text-center sm:text-left">
              Carplus Autos © {currentYear} · Todos os direitos reservados. CNPJ Matriz Curitiba/PR.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link to="/politica-de-privacidade" className="hover:text-white transition-colors flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F59C00]" />
                <span>Política de Privacidade (LGPD)</span>
              </Link>
              <span className="text-[#333333]">·</span>
              <a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#B3B3B3]" />
                <span>Sitemap XML</span>
              </a>
            </div>
          </div>

          {/* Selo Suprema Sites Express */}
          <SupremaCredit />
        </Container>
      </div>
    </footer>
  );
}
