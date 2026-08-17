import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { VehicleCard } from '../vehicles/VehicleCard';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
}

export function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
              <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
                ESTOQUE CARPLUS
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-slate-900 tracking-wide">
              VEÍCULOS EM DESTAQUE
            </h2>
          </div>

          <Link
            to="/estoque"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#d97706] hover:text-[#b45309] transition-colors group"
          >
            <span>VER ESTOQUE COMPLETO</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid de Veículos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.slice(0, 4).map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Botão no Fim do Grid */}
        <div className="mt-12 text-center">
          <Link
            to="/estoque"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-300 hover:border-slate-900 rounded-xl font-display font-bold text-sm tracking-wider uppercase transition-all shadow-md shadow-slate-900/5"
          >
            <Car className="w-4 h-4 text-[#F59C00]" />
            <span>EXPLORAR TODOS OS {vehicles.length > 0 ? 'VEÍCULOS' : ''} DO ESTOQUE</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
