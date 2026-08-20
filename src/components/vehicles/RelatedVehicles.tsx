import React from 'react';
import { Vehicle } from '../../types/vehicle';
import { VehicleCard } from './VehicleCard';
import { SectionHeading } from '../ui/SectionHeading';

interface RelatedVehiclesProps {
  vehicles: Vehicle[];
}

export function RelatedVehicles({ vehicles }: RelatedVehiclesProps) {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <section className="py-12 border-t border-[#E0E0E0] mt-12">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <SectionHeading
          align="center"
          kicker="OPÇÕES SEMELHANTES"
          title="VEÍCULOS RELACIONADOS EM ESTOQUE"
          subtitle="Confira outras opções de procedência selecionada disponíveis em nosso showroom."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.slice(0, 3).map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
