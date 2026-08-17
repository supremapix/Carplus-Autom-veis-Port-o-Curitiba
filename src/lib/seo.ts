import { Vehicle } from '../types/vehicle';

export function buildVehicleTitle(vehicle: Vehicle): string {
  // Extract main version keywords if too long (e.g. "SRX Platinum" from "SRX Platinum 4x4 2.8 Turbo Diesel Aut. 7 lugares")
  const primaryVersion = vehicle.version.split(' 4x4')[0] || vehicle.version;
  return `${vehicle.brand} ${vehicle.model} ${primaryVersion} ${vehicle.yearModel} à Venda em Curitiba | Carplus Autos`;
}

export function buildVehicleDescription(vehicle: Vehicle): string {
  const parts: string[] = [];
  if (vehicle.seats && vehicle.seats > 5) {
    parts.push(`${vehicle.seats} lugares`);
  }
  if (vehicle.additionalInfo?.includes('Único dono')) {
    parts.push('único dono');
  }
  const extra = parts.length > 0 ? `, ${parts.join(', ')}` : '';
  const desc = `Confira ${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearModel}${extra}, disponível na Carplus Autos em Curitiba. Veja fotos, quilometragem e características.`;
  return desc.slice(0, 160);
}

export function buildVehicleJsonLd(vehicle: Vehicle, originUrl = 'https://www.carplusautos.com.br') {
  const coverImage = vehicle.images.find(img => img.isCover)?.url || vehicle.images[0]?.url;
  const isAvailable = vehicle.status === 'disponivel';

  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    'name': `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearModel}`,
    'description': vehicle.description || buildVehicleDescription(vehicle),
    'image': vehicle.images.map(img => img.url),
    'brand': {
      '@type': 'Brand',
      'name': vehicle.brand,
    },
    'model': vehicle.model,
    'vehicleModelDate': vehicle.yearModel.toString(),
    'productionDate': vehicle.yearManufacture.toString(),
    'mileageFromOdometer': {
      '@type': 'QuantitativeValue',
      'value': vehicle.mileage,
      'unitCode': 'KMT',
    },
    'fuelType': vehicle.fuel,
    'vehicleTransmission': vehicle.transmission,
    'color': vehicle.color,
    'bodyType': vehicle.bodyType || 'Automóvel',
    'numberOfDoors': vehicle.doors || 4,
    'offers': {
      '@type': 'Offer',
      'price': vehicle.price,
      'priceCurrency': 'BRL',
      'itemCondition': 'https://schema.org/UsedCondition',
      'availability': isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      'url': `${originUrl}/estoque/${vehicle.slug}`,
      'seller': {
        '@type': 'AutoDealer',
        'name': 'Carplus Autos',
        'telephone': '+55-41-3082-7282',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Av. Presidente Arthur da Silva Bernardes, 1323',
          'addressLocality': 'Curitiba',
          'addressRegion': 'PR',
          'postalCode': '80320-300',
          'addressCountry': 'BR',
        },
      },
    },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
}

export function buildGlobalDealerJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    'name': 'Carplus Autos',
    'image': 'https://carplus-pixelperfect.lovable.app/__l5e/assets-v1/a327ddc8-0465-4c4f-87d4-97f5f46faf8e/carplus-autos-logo.png',
    'url': 'https://www.carplusautos.com.br',
    'telephone': '+554130827282',
    'priceRange': '$$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Av. Presidente Arthur da Silva Bernardes, 1323',
      'addressLocality': 'Curitiba',
      'addressRegion': 'PR',
      'postalCode': '80320-300',
      'addressCountry': 'BR',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -25.4770,
      'longitude': -49.2845,
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '08:00',
        'closes': '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '08:00',
        'closes': '12:00',
      },
    ],
    'sameAs': [
      'https://www.instagram.com/carpluscwb/',
      'https://www.carpluspneuseoficina.com.br',
    ],
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': 'Curitiba e Região Metropolitana',
    },
  };
}
