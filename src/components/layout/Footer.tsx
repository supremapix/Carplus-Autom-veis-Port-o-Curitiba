import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, MessageSquare, ExternalLink, Lock } from 'lucide-react';
import { LOGO_URL } from './Header';
import { SupremaCredit } from './SupremaCredit';
import { CARPLUS_PHONE_DISPLAY, buildWhatsAppLink } from '../../lib/whatsapp';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const brands = ['Land Rover', 'BMW', 'Nissan', 'Ford', 'Toyota', 'Jeep', 'Volkswagen', 'Chevrolet'];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Coluna 1: Sobre & Logo */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={LOGO_URL}
                alt="Carplus Autos"
                className="h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Compra, venda e troca de veículos em Curitiba com segurança, transparência e atendimento especializado.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/carpluscwb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#F59C00] hover:border-[#F59C00] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppLink('Olá! Vim através do site e gostaria de atendimento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#F59C00] hover:bg-[#F59C00] hover:text-black transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://maps.google.com/?q=Av.+Presidente+Arthur+da+Silva+Bernardes,+1323+-+Port%C3%A3o,+Curitiba+-+PR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#F59C00] hover:border-[#F59C00] transition-colors"
                aria-label="Como Chegar"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="space-y-4">
            <h3 className="text-white font-display text-base uppercase tracking-wider font-bold">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/estoque" className="hover:text-[#F59C00] transition-colors flex items-center gap-1.5">
                  <span>Estoque de Veículos</span>
                </Link>
              </li>
              <li>
                <Link to="/venda-seu-carro" className="hover:text-[#F59C00] transition-colors">
                  Venda seu Carro
                </Link>
              </li>
              <li>
                <Link to="/financiamento" className="hover:text-[#F59C00] transition-colors">
                  Financiamento
                </Link>
              </li>
              <li>
                <Link to="/consignacao" className="hover:text-[#F59C00] transition-colors">
                  Consignação de Veículos
                </Link>
              </li>
              <li>
                <Link to="/empresa" className="hover:text-[#F59C00] transition-colors">
                  A Empresa
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-[#F59C00] transition-colors">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-[#F59C00] transition-colors">
                  Política de Privacidade (LGPD)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Estoque por Marca */}
          <div className="space-y-4">
            <h3 className="text-white font-display text-base uppercase tracking-wider font-bold">
              Estoque por Marca
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {brands.map((b) => (
                <li key={b}>
                  <Link
                    to={`/estoque?marca=${b}`}
                    className="hover:text-[#F59C00] transition-colors inline-block"
                  >
                    {b}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                to="/estoque"
                className="text-xs font-bold text-[#F59C00] hover:text-[#F7941D] uppercase tracking-wider flex items-center gap-1"
              >
                Ver todas as marcas →
              </Link>
            </div>
          </div>

          {/* Coluna 4: Onde Estamos & Contato */}
          <div className="space-y-4">
            <h3 className="text-white font-display text-base uppercase tracking-wider font-bold">
              Onde Estamos
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59C00] shrink-0 mt-0.5" />
                <p>
                  Av. Presidente Arthur da Silva Bernardes, 1323 — Portão, Curitiba/PR<br />
                  <span className="text-xs text-slate-500">CEP 80320-300</span>
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59C00] shrink-0" />
                <a href="tel:4130827282" className="hover:text-white transition-colors">
                  {CARPLUS_PHONE_DISPLAY}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F59C00] shrink-0 mt-0.5" />
                <p className="text-xs">
                  Segunda a Sexta: 08:00 – 18:00<br />
                  Sábado: 08:00 – 12:00
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900">
                <a
                  href="https://www.carpluspneuseoficina.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#F59C00] transition-colors"
                >
                  <span>Conheça a Carplus Centro Automotivo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Linha de Copyright & Acesso Restrito */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            Carplus Autos © {currentYear} · Todos os direitos reservados. CNPJ matriz Curitiba/PR.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/politica-de-privacidade" className="hover:text-slate-300 transition-colors">
              Privacidade
            </Link>
            <span className="text-slate-800">·</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 hover:text-[#F59C00] transition-colors"
              title="Painel Administrativo"
            >
              <Lock className="w-3 h-3" />
              <span>Painel Admin</span>
            </Link>
          </div>
        </div>

        {/* Crédito Oficial Suprema Sites Express */}
        <SupremaCredit />
      </div>
    </footer>
  );
}
