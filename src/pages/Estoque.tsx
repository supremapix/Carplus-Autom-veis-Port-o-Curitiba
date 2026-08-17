import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import { VehicleFilters } from '../components/vehicles/VehicleFilters';
import { VehicleGrid } from '../components/vehicles/VehicleGrid';
import { getVehicles, getBrands, getModelsByBrand } from '../services/vehicles';
import { Vehicle } from '../types/vehicle';
import { VehicleFiltersState, VehicleSortOption } from '../types/filters';

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
    window.scrollTo(0, 0);
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
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-slate-900 flex items-center gap-1 font-medium">
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Início</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#d97706] font-bold">Estoque de Veículos</span>
          {filters.brand && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold">{filters.brand}</span>
            </>
          )}
        </nav>

        {/* Header da Página */}
        <div className="mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              VEÍCULOS SELECIONADOS EM CURITIBA
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-slate-900 tracking-wide">
            {filters.brand ? `ESTOQUE ${filters.brand.toUpperCase()}` : 'ESTOQUE COMPLETO'}
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Confira nossos veículos seminovos revisados com procedência e garantia em Curitiba.
          </p>
        </div>

        {/* Layout Grid com Sidebar de Filtros */}
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

      </div>
    </div>
  );
}
