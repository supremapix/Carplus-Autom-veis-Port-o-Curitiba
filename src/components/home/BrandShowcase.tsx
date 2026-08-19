import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, Grid, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { CAR_BRANDS } from '../../data/brands';

export function BrandShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-6 sm:py-8 bg-[#F9FAFB] border-b border-[#E5E7EB]">
      <Container>
        {/* Acordeon / Botão de Expansão */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden transition-all">
          {/* Header do Acordeon Clicável */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="w-full p-4 sm:p-6 flex items-center justify-between gap-4 text-left hover:bg-[#FAFAFA] transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#F59C00]/10 border border-[#F59C00]/30 flex items-center justify-center shrink-0 text-[#F59C00]">
                <Grid className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F59C00] font-display font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em]">
                    ESTOQUE MULTIMARCAS
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-black/5 text-[#555] text-[10px] font-bold">
                    {CAR_BRANDS.length} MARCAS
                  </span>
                </div>
                <h2 className="font-display font-bold text-lg sm:text-2xl uppercase tracking-tight text-[#111827] mt-0.5">
                  BUSCAR POR MARCA
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] line-clamp-1 mt-0.5">
                  {isOpen
                    ? 'Toque na marca para filtrar os carros disponíveis'
                    : 'Toque para abrir a lista completa de marcas e fabricantes'}
                </p>
              </div>
            </div>

            {/* Botão de Toggle do Acordeon */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-[#374151]">
                {isOpen ? 'RECOLHER' : 'VER MARCAS'}
              </span>
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 ${
                  isOpen
                    ? 'bg-[#F59C00] border-[#F59C00] text-black rotate-180'
                    : 'bg-white border-[#D5D5D5] text-[#333]'
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </button>

          {/* Conteúdo Expansível do Acordeon */}
          {isOpen && (
            <div className="p-4 sm:p-6 border-t border-[#E5E7EB] bg-[#FAFAFA] animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#E5E7EB]">
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Selecione uma marca para ver os veículos revisados com procedência e garantia:
                </p>

                {/* Botão compacto de ação com texto explicativo sutil */}
                <div className="flex flex-col items-start sm:items-end">
                  <Link
                    to="/estoque"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-[#222] text-white text-[11px] font-display font-bold uppercase tracking-wider transition-all"
                  >
                    <span>VER TODAS AS OFERTAS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F59C00]" />
                  </Link>
                  <span className="text-[10px] text-[#888888] mt-1">
                    Catálogo geral com todos os modelos
                  </span>
                </div>
              </div>

              {/* Grade de Marcas com Logos Reais */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
                {CAR_BRANDS.map((brand) => (
                  <Link
                    key={brand.name}
                    to={`/estoque?marca=${encodeURIComponent(brand.name)}`}
                    className="group bg-white hover:bg-white border border-[#E5E7EB] hover:border-[#F59C00] rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-black/5 text-center relative overflow-hidden"
                    title={`Ver estoque ${brand.name} em Curitiba`}
                  >
                    {/* Ícone sutil no canto hover */}
                    <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-3 h-3 text-[#F59C00]" />
                    </div>

                    {/* Logo da Marca */}
                    <div className="w-full h-10 sm:h-12 flex items-center justify-center">
                      <img
                        src={brand.logo}
                        alt={`Logo da marca ${brand.name}`}
                        className="max-h-9 sm:max-h-11 max-w-[80px] object-contain filter group-hover:scale-110 transition-transform duration-200"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Nome da Marca */}
                    <span className="font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider text-[#374151] group-hover:text-[#111827] transition-colors line-clamp-1">
                      {brand.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Botão de Fechar no rodapé do Acordeon para facilidade */}
              <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex flex-col items-center justify-center text-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-[#D5D5D5] hover:border-black bg-white text-[11px] font-display font-bold uppercase tracking-wider text-[#444] hover:text-black transition-all cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                  <span>RECOLHER MARCAS</span>
                </button>
                <span className="text-[10px] text-[#999999] mt-1">
                  Clique para fechar o painel de marcas
                </span>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
