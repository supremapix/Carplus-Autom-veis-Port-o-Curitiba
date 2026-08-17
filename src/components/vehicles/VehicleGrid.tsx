import React from 'react';
import { Car, SearchX, RotateCcw } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { VehicleCard, VehicleCardSkeleton } from './VehicleCard';

interface VehicleGridProps {
  vehicles: Vehicle[];
  loading: boolean;
  onResetFilters: () => void;
}

export function VehicleGrid({ vehicles, loading, onResetFilters }: VehicleGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <VehicleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#d97706] mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-xl uppercase text-slate-900 tracking-wide">
          Nenhum veículo encontrado
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          Tente ajustar ou limpar os filtros de busca para encontrar outros modelos disponíveis em nosso estoque.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-6 px-6 py-3 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#F59C00]/20 inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Limpar Filtros</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
