import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { Container } from './Container';

export interface BreadcrumbItem {
  label: string;
  to?: string;
  href?: string;
}

interface PageHeroProps {
  kicker?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  bgImage?: string;
}

export function PageHero({
  kicker,
  title,
  subtitle,
  breadcrumbs = [],
  badge,
  bgImage = 'https://img.supremasite.com.br/carplus-autos.webp',
}: PageHeroProps) {
  return (
    <section className="relative bg-[#0A0A0A] text-white py-14 sm:py-18 md:py-24 border-b border-[#242424] overflow-hidden">
      {/* Background Decorativo com imagem oficial da Carplus */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={bgImage}
          alt="Carplus Autos Curitiba"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Camada cinematográfica de profundidade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/60" />
      </div>

      {/* Iluminação de luxo sutil */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#F59C00]/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Breadcrumb de Navegação */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-[#A0A0A0] mb-6"
        >
          {breadcrumbs.map((item, idx) => {
            const destination = item.to || item.href;
            const isHome = idx === 0 && (item.label.toLowerCase() === 'início' || destination === '/');
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#555555] shrink-0" />}
                {destination ? (
                  <Link
                    to={destination}
                    className="hover:text-white flex items-center gap-1.5 transition-colors font-medium truncate max-w-[200px] sm:max-w-none"
                    title={item.label}
                  >
                    {isHome && <HomeIcon className="w-3.5 h-3.5 text-[#F59C00]" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className="text-[#F59C00] font-bold truncate max-w-[260px] sm:max-w-none flex items-center gap-1.5"
                    title={item.label}
                  >
                    {isHome && <HomeIcon className="w-3.5 h-3.5 text-[#F59C00]" />}
                    <span>{item.label}</span>
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Conteúdo Principal do Hero */}
        <div className="max-w-4xl space-y-4">
          {kicker && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-[#F59C00] text-xs font-display font-bold uppercase tracking-[0.18em] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59C00] shadow-[0_0_8px_#F59C00]" />
              <span>{kicker}</span>
            </div>
          )}

          {badge && (
            <div className="inline-block ml-2 px-3 py-1 rounded-full bg-[#F59C00] text-black text-xs font-display font-bold uppercase tracking-wider shadow-sm">
              {badge}
            </div>
          )}

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[1.08]">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-[#CCCCCC] font-normal leading-relaxed pt-1 max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
