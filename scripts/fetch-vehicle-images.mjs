import { VEHICLE_IMAGE_COUNT } from '../src/data/vehicle-image-sources.ts';

async function main() {
  console.log('Carplus Autos: Usando CDN oficial em https://img.supremasite.com.br/auto');
  console.log(`Total de veículos mapeados: ${Object.keys(VEHICLE_IMAGE_COUNT).length}`);
}

main().catch(console.error);
