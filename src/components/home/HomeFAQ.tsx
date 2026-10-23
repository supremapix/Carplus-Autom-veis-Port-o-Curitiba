import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { buildFaqPageJsonLd } from '../../lib/seo';

export function HomeFAQ() {
  const faqs = [
    {
      q: 'Onde fica o showroom da Carplus Autos?',
      a: 'Nosso showroom fica na Av. Pres. Arthur da Silva Bernardes, 1323, no bairro Portão, em Curitiba. Consulte fotos, características e histórico na página de cada veículo e esclareça as condições da negociação com a equipe.',
    },
    {
      q: 'Onde e como vender meu carro usado em Curitiba com pagamento à vista?',
      a: 'Entre em contato com a Carplus Autos e informe modelo, ano, quilometragem e estado do veículo. A proposta de compra à vista depende da avaliação e da conferência da documentação.',
    },
    {
      q: 'Como funciona a troca de carros e o troco na troca na Carplus Autos?',
      a: 'A equipe avalia seu usado e o veículo de interesse. Quando o valor aceito pelo seu carro supera o do veículo escolhido, a negociação pode incluir o pagamento da diferença. Consulte as condições da proposta.',
    },
    {
      q: 'Como funciona o financiamento de veículos seminovos na Carplus Autos?',
      a: 'Você pode solicitar uma simulação à equipe. Taxas, entrada, prazo e aprovação dependem da análise da instituição financeira e do veículo escolhido. A solicitação não garante aprovação.',
    },
    {
      q: 'Como funciona a consignação de veículos em Curitiba?',
      a: 'A Carplus Autos pode intermediar a venda do seu veículo, com exposição no showroom, divulgação e atendimento aos interessados. Consulte a equipe sobre avaliação, condições e contrato de consignação.',
    },
    {
      q: 'Qual é o horário de atendimento?',
      a: 'Atendemos de segunda a sexta, das 8h às 18h, e aos sábados, das 8h às 12h. Para dúvidas ou agendamento, fale pelo telefone ou WhatsApp (41) 98874-0258.',
    },
  ];

  const faqJsonLd = buildFaqPageJsonLd(faqs);

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFA] border-b border-[#E0E0E0]">
      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <SectionHeading
              align="center"
              kicker="TIRE SUAS DÚVIDAS"
              title={
                <>
                  PERGUNTAS <span className="text-[#F59C00] italic">FREQUENTES</span>
                </>
              }
              subtitle="Respostas diretas sobre compra, venda, troca, financiamento e localização da Carplus Autos em Curitiba."
            />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-[#E0E0E0] rounded-2xl overflow-hidden shadow-xs transition-all [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-6 text-base sm:text-lg font-bold text-[#121212] cursor-pointer select-none hover:text-[#F59C00] transition-colors">
                  <span className="pr-4 leading-snug">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-[#FAFAFA] group-hover:bg-[#F59C00]/20 flex items-center justify-center shrink-0 transition-colors">
                    <ChevronDown className="w-5 h-5 text-[#F59C00] transition-transform duration-300 group-open:rotate-180" />
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2 text-base text-[#666666] leading-relaxed border-t border-[#F2F2F2]">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
