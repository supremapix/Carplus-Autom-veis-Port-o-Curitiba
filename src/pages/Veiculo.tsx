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
  Phone,
  ShieldCheck,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Cog,
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
import { buildWhatsAppLink, buildVehicleWhatsAppMessage, CARPLUS_PHONE_DISPLAY } from '../lib/whatsapp';
import { buildVehicleTitle, buildVehicleDescription, buildVehicleJsonLd, buildBreadcrumbJsonLd } from '../lib/seo';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

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
        title: vehicle ? `${vehicle.brand} ${vehicle.model} - Carplus Autos Curitiba` : 'Carplus Autos',
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
      <div className="bg-white min-h-screen py-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#F59C00] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#666666] text-sm font-semibold">Carregando detalhes do veículo...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bg-white min-h-screen py-24 px-4 text-center">
        <div className="max-w-md mx-auto bg-[#FAFAFA] border border-[#E0E0E0] p-10 rounded-3xl space-y-5 shadow-sm">
          <h2 className="font-display text-3xl uppercase text-[#121212] font-bold">
            Veículo não encontrado
          </h2>
          <p className="text-[#666666] text-sm">
            Este anúncio pode ter sido vendido, removido ou o link está incorreto.
          </p>
          <Button
            to="/estoque"
            variant="primary"
            icon={<ArrowLeft className="w-4 h-4 text-black" />}
          >
            VOLTAR AO ESTOQUE
          </Button>
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
    { name: vehicle.brand, url: `https://www.carplusautos.com.br/estoque?marca=${encodeURIComponent(vehicle.brand)}` },
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
    <div className="bg-white min-h-screen py-8 sm:py-12">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container>
        {/* Breadcrumb & Compartilhar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E0E0E0] text-xs">
          <nav className="flex items-center gap-2 text-[#666666] flex-wrap font-medium" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-black flex items-center gap-1">
              <HomeIcon className="w-3.5 h-3.5 text-[#F59C00]" />
              <span>Início</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#CCCCCC]" />
            <Link to="/estoque" className="hover:text-black">
              Estoque
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#CCCCCC]" />
            <Link to={`/estoque?marca=${encodeURIComponent(vehicle.brand)}`} className="hover:text-black">
              {vehicle.brand}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#CCCCCC]" />
            <span className="text-[#121212] font-bold truncate max-w-[220px] sm:max-w-none">
              {vehicle.model} {vehicle.version}
            </span>
          </nav>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 text-[#121212] bg-[#FAFAFA] hover:bg-[#EAEAEA] border border-[#E0E0E0] px-4 py-2 rounded-full transition-colors shadow-xs cursor-pointer select-none font-semibold text-xs uppercase tracking-wider"
            title="Compartilhar veículo"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600 font-bold">LINK COPIADO!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#F59C00]" />
                <span>COMPARTILHAR</span>
              </>
            )}
          </button>
        </div>

        {/* Cabeçalho do Veículo (Título, Badges & Preço) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#E0E0E0]">
          <div>
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <span className="text-xs font-display font-bold uppercase tracking-widest text-[#F59C00] bg-black px-2.5 py-0.5 rounded-md">
                {vehicle.brand}
              </span>
              <span className="text-xs text-[#666666] font-bold">
                {vehicle.yearManufacture}/{vehicle.yearModel} · {formatKm(vehicle.mileage)}
              </span>
              {vehicle.acceptsTrade && (
                <span className="inline-flex items-center gap-1 bg-[#1A1A1A] text-[#F59C00] text-xs font-display font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  <RefreshCw className="w-3 h-3" />
                  <span>Aceita Troca</span>
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-[#121212] tracking-wide leading-tight">
              {vehicle.brand} {vehicle.model}{' '}
              <span className="text-[#666666] font-normal block text-xl sm:text-2xl mt-1">
                {vehicle.version}
              </span>
            </h1>
          </div>

          <div className="lg:text-right shrink-0">
            {isSold ? (
              <div className="inline-block bg-black text-white font-display font-bold text-xl uppercase px-5 py-2.5 rounded-2xl shadow-md">
                VEÍCULO VENDIDO
              </div>
            ) : (
              <div>
                {Boolean(vehicle.previousPrice && vehicle.previousPrice > vehicle.price) && (
                  <div className="flex items-center lg:justify-end gap-2 mb-1">
                    <span className="text-sm line-through text-[#999999] font-semibold">
                      De {formatPrice(vehicle.previousPrice!)}
                    </span>
                    <span className="bg-black text-[#F59C00] border border-[#F59C00] text-xs font-display font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      OFERTA ESPECIAL
                    </span>
                  </div>
                )}
                <span className="text-xs uppercase tracking-wider text-[#666666] font-bold block">
                  PREÇO À VISTA
                </span>
                <span className="font-display font-bold text-3xl sm:text-5xl text-[#121212] leading-none">
                  {formatPrice(vehicle.price)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Layout Principal em 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Coluna Esquerda: Galeria, Specs, Consultor */}
          <div className="lg:col-span-8 space-y-10">
            {/* Galeria de Fotos */}
            <VehicleGallery
              images={vehicle.images}
              slug={vehicle.slug}
              isSold={isSold}
              isReserved={isReserved}
              vehicleTitle={`${vehicle.brand} ${vehicle.model} ${vehicle.yearModel}`}
            />

            {/* Ficha Técnica, Opcionais e Diferenciais */}
            <VehicleSpecs vehicle={vehicle} />

            {/* Consultor de Vendas */}
            {seller && (
              <section className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <img
                    src={seller.photoUrl}
                    alt={seller.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400';
                    }}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#F59C00] shadow-sm"
                  />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#F59C00] font-display font-bold block">
                      CONSULTOR CARPLUS
                    </span>
                    <h3 className="font-display font-bold text-xl uppercase text-[#121212]">
                      {seller.name}
                    </h3>
                    <p className="text-xs text-[#666666]">{seller.role} · Atendimento em Curitiba</p>
                  </div>
                </div>

                <a
                  href={buildWhatsAppLink(`Olá ${seller.name}! Vi o ${vehicle.brand} ${vehicle.model} no site e gostaria de atendimento.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-12 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-black font-display font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition-all select-none"
                >
                  <MessageSquare className="w-4 h-4 text-black fill-current" />
                  <span>FALAR COM {seller.name.split(' ')[0].toUpperCase()}</span>
                </a>
              </section>
            )}
          </div>

          {/* Coluna Direita: Formulário de Proposta & Simulação */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <InterestForm
              vehicle={vehicle}
              onOpenTradeInModal={() => setTradeInModalOpen(true)}
            />
          </div>
        </div>

        {/* Veículos Relacionados */}
        <RelatedVehicles vehicles={related} />
      </Container>

      {/* Modal de Avaliação de Troca */}
      <TradeInModal
        vehicle={vehicle}
        isOpen={tradeInModalOpen}
        onClose={() => setTradeInModalOpen(false)}
      />

      {/* Barra Fixa Inferior Mobile para Veículo Individual */}
      {!isSold && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-[#2E2E2E] p-3 flex items-center justify-between gap-3 shadow-2xl pb-safe">
          <div className="pl-1">
            <span className="text-[10px] font-display font-bold uppercase text-[#B3B3B3] block leading-none">
              PREÇO À VISTA
            </span>
            <span className="font-display font-bold text-xl text-[#F59C00] leading-tight">
              {formatPrice(vehicle.price)}
            </span>
          </div>

          <a
            href={buildWhatsAppLink(whatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 bg-[#25D366] hover:bg-[#20BA5A] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 select-none"
          >
            <MessageSquare className="w-4 h-4 text-black fill-current" />
            <span>TENHO INTERESSE</span>
          </a>
        </div>
      )}
    </div>
  );
}
