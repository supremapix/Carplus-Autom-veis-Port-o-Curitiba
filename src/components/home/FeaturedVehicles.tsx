import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, ShieldCheck } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { VehicleCard } from '../vehicles/VehicleCard';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { HOME_VEHICLE_LIMIT } from '../../lib/home-inventory';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
  totalCount?: number;
}

export function FeaturedVehicles({ vehicles, totalCount }: FeaturedVehiclesProps) {
  const displayTotal = totalCount !== undefined && totalCount > 0 ? totalCount : vehicles.length;

  return (
    <section aria-label="Veículos em destaque" className="py-12 sm:py-16 bg-white border-b border-[#E0E0E0]">
      <Container>
        {/* Título da Seção Centralizado e Alinhado com Subtítulo e Botão */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-8 pb-6 border-b border-[#E0E0E0]">
          <SectionHeading
            align="center"
            kicker="ESTOQUE SELECIONADO"
            title={
              <>
                VEÍCULOS EM <span className="text-[#F59C00]">DESTAQUE</span>
              </>
            }
            subtitle="Confira os veículos disponíveis adicionados ou atualizados mais recentemente no nosso estoque."
          />

          <div className="mt-6 flex flex-col items-center justify-center">
            <Button
              to="/estoque"
              variant="outline"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4 text-[#F59C00]" />}
              className="border border-[#D5D5D5] hover:border-black hover:bg-black hover:text-white px-5 py-2 text-xs uppercase tracking-wider shadow-xs"
            >
              VER ESTOQUE COMPLETO ({displayTotal})
            </Button>
            <span className="text-[11px] text-[#888888] mt-1.5 font-normal tracking-wide">
              Clique para navegar por todas as ofertas e modelos disponíveis
            </span>
          </div>
        </div>

        {/* Grid de Veículos */}
        <p className="mb-6 text-center text-sm text-[#666666]">Quer conhecer nosso histórico? <Link to="/historico-veiculos" className="font-semibold text-[#121212] underline underline-offset-4">Ver veículos vendidos</Link></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.slice(0, HOME_VEHICLE_LIMIT).map((vehicle) => (
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
            <span>Consulte as fotos, o histórico e as condições de cada veículo</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
