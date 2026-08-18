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
  bgImage = 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1920',
}: PageHeroProps) {
  return (
    <section className="relative bg-black text-white py-12 sm:py-16 md:py-20 border-b border-[#2E2E2E] overflow-hidden">
      {/* Background Decorativo com overlay escuro suave */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src={bgImage}
          alt="Carplus Autos Curitiba"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/70" />
      </div>

      {/* Brilho decorativo sutil */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F59C00]/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Breadcrumb de Navegação */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-[#B3B3B3] mb-6"
        >
          <Link
            to="/"
            className="hover:text-white flex items-center gap-1.5 transition-colors font-medium"
          >
            <HomeIcon className="w-3.5 h-3.5 text-[#F59C00]" />
            <span>Início</span>
          </Link>

          {breadcrumbs.map((item, idx) => {
            const destination = item.to || item.href;
            return (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-[#666666] shrink-0" />
                {destination ? (
                  <Link
                    to={destination}
                    className="hover:text-white transition-colors font-medium truncate max-w-[200px] sm:max-w-none"
                    title={item.label}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-[#F59C00] font-bold truncate max-w-[260px] sm:max-w-none"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Conteúdo Principal do Hero */}
        <div className="max-w-4xl space-y-3">
          {kicker && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-[#F59C00] text-xs font-display font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#F59C00]" />
              <span>{kicker}</span>
            </div>
          )}

          {badge && (
            <div className="inline-block ml-2 px-3 py-1 rounded-full bg-[#F59C00] text-black text-xs font-display font-bold uppercase tracking-wider">
              {badge}
            </div>
          )}

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-white leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-[#B3B3B3] font-normal leading-relaxed pt-1 max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
