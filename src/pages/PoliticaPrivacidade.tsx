import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CARPLUS_PHONE_DISPLAY } from '../lib/whatsapp';
import { Container } from '../components/ui/Container';
import { PageHero } from '../components/ui/PageHero';

export function PoliticaPrivacidade() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero Preto */}
      <PageHero
        kicker="LGPD & TRANSPARÊNCIA"
        title="POLÍTICA DE PRIVACIDADE"
        subtitle="Como tratamos, armazenamos e protegemos seus dados pessoais de forma transparente e segura."
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Política de Privacidade' },
        ]}
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Conteúdo da Política */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-8 sm:p-12 space-y-8 text-[#333333] text-base leading-relaxed shadow-xl">
              
              <div className="pb-4 border-b border-[#E0E0E0]">
                <span className="text-xs text-[#666666] font-bold uppercase tracking-wider">
                  Última atualização: Fevereiro de 2025
                </span>
              </div>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl uppercase text-[#121212] tracking-wider">
                  1. Informações Gerais
                </h2>
                <p>
                  A <strong className="text-[#121212]">Carplus Autos</strong> (Av. Presidente Arthur da Silva Bernardes, 1323, Portão, Curitiba/PR — CEP 80320-300) está comprometida em resguardar a sua privacidade e proteger os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 – LGPD).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl uppercase text-[#121212] tracking-wider">
                  2. Dados Coletados e Finalidade
                </h2>
                <p>
                  Coletamos apenas os dados estritamente necessários fornecidos voluntariamente por você ao utilizar nossos canais e formulários:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-[#666666]">
                  <li><strong className="text-[#121212]">Formulário de Interesse e Troca:</strong> Nome, telefone/WhatsApp, e-mail e dados do veículo usado para prestar atendimento sobre o veículo anunciado e avaliar propostas de compra ou troca.</li>
                  <li><strong className="text-[#121212]">Formulário de Venda e Consignação:</strong> Nome, telefone, dados do veículo e fotografias anexadas para realizar a análise técnica de avaliação e retorno comercial.</li>
                  <li><strong className="text-[#121212]">Formulário de Simulação de Financiamento:</strong> Nome, CPF, data de nascimento, contato, prazo e estimativa de entrada para encaminhar simulações personalizadas junto aos bancos parceiros.</li>
                  <li><strong className="text-[#121212]">Formulário de Contato Direto:</strong> Nome, WhatsApp e mensagem para esclarecimento de dúvidas e agendamento de visitas.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl uppercase text-[#121212] tracking-wider">
                  3. Compartilhamento e Não Comercialização
                </h2>
                <p>
                  A Carplus Autos <strong className="text-[#121212]">NUNCA comercializa, aluga ou compartilha seus dados pessoais com terceiros</strong> para finalidades publicitárias ou não autorizadas. O compartilhamento ocorre única e exclusivamente com instituições financeiras e despachantes quando expressamente autorizado pelo titular para efetivação de propostas de financiamento ou transferência de veículo.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl uppercase text-[#121212] tracking-wider">
                  4. Armazenamento e Segurança
                </h2>
                <p>
                  Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acessos não autorizados, perdas acidentais ou qualquer forma de tratamento ilícito.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl uppercase text-[#121212] tracking-wider">
                  5. Seus Direitos como Titular
                </h2>
                <p>
                  Nos termos do art. 18 da LGPD, você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, o acesso aos dados, a correção de dados incompletos ou a exclusão dos dados tratados com base no seu consentimento.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display font-bold text-xl uppercase text-[#121212] tracking-wider">
                  6. Canal de Atendimento do Titular (DPO / Encarregado)
                </h2>
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, entre em contato diretamente com nossa equipe através do telefone <strong className="text-[#121212]">{CARPLUS_PHONE_DISPLAY}</strong> ou pelo endereço físico na Av. Presidente Arthur da Silva Bernardes, 1323, Portão, Curitiba/PR.
                </p>
              </section>

            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
