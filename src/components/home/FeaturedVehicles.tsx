import React from 'react';
import { ArrowRight, Car, ShieldCheck } from 'lucide-react';
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

        {/* Botão no Fim do Grid com tipografia compacta e texto explicativo sutil abaixo */}
        <div className="mt-12 sm:mt-14 flex flex-col items-center justify-center text-center">
          <Button
            to="/estoque"
            variant="outline"
            size="md"
            icon={<Car className="w-4 h-4 text-[#F59C00]" />}
            iconRight={<ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-white" />}
            className="px-6 py-2.5 text-xs sm:text-[13px] tracking-wider border-[#D5D5D5] hover:border-black hover:bg-black hover:text-white shadow-xs"
          >
            EXPLORAR TODOS OS VEÍCULOS
          </Button>
          <p className="mt-2.5 text-xs text-[#8A8A8A] font-normal tracking-wide flex items-center justify-center gap-1.5 max-w-md mx-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
            <span>Todos os seminovos revisados com garantia e laudo pericial aprovado</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
