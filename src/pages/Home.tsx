import React, { useState, useEffect } from 'react';
import { Hero } from '../components/home/Hero';
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

      {/* 1. Hero Preto com Busca Rápida */}
      <Hero />

      {/* 2. Marquee de Marcas Preto */}
      <BrandsMarquee />

      {/* 3. Veículos em Destaque (Fundo Branco) */}
      <FeaturedVehicles vehicles={featuredVehicles} />

      {/* 4. Por Que Negociar na Carplus Autos (Bloco Preto 4 Pilares) */}
      <WhyCarplus />

      {/* 5. Quer Vender ou Trocar seu Carro (Fundo Branco com Foto da Loja) */}
      <SellPromo />

      {/* 6. Financiamento e Consignação (Dois Cards Grandes) */}
      <FinancingTradePromo />

      {/* 7. Onde Estamos (Localização & Mapa) */}
      <LocationSection />

      {/* 8. FAQ Tira-Dúvidas */}
      <HomeFAQ />
    </div>
  );
}
