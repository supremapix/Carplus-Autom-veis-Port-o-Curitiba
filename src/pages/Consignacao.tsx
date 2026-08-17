import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Camera, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';

export function Consignacao() {
  const advantages = [
    {
      icon: <Camera className="w-6 h-6 text-[#F59C00]" />,
      title: 'Divulgação Profissional',
      description: 'Fotografia de alta resolução, anúncio detalhado no estoque online e nos maiores portais automotivos do Brasil.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#F59C00]" />,
      title: 'Atendimento & Triagem',
      description: 'Nossa equipe atende todos os interessados, filtra curiosos e negocia apenas com compradores qualificados.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#F59C00]" />,
      title: 'Segurança Total',
      description: 'Seu carro protegido em nosso showroom na Av. Arthur Bernardes, sem precisar receber estranhos na sua residência.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero Preto */}
      <PageHero
        kicker="VENDA COM SEGURANÇA"
        title="CONSIGNAÇÃO DE VEÍCULOS"
        subtitle="Deixe seu seminovo em nossa loja física em Curitiba e conte com toda a estrutura comercial da Carplus Autos para intermediar a venda."
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Consignação' },
        ]}
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Bloco explicativo */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-[#121212] tracking-wide">
                COMO FUNCIONA A CONSIGNAÇÃO NA CARPLUS AUTOS?
              </h2>
              <p className="text-base text-[#666666] leading-relaxed">
                A consignação é a modalidade ideal para quem quer valorizar seu patrimônio e vender pelo valor justo de mercado com total tranquilidade. Você nos confia o veículo e nossa equipe cuida de toda a vitrine, atração de compradores, apresentação técnica e trâmites de transferência documental.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                {advantages.map((adv, i) => (
                  <div key={i} className="bg-white border border-[#E0E0E0] p-6 rounded-2xl shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4">
                      {adv.icon}
                    </div>
                    <h3 className="font-display font-bold text-base uppercase text-[#121212] mb-2">
                      {adv.title}
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-[#E0E0E0] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-base font-display font-bold uppercase text-[#121212]">
                    DESEJA AVALIAR A CONSIGNAÇÃO DO SEU CARRO?
                  </p>
                  <p className="text-xs text-[#666666] mt-0.5">
                    Preencha os dados do veículo pelo nosso formulário online em poucos minutos.
                  </p>
                </div>

                <Button
                  to="/venda-seu-carro"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-black" />}
                >
                  QUERO VENDER MEU VEÍCULO
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
