export const IMAGE_BASE = 'https://img.carplusautos.com.br/auto';

export const VEHICLE_IMAGE_COUNT: Record<string, number> = {
  "toyota-hilux-sw4-srx-platinum-4x4-2-8-diesel-2024": 14,
  "land-rover-discovery-sport-se-2-0-4x4-diesel-2023": 19,
  "bmw-x3-xdrive-20i-x-line-2017": 14,
  "citroen-c4-lounge-origine-1-6-turbo-flex-automatico-2017": 11,
  "citroen-aircross-feel-1-6-flex-automatico-2017": 18,
  "ford-focus-sedan-2-0-16v-flex-automatico-2012": 18,
  "nissan-sentra-s-2-0-flex-automatico-2011": 16
};

export const getVehicleImageUrl = (slug: string, index: number) =>
  `${IMAGE_BASE}/${slug}/${String(index + 1).padStart(2, '0')}.jpg`;
