import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Car, ExternalLink } from 'lucide-react';
import { LOGO_URL } from '../components/layout/Header';

export function Empresa() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              SOBRE A CARPLUS
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-slate-900 tracking-wide">
            A CARPLUS AUTOS
          </h1>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Tradição, estrutura física completa e compromisso com transparência no mercado automotivo de Curitiba.
          </p>
        </div>

        {/* Bloco Institucional */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl shadow-slate-900/5">
          
          <div className="flex items-center justify-center pb-6 border-b border-slate-100">
            <img src={LOGO_URL} alt="Carplus Autos" className="h-14 w-auto object-contain" />
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              A <strong>Carplus Autos</strong> nasceu da sólida trajetória da <strong>Carplus Centro Automotivo</strong> em Curitiba, trazendo para o segmento de compra, venda, troca e consignação de veículos o mesmo padrão de excelência, respeito e integridade técnica que consolidou nossa marca no setor mecânico e de pneus.
            </p>
            <p>
              Localizados na <strong>Avenida Presidente Arthur da Silva Bernardes, 1323</strong>, no tradicional bairro Portão, contamos com uma estrutura moderna que integra showroom de veículos seminovos selecionados e centro automotivo completo.
            </p>
            <p>
              Cada veículo disponível em nosso estoque passa por critérios rigorosos de conferência documental, procedência e integridade estrutural, oferecendo a você a certeza de uma negociação segura, transparente e sem surpresas.
            </p>
          </div>

          {/* Cards de Integração */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <Car className="w-8 h-8 text-[#d97706] mb-3" />
              <h2 className="font-display font-bold text-base uppercase text-slate-900 mb-1">
                Carplus Autos
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compra, venda, troca e consignação de veículos seminovos com laudo e garantia de procedência em Curitiba.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <Wrench className="w-8 h-8 text-[#d97706] mb-3" />
              <h2 className="font-display font-bold text-base uppercase text-slate-900 mb-1">
                Carplus Pneus & Oficina
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Centro automotivo completo com alinhamento 3D, balanceamento, freios, suspensão e venda de pneus.
              </p>
              <a
                href="https://www.carpluspneuseoficina.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#d97706] hover:text-[#b45309] font-bold mt-3"
              >
                <span>Acessar site do centro automotivo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center">
            <Link
              to="/estoque"
              className="inline-block px-8 py-3.5 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-md shadow-[#F59C00]/20"
            >
              CONHEÇA NOSSO ESTOQUE
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
