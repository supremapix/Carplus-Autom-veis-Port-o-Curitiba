import { Vehicle } from '../types/vehicle';

export function buildVehicleTitle(vehicle: Vehicle): string {
  if (vehicle.metaTitle) {
    return vehicle.metaTitle;
  }
  // Extract main version keywords if too long (e.g. "SRX Platinum" from "SRX Platinum 4x4 2.8 Turbo Diesel Aut. 7 lugares")
  const primaryVersion = vehicle.version.split(' 4x4')[0] || vehicle.version;
  return `${vehicle.brand} ${vehicle.model} ${primaryVersion} ${vehicle.yearModel} à Venda em Curitiba | Carplus Autos`;
}

export function buildVehicleDescription(vehicle: Vehicle): string {
  if (vehicle.metaDescription) {
    return vehicle.metaDescription;
  }
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
        '@id': 'https://www.carplusautos.com.br/#autodealer',
        'name': 'Carplus Autos',
        'telephone': '+55-41-98874-0258',
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

export function buildItemListJsonLd(vehicles: Vehicle[], originUrl = 'https://www.carplusautos.com.br') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'numberOfItems': vehicles.length,
    'itemListElement': vehicles.map((v, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `${originUrl}/estoque/${v.slug}`,
      'name': `${v.brand} ${v.model} ${v.version} ${v.yearModel}`,
    })),
  };
}

export function buildGlobalDealerJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.carplusautos.com.br/#organization',
        'name': 'Carplus Autos',
        'url': 'https://www.carplusautos.com.br',
        'logo': 'https://img.carplusautos.com.br/carplus-autos-logo.png',
        'telephone': '+55-41-98874-0258',
        'sameAs': [
          'https://www.instagram.com/carpluscwb/',
          'https://www.carpluspneuseoficina.com.br',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.carplusautos.com.br/#website',
        'url': 'https://www.carplusautos.com.br',
        'name': 'Carplus Autos Curitiba',
        'description': 'Compra, Venda, Troca e Financiamento de Veículos Seminovos em Curitiba.',
        'publisher': {
          '@id': 'https://www.carplusautos.com.br/#organization',
        },
      },
      {
        '@type': 'AutoDealer',
        '@id': 'https://www.carplusautos.com.br/#autodealer',
        'name': 'Carplus Autos',
        'image': 'https://img.carplusautos.com.br/carplus-autos-logo.png',
        'url': 'https://www.carplusautos.com.br',
        'telephone': '+55-41-98874-0258',
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
          'latitude': -25.477,
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
      },
    ],
  };
}

export function buildFaqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a,
      },
    })),
  };
}
