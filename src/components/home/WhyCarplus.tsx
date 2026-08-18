import React from 'react';
import { ShieldCheck, FileCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function WhyCarplus() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#F59C00]" />,
      tag: 'ORIGEM COMPROVADA',
      title: 'Procedência Garantida',
      description: 'Veículos rigorosamente selecionados com histórico limpo, manual, chave reserva e sem qualquer passagem por leilão ou sinistro.',
    },
    {
      icon: <FileCheck className="w-7 h-7 text-[#F59C00]" />,
      tag: 'INSPEÇÃO TÉCNICA',
      title: 'Laudo Cautelar 100%',
      description: 'Estrutura monobloco, pintura, chassi e hodômetro inspecionados e certificados por empresa homologada pelo Detran.',
    },
    {
      icon: <Scale className="w-7 h-7 text-[#F59C00]" />,
      tag: 'COTAÇÃO JUSTA',
      title: 'Avaliação Superior no Usado',
      description: 'Análise criteriosa e transparente do seu seminovo com valorização real de mercado e opção de troca com troco imediato.',
    },
    {
      icon: <FileText className="w-7 h-7 text-[#F59C00]" />,
      tag: 'SEGURANÇA JURÍDICA',
      title: 'Assessoria & Financiamento',
      description: 'Processo ágil de transferência documental e condições exclusivas de financiamento em até 60 meses com os maiores bancos.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080808] text-white border-b border-[#222222] relative overflow-hidden">
      {/* Halo de iluminação de fundo suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F59C00]/5 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading
            align="center"
            theme="dark"
            kicker="EXCELÊNCIA & TRADIÇÃO"
            title={
              <>
                POR QUE NEGOCIAR NA <span className="text-[#F59C00] italic">CARPLUS AUTOS?</span>
              </>
            }
            subtitle="Mais de 15 anos de credibilidade, rigor técnico e atendimento exclusivo no mercado automotivo de Curitiba."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-[#141414] hover:bg-[#1A1A1A] border border-white/15 hover:border-[#F59C00]/60 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/70 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Linha de acento sutil no topo do card ao passar o mouse */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59C00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-black/80 border border-white/15 group-hover:border-[#F59C00]/50 flex items-center justify-center transition-all group-hover:scale-105 shadow-inner">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-[#F59C00] group-hover:text-white transition-colors bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl uppercase text-white tracking-wide mb-2.5 group-hover:text-[#F59C00] transition-colors leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#CCCCCC] leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
