import type { Vehicle } from '../types/vehicle';

export const HOME_VEHICLE_LIMIT = 8;

function recordedTime(value?: string): number {
  const time = Date.parse(value || '');
  return Number.isFinite(time) ? time : 0;
}

// Use recorded dates only. Missing dates sort last; IDs/slugs break ties.
export function selectHomeInventory(inventory: readonly Vehicle[]) {
  const sorted = [...inventory].sort((a, b) => {
    const latest = (v: Vehicle) => Math.max(recordedTime(v.updatedAt), recordedTime(v.createdAt));
    return latest(b) - latest(a)
      || recordedTime(b.createdAt) - recordedTime(a.createdAt)
      || a.id.localeCompare(b.id)
      || a.slug.localeCompare(b.slug);
  });
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const available = sorted.filter(vehicle => {
    if (ids.has(vehicle.id) || slugs.has(vehicle.slug)) return false;
    ids.add(vehicle.id);
    slugs.add(vehicle.slug);
    return vehicle.status === 'disponivel';
  });
  return { vehicles: available.slice(0, HOME_VEHICLE_LIMIT), totalCount: available.length };
}
