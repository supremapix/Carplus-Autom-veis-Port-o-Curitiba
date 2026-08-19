import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Fuel, Gauge, Calendar, ShieldCheck } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { MOCK_VEHICLES } from '../../data/mock/vehicles.mock';
import { formatPrice, formatKm } from '../../lib/utils';
import { handleVehicleImageError, FALLBACK_VEHICLE_IMAGES } from '../../lib/images';
import { getBrandLogo } from '../../data/brands';

export function SellPromo() {
  // Filtra veículos disponíveis no estoque para a rotação automática
  const vehicles = useMemo(() => {
    return MOCK_VEHICLES.filter((v) => v.status === 'disponivel');
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Efeito de troca automática dos carros do estoque (4 segundos)
  useEffect(() => {
    if (vehicles.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % vehicles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [vehicles.length, isPaused]);

  const currentVehicle = vehicles[currentIndex] || vehicles[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % vehicles.length);
  };

  // Efeito de digitação em looping
  const typingFullText =
    'Equipe especializada pronta para avaliar seu veículo presencialmente na Av. Pres. Arthur Bernardes, 1323 ou via WhatsApp.';
  
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Digitando para frente
      if (displayedText.length < typingFullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(typingFullText.slice(0, displayedText.length + 1));
        }, 32);
      } else {
        // Frase completa -> aguarda 4 segundos antes de apagar
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 4000);
      }
    } else {
      // Apagando
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(typingFullText.slice(0, displayedText.length - 1));
        }, 18);
      } else {
        // Reset -> aguarda 400ms e começa a digitar de novo
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, typingFullText]);

  const coverImage =
    currentVehicle?.images?.find((img) => img.isCover)?.url ||
    currentVehicle?.images?.[0]?.url ||
    FALLBACK_VEHICLE_IMAGES.suv;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E0E0E0] overflow-hidden">
      <Container>
        <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-xl shadow-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Coluna Texto / Avaliação (6 colunas no Desktop) */}
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                kicker="AVALIAÇÃO DE VEÍCULOS"
                title={
                  <>
                    QUER VENDER OU TROCAR SEU <span className="text-[#F59C00] italic">CARRO?</span>
                  </>
                }
                subtitle="Na Carplus Autos, você tem um processo transparente, rápido e sem burocracia para vender ou consignar seu veículo em Curitiba."
              />

              <div className="space-y-3.5 pt-1">
                <div className="flex items-center gap-3 text-sm sm:text-base text-[#121212]">
                  <CheckCircle2 className="w-5 h-5 text-[#F59C00] shrink-0" />
                  <span className="font-medium">Envie os dados e fotos do seu veículo pelo formulário</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base text-[#121212]">
                  <CheckCircle2 className="w-5 h-5 text-[#F59C00] shrink-0" />
                  <span className="font-medium">Nossa equipe avalia seu seminovo com base no mercado real</span>
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base text-[#121212]">
                  <CheckCircle2 className="w-5 h-5 text-[#F59C00] shrink-0" />
                  <span className="font-medium">Pagamento à vista seguro ou troca com troco garantida</span>
                </div>
              </div>

              {/* Botão de Avaliação Reduzido com Legenda Explicativa Discreta */}
              <div className="pt-2 flex flex-col items-start">
                <Button
                  to="/venda-seu-carro"
                  variant="primary"
                  size="md"
                  iconRight={<ArrowRight className="w-4 h-4 text-black" />}
                  className="px-5 py-2.5 text-xs sm:text-[13px] tracking-wider shadow-md shadow-[#F59C00]/20"
                >
                  SOLICITAR AVALIAÇÃO DO MEU CARRO
                </Button>
                <span className="mt-2 text-xs text-[#8A8A8A] font-normal tracking-wide flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
                  <span>Avaliação rápida sem compromisso com proposta justa à vista</span>
                </span>
              </div>
            </div>

            {/* Coluna Showcase Rotativo de Carros do Estoque (6 colunas) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Card do Carro com Troca Automática */}
              <div
                className="relative rounded-2xl overflow-hidden border border-[#E0E0E0] shadow-xl bg-white group flex flex-col"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* 1. Imagem do Veículo em Destaque 100% Limpa e Desobstruída */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#121212]">
                  <img
                    key={currentVehicle.id}
                    src={coverImage}
                    alt={`${currentVehicle.brand} ${currentVehicle.model} — Carplus Autos Curitiba`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleVehicleImageError(e)}
                  />

                  {/* Badges do topo da foto (discretos e posicionados no canto superior) */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#F59C00] text-[11px] font-display font-bold uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#F59C00]" />
                      <span>DESTAQUE DO ESTOQUE</span>
                    </div>

                    <div className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-[11px] font-display font-bold uppercase tracking-wide">
                      {currentIndex + 1} de {vehicles.length}
                    </div>
                  </div>

                  {/* Controles de Navegação do Carrossel */}
                  <div className="absolute inset-y-0 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center pointer-events-auto backdrop-blur-md border border-white/25 transition-all active:scale-90 shadow-md hover:border-[#F59C00] cursor-pointer"
                      aria-label="Carro anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center pointer-events-auto backdrop-blur-md border border-white/25 transition-all active:scale-90 shadow-md hover:border-[#F59C00] cursor-pointer"
                      aria-label="Próximo carro"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* 2. Corpo do Card Elegante & Moderno (Fora da foto) */}
                <div className="p-5 sm:p-6 bg-white flex flex-col justify-between gap-4 border-t border-[#EDEDED]">
                  {/* Cabeçalho do Carro */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-display font-bold uppercase tracking-widest text-[#F59C00] bg-black px-2 py-0.5 rounded">
                          {currentVehicle.brand}
                        </span>
                        {currentVehicle.version && (
                          <span className="text-xs text-[#888888] font-medium truncate">
                            {currentVehicle.version}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-[#121212] tracking-tight truncate leading-tight">
                        {currentVehicle.model}
                      </h3>
                    </div>

                    {/* Logo da Marca */}
                    {getBrandLogo(currentVehicle.brand) && (
                      <div className="h-8 w-12 bg-[#FAFAFA] border border-[#E8E8E8] rounded-lg px-1.5 flex items-center justify-center shrink-0">
                        <img
                          src={getBrandLogo(currentVehicle.brand)}
                          alt={`Logo ${currentVehicle.brand}`}
                          className="max-h-6 max-w-[38px] object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Chips de Especificações do Veículo */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#F0F0F0]">
                    <div className="flex items-center gap-1.5 text-xs text-[#555555]">
                      <Calendar className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
                      <span className="font-semibold text-[#121212] truncate">{currentVehicle.yearModel}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#555555]">
                      <Gauge className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
                      <span className="font-semibold text-[#121212] truncate">{formatKm(currentVehicle.mileage)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#555555]">
                      <Fuel className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
                      <span className="font-semibold text-[#121212] truncate">{currentVehicle.fuelLabel}</span>
                    </div>
                  </div>

                  {/* Preço & Ação */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div>
                      <span className="text-[11px] font-display font-bold text-[#888888] uppercase tracking-wider block">
                        Valor à vista
                      </span>
                      <div className="font-display font-bold text-2xl sm:text-[26px] text-[#121212] leading-none">
                        {formatPrice(currentVehicle.price)}
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end">
                      <Link
                        to={`/estoque/${currentVehicle.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-[11px] uppercase tracking-wider transition-all shadow-sm select-none hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        <span>VER DETALHES</span>
                        <ArrowRight className="w-3.5 h-3.5 text-black" />
                      </Link>
                      <span className="text-[10px] text-[#888888] mt-1">
                        Fotos completas, opcionais e laudo
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Box de Atendimento Direto no Portão com Efeito de Digitação em Looping */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#E0E0E0] shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#F59C00] shadow-[0_0_6px_#F59C00] animate-pulse" />
                  <span className="text-xs font-display font-bold text-[#F59C00] uppercase tracking-[0.16em]">
                    ATENDIMENTO DIRETO NO PORTÃO
                  </span>
                </div>

                <div className="min-h-[48px] sm:min-h-[44px] flex items-center">
                  <p className="text-xs sm:text-sm text-[#121212] font-medium leading-relaxed">
                    {displayedText}
                    <span className="inline-block w-1.5 h-4 bg-[#F59C00] ml-1 translate-y-0.5 animate-pulse" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
