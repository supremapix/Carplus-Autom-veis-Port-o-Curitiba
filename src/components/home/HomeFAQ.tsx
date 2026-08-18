import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

export function HomeFAQ() {
  const faqs = [
    {
      q: 'Como funciona o processo de compra de um seminovo na Carplus Autos?',
      a: 'Você escolhe o modelo no estoque online e entra em contato via WhatsApp ou nos visita na loja física no bairro Portão. Apresentamos todo o histórico, laudo pericial cautelar, realizamos test-drive e cuidamos de toda a transferência documental com total transparência.',
    },
    {
      q: 'Posso dar meu carro usado como parte do pagamento (troca ou troco na troca)?',
      a: 'Sim! Avaliamos seu veículo seminovo com base no valor de mercado real de Curitiba. Você pode utilizar seu carro como entrada e financiar a diferença, ou se o seu seminovo valer mais, devolvemos a diferença em dinheiro na hora (troco na troca).',
    },
    {
      q: 'Como funciona a simulação e aprovação de financiamento?',
      a: 'Envie seus dados para solicitar uma simulação de financiamento.',
    },
    {
      q: 'Todos os veículos do estoque possuem garantia e laudo pericial?',
      a: 'As condições de cada veículo (laudo, garantia, documentação) são informadas na página do próprio veículo e confirmadas pela nossa equipe no atendimento.',
    },
    {
      q: 'O que é a Consignação Segura da Carplus Autos?',
      a: 'Na consignação, você deixa seu carro em nosso showroom na Av. Arthur Bernardes. Cuidamos das fotos profissionais, anúncios em portais especializados, atendimento e recebimento de propostas, garantindo que você venda seu veículo pelo melhor preço com total segurança e sem riscos.',
    },
    {
      q: 'Onde a Carplus Autos está localizada em Curitiba?',
      a: 'Estamos localizados na Avenida Presidente Arthur da Silva Bernardes, 1323, no bairro Portão, em Curitiba - PR (CEP 80320-300), com estacionamento próprio e fácil acesso.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFA] border-b border-[#E0E0E0]">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <SectionHeading
              align="center"
              kicker="TIRA-DÚVIDAS"
              title={
                <>
                  PERGUNTAS <span className="text-[#F59C00] italic">FREQUENTES</span>
                </>
              }
              subtitle="Tire suas dúvidas sobre compra, venda, troca, financiamento e consignação."
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
