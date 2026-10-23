import assert from 'node:assert/strict';
import { MOCK_VEHICLES } from '../src/data/mock/vehicles.mock';
import { getVehicles, getHomeInventory } from '../src/services/vehicles';
import { buildVehicleJsonLd, buildVehicleTitle } from '../src/lib/seo';
const matches = MOCK_VEHICLES.filter(v => /\bc4\b/i.test(v.model));
assert.equal(matches.length, 1);
const c4 = matches[0];
assert.equal(c4.status, 'vendido');
assert.equal(c4.yearModel, 2017);
assert.ok(c4.images.length > 0);
assert.equal((await getVehicles()).length, 11);
assert.equal((await getVehicles({status:'vendido'})).length, 6);
assert.equal((await getVehicles({search:'C4'})).length, 0);
assert.equal((await getVehicles({status:'vendido',search:'C4'}))[0].id, c4.id);
const home = await getHomeInventory();
assert.equal(home.totalCount, 11);
assert.equal(home.vehicles.length, 8);
assert.ok(!home.vehicles.some(v => v.id === c4.id));
for (const sold of MOCK_VEHICLES.filter(v => v.status === 'vendido')) {
  assert.equal(buildVehicleJsonLd(sold).offers, undefined);
  assert.match(buildVehicleTitle(sold), /Vendido/);
}
console.log('PASS: unique C4 sold, 11 available / 6 sold, filters, 8 home cards, preserved images and no Offer for sold vehicles.');
