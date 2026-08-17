import React from 'react';
import {
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Palette,
  Car,
  Tag,
  Hash,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
  Compass,
  Users,
} from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { formatKm } from '../../lib/utils';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const fuelMap: Record<string, string> = {
    flex: 'Flex (Álcool/Gasolina)',
    gasolina: 'Gasolina',
    diesel: 'Diesel',
    etanol: 'Etanol',
    hibrido: 'Híbrido',
    eletrico: '100% Elétrico',
    gnv: 'GNV',
  };

  const transMap: Record<string, string> = {
    automatico: 'Automático',
    manual: 'Manual',
    cvt: 'Automático CVT',
    automatizado: 'Automatizado',
  };

  const bodyMap: Record<string, string> = {
    suv: 'SUV / Utilitário Esportivo',
    sedan: 'Sedan',
    hatch: 'Hatchback',
    picape: 'Picape / Camionete',
    coupe: 'Coupé',
    perua: 'Station Wagon (Perua)',
    van: 'Van / Minivan',
  };

  const specsList = [
    {
      label: 'Ano Fabricação / Modelo',
      value: `${vehicle.yearManufacture} / ${vehicle.yearModel}`,
      icon: <Calendar className="w-4 h-4 text-[#d97706]" />,
    },
    {
      label: 'Quilometragem',
      value: formatKm(vehicle.mileage),
      icon: <Gauge className="w-4 h-4 text-[#d97706]" />,
    },
    {
      label: 'Combustível',
      value: vehicle.fuelLabel || fuelMap[vehicle.fuel] || vehicle.fuel,
      icon: <Fuel className="w-4 h-4 text-[#d97706]" />,
    },
    {
      label: 'Câmbio',
      value: transMap[vehicle.transmission] || vehicle.transmission,
      icon: <Cog className="w-4 h-4 text-[#d97706]" />,
    },
    ...(vehicle.steering
      ? [
          {
            label: 'Direção',
            value: vehicle.steering,
            icon: <Compass className="w-4 h-4 text-[#d97706]" />,
          },
        ]
      : []),
    {
      label: 'Carroceria',
      value: bodyMap[vehicle.bodyType || ''] || vehicle.bodyType || 'Sedan/SUV',
      icon: <Car className="w-4 h-4 text-[#d97706]" />,
    },
    {
      label: 'Cor Externa',
      value: vehicle.color,
      icon: <Palette className="w-4 h-4 text-[#d97706]" />,
    },
    {
      label: 'Portas',
      value: `${vehicle.doors || 4} Portas`,
      icon: <Car className="w-4 h-4 text-[#d97706]" />,
    },
    ...(vehicle.seats
      ? [
          {
            label: 'Lugares',
            value: `${vehicle.seats} Lugares`,
            icon: <Users className="w-4 h-4 text-[#d97706]" />,
          },
        ]
      : []),
    {
      label: 'Final da Placa',
      value: vehicle.plateEnd ? `Final ${vehicle.plateEnd}` : 'Consulte',
      icon: <Hash className="w-4 h-4 text-[#d97706]" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Informações Adicionais (Chips) */}
      {vehicle.additionalInfo && vehicle.additionalInfo.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
            <Info className="w-5 h-5 text-[#d97706]" />
            <h2 className="font-display font-bold text-xl uppercase text-slate-900 tracking-wide">
              Informações Adicionais
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {vehicle.additionalInfo.map((info, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-[#F59C00] font-semibold text-xs border border-slate-800 shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59C00]" />
                <span>{info}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tabela / Grid de Ficha Técnica */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
          <ShieldCheck className="w-5 h-5 text-[#d97706]" />
          <h2 className="font-display font-bold text-xl uppercase text-slate-900 tracking-wide">
            Ficha Técnica & Dados do Veículo
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {specsList.map((spec, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white text-[#d97706] border border-slate-200/80 shadow-xs">
                  {spec.icon}
                </div>
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  {spec.label}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 text-right">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Itens e Opcionais */}
      {vehicle.features && vehicle.features.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
            <Tag className="w-5 h-5 text-[#d97706]" />
            <h2 className="font-display font-bold text-xl uppercase text-slate-900 tracking-wide">
              Itens e Opcionais do Veículo
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {vehicle.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-[#d97706] shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diferenciais Carplus */}
      {vehicle.differentials && vehicle.differentials.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-[#d97706]" />
            <h2 className="font-display font-bold text-xl uppercase text-slate-900 tracking-wide">
              Diferenciais Carplus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {vehicle.differentials.map((diff, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs font-semibold"
              >
                <CheckCircle2 className="w-4 h-4 text-[#F59C00] shrink-0" />
                <span>{diff}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Descrição e Observações */}
      {vehicle.description && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h2 className="font-display font-bold text-xl uppercase text-slate-900 tracking-wide pb-4 mb-4 border-b border-slate-100">
            Sobre este Veículo
          </h2>
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {vehicle.description}
          </div>
        </div>
      )}
    </div>
  );
}
