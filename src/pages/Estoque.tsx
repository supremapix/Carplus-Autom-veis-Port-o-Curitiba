import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VehicleFilters } from '../components/vehicles/VehicleFilters';
import { VehicleGrid } from '../components/vehicles/VehicleGrid';
import { getVehicles, getBrands, getModelsByBrand } from '../services/vehicles';
import { Vehicle } from '../types/vehicle';
import { VehicleFiltersState, VehicleSortOption } from '../types/filters';
import { Container } from '../components/ui/Container';
import { PageHero } from '../components/ui/PageHero';

export function Estoque() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

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

  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero Preto no Padrão Carplus */}
      <PageHero
        kicker="SHOWROOM CURITIBA"
        title={filters.brand ? `ESTOQUE ${filters.brand.toUpperCase()}` : 'ESTOQUE DE VEÍCULOS'}
        subtitle="Confira nossa seleção de seminovos revisados, periciados com laudo 100% aprovado e garantia em Curitiba."
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Estoque', href: '/estoque' },
          ...(filters.brand ? [{ label: filters.brand }] : []),
        ]}
      />

      {/* Conteúdo Principal com Sidebar de Filtros */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Sidebar de Filtros */}
            <aside className="lg:col-span-1">
              <VehicleFilters
                filters={filters}
                sort={sort}
                availableBrands={availableBrands}
                availableModels={availableModels}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onReset={handleResetFilters}
                totalCount={vehicles.length}
              />
            </aside>

            {/* Grid de Veículos */}
            <main className="lg:col-span-3">
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
