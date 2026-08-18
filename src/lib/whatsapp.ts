export const CARPLUS_PHONE = '5541988740258';
export const CARPLUS_PHONE_DISPLAY = '(41) 98874-0258';

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${CARPLUS_PHONE}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function buildVehicleWhatsAppMessage(vehicle: {
  brand: string;
  model: string;
  version: string;
  yearModel: number;
  slug: string;
}): string {
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/estoque/${vehicle.slug}`
    : `https://www.carplusautos.com.br/estoque/${vehicle.slug}`;
    
  return `Olá! Vi no site da Carplus Autos o ${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearModel} e gostaria de mais informações.\n\nLink: ${currentUrl}`;
}
