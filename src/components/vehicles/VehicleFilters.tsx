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
}: VehicleFiltersProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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
    <div className="space-y-5">
      {/* Busca textual */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Buscar
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Marca, modelo, versão..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value || undefined })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#F59C00] focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        </div>
      </div>

      {/* Marca */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Marca
        </label>
        <select
          value={filters.brand || ''}
          onChange={(e) => handleBrandChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
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
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Modelo
          </label>
          <select
            value={filters.model || ''}
            onChange={(e) => handleModelChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
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
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Carroceria
        </label>
        <div className="grid grid-cols-2 gap-1.5">
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
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors text-center ${
                  isSelected
                    ? 'bg-[#F59C00] text-black shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
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
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors text-center ${
                  isSelected
                    ? 'bg-[#F59C00] text-black shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
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
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
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
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Preço Máximo (R$)
        </label>
        <input
          type="number"
          placeholder="Ex: 150000"
          value={filters.maxPrice || ''}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              maxPrice: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#F59C00] focus:bg-white"
        />
      </div>

      {/* Ano Mínimo */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#F59C00] focus:bg-white"
        />
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpar Filtros</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Top Bar com Contador, Ordenação e Botão Mobile */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl text-slate-900 font-bold tracking-wide">
            {totalCount}
          </span>
          <span className="text-sm text-slate-500 font-medium">
            {totalCount === 1 ? 'veículo encontrado' : 'veículos encontrados'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Botão Mobile Filtros */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden flex-1 sm:flex-initial px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:border-[#F59C00]"
          >
            <Filter className="w-3.5 h-3.5 text-[#d97706]" />
            <span>Filtrar</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#F59C00]" />
            )}
          </button>

          {/* Ordenação */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline whitespace-nowrap">Ordenar por:</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as VehicleSortOption)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white font-medium"
            >
              <option value="recent">Mais Recentes</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="year-desc">Ano (Mais novos)</option>
              <option value="mileage-asc">Menor Quilometragem</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chips dos Filtros Ativos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500 font-medium">Filtros ativos:</span>
          {filters.brand && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
              Marca: {filters.brand}
              <button onClick={() => removeFilterKey('brand')} className="hover:text-amber-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.model && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
              Modelo: {filters.model}
              <button onClick={() => removeFilterKey('model')} className="hover:text-amber-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.bodyType && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
              Carroceria: {filters.bodyType}
              <button onClick={() => removeFilterKey('bodyType')} className="hover:text-amber-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.transmission && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
              Câmbio: {filters.transmission}
              <button onClick={() => removeFilterKey('transmission')} className="hover:text-amber-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.maxPrice && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
              Até R$ {filters.maxPrice.toLocaleString('pt-BR')}
              <button onClick={() => removeFilterKey('maxPrice')} className="hover:text-amber-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.minYear && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
              A partir de {filters.minYear}
              <button onClick={() => removeFilterKey('minYear')} className="hover:text-amber-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
              Busca: "{filters.search}"
              <button onClick={() => removeFilterKey('search')} className="hover:text-amber-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={onReset}
            className="text-xs text-slate-500 hover:text-[#d97706] underline ml-2 cursor-pointer font-medium"
          >
            Limpar todos
          </button>
        </div>
      )}

      {/* Sidebar Desktop */}
      <div className="hidden lg:block bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#d97706]" />
            <h3 className="font-display font-bold text-base uppercase text-slate-900 tracking-wide">
              Filtros
            </h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-[11px] font-bold text-slate-400 hover:text-[#d97706] transition-colors cursor-pointer"
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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white border-l border-slate-200 p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#d97706]" />
                  <h3 className="font-display font-bold text-lg uppercase text-slate-900 tracking-wide">
                    Filtrar Estoque
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <FilterControls />
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-3.5 bg-[#F59C00] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-[#F59C00]/25"
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
