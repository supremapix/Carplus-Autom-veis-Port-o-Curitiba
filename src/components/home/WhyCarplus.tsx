import React from 'react';
import { ShieldCheck, FileCheck, Scale, FileText } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function WhyCarplus() {
  const pillars = [
    {
      num: '01',
      icon: <ShieldCheck className="w-8 h-8 text-[#F59C00]" />,
      title: 'Procedência Garantida',
      description: 'Veículos rigorosamente selecionados com histórico limpo, manual, chave reserva e sem passagem por leilão.',
    },
    {
      num: '02',
      icon: <FileCheck className="w-8 h-8 text-[#F59C00]" />,
      title: 'Laudo Cautelar 100% Aprovado',
      description: 'Estrutura, pintura, chassi e hodômetro inspecionados por empresa homologada e certificada.',
    },
    {
      num: '03',
      icon: <Scale className="w-8 h-8 text-[#F59C00]" />,
      title: 'Avaliação Justa no Seu Usado',
      description: 'Análise criteriosa e transparente do seu seminovo com pagamento ágil e as melhores taxas de Curitiba.',
    },
    {
      num: '04',
      icon: <FileText className="w-8 h-8 text-[#F59C00]" />,
      title: 'Documentação Rápida & Transparente',
      description: 'Processo ágil e transparente de transferência e financiamento em até 60x com os principais bancos.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-black text-white border-b border-[#2E2E2E]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading
            align="center"
            kicker="DIFERENCIAIS CARPLUS"
            title={
              <>
                POR QUE NEGOCIAR NA <span className="text-[#F59C00] italic">CARPLUS AUTOS?</span>
              </>
            }
            subtitle="Mais de 15 anos de credibilidade e excelência no mercado automotivo de Curitiba."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#F59C00] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-black border border-[#2E2E2E] group-hover:border-[#F59C00]/50 flex items-center justify-center transition-colors">
                    {pillar.icon}
                  </div>
                  <span className="font-display font-bold text-2xl text-[#666666] group-hover:text-[#F59C00] transition-colors">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl uppercase text-white tracking-wide mb-3 group-hover:text-[#F59C00] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#B3B3B3] leading-relaxed">
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
