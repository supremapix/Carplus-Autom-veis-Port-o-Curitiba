import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Car, ExternalLink, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Container } from '../components/ui/Container';
import { CompactPageHeading } from '../components/ui/CompactPageHeading';
import { Button } from '../components/ui/Button';
import { SeoHead } from '../components/ui/SeoHead';
import { buildBreadcrumbJsonLd } from '../lib/seo';

export function Empresa() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', url: 'https://www.carplusautos.com.br/' },
    { name: 'A Empresa', url: 'https://www.carplusautos.com.br/empresa' },
  ]);

  return (
    <div className="bg-white min-h-screen">
      <SeoHead
        title="Carplus Autos | Revenda de Seminovos no Portão em Curitiba"
        description="Conheça a Carplus Autos, loja de seminovos no bairro Portão, em Curitiba, e seus serviços de compra, venda, troca e consignação."
        canonicalUrl="https://www.carplusautos.com.br/empresa"
        jsonLd={breadcrumbJsonLd}
      />

      {/* Page Hero Preto */}
      <CompactPageHeading title="A Carplus Autos" description="Compra, venda, troca e consignação de seminovos no Portão, em Curitiba." />

      <div className="py-8 sm:py-10">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Bloco Institucional */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl p-6 sm:p-8 space-y-6 shadow-none">
              
              <div className="flex items-center justify-start p-5 sm:p-6 bg-black rounded-lg">
                <Logo variant="dark" className="h-12 sm:h-16 max-w-full" />
              </div>

              <div className="space-y-5 text-[#333333] text-base leading-relaxed">
                <p>
                  A <strong className="text-[#121212]">Carplus Autos</strong> nasceu da sólida trajetória do <strong className="text-[#121212]">Carplus Centro Automotivo</strong> em Curitiba, trazendo para o segmento de compra, venda, troca e consignação de seminovos o mesmo rigor técnico, respeito ao consumidor e excelência no atendimento.
                </p>
                <p>
                  Localizados na <strong className="text-[#121212]">Avenida Presidente Arthur da Silva Bernardes, 1323</strong>, no tradicional bairro Portão, contamos com uma estrutura integrada com showroom de veículos seminovos selecionados e centro mecânico especializado.
                </p>
                <p>
                  Consulte na página de cada veículo suas características, fotos e informações de histórico. Nossa equipe pode esclarecer dúvidas sobre documentação, laudo e condições da negociação.
                </p>
              </div>

              {/* Cards de Integração com Centro Automotivo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-7 rounded-2xl border border-[#E0E0E0] shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4 text-[#F59C00]">
                    <Car className="w-6 h-6" />
                  </div>
                  <h2 className="font-display font-bold text-lg uppercase text-[#121212] mb-1">
                    Carplus Autos
                  </h2>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Showroom de seminovos revisados, compra com pagamento à vista, troca com troco e consignação segura.
                  </p>
                </div>

                <div className="bg-white p-7 rounded-2xl border border-[#E0E0E0] shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4 text-[#F59C00]">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h2 className="font-display font-bold text-lg uppercase text-[#121212] mb-1">
                    Carplus Pneus & Oficina
                  </h2>
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
