import React from 'react';
import { MOCK_VEHICLES } from '../data/mock/vehicles.mock';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { SeoHead } from '../components/ui/SeoHead';
import { Link } from 'react-router-dom';
import { buildBreadcrumbJsonLd, buildItemListJsonLd } from '../lib/seo';

export const HistoricoVeiculos: React.FC = () => {
  const soldVehicles = MOCK_VEHICLES.filter(v => v.status === 'vendido');

  return (
    <div className="container mx-auto px-4 py-8" data-track-location="historico_veiculos">
      <SeoHead title="Veículos vendidos em Curitiba | Histórico Carplus Autos" description="Conheça os veículos já vendidos pela Carplus Autos, no Portão, em Curitiba. Anúncios preservados como histórico; consulte o estoque para opções disponíveis." canonicalUrl="https://www.carplusautos.com.br/historico-veiculos" jsonLd={[buildBreadcrumbJsonLd([{name:'Início',url:'https://www.carplusautos.com.br/'},{name:'Veículos vendidos',url:'https://www.carplusautos.com.br/historico-veiculos'}]),buildItemListJsonLd(soldVehicles)]} />
      <h1 className="text-3xl font-bold mb-6">Histórico de Veículos Vendidos</h1>
      <p className="mb-4 max-w-3xl text-[#555555] leading-relaxed">Este é o histórico de veículos já vendidos pela Carplus Autos, no Portão, em Curitiba. Mantemos as páginas, fotos e características para consulta. Os veículos desta seção não estão disponíveis para compra.</p>
      <p className="mb-8"><Link to="/estoque" className="inline-flex bg-[#F59C00] text-black rounded-full px-5 py-3 font-semibold">Consultar veículos disponíveis</Link></p>
      <h2 className="text-xl font-semibold mb-5">Anúncios de veículos vendidos ({soldVehicles.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {soldVehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default HistoricoVeiculos;
