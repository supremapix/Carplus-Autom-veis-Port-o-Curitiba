import React from 'react';
import { ArrowRight, Car } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { VehicleCard } from '../vehicles/VehicleCard';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E0E0E0]">
      <Container>
        {/* Título da Seção no Padrão Carplus */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E0E0E0]">
          <SectionHeading
            kicker="ESTOQUE SELECIONADO"
            title={
              <>
                VEÍCULOS EM <span className="text-[#F59C00] italic">DESTAQUE</span>
              </>
            }
            subtitle="Seminovos revisados, periciados com laudo aprovado e prontos para entrega em Curitiba."
          />

          <Button
            to="/estoque"
            variant="ghost"
            iconRight={<ArrowRight className="w-4 h-4 text-[#F59C00]" />}
            className="self-start md:self-end border border-[#E0E0E0] hover:border-black"
          >
            VER ESTOQUE COMPLETO ({vehicles.length})
          </Button>
        </div>

        {/* Grid de Veículos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {vehicles.slice(0, 4).map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Botão no Fim do Grid */}
        <div className="mt-14 text-center">
          <Button
            to="/estoque"
            variant="outline"
            size="lg"
            icon={<Car className="w-5 h-5 text-[#F59C00]" />}
          >
            EXPLORAR TODOS OS VEÍCULOS DISPONÍVEIS
          </Button>
        </div>
      </Container>
    </section>
  );
}
