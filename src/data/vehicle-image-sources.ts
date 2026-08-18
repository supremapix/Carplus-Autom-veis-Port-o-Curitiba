export const IMAGE_BASE = 'https://img.supremasite.com.br/auto';

export const VEHICLE_IMAGE_COUNT: Record<string, number> = {
  "toyota-hilux-sw4-srx-platinum-4x4-2-8-diesel-2024": 14,
  "land-rover-discovery-sport-se-2-0-4x4-diesel-2023": 19,
  "bmw-x3-xdrive-20i-x-line-2017": 14,
  "nissan-sentra-s-2-0-flex-automatico-2011": 16,
  "ford-focus-sedan-2-0-16v-flex-automatico-2012": 18
};

export const getVehicleImageUrl = (slug: string, index: number, size?: 400 | 800 | 1600) =>
  `${IMAGE_BASE}/${slug}/${String(index + 1).padStart(2, '0')}${size ? `-${size}.webp` : '.jpg'}`;
