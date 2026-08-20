import React, { useState, useEffect } from 'react';
import { Hero } from '../components/home/Hero';
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
      {/* Schema.org AutoDealer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero com Marquee de Marcas Transparente Integrado no Rodapé */}
      <Hero />

      {/* 2. Estoque Selecionado / Veículos em Destaque (Fundo Branco) */}
      <FeaturedVehicles vehicles={featuredVehicles} totalCount={totalVehiclesCount} />

      {/* 3. Faixa de Busca Rápida */}
      <QuickSearchSection />

      {/* 4. Grade de Marcas com Logos Oficiais (Acordeon Multimarcas) */}
      <BrandShowcase />

      {/* 5. Por Que Negociar na Carplus Autos (Bloco Preto 4 Pilares) */}
      <WhyCarplus />

      {/* 6. Quer Vender ou Trocar seu Carro (Fundo Branco com Foto da Loja) */}
      <SellPromo />

      {/* 7. Financiamento e Consignação (Dois Cards Grandes) */}
      <FinancingTradePromo />

      {/* 8. Onde Estamos (Localização & Mapa) */}
      <LocationSection />

      {/* 9. FAQ Tira-Dúvidas */}
      <HomeFAQ />
    </div>
  );
}
