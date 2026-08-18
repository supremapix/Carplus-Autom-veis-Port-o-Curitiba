import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Car, ExternalLink, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Container } from '../components/ui/Container';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';

export function Empresa() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero Preto */}
      <PageHero
        kicker="TRADIÇÃO & TRANSPARÊNCIA"
        title="A CARPLUS AUTOS"
        subtitle="Estrutura física completa, showroom moderno e compromisso com procedência no mercado automotivo de Curitiba."
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Sobre Nós' },
        ]}
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Bloco Institucional */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
              
              <div className="flex items-center justify-center p-8 sm:p-12 bg-black rounded-2xl border border-[#2E2E2E] shadow-lg">
                <Logo variant="dark" className="h-20 sm:h-28 md:h-36 max-w-full" />
              </div>

              <div className="space-y-5 text-[#333333] text-base leading-relaxed">
                <p>
                  A <strong className="text-[#121212]">Carplus Autos</strong> nasceu da sólida trajetória do <strong className="text-[#121212]">Carplus Centro Automotivo</strong> em Curitiba, trazendo para o segmento de compra, venda, troca e consignação de seminovos o mesmo rigor técnico, respeito ao consumidor e excelência no atendimento.
                </p>
                <p>
                  Localizados na <strong className="text-[#121212]">Avenida Presidente Arthur da Silva Bernardes, 1323</strong>, no tradicional bairro Portão, contamos com uma estrutura integrada com showroom de veículos seminovos selecionados e centro mecânico especializado.
                </p>
                <p>
                  Cada veículo disponível em nosso estoque passa por critérios rigorosos de conferência documental, laudo pericial cautelar 100% aprovado e garantia de motor e câmbio, garantindo a você a certeza de uma negociação segura e transparente.
                </p>
              </div>

              {/* Cards de Integração com Centro Automotivo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-7 rounded-2xl border border-[#E0E0E0] shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4 text-[#F59C00]">
                    <Car className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg uppercase text-[#121212] mb-1">
                    Carplus Autos
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Showroom de seminovos revisados, compra com pagamento à vista, troca com troco e consignação segura.
                  </p>
                </div>

                <div className="bg-white p-7 rounded-2xl border border-[#E0E0E0] shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4 text-[#F59C00]">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg uppercase text-[#121212] mb-1">
                    Carplus Pneus & Oficina
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Centro automotivo completo com alinhamento 3D, balanceamento, suspensão, freios e pneus multimarcas.
                  </p>
                  <a
                    href="https://www.carpluspneuseoficina.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#F59C00] hover:text-[#F7941D] font-display font-bold uppercase tracking-wider mt-4"
                  >
                    <span>ACESSAR SITE DA OFICINA</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-[#E0E0E0] text-center">
                <Button
                  to="/estoque"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-black" />}
                >
                  CONHEÇA NOSSO ESTOQUE
                </Button>
              </div>

            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
