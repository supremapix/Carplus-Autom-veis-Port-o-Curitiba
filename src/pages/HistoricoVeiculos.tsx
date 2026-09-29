import React from 'react';
import { MOCK_VEHICLES } from '../data/mock/vehicles.mock';
import { VehicleCard } from '../components/vehicles/VehicleCard';

export const HistoricoVeiculos: React.FC = () => {
  const soldVehicles = MOCK_VEHICLES.filter(v => v.status === 'vendido');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Histórico de Veículos Vendidos</h1>
      <p className="mb-8">Confira os veículos que já passaram pela Carplus Autos.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {soldVehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default HistoricoVeiculos;
