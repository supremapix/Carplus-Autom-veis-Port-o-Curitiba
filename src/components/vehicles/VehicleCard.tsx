import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Cog, ArrowRight, RefreshCw } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { formatPrice, formatKm } from '../../lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  key?: React.Key;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const coverImage = vehicle.images.find((img) => img.isCover)?.url || vehicle.images[0]?.url || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200';
  const isSold = vehicle.status === 'vendido';
  const isReserved = vehicle.status === 'reservado';

  const fuelMap: Record<string, string> = {
    flex: 'Flex',
    gasolina: 'Gasolina',
    diesel: 'Diesel',
    etanol: 'Etanol',
    hibrido: 'Híbrido',
    eletrico: 'Elétrico',
    gnv: 'GNV',
  };

  const transMap: Record<string, string> = {
    automatico: 'Automático',
    manual: 'Manual',
    cvt: 'CVT',
    automatizado: 'Automatizado',
  };

  const imageAlt = vehicle.images.find((img) => img.isCover)?.alt || `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearModel} ${vehicle.color} — Carplus Autos Curitiba`;

  return (
    <Link
      to={`/estoque/${vehicle.slug}`}
      className={`group block bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-[#F59C00] hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 ${
        isSold ? 'opacity-75 grayscale-[40%]' : ''
      }`}
    >
      {/* Imagem do Veículo */}
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
        <img
          src={coverImage}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges de Destaque / Oferta / Status */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 items-start">
          {vehicle.featured && !isSold && !isReserved && (
            <span className="bg-[#F59C00] text-black text-[10px] font-display font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-md">
              DESTAQUE
            </span>
          )}
          {Boolean(vehicle.previousPrice && vehicle.previousPrice > vehicle.price) && !isSold && (
            <span className="bg-black text-[#F59C00] border border-[#F59C00] text-[10px] font-display font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-md">
              OFERTA
            </span>
          )}
          {isReserved && (
            <span className="bg-slate-800 text-white text-[10px] font-display font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-md">
              RESERVADO
            </span>
          )}
          {isSold && (
            <span className="bg-slate-900 text-white text-[10px] font-display font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-md">
              VENDIDO
            </span>
          )}
        </div>

        {/* Badge Aceita Troca / Cidade */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
          {vehicle.acceptsTrade && (
            <span className="bg-black/80 backdrop-blur-sm text-slate-200 font-semibold text-[10px] px-2 py-0.5 rounded-md border border-slate-700 shadow-xs flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5 text-[#F59C00]" />
              <span>Aceita troca</span>
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 font-semibold text-[10px] px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
            Curitiba/PR
          </span>
        </div>
      </div>

      {/* Conteúdo & Specs */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          {/* Marca e Modelo */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 uppercase tracking-wide group-hover:text-[#d97706] transition-colors line-clamp-1">
              {vehicle.brand} {vehicle.model}
            </h3>
          </div>

          {/* Versão */}
          <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
            {vehicle.version}
          </p>

          {/* Grid de Especificações Rápidas */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5" title="Ano de Fabricação / Modelo">
              <Calendar className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
              <span>{vehicle.yearManufacture}/{vehicle.yearModel}</span>
            </div>

            <div className="flex items-center gap-1.5" title="Quilometragem">
              <Gauge className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
              <span>{formatKm(vehicle.mileage)}</span>
            </div>

            <div className="flex items-center gap-1.5" title="Combustível">
              <Fuel className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
              <span>{vehicle.fuelLabel || fuelMap[vehicle.fuel] || vehicle.fuel}</span>
            </div>

            <div className="flex items-center gap-1.5" title="Câmbio">
              <Cog className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
              <span>{transMap[vehicle.transmission] || vehicle.transmission}</span>
            </div>
          </div>
        </div>

        {/* Preço e CTA */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            {isSold ? (
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Vendido
              </span>
            ) : (
              <div>
                {Boolean(vehicle.previousPrice && vehicle.previousPrice > vehicle.price) && (
                  <span className="text-xs line-through text-slate-400 font-medium block">
                    De {formatPrice(vehicle.previousPrice!)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">Preço à vista</span>
                <span className="font-display font-bold text-xl sm:text-2xl text-[#d97706]">
                  {formatPrice(vehicle.price)}
                </span>
              </div>
            )}
          </div>

          <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 flex items-center gap-1 transition-colors">
            <span>Ver detalhes</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#d97706]" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function VehicleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 animate-pulse overflow-hidden shadow-xs">
      <div className="aspect-[4/3] bg-slate-200" />
      <div className="p-5 space-y-4">
        <div className="h-6 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200/60 rounded w-1/2" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-4 bg-slate-200/40 rounded" />
          <div className="h-4 bg-slate-200/40 rounded" />
          <div className="h-4 bg-slate-200/40 rounded" />
          <div className="h-4 bg-slate-200/40 rounded" />
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
          <div className="h-7 bg-slate-200 rounded w-28" />
          <div className="h-4 bg-slate-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}
