import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { buildFaqPageJsonLd } from '../../lib/seo';

export function HomeFAQ() {
  const faqs = [
    {
      q: 'Onde comprar veículos seminovos em Curitiba com garantia e procedência?',
      a: 'A Carplus Autos é referência na compra de veículos seminovos em Curitiba. Nosso showroom está localizado na Av. Pres. Arthur Bernardes, 1323, no bairro Portão. Todos os carros passam por laudo pericial cautelar 100% aprovado, revisão mecânica e possuem garantia legal de 3 meses para motor e câmbio.',
    },
    {
      q: 'Onde e como vender meu carro usado em Curitiba com pagamento à vista?',
      a: 'Você pode vender seu carro diretamente para a Carplus Autos no bairro Portão em Curitiba. Avaliamos seu seminovo com base nas cotações reais do mercado local e realizamos a compra imediata com pagamento via PIX/transferência à vista e quitação de débitos.',
    },
    {
      q: 'Como funciona a troca de carros e o troco na troca na Carplus Autos?',
      a: 'Avaliamos seu veículo usado como entrada para a compra de qualquer seminovo do nosso estoque em Curitiba. Se o valor da avaliação do seu carro for superior ao modelo escolhido, realizamos o troco na troca, pagando a diferença para você na hora.',
    },
    {
      q: 'Como funciona o financiamento de veículos seminovos na Carplus Autos?',
      a: 'Trabalhamos em parceria com os principais bancos e financeiras do Brasil para oferecer crédito facilitado com prazos em até 60 parcelas e taxas competitivas. Você pode fazer a simulação online em nosso site ou presencialmente em nosso showroom.',
    },
    {
      q: 'Como funciona a consignação de veículos em Curitiba?',
      a: 'Na consignação da Carplus Autos, deixamos seu veículo exposto em nosso showroom no Portão. Cuidamos das fotos de alta resolução, divulgação nos maiores portais automotivos e da triagem de compradores, garantindo uma venda segura pelo valor justo sem você precisar receber estranhos em casa.',
    },
    {
      q: 'Onde fica localizada a loja física da Carplus Autos em Curitiba?',
      a: 'Estamos localizados na Avenida Presidente Arthur da Silva Bernardes, 1323, no bairro Portão, em Curitiba - PR (CEP 80320-300), com estacionamento próprio, centro automotivo integrado e atendimento presencial de segunda a sábado.',
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
              kicker="TIRA-DÚVIDAS & SEO LOCAL"
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
