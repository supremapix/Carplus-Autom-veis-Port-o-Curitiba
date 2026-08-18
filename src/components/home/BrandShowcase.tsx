import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { CAR_BRANDS } from '../../data/brands';

export function BrandShowcase() {
  return (
    <section className="py-14 sm:py-20 bg-[#F9FAFB] border-b border-[#E5E7EB]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[#F59C00] font-display font-bold text-xs uppercase tracking-[0.2em] mb-1.5">
              ESTOQUE MULTIMARCAS
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-[#111827]">
              BUSCAR POR MARCA
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-1 max-w-2xl">
              Selecione sua marca preferida e encontre veículos revisados com procedência e garantia.
            </p>
          </div>

          <Link
            to="/estoque"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#111827] hover:text-[#F59C00] transition-colors group self-start md:self-auto"
          >
            <span>Ver todas as ofertas</span>
            <ChevronRight className="w-4 h-4 text-[#F59C00] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grade de Marcas com Logos Reais */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
          {CAR_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              to={`/estoque?marca=${encodeURIComponent(brand.name)}`}
              className="group bg-white hover:bg-white border border-[#E5E7EB] hover:border-[#F59C00] rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 text-center relative overflow-hidden"
              title={`Ver estoque ${brand.name} em Curitiba`}
            >
              {/* Ícone sutil no canto hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F59C00]" />
              </div>

              {/* Logo da Marca */}
              <div className="w-full h-12 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={`Logo da marca ${brand.name}`}
                  className="max-h-11 max-w-[85px] object-contain filter group-hover:scale-110 transition-transform duration-200"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Nome da Marca */}
              <span className="font-display font-bold text-xs uppercase tracking-wider text-[#374151] group-hover:text-[#111827] transition-colors line-clamp-1">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
