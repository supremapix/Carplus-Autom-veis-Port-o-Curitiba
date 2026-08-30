import React, { useState, useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { HomeIntroSection } from '../components/home/HomeIntroSection';
import { QuickSearchSection } from '../components/home/QuickSearchSection';
import { FeaturedVehicles } from '../components/home/FeaturedVehicles';
import { BrandShowcase } from '../components/home/BrandShowcase';
import { WhyCarplus } from '../components/home/WhyCarplus';
import { SellPromo } from '../components/home/SellPromo';
import { FinancingTradePromo } from '../components/home/FinancingTradePromo';
import { LocationSection } from '../components/home/LocationSection';
import { HomeFAQ } from '../components/home/HomeFAQ';
import { getFeaturedVehicles, getVehicles } from '../services/vehicles';
import { Vehicle } from '../types/vehicle';
import { buildGlobalDealerJsonLd } from '../lib/seo';
import { SeoHead } from '../components/ui/SeoHead';

export function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [totalVehiclesCount, setTotalVehiclesCount] = useState<number>(0);

  useEffect(() => {
    getFeaturedVehicles().then(setFeaturedVehicles);
    getVehicles().then((all) => setTotalVehiclesCount(all.length));
  }, []);

  const jsonLd = buildGlobalDealerJsonLd();

  return (
    <div className="bg-white">
      {/* Head Meta Tags + JSON-LD */}
      <SeoHead
        title="Compra e Venda de Veículos em Curitiba | Carplus Autos"
        description="Compre, venda, troque ou consigne seu veículo em Curitiba na Carplus Autos, no Portão. Seminovos revisados, laudo pericial aprovado e garantia de procedência."
        canonicalUrl="https://www.carplusautos.com.br/"
        jsonLd={jsonLd}
      />

      {/* 1. Hero com Marquee de Marcas Transparente Integrado no Rodapé */}
      <Hero />

      {/* 2. Seção de Introdução SEO/GEO com Único H1 da Homepage */}
      <HomeIntroSection />

      {/* 3. Estoque Selecionado / Veículos em Destaque (Fundo Branco) */}
      <FeaturedVehicles vehicles={featuredVehicles} totalCount={totalVehiclesCount} />

      {/* 4. Faixa de Busca Rápida */}
      <QuickSearchSection />

      {/* 5. Grade de Marcas com Logos Oficiais (Acordeon Multimarcas) */}
      <BrandShowcase />

      {/* 6. Por Que Negociar na Carplus Autos (Bloco Preto 4 Pilares) */}
      <WhyCarplus />

      {/* 7. Quer Vender ou Trocar seu Carro (Fundo Branco com Foto da Loja) */}
      <SellPromo />

      {/* 8. Financiamento e Consignação (Dois Cards Grandes) */}
      <FinancingTradePromo />

      {/* 9. Onde Estamos (Localização & Mapa) */}
      <LocationSection />

      {/* 10. FAQ Tira-Dúvidas */}
      <HomeFAQ />
    </div>
  );
}
