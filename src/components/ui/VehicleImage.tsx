import React, { useState } from 'react';
import { getVehicleImageUrl } from '../../data/vehicle-image-sources';

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
  const [hasError, setHasError] = useState(false);

  const mainSrc = getVehicleImageUrl(slug, imageIndex);

  if (hasError) {
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

  return (
    <img
      src={mainSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      width={width}
      height={height}
      onClick={onClick}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
    />
  );
};
