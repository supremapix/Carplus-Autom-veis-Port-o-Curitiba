export const LOCAL_VEHICLE_IMAGE_COUNT: Record<string, number> = {
  "renault-kardian-iconic-1-0-turbo-automatico-2026": 10,
  "toyota-hilux-sw4-srx-4x4-2-8-diesel-automatico-2021": 13,
  "toyota-corolla-cross-xrx-1-8-hibrido-automatico-2025": 16,
  "hyundai-hb20-limited-1-0-flex-manual-2026": 20,
  "ford-edge-titanium-3-5-v6-awd-automatico-2016": 12
};

export const IMAGE_BASE_OLD = 'https://img.carplusautos.com.br/auto';
export const IMAGE_BASE_NEW = 'https://img.supremasite.com.br/auto';

export const VEHICLE_IMAGE_COUNT: Record<string, number> = {
  ...LOCAL_VEHICLE_IMAGE_COUNT,
  "toyota-hilux-sw4-srx-platinum-4x4-2-8-diesel-2024": 14,
  "land-rover-discovery-sport-se-2-0-4x4-diesel-2023": 19,
  "bmw-x3-xdrive-20i-x-line-2017": 14,
  "citroen-c4-lounge-origine-1-6-turbo-flex-automatico-2017": 11,
  "citroen-aircross-feel-1-6-flex-automatico-2017": 18,
  "ford-focus-sedan-2-0-16v-flex-automatico-2012": 18,
  "nissan-sentra-s-2-0-flex-automatico-2011": 16,
  "peugeot-408-griffe-2-0-16v-flex-automatico-2012": 20,
  "volkswagen-fox-connect-1-6-8v-flex-manual-2019": 12,
  "hyundai-creta-prestige-2-0-16v-flex-automatico-2018": 15,
  "toyota-rav4-2-0-16v-4x4-automatico-2014": 11,
  "bmw-220i-active-tourer-2-0-turbo-flex-automatico-2018": 11
};

export const NEW_VEHICLES = [
  "volkswagen-fox-connect-1-6-8v-flex-manual-2019",
  "hyundai-creta-prestige-2-0-16v-flex-automatico-2018",
  "toyota-rav4-2-0-16v-4x4-automatico-2014",
  "bmw-220i-active-tourer-2-0-turbo-flex-automatico-2018"
];

export const getVehicleImageUrl = (slug: string, index: number) => {
  if (LOCAL_VEHICLE_IMAGE_COUNT[slug]) return `/images/vehicles/${slug}/${String(index + 1).padStart(2, '0')}.webp`;
  const base = NEW_VEHICLES.includes(slug) ? IMAGE_BASE_NEW : IMAGE_BASE_OLD;
  return `${base}/${slug}/${String(index + 1).padStart(2, '0')}.jpg`;
};
