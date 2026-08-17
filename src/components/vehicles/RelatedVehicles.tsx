import React from 'react';
import { Vehicle } from '../../types/vehicle';
import { VehicleCard } from './VehicleCard';

interface RelatedVehiclesProps {
  vehicles: Vehicle[];
}

export function RelatedVehicles({ vehicles }: RelatedVehiclesProps) {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section className="py-12 border-t border-slate-200 mt-12">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
        <h2 className="font-display font-bold text-2xl uppercase text-slate-900 tracking-wide">
          Veículos Semelhantes em Estoque
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.slice(0, 3).map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
