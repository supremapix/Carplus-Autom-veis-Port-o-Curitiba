export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat('pt-BR').format(km)} km`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .trim()
    .replace(/\s+/g, '-') // spaces to hyphens
    .replace(/-+/g, '-'); // collapse hyphens
}

export function getUtmFromUrl(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    const val = params.get(key);
    if (val) {
      utm[key.replace('utm_', '')] = val;
    }
  });

  // Store in sessionStorage for attribution
  if (Object.keys(utm).length > 0) {
    try {
      sessionStorage.setItem('carplus_utm', JSON.stringify(utm));
    } catch {}
  } else {
    try {
      const saved = sessionStorage.getItem('carplus_utm');
      if (saved) return JSON.parse(saved);
    } catch {}
  }

  return utm;
}
