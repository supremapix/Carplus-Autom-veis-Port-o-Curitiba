import React, { useState, useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { QuickSearchSection } from '../components/home/QuickSearchSection';
import { BrandsMarquee } from '../components/home/BrandsMarquee';
import { FeaturedVehicles } from '../components/home/FeaturedVehicles';
import { WhyCarplus } from '../components/home/WhyCarplus';
import { SellPromo } from '../components/home/SellPromo';
import { FinancingTradePromo } from '../components/home/FinancingTradePromo';
import { LocationSection } from '../components/home/LocationSection';
import { HomeFAQ } from '../components/home/HomeFAQ';
import { getFeaturedVehicles } from '../services/vehicles';
import { Vehicle } from '../types/vehicle';
import { buildGlobalDealerJsonLd } from '../lib/seo';

export function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    getFeaturedVehicles().then(setFeaturedVehicles);
  }, []);

  const jsonLd = buildGlobalDealerJsonLd();

  return (
    <div className="bg-white">
      {/* Schema.org AutoDealer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Faixa de Busca Rápida (Abaixo do Hero) */}
      <QuickSearchSection />

      {/* 3. Marquee de Marcas */}
      <BrandsMarquee />

      {/* 4. Veículos em Destaque (Fundo Branco) */}
      <FeaturedVehicles vehicles={featuredVehicles} />

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
