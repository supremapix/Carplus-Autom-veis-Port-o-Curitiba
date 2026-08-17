import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function SellPromo() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl shadow-slate-900/5">
          {/* Fundo decorativo sutil */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            {/* Coluna Texto */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
                <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
                  AVALIAÇÃO DE VEÍCULOS
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl uppercase text-slate-900 tracking-wide leading-tight">
                QUER VENDER SEU CARRO EM CURITIBA?
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Na Carplus Autos, você tem um processo transparente e sem burocracia para vender ou consignar seu veículo com quem entende do mercado paranaense.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                  <span>Envie os dados e fotos do seu veículo pelo site</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                  <span>Nossa equipe avalia o modelo com base no mercado real</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                  <span>Atendimento rápido via WhatsApp para tirar todas as dúvidas</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/venda-seu-carro"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all transform active:scale-95 shadow-xl shadow-[#F59C00]/25"
                >
                  <span>SOLICITAR AVALIAÇÃO DO MEU CARRO</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Coluna Imagem / Destaque Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl aspect-[4/3]">
                <img
                  src="https://img.olx.com.br/images/72/720607555549489.webp"
                  alt="Avaliação de veículos Carplus Autos Curitiba"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-md">
                  <span className="text-[11px] font-display font-bold text-[#d97706] uppercase tracking-wider block">
                    Atendimento Especializado
                  </span>
                  <p className="text-xs text-slate-700 mt-1">
                    Equipe pronta para avaliar seu veículo presencialmente no bairro Portão ou online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
