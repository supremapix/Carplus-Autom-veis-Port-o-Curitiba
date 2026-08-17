import React from 'react';
import { ChevronDown } from 'lucide-react';

export function HomeFAQ() {
  const faqs = [
    {
      q: 'Como funciona o processo de compra de um veículo na Carplus Autos?',
      a: 'Você pode escolher o modelo no estoque online e entrar em contato pelo WhatsApp ou visitar nossa loja física no bairro Portão. Realizamos o atendimento, apresentação completa do veículo, esclarecimento de dúvidas e condução de todo o processo de transferência documental.',
    },
    {
      q: 'Posso dar meu carro usado como parte do pagamento (troca)?',
      a: 'Sim. Aceitamos veículos seminovos na troca mediante avaliação presencial ou prévia pelo site. Avaliamos o estado de conservação, histórico, quilometragem e documentação do seu veículo usado para abatimento no valor do modelo escolhido.',
    },
    {
      q: 'Como solicito uma simulação de financiamento?',
      a: 'Basta acessar a página de Financiamento ou clicar no botão de simulação no veículo desejado, preencher seus dados básicos de contato e nossa equipe entrará em contato para apresentar as opções de planos e prazos disponíveis.',
    },
    {
      q: 'O que é o serviço de consignação de veículos?',
      a: 'Na consignação, você deixa seu carro em nossa loja física e nós cuidamos de toda a divulgação profissional, fotos, atendimento aos interessados e negociação segura, permitindo que você venda sem se expor diretamente a estranhos.',
    },
    {
      q: 'Quais documentos são necessários para a negociação?',
      a: 'Geralmente são solicitados documento de identificação oficial com foto (RG/CNH), comprovante de residência atualizado e o documento do veículo (CRLV-e / ATPV-e) caso haja troca ou venda.',
    },
    {
      q: 'Onde a Carplus Autos está localizada em Curitiba?',
      a: 'Estamos na Avenida Presidente Arthur da Silva Bernardes, 1323, no bairro Portão, em Curitiba/PR. Contamos com espaço físico integrado para atendimento e estacionamento.',
    },
    {
      q: 'Como agendar uma visita ou test-drive?',
      a: 'Você pode clicar no botão de WhatsApp em qualquer veículo do estoque para falar diretamente com um consultor e agendar o melhor horário para sua visita.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              TIRA-DÚVIDAS
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-slate-900 tracking-wide">
            PERGUNTAS FREQUENTES
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Respostas para as principais dúvidas sobre compra, venda, troca e consignação.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between p-5 sm:p-6 text-sm sm:text-base font-bold text-slate-900 cursor-pointer select-none hover:text-[#d97706] transition-colors">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className="w-5 h-5 text-[#F59C00] shrink-0 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
