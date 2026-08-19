import React from 'react';
import { Calculator, KeyRound, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
                Envie seus dados para solicitar uma simulação de financiamento em até 60x com os principais bancos.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E0E0E0] relative z-10 flex flex-col items-start">
              <Button
                to="/financiamento"
                variant="primary"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4 text-black" />}
                className="px-5 py-2.5 text-xs sm:text-[13px] tracking-wider shadow-md shadow-[#F59C00]/20"
              >
                SOLICITAR SIMULAÇÃO AGORA
              </Button>
              <span className="mt-2 text-xs text-[#8A8A8A] font-normal tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
                <span>Resposta ágil com as melhores taxas do mercado bancário</span>
              </span>
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

            <div className="mt-8 pt-6 border-t border-[#E0E0E0] relative z-10 flex flex-col items-start">
              <Button
                to="/consignacao"
                variant="dark"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4 text-[#F59C00]" />}
                className="px-5 py-2.5 text-xs sm:text-[13px] tracking-wider"
              >
                CONHECER A CONSIGNAÇÃO
              </Button>
              <span className="mt-2 text-xs text-[#8A8A8A] font-normal tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
                <span>Showroom físico monitorado e segurança jurídica total</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
