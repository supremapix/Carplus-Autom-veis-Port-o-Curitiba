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
      title: 'Laudo cautelar',
      description: 'Laudo cautelar disponível para consulta.',
    },
    {
      icon: <Scale className="w-7 h-7 text-[#F59C00]" />,
      tag: 'COTAÇÃO JUSTA',
      title: 'Avaliação justa',
      description: 'Análise criteriosa e transparente do seu seminovo com valorização real de mercado e opção de troca com troco.',
    },
    {
      icon: <FileText className="w-7 h-7 text-[#F59C00]" />,
      tag: 'SEGURANÇA JURÍDICA',
      title: 'Assessoria & Financiamento',
      description: 'Processo ágil de transferência documental e suporte em financiamento.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#080808] text-white border-b border-[#222222] relative overflow-hidden">
      {/* Background Decorativo com foto da Carplus */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://img.carplusautos.com.br/hero.webp"
          alt="Carplus Autos"
          className="w-full h-full object-cover object-center opacity-10 filter brightness-50 contrast-125"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
      </div>

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
            subtitle="Seriedade e transparência em todas as etapas da negociação em Curitiba."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-[#F59C00] hover:bg-[#FFA31A] text-black border border-[#FFB833] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#F59C00]/30 flex flex-col justify-between group relative overflow-hidden shadow-lg"
            >
              {/* Linha de acento de brilho no topo do card */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-black border border-black/20 flex items-center justify-center transition-all group-hover:scale-105 shadow-md">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-black bg-black/10 px-2.5 py-1 rounded-full border border-black/15">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl uppercase text-black tracking-wide mb-2.5 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-black/85 leading-relaxed font-medium">
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
