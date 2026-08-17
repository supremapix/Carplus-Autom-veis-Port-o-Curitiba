import React from 'react';
import { ShieldCheck, FileCheck, Scale, FileText } from 'lucide-react';

export function WhyCarplus() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#d97706]" />,
      title: 'Procedência Garantida',
      description: 'Veículos selecionados rigorosamente para garantir tranquilidade e segurança na sua compra.',
    },
    {
      icon: <FileCheck className="w-8 h-8 text-[#d97706]" />,
      title: 'Vistoria Aprovada',
      description: 'Estrutura, histórico e integridade verificados em cada veículo que entra em nosso estoque.',
    },
    {
      icon: <Scale className="w-8 h-8 text-[#d97706]" />,
      title: 'Avaliação Justa',
      description: 'Análise criteriosa e transparente do seu veículo seminovo na troca ou na venda direta.',
    },
    {
      icon: <FileText className="w-8 h-8 text-[#d97706]" />,
      title: 'Documentação em Dia',
      description: 'Processo ágil e transparente de transferência e documentação do início ao fim.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              DIFERENCIAIS CARPLUS
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-slate-900 tracking-wide">
            POR QUE NEGOCIAR NA CARPLUS AUTOS?
          </h2>
          <p className="text-sm text-slate-600 mt-3">
            Compromisso com seriedade, laudo e confiança em todas as etapas da negociação em Curitiba.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:border-amber-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center mb-5">
                  {pillar.icon}
                </div>
                <h3 className="font-display font-bold text-lg uppercase text-slate-900 tracking-wide mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
