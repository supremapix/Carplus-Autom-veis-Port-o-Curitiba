import assert from 'node:assert/strict';
import { MOCK_VEHICLES } from '../src/data/mock/vehicles.mock';
import { selectHomeInventory } from '../src/lib/home-inventory';
import { getHomeInventory, createVehicle, updateVehicle, updateVehicleStatus, deleteVehicle } from '../src/services/vehicles';
import { getVehicleImageUrl } from '../src/data/vehicle-image-sources';
import type { Vehicle } from '../src/types/vehicle';

const before = JSON.stringify(MOCK_VEHICLES);
const original = await getHomeInventory();
assert.equal(original.vehicles.length, 8);
assert.equal(original.totalCount, 11);
assert.equal(new Set(original.vehicles.map(v => v.slug)).size, 8);
assert.ok(original.vehicles.every(v => v.status === 'disponivel'));
assert.equal(original.vehicles.filter(v => v.sourceUrl?.includes('olx')).length, 5);
original.vehicles.forEach(v => assert.equal(v.images[0].url, getVehicleImageUrl(v.slug, 0)));

// Isolated process: exercise the real service without writing inventory files.
const added = await createVehicle({ ...MOCK_VEHICLES[0], brand: 'Fixture', model: 'Home test', featured: false });
assert.equal((await getHomeInventory()).vehicles[0].id, added.id);
await updateVehicle(added.id, { price: 12345, images: [{ id: 'fixture-image', url: '/fixture.webp', alt: 'Fixture', order: 1, isCover: true }] });
assert.equal((await getHomeInventory()).vehicles[0].price, 12345);
assert.equal((await getHomeInventory()).vehicles[0].images[0].url, '/fixture.webp');
await updateVehicleStatus(added.id, 'reservado');
assert.ok(!(await getHomeInventory()).vehicles.some(v => v.id === added.id));
await updateVehicleStatus(added.id, 'vendido');
assert.ok(!(await getHomeInventory()).vehicles.some(v => v.id === added.id));
await updateVehicleStatus(added.id, 'disponivel');
assert.equal((await getHomeInventory()).vehicles[0].id, added.id);
await deleteVehicle(added.id);
assert.deepEqual(await getHomeInventory(), original);

const fixture = (id: string, updatedAt: string, extra: Partial<Vehicle> = {}): Vehicle => ({ ...MOCK_VEHICLES[0], id, slug: id, createdAt: '2026-01-01T00:00:00Z', updatedAt, featured: false, ...extra });
const a = fixture('a', '2026-02-01T00:00:00Z');
const b = fixture('b', '2026-03-01T00:00:00Z');
const c = fixture('c', '2026-03-01T00:00:00Z');
assert.deepEqual(selectHomeInventory([a,c,b]).vehicles.map(v=>v.id), ['b','c','a']);
assert.deepEqual(selectHomeInventory([b,a,c]).vehicles.map(v=>v.id), ['b','c','a']);
assert.deepEqual(selectHomeInventory([a,{...a,updatedAt:'2026-04-01T00:00:00Z',status:'vendido'}]).vehicles, []);
assert.equal(selectHomeInventory([a,{...b,slug:'a'}]).vehicles.length, 1);
assert.equal(selectHomeInventory([a,fixture('undated','invalid',{createdAt:''})]).vehicles[0].id,'a');
assert.equal(selectHomeInventory([]).totalCount, 0);
assert.equal(JSON.stringify(MOCK_VEHICLES), before, 'Real inventory must remain unchanged');
console.log('PASS: 8 cards, insertion/update/removal, availability, deterministic date ordering, deduplication, source images and unchanged real inventory.');
