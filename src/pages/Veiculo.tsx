import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Home as HomeIcon,
  MessageSquare,
  ArrowLeft,
  Share2,
  Check,
  RefreshCw,
} from 'lucide-react';
import { VehicleGallery } from '../components/vehicles/VehicleGallery';
import { VehicleSpecs } from '../components/vehicles/VehicleSpecs';
import { InterestForm } from '../components/vehicles/InterestForm';
import { TradeInModal } from '../components/vehicles/TradeInModal';
import { RelatedVehicles } from '../components/vehicles/RelatedVehicles';
import { getVehicleBySlug, getRelatedVehicles } from '../services/vehicles';
import { getSellerById } from '../services/sellers';
import { Vehicle } from '../types/vehicle';
import { Seller } from '../types/seller';
import { formatPrice, formatKm } from '../lib/utils';
import { buildWhatsAppLink, buildVehicleWhatsAppMessage } from '../lib/whatsapp';
import { buildVehicleTitle, buildVehicleDescription, buildVehicleJsonLd, buildBreadcrumbJsonLd } from '../lib/seo';

export function Veiculo() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [related, setRelated] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [tradeInModalOpen, setTradeInModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    window.scrollTo(0, 0);

    getVehicleBySlug(slug)
      .then((data) => {
        setVehicle(data);
        if (data) {
          document.title = buildVehicleTitle(data);
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute('content', buildVehicleDescription(data));
          }
          getSellerById(data.sellerId).then(setSeller);
          getRelatedVehicles(data.id).then(setRelated);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: vehicle ? `${vehicle.brand} ${vehicle.model} - Carplus Autos` : 'Carplus Autos',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#F59C00] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-sm font-medium">Carregando detalhes do veículo...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
          <h2 className="font-display text-2xl uppercase text-slate-900 font-bold">
            Veículo não encontrado
          </h2>
          <p className="text-slate-500 text-sm">
            Este anúncio pode ter sido removido ou o link está incorreto.
          </p>
          <Link
            to="/estoque"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59C00] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#F59C00]/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Estoque</span>
          </Link>
        </div>
      </div>
    );
  }

  const isSold = vehicle.status === 'vendido';
  const isReserved = vehicle.status === 'reservado';

  const vehicleJsonLd = buildVehicleJsonLd(vehicle);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Início', url: 'https://www.carplusautos.com.br/' },
    { name: 'Estoque', url: 'https://www.carplusautos.com.br/estoque' },
    { name: vehicle.brand, url: `https://www.carplusautos.com.br/estoque?marca=${vehicle.brand}` },
    { name: `${vehicle.model} ${vehicle.version}`, url: `https://www.carplusautos.com.br/estoque/${vehicle.slug}` },
  ]);

  const whatsAppMessage = buildVehicleWhatsAppMessage({
    brand: vehicle.brand,
    model: vehicle.model,
    version: vehicle.version,
    yearModel: vehicle.yearModel,
    slug: vehicle.slug,
  });

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 text-xs">
          <nav className="flex items-center gap-2 text-slate-500 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-slate-900 flex items-center gap-1 font-medium">
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Início</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/estoque" className="hover:text-slate-900 font-medium">
              Estoque
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to={`/estoque?marca=${vehicle.brand}`} className="hover:text-slate-900 font-medium">
              {vehicle.brand}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#d97706] font-bold truncate max-w-[200px] sm:max-w-none">
              {vehicle.model} {vehicle.version}
            </span>
          </nav>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl transition-colors shadow-xs cursor-pointer"
            title="Compartilhar veículo"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span className="text-black font-bold">Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="font-medium">Compartilhar</span>
              </>
            )}
          </button>
        </div>

        {/* Cabeçalho do Veículo (Título, Badges & Preço) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
                {vehicle.brand}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-semibold">
                {vehicle.yearManufacture}/{vehicle.yearModel} · {formatKm(vehicle.mileage)}
              </span>
              {vehicle.acceptsTrade && (
                <span className="inline-flex items-center gap-1 bg-slate-900 text-[#F59C00] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Aceita Troca</span>
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl uppercase text-slate-900 tracking-wide">
              {vehicle.brand} {vehicle.model} <span className="text-slate-500 font-normal">{vehicle.version}</span>
            </h1>
          </div>

          <div className="lg:text-right">
            {isSold ? (
              <div className="inline-block bg-slate-200 text-slate-600 font-display font-bold text-lg uppercase px-4 py-1.5 rounded-xl">
                Veículo Vendido
              </div>
            ) : (
              <div>
                {Boolean(vehicle.previousPrice && vehicle.previousPrice > vehicle.price) && (
                  <div className="flex items-center lg:justify-end gap-2 mb-0.5">
                    <span className="text-sm line-through text-slate-400 font-semibold">
                      De {formatPrice(vehicle.previousPrice!)}
                    </span>
                    <span className="bg-black text-[#F59C00] border border-[#F59C00] text-[10px] font-display font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      OFERTA
                    </span>
                  </div>
                )}
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Preço à vista</span>
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#d97706]">
                  {formatPrice(vehicle.price)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Esquerda (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Galeria de Fotos com Lightbox */}
            <VehicleGallery
              images={vehicle.images}
              isSold={isSold}
              isReserved={isReserved}
              vehicleTitle={`${vehicle.brand} ${vehicle.model} ${vehicle.yearModel}`}
            />

            {/* Ficha Técnica, Informações Adicionais, Opcionais e Diferenciais */}
            <VehicleSpecs vehicle={vehicle} />

            {/* Vendedor Responsável (se houver) */}
            {seller && (
              <section className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <img
                    src={seller.photoUrl}
                    alt={seller.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#F59C00]"
                  />
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#d97706] font-bold block">
                      Consultor Especialista
                    </span>
                    <h3 className="font-display font-bold text-lg uppercase text-slate-900">
                      {seller.name}
                    </h3>
                    <p className="text-xs text-slate-500">{seller.role} · Carplus Autos</p>
                  </div>
                </div>

                <a
                  href={buildWhatsAppLink(`Olá ${seller.name}! Vi o ${vehicle.brand} ${vehicle.model} no site e gostaria de tirar dúvidas com você.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-black hover:bg-slate-900 text-[#F59C00] border border-[#F59C00] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#F59C00]" />
                  <span>Falar com {seller.name.split(' ')[0]}</span>
                </a>
              </section>
            )}
          </div>

          {/* Coluna Direita (4 cols) - Sticky Side-Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <InterestForm
              vehicle={vehicle}
              onOpenTradeInModal={() => setTradeInModalOpen(true)}
            />
          </div>

        </div>

        {/* Seção Você Também Pode Gostar */}
        <RelatedVehicles vehicles={related} />

      </div>

      {/* Modal de Avaliação de Troca */}
      <TradeInModal
        vehicle={vehicle}
        isOpen={tradeInModalOpen}
        onClose={() => setTradeInModalOpen(false)}
      />

      {/* Barra Fixa Inferior Mobile para Veículos Disponíveis */}
      {!isSold && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-md border-t border-slate-800 p-3 flex items-center justify-between gap-3 shadow-xl">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-semibold block leading-none">Preço à vista</span>
            <span className="font-display font-bold text-lg text-[#F59C00] leading-tight">
              {formatPrice(vehicle.price)}
            </span>
          </div>

          <a
            href={buildWhatsAppLink(whatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#F59C00]/20"
          >
            <MessageSquare className="w-4 h-4 text-black" />
            <span>TENHO INTERESSE</span>
          </a>
        </div>
      )}
    </div>
  );
}
