import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CARPLUS_PHONE_DISPLAY } from '../lib/whatsapp';

export function PoliticaPrivacidade() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-[#d97706]" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              LGPD & TRANSPARÊNCIA
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-slate-900 tracking-wide">
            POLÍTICA DE PRIVACIDADE
          </h1>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Última atualização: Fevereiro de 2025
          </p>
        </div>

        {/* Conteúdo da Política */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8 text-slate-700 text-sm leading-relaxed shadow-xl shadow-slate-900/5">
          
          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg uppercase text-slate-900 tracking-wider">
              1. Informações Gerais
            </h2>
            <p>
              A <strong>Carplus Autos</strong> (Av. Presidente Arthur da Silva Bernardes, 1323, Portão, Curitiba/PR) está comprometida em resguardar a sua privacidade e proteger os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 – LGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg uppercase text-slate-900 tracking-wider">
              2. Dados Coletados e Finalidade
            </h2>
            <p>
              Coletamos apenas os dados estritamente necessários fornecidos voluntariamente por você ao utilizar nossos canais e formulários:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Formulário de Interesse e Troca:</strong> Nome, telefone/WhatsApp, e-mail e dados do veículo usado para prestar atendimento sobre o veículo anunciado e avaliar propostas de compra ou troca.</li>
              <li><strong>Formulário de Venda e Consignação:</strong> Nome, telefone, dados do veículo e fotografias anexadas para realizar a análise técnica de avaliação e retorno comercial.</li>
              <li><strong>Formulário de Simulação de Financiamento:</strong> Nome, contato, prazo e estimativa de entrada para encaminhar simulações personalizadas.</li>
              <li><strong>Formulário de Contato Direto:</strong> Nome, WhatsApp e mensagem para esclarecimento de dúvidas e agendamento de visitas.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg uppercase text-slate-900 tracking-wider">
              3. Compartilhamento e Não Comercialização
            </h2>
            <p>
              A Carplus Autos <strong>NUNCA comercializa, aluga ou compartilha seus dados pessoais com terceiros</strong> para finalidades publicitárias ou não autorizadas. O compartilhamento ocorre única e exclusivamente com instituições financeiras e despachantes quando expressamente autorizado pelo titular para efetivação de propostas de financiamento ou transferência de veículo.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg uppercase text-slate-900 tracking-wider">
              4. Armazenamento e Segurança
            </h2>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acessos não autorizados, perdas acidentais ou qualquer forma de tratamento ilícito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg uppercase text-slate-900 tracking-wider">
              5. Seus Direitos como Titular
            </h2>
            <p>
              Nos termos do art. 18 da LGPD, você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, o acesso aos dados, a correção de dados incompletos ou a exclusão dos dados tratados com base no seu consentimento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-lg uppercase text-slate-900 tracking-wider">
              6. Canal de Atendimento do Titular (DPO / Encarregado)
            </h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato diretamente com nossa equipe através do telefone <strong>{CARPLUS_PHONE_DISPLAY}</strong> ou pelo endereço físico na Av. Presidente Arthur da Silva Bernardes, 1323, Portão, Curitiba/PR.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
