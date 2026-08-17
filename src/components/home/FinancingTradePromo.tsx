import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, KeyRound, ArrowRight } from 'lucide-react';

export function FinancingTradePromo() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Financiamento */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400 hover:shadow-xl hover:shadow-slate-900/5 transition-all">
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#d97706]">
                <Calculator className="w-7 h-7" />
              </div>

              <span className="text-xs font-display font-bold text-[#d97706] uppercase tracking-wider block">
                FACILIDADE DE PAGAMENTO
              </span>

              <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-slate-900 tracking-wide">
                SOLICITAÇÃO DE FINANCIAMENTO
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Envie seus dados para solicitar uma simulação de financiamento personalizada para o veículo de sua preferência.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 relative z-10">
              <Link
                to="/financiamento"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#d97706] group-hover:text-[#b45309] transition-colors"
              >
                <span>SOLICITAR SIMULAÇÃO</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Card 2: Consignação */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400 hover:shadow-xl hover:shadow-slate-900/5 transition-all">
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#d97706]">
                <KeyRound className="w-7 h-7" />
              </div>

              <span className="text-xs font-display font-bold text-[#d97706] uppercase tracking-wider block">
                VENDA COM TRANQUILIDADE
              </span>

              <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-slate-900 tracking-wide">
                CONSIGNAÇÃO DE VEÍCULOS
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Deixe seu veículo na nossa loja física em Curitiba. Cuidamos da divulgação, atendimento, propostas e negociação com total segurança.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 relative z-10">
              <Link
                to="/consignacao"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#d97706] group-hover:text-[#b45309] transition-colors"
              >
                <span>CONHECER A CONSIGNAÇÃO</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
