export interface BrandItem {
  name: string;
  logo: string;
}

export const CAR_BRANDS: BrandItem[] = [
  {
    name: 'Audi',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/AUDI_450x.png?v=1756475413',
  },
  {
    name: 'BMW',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/BMW-png_450x.webp?v=1756475604',
  },
  {
    name: 'BYD',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/BYD_450x.png?v=1756475201',
  },
  {
    name: 'Chery',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/13_450x.png?v=1756475026',
  },
  {
    name: 'Chevrolet',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/pngwing.com_450x.png?v=1756251450',
  },
  {
    name: 'Citroën',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Citroen-1-80_450x.jpg?v=1756475862',
  },
  {
    name: 'Fiat',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Fiat-80_450x.jpg?v=1756476093',
  },
  {
    name: 'Ford',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Ford-1-80_450x.webp?v=1756476222',
  },
  {
    name: 'GWM',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/GWM_450x.png?v=1756476439',
  },
  {
    name: 'Honda',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Honda-80_450x.jpg?v=1756476585',
  },
  {
    name: 'Hyundai',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Hyundai-80_450x.jpg?v=1756476868',
  },
  {
    name: 'Jaguar',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/JAGUAR_450x.png?v=1756477266',
  },
  {
    name: 'Jeep',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/JEEP_450x.png?v=1756477389',
  },
  {
    name: 'Kia',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/KIA_450x.png?v=1756477547',
  },
  {
    name: 'Land Rover',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/LAND_ROVER_450x.png?v=1756477671',
  },
  {
    name: 'Mercedes-Benz',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/MERCEDES-BENZ_450x.png?v=1756477831',
  },
  {
    name: 'Mini',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/MINI_450x.png?v=1756477940',
  },
  {
    name: 'Mitsubishi',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/MITSUBISHI_450x.png?v=1756483312',
  },
  {
    name: 'Nissan',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Nissan-80_450x.jpg?v=1756478205',
  },
  {
    name: 'Peugeot',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/peugeot-dois-80_450x.jpg?v=1756478443',
  },
  {
    name: 'RAM',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/RAM_450x.png?v=1756478532',
  },
  {
    name: 'Renault',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Renaut-dois-80_450x.jpg?v=1756178730',
  },
  {
    name: 'Suzuki',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/SUZUKI_450x.png?v=1756478657',
  },
  {
    name: 'Toyota',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Toyota-80-jpg_450x.webp?v=1756478765',
  },
  {
    name: 'Volkswagen',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/Volksvaguen-80_450x.jpg?v=1756178743',
  },
  {
    name: 'Volvo',
    logo: 'https://www.maiscar.com.br/cdn/shop/collections/VOLVO_450x.png?v=1756478884',
  },
];

export function getBrandLogo(brandName: string): string | undefined {
  if (!brandName) return undefined;
  const normalized = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const found = CAR_BRANDS.find(
    (b) => b.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized
  );
  return found?.logo;
}
