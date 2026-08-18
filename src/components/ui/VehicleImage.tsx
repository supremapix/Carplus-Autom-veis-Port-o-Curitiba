import React, { useState } from 'react';
import { VEHICLE_IMAGE_SOURCES } from '../../data/vehicle-image-sources';

interface VehicleImageProps {
  slug: string;
  imageIndex?: number;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
}

export const VehicleImage: React.FC<VehicleImageProps> = ({
  slug,
  imageIndex = 0,
  alt,
  className = '',
  priority = false,
  width,
  height,
  onClick,
}) => {
  const [errorStage, setErrorStage] = useState<0 | 1 | 2>(0);

  const n = String(imageIndex + 1).padStart(2, '0');
  const localJpg = `/images/veiculos/${slug}/${n}.jpg`;
  const srcset = `/images/veiculos/${slug}/${n}-400.webp 400w, /images/veiculos/${slug}/${n}-800.webp 800w, /images/veiculos/${slug}/${n}-1600.webp 1600w`;
  
  const sources = VEHICLE_IMAGE_SOURCES[slug] || [];
  const olxUrl = sources[imageIndex] || '';

  if (errorStage === 2 || (!localJpg && !olxUrl)) {
    return (
      <div 
        onClick={onClick}
        className={`bg-[#1A1A1A] flex flex-col items-center justify-center text-center p-6 select-none ${className}`}
        style={{ width, height, minHeight: '200px' }}
      >
        <div className="w-16 h-16 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-3">
          <span className="text-orange-500 font-black text-xl tracking-wider">CP</span>
        </div>
        <p className="text-white font-medium text-sm">Carplus Autos</p>
        <p className="text-gray-400 text-xs mt-1">Foto em breve</p>
      </div>
    );
  }

  const currentSrc = errorStage === 0 ? localJpg : olxUrl;

  return (
    <img
      src={currentSrc}
      srcSet={errorStage === 0 ? srcset : undefined}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      width={width}
      height={height}
      onClick={onClick}
      referrerPolicy="no-referrer"
      onError={() => {
        if (errorStage === 0 && olxUrl) {
          setErrorStage(1);
        } else {
          setErrorStage(2);
        }
      }}
    />
  );
};
