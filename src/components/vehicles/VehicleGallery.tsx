import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Camera } from 'lucide-react';
import { VehicleImage } from '../../types/vehicle';
import { handleVehicleImageError, FALLBACK_VEHICLE_IMAGES } from '../../lib/images';

interface VehicleGalleryProps {
  images: VehicleImage[];
  isSold?: boolean;
  isReserved?: boolean;
  vehicleTitle: string;
}

export function VehicleGallery({
  images,
  isSold = false,
  isReserved = false,
  vehicleTitle,
}: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const fallbackImage = '/images/veiculos/toyota-hilux-sw4-srx-platinum-4x4-2-8-diesel-2024/01.jpg';
  const galleryImages = images && images.length > 0 ? images : [{ id: '1', url: fallbackImage, isCover: true, order: 0 }];

  const currentImage = galleryImages[activeIndex] || galleryImages[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, galleryImages.length]);

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div
        className={`relative aspect-[16/10] sm:aspect-[16/9] bg-black rounded-3xl overflow-hidden border border-[#E0E0E0] shadow-xl group cursor-pointer ${
          isSold ? 'grayscale-[50%]' : ''
        }`}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={currentImage.url}
          alt={`${vehicleTitle} - Foto ${activeIndex + 1}`}
          width={1200}
          height={800}
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => handleVehicleImageError(e, FALLBACK_VEHICLE_IMAGES.default)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Badges de Status */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isSold && (
            <span className="bg-black text-white font-display font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              VEÍCULO VENDIDO
            </span>
          )}
          {isReserved && (
            <span className="bg-[#F59C00] text-black font-display font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              RESERVADO
            </span>
          )}
        </div>

        {/* Contador de Fotos */}
        <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-xs text-white text-xs px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-2 shadow-md">
          <Camera className="w-4 h-4 text-[#F59C00]" />
          <span className="font-semibold">
            {activeIndex + 1} / {galleryImages.length}
          </span>
        </div>

        {/* Botão Ampliar */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-black text-white rounded-full backdrop-blur-xs transition-colors opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
          title="Ver fotos em tela cheia"
          aria-label="Ver fotos em tela cheia"
        >
          <Maximize2 className="w-4 h-4 text-[#F59C00]" />
        </button>

        {/* Botões Navegação na Imagem Principal */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/75 hover:bg-black text-white rounded-full backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 shadow-md flex items-center justify-center cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6 text-[#F59C00]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/75 hover:bg-black text-white rounded-full backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 shadow-md flex items-center justify-center cursor-pointer"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6 text-[#F59C00]" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas em Carrossel */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 w-24 sm:w-28 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-black ${
                activeIndex === idx
                  ? 'border-[#F59C00] shadow-md shadow-[#F59C00]/30 scale-105'
                  : 'border-[#E0E0E0] opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={`Miniatura ${idx + 1}`}
                width={120}
                height={90}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => handleVehicleImageError(e, FALLBACK_VEHICLE_IMAGES.default)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox / Modal em Tela Cheia */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between text-white pb-4 border-b border-[#2E2E2E]">
            <div>
              <h3 className="font-display font-bold text-xl uppercase tracking-wide">
                {vehicleTitle}
              </h3>
              <span className="text-xs text-[#B3B3B3]">
                Foto {activeIndex + 1} de {galleryImages.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-3 text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-full border border-[#2E2E2E] cursor-pointer"
              aria-label="Fechar galeria"
            >
              <X className="w-6 h-6 text-[#F59C00]" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-4">
            <img
              src={currentImage.url}
              alt={`${vehicleTitle} - Ampliada`}
              referrerPolicy="no-referrer"
              onError={(e) => handleVehicleImageError(e, FALLBACK_VEHICLE_IMAGES.default)}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-6 w-14 h-14 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center border border-[#2E2E2E] cursor-pointer"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-8 h-8 text-[#F59C00]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-6 w-14 h-14 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center border border-[#2E2E2E] cursor-pointer"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="w-8 h-8 text-[#F59C00]" />
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {galleryImages.map((img, idx) => (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`w-16 sm:w-20 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeIndex === idx ? 'border-[#F59C00]' : 'border-[#2E2E2E] opacity-40'
                }`}
              >
                <img
                  src={img.url}
                  alt=""
                  referrerPolicy="no-referrer"
                  onError={(e) => handleVehicleImageError(e, FALLBACK_VEHICLE_IMAGES.default)}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

