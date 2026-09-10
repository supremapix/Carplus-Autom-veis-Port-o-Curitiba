import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, ChevronRight, Home as HomeIcon, Car } from 'lucide-react';
import { VehicleFilters } from '../components/vehicles/VehicleFilters';
import { VehicleGrid } from '../components/vehicles/VehicleGrid';
import { getVehicles, getBrands, getModelsByBrand } from '../services/vehicles';
import { Vehicle } from '../types/vehicle';
import { VehicleFiltersState, VehicleSortOption } from '../types/filters';
import { Container } from '../components/ui/Container';
import { CAR_BRANDS } from '../data/brands';
import { SeoHead } from '../components/ui/SeoHead';
import { buildBreadcrumbJsonLd, buildItemListJsonLd } from '../lib/seo';

export function Estoque() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Parse filters from URL
  const filters: VehicleFiltersState = useMemo(() => {
    return {
      brand: searchParams.get('marca') || undefined,
      model: searchParams.get('modelo') || undefined,
      maxPrice: searchParams.get('precoMax') ? Number(searchParams.get('precoMax')) : undefined,
      minPrice: searchParams.get('precoMin') ? Number(searchParams.get('precoMin')) : undefined,
      minYear: searchParams.get('anoMin') ? Number(searchParams.get('anoMin')) : undefined,
      maxYear: searchParams.get('anoMax') ? Number(searchParams.get('anoMax')) : undefined,
      fuel: (searchParams.get('combustivel') as any) || undefined,
      transmission: (searchParams.get('cambio') as any) || undefined,
      bodyType: (searchParams.get('carroceria') as any) || undefined,
      search: searchParams.get('q') || undefined,
    };
  }, [searchParams]);

  const sort: VehicleSortOption = (searchParams.get('ordem') as VehicleSortOption) || 'recent';

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((val) => val !== undefined && val !== '');
  }, [filters]);

  useEffect(() => {
    getBrands().then(setAvailableBrands);
  }, []);

  useEffect(() => {
    if (filters.brand) {
      getModelsByBrand(filters.brand).then(setAvailableModels);
    } else {
      setAvailableModels([]);
    }
  }, [filters.brand]);

  useEffect(() => {
    setLoading(true);
    getVehicles(filters, sort)
      .then((data) => {
        setVehicles(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters, sort]);

  const handleFilterChange = useCallback((newFilters: VehicleFiltersState) => {
    const params = new URLSearchParams();

    if (newFilters.brand) params.set('marca', newFilters.brand);
    if (newFilters.model) params.set('modelo', newFilters.model);
    if (newFilters.maxPrice) params.set('precoMax', newFilters.maxPrice.toString());
    if (newFilters.minPrice) params.set('precoMin', newFilters.minPrice.toString());
    if (newFilters.minYear) params.set('anoMin', newFilters.minYear.toString());
    if (newFilters.maxYear) params.set('anoMax', newFilters.maxYear.toString());
    if (newFilters.fuel) params.set('combustivel', newFilters.fuel);
    if (newFilters.transmission) params.set('cambio', newFilters.transmission);
    if (newFilters.bodyType) params.set('carroceria', newFilters.bodyType);
    if (newFilters.search) params.set('q', newFilters.search);
    if (sort !== 'recent') params.set('ordem', sort);

    setSearchParams(params, { replace: true });
  }, [sort, setSearchParams]);

  const handleSortChange = useCallback((newSort: VehicleSortOption) => {
    const params = new URLSearchParams(searchParams);
    if (newSort === 'recent') {
      params.delete('ordem');
    } else {
      params.set('ordem', newSort);
    }
    setSearchParams(params, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleResetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const removeFilterKey = useCallback((key: keyof VehicleFiltersState) => {
    const updated = { ...filters };
    delete updated[key];
    handleFilterChange(updated);
  }, [filters, handleFilterChange]);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', url: 'https://www.carplusautos.com.br/' },
    { name: 'Estoque', url: 'https://www.carplusautos.com.br/estoque' },
  ]);

  const seoTitle = filters.brand
    ? `Carros ${filters.brand} Seminovos em Curitiba | Estoque Carplus Autos`
    : 'Estoque de Carros Seminovos em Curitiba | Carplus Autos';

  const seoDescription = filters.brand
    ? `Confira nosso estoque de seminovos ${filters.brand} à venda em Curitiba na Carplus Autos. Veículos revisados, laudo pericial cautelar aprovado e garantia.`
    : 'Confira nosso estoque atualizado de carros e veículos seminovos à venda em Curitiba. Opções revisadas com garantia, procedência periciada e aceitação de troca.';

  const itemListJsonLd = buildItemListJsonLd(vehicles);

  return (
    <div className="bg-white min-h-screen">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl="https://www.carplusautos.com.br/estoque"
        jsonLd={[breadcrumbJsonLd, itemListJsonLd]}
      />

      {/* Header Compacto e Discreto (Foco 100% Direto no Estoque) */}
      <div className="bg-[#0A0A0A] border-b border-[#242424] py-3.5 sm:py-4 text-white">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Breadcrumb de Navegação Slim */}
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs text-[#A0A0A0]">
              <Link to="/" className="hover:text-[#F59C00] flex items-center gap-1 transition-colors">
                <HomeIcon className="w-3.5 h-3.5 text-[#F59C00]" />
                <span>Início</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[#555555]" />
              <Link to="/estoque" className={`hover:text-[#F59C00] transition-colors ${!filters.brand ? 'text-[#F59C00] font-bold' : ''}`}>
                Estoque
              </Link>
              {filters.brand && (
                <>
                  <ChevronRight className="w-3 h-3 text-[#555555]" />
                  <span className="text-[#F59C00] font-bold">{filters.brand}</span>
                </>
              )}
            </nav>

            {/* Título Discreto + Badge de Unidades em Estoque */}
            <div className="flex items-center gap-3">
              <h1 className="font-display font-bold text-base sm:text-lg uppercase tracking-wide text-white flex items-center gap-2">
                <Car className="w-4 h-4 text-[#F59C00]" />
                <span>{filters.brand ? `Estoque ${filters.brand}` : 'Estoque de Seminovos'}</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F59C00]/15 text-[#F59C00] border border-[#F59C00]/30 text-xs font-display font-bold">
                {vehicles.length} {vehicles.length === 1 ? 'veículo' : 'veículos'}
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Conteúdo Principal com Sidebar de Filtros */}
      <div className="py-6 sm:py-8">
        <Container>
          {/* Seletor Visual de Marcas com Logos Reais */}
          <div className="mb-8 bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-display font-bold text-[#666666] uppercase tracking-wider">
                Filtrar por Marca:
              </span>
              {filters.brand && (
                <button
                  type="button"
                  onClick={() => removeFilterKey('brand')}
                  className="text-xs font-display font-bold text-[#F59C00] hover:underline cursor-pointer uppercase"
                >
                  Ver todas as marcas
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {CAR_BRANDS.map((brand) => {
                const isSelected = filters.brand?.toLowerCase() === brand.name.toLowerCase();
                return (
                  <button
                    key={brand.name}
                    type="button"
                    onClick={() => {
                      handleFilterChange({
                        ...filters,
                        brand: isSelected ? undefined : brand.name,
                        model: undefined,
                      });
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#121212] text-[#F59C00] border-[#121212] shadow-sm scale-105'
                        : 'bg-white hover:bg-white text-[#121212] border-[#E0E0E0] hover:border-[#F59C00]'
                    }`}
                    title={`Filtrar por ${brand.name}`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-6 w-auto max-w-[40px] object-contain"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap">
                      {brand.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Sidebar de Filtros (Aside) */}
            <aside className="w-full">
              <VehicleFilters
                filters={filters}
                sort={sort}
                availableBrands={availableBrands}
                availableModels={availableModels}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onReset={handleResetFilters}
                totalCount={vehicles.length}
                mobileDrawerOpen={mobileDrawerOpen}
                setMobileDrawerOpen={setMobileDrawerOpen}
              />
            </aside>

            {/* Coluna Principal da Grade */}
            <main className="min-w-0">
              {/* Barra Superior: Contador + Botão Filtros Mobile + Ordenação */}
              <div className="bg-white border border-[#E0E0E0] rounded-2xl p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 shadow-xs mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl sm:text-3xl text-[#121212] font-bold tracking-wide">
                    {vehicles.length}
                  </span>
                  <span className="text-xs sm:text-sm text-[#666666] font-semibold">
                    {vehicles.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Botão Mobile Filtros */}
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(true)}
                    className="lg:hidden h-11 px-4 bg-[#FAFAFA] border border-[#E0E0E0] text-[#121212] rounded-xl text-xs font-display font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:border-[#F59C00] cursor-pointer"
                  >
                    <Filter className="w-4 h-4 text-[#F59C00]" />
                    <span>Filtros</span>
                    {hasActiveFilters && (
                      <span className="w-2 h-2 rounded-full bg-[#F59C00]" />
                    )}
                  </button>

                  {/* Ordenação */}
                  <div className="flex items-center gap-2 text-xs min-w-0 flex-1 sm:flex-initial justify-end">
                    <span className="text-[#666666] font-medium hidden sm:inline whitespace-nowrap">Ordenar por:</span>
                    <select
                      value={sort}
                      onChange={(e) => handleSortChange(e.target.value as VehicleSortOption)}
                      className="min-w-0 w-full sm:max-w-[220px] h-11 bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-3.5 text-xs sm:text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] focus:bg-white font-medium cursor-pointer"
                    >
                      <option value="recent">Mais Recentes</option>
                      <option value="price-asc">Menor Preço</option>
                      <option value="price-desc">Maior Preço</option>
                      <option value="year-desc">Ano (Mais novos)</option>
                      <option value="mileage-asc">Menor KM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Chips dos Filtros Ativos */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6 bg-white border border-[#E0E0E0] rounded-2xl p-4 shadow-xs">
                  <span className="text-xs text-[#666666] font-bold uppercase">Filtros Ativos:</span>
                  {filters.brand && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E7] border border-[#F59C00]/40 text-xs text-[#121212] font-semibold">
                      Marca: {filters.brand}
                      <button onClick={() => removeFilterKey('brand')} className="hover:text-red-500 cursor-pointer">
                        <X className="w-3.5 h-3.5 text-[#F59C00]" />
                      </button>
                    </span>
                  )}
                  {filters.model && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E7] border border-[#F59C00]/40 text-xs text-[#121212] font-semibold">
                      Modelo: {filters.model}
                      <button onClick={() => removeFilterKey('model')} className="hover:text-red-500 cursor-pointer">
                        <X className="w-3.5 h-3.5 text-[#F59C00]" />
                      </button>
                    </span>
                  )}
                  {filters.bodyType && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E7] border border-[#F59C00]/40 text-xs text-[#121212] font-semibold">
                      Carroceria: {filters.bodyType}
                      <button onClick={() => removeFilterKey('bodyType')} className="hover:text-red-500 cursor-pointer">
                        <X className="w-3.5 h-3.5 text-[#F59C00]" />
                      </button>
                    </span>
                  )}
                  {filters.transmission && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E7] border border-[#F59C00]/40 text-xs text-[#121212] font-semibold">
                      Câmbio: {filters.transmission}
                      <button onClick={() => removeFilterKey('transmission')} className="hover:text-red-500 cursor-pointer">
                        <X className="w-3.5 h-3.5 text-[#F59C00]" />
                      </button>
                    </span>
                  )}
                  {filters.maxPrice && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E7] border border-[#F59C00]/40 text-xs text-[#121212] font-semibold">
                      Até R$ {filters.maxPrice.toLocaleString('pt-BR')}
                      <button onClick={() => removeFilterKey('maxPrice')} className="hover:text-red-500 cursor-pointer">
                        <X className="w-3.5 h-3.5 text-[#F59C00]" />
                      </button>
                    </span>
                  )}
                  {filters.minYear && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E7] border border-[#F59C00]/40 text-xs text-[#121212] font-semibold">
                      Ano {filters.minYear}+
                      <button onClick={() => removeFilterKey('minYear')} className="hover:text-red-500 cursor-pointer">
                        <X className="w-3.5 h-3.5 text-[#F59C00]" />
                      </button>
                    </span>
                  )}
                  {filters.search && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E7] border border-[#F59C00]/40 text-xs text-[#121212] font-semibold">
                      "{filters.search}"
                      <button onClick={() => removeFilterKey('search')} className="hover:text-red-500 cursor-pointer">
                        <X className="w-3.5 h-3.5 text-[#F59C00]" />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#666666] hover:text-[#F59C00] underline ml-2 cursor-pointer font-bold"
                  >
                    Limpar todos
                  </button>
                </div>
              )}

              {/* Grid de Veículos */}
              <VehicleGrid
                vehicles={vehicles}
                loading={loading}
                onResetFilters={handleResetFilters}
              />
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
}
