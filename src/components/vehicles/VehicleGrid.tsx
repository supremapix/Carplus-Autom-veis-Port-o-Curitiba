import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
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
      <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-[#F59C00] mx-auto mb-5 shadow-xs">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-2xl uppercase text-[#121212] tracking-wide">
          Nenhum veículo encontrado
        </h3>
        <p className="text-sm text-[#666666] mt-2 leading-relaxed">
          Tente ajustar ou limpar os filtros de busca para encontrar outros modelos disponíveis em nosso estoque de Curitiba.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-6 px-8 h-12 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md shadow-[#F59C00]/20 inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Limpar Filtros</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
