import React from 'react';
import { Calculator, KeyRound, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function FinancingTradePromo() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E0E0E0]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Financiamento */}
          <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#F59C00] hover:shadow-xl hover:shadow-black/5 transition-all">
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-[#F59C00] shadow-xs">
                <Calculator className="w-7 h-7" />
              </div>

              <span className="text-xs font-display font-bold text-[#F59C00] uppercase tracking-wider block">
                FACILIDADE DE PAGAMENTO
              </span>

              <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[#121212] tracking-wide">
                SIMULAÇÃO DE FINANCIAMENTO
              </h3>

              <p className="text-base text-[#666666] leading-relaxed">
                Parceria com os maiores bancos e financeiras do país (Santander, BV, Itaú, Bradesco, PAN). Financiamento em até 60x com as melhores taxas do Paraná.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E0E0E0] relative z-10">
              <Button
                to="/financiamento"
                variant="primary"
                iconRight={<ArrowRight className="w-4 h-4 text-black" />}
              >
                SOLICITAR SIMULAÇÃO AGORA
              </Button>
            </div>
          </div>

          {/* Card 2: Consignação */}
          <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#F59C00] hover:shadow-xl hover:shadow-black/5 transition-all">
            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-[#F59C00] shadow-xs">
                <KeyRound className="w-7 h-7" />
              </div>

              <span className="text-xs font-display font-bold text-[#F59C00] uppercase tracking-wider block">
                VENDA COM TRANQUILIDADE
              </span>

              <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[#121212] tracking-wide">
                CONSIGNAÇÃO SEGURA
              </h3>

              <p className="text-base text-[#666666] leading-relaxed">
                Deixe seu seminovo no nosso showroom na Av. Arthur Bernardes. Cuidamos das fotos profissionais, anúncios, atendimento a interessados e documentação.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E0E0E0] relative z-10">
              <Button
                to="/consignacao"
                variant="dark"
                iconRight={<ArrowRight className="w-4 h-4 text-[#F59C00]" />}
              >
                CONHECER A CONSIGNAÇÃO
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
