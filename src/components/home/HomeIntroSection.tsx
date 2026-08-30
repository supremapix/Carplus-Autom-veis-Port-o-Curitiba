import React from 'react';
import { ShieldCheck, RefreshCw, Banknote, MapPin, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';

export function HomeIntroSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#FAFAFA] border-b border-[#E0E0E0]">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge de Destaque Semântico */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E0E0E0] shadow-xs text-xs font-display font-bold uppercase tracking-wider text-[#121212]">
            <MapPin className="w-4 h-4 text-[#F59C00]" />
            <span>PORTÃO · CURITIBA / PR</span>
          </div>

          {/* Único H1 Principal da Homepage */}
          <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#121212] leading-tight">
            Compra e Venda de Veículos em Curitiba
          </h1>

          {/* Parágrafo de Apresentação Factual para Motores de Busca e LLMs */}
          <p className="text-base sm:text-lg text-[#444444] font-medium leading-relaxed max-w-3xl mx-auto">
            A <strong className="text-[#121212]">Carplus Autos</strong> é uma empresa de compra e venda de veículos localizada no bairro <strong className="text-[#121212]">Portão, em Curitiba</strong>. Oferecemos estoque de veículos seminovos selecionados e periciados, compra à vista com pagamento imediato, avaliação justa para troca de carros, financiamento em até 60x e consignação segura.
          </p>

          {/* Grid de Serviços Confirmados */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-[#F59C00] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-sm uppercase text-[#121212]">Seminovos Periciados</h2>
                  <span className="text-xs text-[#777777]">Laudo 100% aprovado e garantia</span>
                </div>
              </div>
              <p className="text-xs text-[#555555] leading-normal pt-1 border-t border-[#F0F0F0]">
                Carros revisados com histórico veicular verificado e total procedência.
              </p>
            </div>

            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-[#F59C00] flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-sm uppercase text-[#121212]">Compra e Troca</h2>
                  <span className="text-xs text-[#777777]">Pagamento à vista / Troco na troca</span>
                </div>
              </div>
              <p className="text-xs text-[#555555] leading-normal pt-1 border-t border-[#F0F0F0]">
                Avaliamos seu seminovo pela tabela real de mercado para compra imediata ou troca.
              </p>
            </div>

            <div className="bg-white border border-[#E0E0E0] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-[#F59C00] flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-sm uppercase text-[#121212]">Financiamento & Consignação</h2>
                  <span className="text-xs text-[#777777]">Até 60x / Showroom físico</span>
                </div>
              </div>
              <p className="text-xs text-[#555555] leading-normal pt-1 border-t border-[#F0F0F0]">
                Simulação de parcelas e consignação segura com divulgação profissional.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
