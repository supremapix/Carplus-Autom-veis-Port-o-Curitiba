// Utilitários de Imagem & Fallbacks Resilientes para a Carplus Autos
import type React from 'react';

export const FALLBACK_VEHICLE_IMAGES = {
  suv: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1200',
  sedan: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
  hatch: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200',
  pickup: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
  default: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
};

export const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400';

/**
 * Retorna uma URL segura para o veículo, garantindo que o caminho exista e seja limpo
 */
export function getVehicleImageUrl(url?: string, bodyType?: string): string {
  if (!url) {
    return FALLBACK_VEHICLE_IMAGES[bodyType as keyof typeof FALLBACK_VEHICLE_IMAGES] || FALLBACK_VEHICLE_IMAGES.default;
  }
  return url;
}

/**
 * Handler de erro para elementos <img>, evitando imagens quebradas
 */
export function handleVehicleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl?: string
) {
  const target = e.currentTarget;
  if (target.dataset.hasFallback) {
    // Se o fallback já falhou, para para evitar loop infinito
    return;
  }
  target.dataset.hasFallback = 'true';
  target.src = fallbackUrl || FALLBACK_VEHICLE_IMAGES.default;
}
