import React, { useState } from 'react';
import { Search, X, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { VehicleFiltersState, VehicleSortOption } from '../../types/filters';
import { Fuel, Transmission, BodyType } from '../../types/vehicle';

interface VehicleFiltersProps {
  filters: VehicleFiltersState;
  sort: VehicleSortOption;
  availableBrands: string[];
  availableModels: string[];
  onFilterChange: (newFilters: VehicleFiltersState) => void;
  onSortChange: (newSort: VehicleSortOption) => void;
  onReset: () => void;
  totalCount: number;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
}

export function VehicleFilters({
  filters,
  sort,
  availableBrands,
  availableModels,
  onFilterChange,
  onSortChange,
  onReset,
  totalCount,
  mobileDrawerOpen,
  setMobileDrawerOpen,
}: VehicleFiltersProps) {

  const fuels: { label: string; value: Fuel }[] = [
    { label: 'Flex', value: 'flex' },
    { label: 'Gasolina', value: 'gasolina' },
    { label: 'Diesel', value: 'diesel' },
    { label: 'Híbrido', value: 'hibrido' },
    { label: 'Elétrico', value: 'eletrico' },
  ];

  const transmissions: { label: string; value: Transmission }[] = [
    { label: 'Automático', value: 'automatico' },
    { label: 'Manual', value: 'manual' },
    { label: 'CVT', value: 'cvt' },
  ];

  const bodyTypes: { label: string; value: BodyType }[] = [
    { label: 'SUV', value: 'suv' },
    { label: 'Sedan', value: 'sedan' },
    { label: 'Hatch', value: 'hatch' },
    { label: 'Picape', value: 'picape' },
  ];

  const hasActiveFilters = Object.values(filters).some(
    (val) => val !== undefined && val !== ''
  );

  const handleBrandChange = (brand: string) => {
    onFilterChange({
      ...filters,
      brand: brand === filters.brand ? undefined : brand || undefined,
      model: undefined,
    });
  };

  const handleModelChange = (model: string) => {
    onFilterChange({
      ...filters,
      model: model === filters.model ? undefined : model || undefined,
    });
  };

  const removeFilterKey = (key: keyof VehicleFiltersState) => {
    const updated = { ...filters };
    delete updated[key];
    onFilterChange(updated);
  };

  const FilterControls = () => (
    <div className="space-y-5 text-[#121212]">
      {/* Busca textual */}
      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-2">
          Buscar por Palavra-Chave
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Marca, modelo, versão..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value || undefined })}
            className="w-full h-12 bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] placeholder-[#999999] focus:outline-none focus:border-[#F59C00] focus:bg-white"
          />
          <Search className="w-4 h-4 text-[#666666] absolute right-4 top-4" />
        </div>
      </div>

      {/* Marca */}
      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-2">
          Marca
        </label>
        <select
          value={filters.brand || ''}
          onChange={(e) => handleBrandChange(e.target.value)}
          className="w-full h-12 bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] focus:bg-white font-medium"
        >
          <option value="">Todas as Marcas</option>
          {availableBrands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Modelo (Condicional) */}
      {filters.brand && availableModels.length > 0 && (
        <div>
          <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-2">
            Modelo
          </label>
          <select
            value={filters.model || ''}
            onChange={(e) => handleModelChange(e.target.value)}
            className="w-full h-12 bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] focus:bg-white font-medium"
          >
            <option value="">Todos os Modelos</option>
            {availableModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Carroceria */}
      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-2">
          Carroceria
        </label>
        <div className="grid grid-cols-2 gap-2">
          {bodyTypes.map((bt) => {
            const isSelected = filters.bodyType === bt.value;
            return (
              <button
                key={bt.value}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    bodyType: isSelected ? undefined : bt.value,
                  })
                }
                className={`py-2 px-3 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all text-center select-none ${
                  isSelected
                    ? 'bg-[#F59C00] text-black shadow-xs'
                    : 'bg-[#FAFAFA] text-[#121212] border border-[#E0E0E0] hover:border-black'
                }`}
              >
                {bt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Câmbio */}
      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-2">
          Câmbio
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {transmissions.map((t) => {
            const isSelected = filters.transmission === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    transmission: isSelected ? undefined : t.value,
                  })
                }
                className={`py-2 px-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all text-center select-none ${
                  isSelected
                    ? 'bg-[#F59C00] text-black shadow-xs'
                    : 'bg-[#FAFAFA] text-[#121212] border border-[#E0E0E0] hover:border-black'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Combustível */}
      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-2">
          Combustível
        </label>
        <select
          value={filters.fuel || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              fuel: (e.target.value as Fuel) || undefined,
            })
          }
          className="w-full h-12 bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] focus:bg-white font-medium"
        >
          <option value="">Todos</option>
          {fuels.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Faixa de Preço */}
      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-2">
          Preço Máximo (R$)
        </label>
        <input
          type="number"
          placeholder="Ex: 250000"
          value={filters.maxPrice || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              maxPrice: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="w-full h-12 bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] placeholder-[#999999] focus:outline-none focus:border-[#F59C00] focus:bg-white"
        />
      </div>

      {/* Ano Mínimo */}
      <div>
        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-2">
          Ano Mínimo
        </label>
        <input
          type="number"
          placeholder="Ex: 2020"
          value={filters.minYear || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              minYear: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="w-full h-12 bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] placeholder-[#999999] focus:outline-none focus:border-[#F59C00] focus:bg-white"
        />
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="w-full h-12 bg-[#F2F2F2] hover:bg-[#EAEAEA] border border-[#E0E0E0] text-[#121212] rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer select-none"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#F59C00]" />
          <span>Limpar Filtros</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#F59C00]" />
            <h3 className="font-display font-bold text-base uppercase text-[#121212] tracking-wide">
              FILTRAR ESTOQUE
            </h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs font-display font-bold uppercase text-[#666666] hover:text-[#F59C00] transition-colors cursor-pointer"
            >
              Resetar
            </button>
          )}
        </div>
        <FilterControls />
      </div>

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white border-l border-[#E0E0E0] p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E0E0E0]">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#F59C00]" />
                  <h3 className="font-display font-bold text-lg uppercase text-[#121212] tracking-wide">
                    Filtrar Estoque
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 text-[#666666] hover:text-black cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <FilterControls />
            </div>

            <div className="mt-8 pt-4 border-t border-[#E0E0E0]">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full h-14 bg-[#F59C00] text-black font-display font-bold text-sm tracking-wider uppercase rounded-full shadow-lg shadow-[#F59C00]/25 cursor-pointer"
              >
                Ver {totalCount} Veículos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
