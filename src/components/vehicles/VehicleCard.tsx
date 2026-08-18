import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Cog, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { formatPrice, formatKm } from '../../lib/utils';
import { VehicleImage } from '../ui/VehicleImage';
import { getVehicleImageUrl } from '../../lib/images';
import { getBrandLogo } from '../../data/brands';

export interface VehicleCardProps {
  vehicle: Vehicle;
  key?: React.Key;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const coverImg = vehicle.images.find((img) => img.isCover) || vehicle.images[0];
  const coverUrl = getVehicleImageUrl(coverImg?.url, vehicle.bodyType);

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

  const imageAlt = coverImg?.alt || `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearModel} à Venda em Curitiba - Carplus Autos`;

  return (
    <Link
      to={`/estoque/${vehicle.slug}`}
      className={`group flex flex-col bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden transition-all duration-300 hover:border-[#F59C00] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/8 select-none ${
        isSold ? 'opacity-75 grayscale-[40%]' : ''
      }`}
    >
      {/* Imagem do Veículo com Suporte a Fallback */}
      <div className="relative aspect-[4/3] bg-[#1A1A1A] overflow-hidden">
        <VehicleImage
          slug={vehicle.slug}
          imageIndex={0}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges de Destaque / Oferta / Status */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 items-start">
          {vehicle.featured && !isSold && !isReserved && (
            <span className="bg-[#F59C00] text-black text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              DESTAQUE
            </span>
          )}
          {Boolean(vehicle.previousPrice && vehicle.previousPrice > vehicle.price) && !isSold && (
            <span className="bg-black text-[#F59C00] border border-[#F59C00] text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              OFERTA
            </span>
          )}
          {isReserved && (
            <span className="bg-[#2A2A2A] text-white text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              RESERVADO
            </span>
          )}
          {isSold && (
            <span className="bg-black text-white text-xs font-display font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              VENDIDO
            </span>
          )}
        </div>

        {/* Badge Aceita Troca / Curitiba */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
          {vehicle.acceptsTrade && (
            <span className="bg-black/85 backdrop-blur-xs text-white font-semibold text-[11px] px-2.5 py-1 rounded-full border border-[#3E3E3E] shadow-sm flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3 text-[#F59C00]" />
              <span>Aceita troca</span>
            </span>
          )}
          <span className="bg-white/95 backdrop-blur-xs text-[#121212] font-semibold text-[11px] px-2.5 py-1 rounded-full border border-[#E0E0E0] shadow-sm">
            Curitiba/PR
          </span>
        </div>
      </div>

      {/* Conteúdo & Especificações */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-white">
        <div>
          {/* Marca e Modelo com Logo */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#121212] uppercase tracking-wide group-hover:text-[#F59C00] transition-colors line-clamp-2 leading-tight">
              {vehicle.brand} {vehicle.model}
            </h3>
            {getBrandLogo(vehicle.brand) && (
              <div className="h-6 w-10 bg-[#FAFAFA] border border-[#E8E8E8] rounded-md px-1 flex items-center justify-center shrink-0 mt-0.5">
                <img
                  src={getBrandLogo(vehicle.brand)}
                  alt={`Logo ${vehicle.brand}`}
                  className="max-h-4 max-w-[32px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          {/* Versão */}
          <p className="text-xs sm:text-sm text-[#666666] font-medium line-clamp-1 mt-1">
            {vehicle.version}
          </p>

          {/* Grid de Especificações Rápidas */}
          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-[#E0E0E0] text-xs text-[#666666]">
            <div className="flex items-center gap-2" title="Ano de Fabricação / Modelo">
              <Calendar className="w-4 h-4 text-[#F59C00] shrink-0" />
              <span className="font-semibold text-[#121212]">{vehicle.yearManufacture}/{vehicle.yearModel}</span>
            </div>

            <div className="flex items-center gap-2" title="Quilometragem">
              <Gauge className="w-4 h-4 text-[#F59C00] shrink-0" />
              <span className="font-semibold text-[#121212]">{formatKm(vehicle.mileage)}</span>
            </div>

            <div className="flex items-center gap-2" title="Combustível">
              <Fuel className="w-4 h-4 text-[#F59C00] shrink-0" />
              <span className="font-semibold text-[#121212]">{vehicle.fuelLabel || fuelMap[vehicle.fuel] || vehicle.fuel}</span>
            </div>

            <div className="flex items-center gap-2" title="Câmbio">
              <Cog className="w-4 h-4 text-[#F59C00] shrink-0" />
              <span className="font-semibold text-[#121212]">{transMap[vehicle.transmission] || vehicle.transmission}</span>
            </div>
          </div>
        </div>

        {/* Preço e CTA */}
        <div className="mt-5 pt-4 border-t border-[#E0E0E0] flex items-end justify-between gap-3">
          <div>
            {isSold ? (
              <span className="text-sm font-display font-bold text-[#666666] uppercase tracking-wider">
                Vendido
              </span>
            ) : (
              <div>
                {Boolean(vehicle.previousPrice && vehicle.previousPrice > vehicle.price) && (
                  <span className="text-xs line-through text-[#999999] font-medium block">
                    De {formatPrice(vehicle.previousPrice!)}
                  </span>
                )}
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#666666] block">
                  Preço à vista
                </span>
                <span className="font-display font-bold text-2xl sm:text-[28px] text-[#121212] group-hover:text-[#F59C00] transition-colors leading-none">
                  {formatPrice(vehicle.price)}
                </span>
              </div>
            )}
          </div>

          <div className="h-10 px-4 rounded-full bg-[#FAFAFA] group-hover:bg-[#F59C00] border border-[#E0E0E0] group-hover:border-[#F59C00] flex items-center gap-1.5 transition-all text-xs font-display font-bold uppercase tracking-wider text-[#121212]">
            <span>VER</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function VehicleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E0E0E0] animate-pulse overflow-hidden shadow-xs">
      <div className="aspect-[4/3] bg-[#F2F2F2]" />
      <div className="p-5 space-y-4">
        <div className="h-6 bg-[#E0E0E0] rounded w-3/4" />
        <div className="h-4 bg-[#F2F2F2] rounded w-1/2" />
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-4 bg-[#F2F2F2] rounded" />
          <div className="h-4 bg-[#F2F2F2] rounded" />
          <div className="h-4 bg-[#F2F2F2] rounded" />
          <div className="h-4 bg-[#F2F2F2] rounded" />
        </div>
        <div className="pt-3 border-t border-[#E0E0E0] flex justify-between items-center">
          <div className="h-8 bg-[#E0E0E0] rounded w-32" />
          <div className="h-8 bg-[#F2F2F2] rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}
