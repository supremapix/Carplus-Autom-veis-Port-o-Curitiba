import React, { useState, useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { BrandsMarquee } from '../components/home/BrandsMarquee';
import { FeaturedVehicles } from '../components/home/FeaturedVehicles';
import { WhyCarplus } from '../components/home/WhyCarplus';
import { SellPromo } from '../components/home/SellPromo';
import { FinancingTradePromo } from '../components/home/FinancingTradePromo';
import { GoogleReviewsPlaceholder } from '../components/home/GoogleReviewsPlaceholder';
import { LocationSection } from '../components/home/LocationSection';
import { HomeFAQ } from '../components/home/HomeFAQ';
import { getFeaturedVehicles } from '../services/vehicles';
import { Vehicle } from '../types/vehicle';
import { buildGlobalDealerJsonLd } from '../lib/seo';

export function Home() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    getFeaturedVehicles().then(setFeaturedVehicles);
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = buildGlobalDealerJsonLd();

  return (
    <div>
      {/* Schema.org AutoDealer */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <BrandsMarquee />
      <FeaturedVehicles vehicles={featuredVehicles} />
      <WhyCarplus />
      <SellPromo />
      <FinancingTradePromo />
      <GoogleReviewsPlaceholder />
      <LocationSection />
      <HomeFAQ />
    </div>
  );
}
