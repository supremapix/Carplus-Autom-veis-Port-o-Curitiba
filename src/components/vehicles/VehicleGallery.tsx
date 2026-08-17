import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Camera } from 'lucide-react';
import { VehicleImage } from '../../types/vehicle';

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

  const fallbackImage = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200';
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

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div
        className={`relative aspect-[16/10] sm:aspect-[16/9] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-lg shadow-slate-900/5 group cursor-pointer ${
          isSold ? 'grayscale-[50%]' : ''
        }`}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={currentImage.url}
          alt={`${vehicleTitle} - Foto ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-102"
        />

        {/* Badges de Status */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isSold && (
            <span className="bg-slate-800 text-white font-display font-bold text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              VEÍCULO VENDIDO
            </span>
          )}
          {isReserved && (
            <span className="bg-amber-500 text-black font-display font-bold text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              RESERVADO
            </span>
          )}
        </div>

        {/* Contador de Fotos */}
        <div className="absolute bottom-4 right-4 bg-slate-950/75 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-md">
          <Camera className="w-3.5 h-3.5 text-[#F59C00]" />
          <span>
            {activeIndex + 1} / {galleryImages.length}
          </span>
        </div>

        {/* Botão Ampliar */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2 bg-slate-950/60 hover:bg-slate-950/90 text-white rounded-xl backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 shadow-md"
          title="Ver fotos em tela cheia"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Botões Navegação na Imagem Principal */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-950/60 hover:bg-slate-950/90 text-white rounded-xl backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-950/60 hover:bg-slate-950/90 text-white rounded-xl backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas em Carrossel */}
      {galleryImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {galleryImages.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'border-[#F59C00] shadow-md shadow-amber-500/20 scale-105'
                  : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox / Modal em Tela Cheia */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6">
          <div className="flex items-center justify-between text-white pb-3 border-b border-neutral-800">
            <div>
              <h3 className="font-display font-bold text-lg uppercase tracking-wide">
                {vehicleTitle}
              </h3>
              <span className="text-xs text-neutral-400">
                Foto {activeIndex + 1} de {galleryImages.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-4">
            <img
              src={currentImage.url}
              alt={`${vehicleTitle} - Ampliada`}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-6 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-2xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-6 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-2xl"
                >
                  <ChevronRight className="w-6 h-6" />
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
                className={`w-14 sm:w-16 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                  activeIndex === idx ? 'border-[#F59C00]' : 'border-neutral-800 opacity-40'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
