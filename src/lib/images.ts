// Utilitários de Imagem & Fallbacks Resilientes para Carplus Autos

export const FALLBACK_VEHICLE_IMAGES = {
  suv: '',
  sedan: '',
  hatch: '',
  pickup: '',
  default: '',
};

export const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400';

export function getVehicleImageUrl(url?: string, _bodyType?: string): string {
  if (!url) {
    return '';
  }
  return url;
}

export function handleVehicleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>
) {
  const target = e.currentTarget;
  if (target.dataset.hasFallback) {
    return;
  }
  target.dataset.hasFallback = 'true';
  target.style.display = 'none';
}
