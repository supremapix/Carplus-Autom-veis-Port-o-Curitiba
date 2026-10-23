import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MOCK_VEHICLES } from '../src/data/mock/vehicles.mock';
import { buildVehicleTitle, buildVehicleDescription, buildVehicleJsonLd } from '../src/lib/seo';
import { buildWhatsAppLink } from '../src/lib/whatsapp';

for (const vehicle of MOCK_VEHICLES) {
  const schema = buildVehicleJsonLd(vehicle);
  assert.equal(schema.mileageFromOdometer.value, vehicle.mileage);
  if (vehicle.status === 'vendido') assert.equal(schema.offers, undefined);
  else assert.equal(schema.offers!.price, vehicle.price);
  if (vehicle.status === 'vendido') {
    assert.match(buildVehicleTitle(vehicle), /Vendido/);
    assert.match(buildVehicleDescription(vehicle), /vendido/);
    assert.doesNotMatch(buildVehicleDescription(vehicle), /disponível/);
  }
}
const message = 'Teste: avaliação & troca, sem envio automático.';
const link = new URL(buildWhatsAppLink(message));
assert.equal(link.pathname, '/5541988740258');
assert.equal(link.searchParams.get('text'), message);
for (const path of ['src/components/home/HomeFAQ.tsx', 'src/components/home/WhyCarplus.tsx', 'src/pages/Empresa.tsx']) {
  assert.doesNotMatch(readFileSync(path, 'utf8'), /100% aprovado|sem qualquer passagem|garantia legal de 3 meses/);
}
console.log('PASS: status-aware metadata, unchanged factual schema, official WhatsApp encoding and no conflicting universal guarantees.');
