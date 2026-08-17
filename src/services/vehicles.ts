import { MOCK_VEHICLES } from '../data/mock/vehicles.mock';
import { VehicleFiltersState, VehicleSortOption } from '../types/filters';
import { Vehicle, VehicleStatus } from '../types/vehicle';
import { slugify } from '../lib/utils';

// Persistent in-memory state for mock development (ETAPA 1).
// Em ETAPA 2, essas funções executarão queries no Supabase Database.
let localVehicles: Vehicle[] = [...MOCK_VEHICLES];

export async function getVehicles(
  filters?: VehicleFiltersState,
  sort: VehicleSortOption = 'recent'
): Promise<Vehicle[]> {
  // Simulate network delay slightly for smooth realistic UX
  await new Promise((resolve) => setTimeout(resolve, 60));

  let result = [...localVehicles];

  if (filters) {
    if (filters.brand) {
      result = result.filter(v => v.brand.toLowerCase() === filters.brand?.toLowerCase());
    }
    if (filters.model) {
      result = result.filter(v => v.model.toLowerCase() === filters.model?.toLowerCase());
    }
    if (filters.minPrice) {
      result = result.filter(v => v.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      result = result.filter(v => v.price <= filters.maxPrice!);
    }
    if (filters.minYear) {
      result = result.filter(v => v.yearModel >= filters.minYear!);
    }
    if (filters.maxYear) {
      result = result.filter(v => v.yearModel <= filters.maxYear!);
    }
    if (filters.maxMileage) {
      result = result.filter(v => v.mileage <= filters.maxMileage!);
    }
    if (filters.fuel) {
      result = result.filter(v => v.fuel === filters.fuel);
    }
    if (filters.transmission) {
      result = result.filter(v => v.transmission === filters.transmission);
    }
    if (filters.bodyType) {
      result = result.filter(v => v.bodyType === filters.bodyType);
    }
    if (filters.color) {
      result = result.filter(v => v.color.toLowerCase().includes(filters.color!.toLowerCase()));
    }
    if (filters.status) {
      result = result.filter(v => v.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(v => 
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.version.toLowerCase().includes(q) ||
        v.yearModel.toString().includes(q)
      );
    }
  }

  // Sorting
  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'year-desc':
      result.sort((a, b) => b.yearModel - a.yearModel);
      break;
    case 'mileage-asc':
      result.sort((a, b) => a.mileage - b.mileage);
      break;
    case 'recent':
    default:
      result.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      break;
  }

  return result;
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const found = localVehicles.find(v => v.slug === slug);
  if (found) {
    found.views += 1;
  }
  return found || null;
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return localVehicles.filter(v => v.featured && v.status === 'disponivel');
}

export async function getRelatedVehicles(vehicleId: string): Promise<Vehicle[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const current = localVehicles.find(v => v.id === vehicleId);
  if (!current) return localVehicles.slice(0, 4);

  // Match same brand > price range +- 20% > same bodyType
  const others = localVehicles.filter(v => v.id !== vehicleId && v.status === 'disponivel');
  
  const sameBrand = others.filter(v => v.brand === current.brand);
  const sameBody = others.filter(v => v.bodyType === current.bodyType && !sameBrand.includes(v));
  const rest = others.filter(v => !sameBrand.includes(v) && !sameBody.includes(v));

  return [...sameBrand, ...sameBody, ...rest].slice(0, 4);
}

export async function getBrands(): Promise<string[]> {
  const brands = Array.from(new Set(localVehicles.map(v => v.brand))).sort();
  return brands;
}

export async function getModelsByBrand(brand?: string): Promise<string[]> {
  if (!brand) return [];
  const models = Array.from(
    new Set(localVehicles.filter(v => v.brand.toLowerCase() === brand.toLowerCase()).map(v => v.model))
  ).sort();
  return models;
}

export async function createVehicle(payload: Partial<Vehicle>): Promise<Vehicle> {
  const newSlug = slugify(`${payload.brand}-${payload.model}-${payload.version || ''}-${payload.yearModel || ''}`);
  const newVehicle: Vehicle = {
    id: `veh-${Date.now()}`,
    slug: newSlug,
    brand: payload.brand || 'Marca',
    model: payload.model || 'Modelo',
    version: payload.version || '',
    yearManufacture: payload.yearManufacture || new Date().getFullYear(),
    yearModel: payload.yearModel || new Date().getFullYear(),
    price: payload.price || 0,
    mileage: payload.mileage || 0,
    fuel: payload.fuel || 'flex',
    transmission: payload.transmission || 'automatico',
    color: payload.color || 'Branco',
    bodyType: payload.bodyType || 'sedan',
    doors: payload.doors || 4,
    plateEnd: payload.plateEnd || '',
    description: payload.description || '',
    features: payload.features || [],
    images: payload.images && payload.images.length > 0 ? payload.images : [
      {
        id: `img-${Date.now()}`,
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200',
        alt: `${payload.brand} ${payload.model}`,
        order: 1,
        isCover: true,
      }
    ],
    status: payload.status || 'disponivel',
    featured: payload.featured || false,
    sellerId: payload.sellerId || 'seller-1',
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  localVehicles = [newVehicle, ...localVehicles];
  return newVehicle;
}

export async function updateVehicle(id: string, payload: Partial<Vehicle>): Promise<Vehicle> {
  const index = localVehicles.findIndex(v => v.id === id);
  if (index === -1) throw new Error('Veículo não encontrado');

  const updated: Vehicle = {
    ...localVehicles[index],
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  if (payload.brand || payload.model || payload.version || payload.yearModel) {
    updated.slug = slugify(`${updated.brand}-${updated.model}-${updated.version}-${updated.yearModel}`);
  }

  localVehicles[index] = updated;
  return updated;
}

export async function deleteVehicle(id: string): Promise<boolean> {
  localVehicles = localVehicles.filter(v => v.id !== id);
  return true;
}

export async function updateVehicleStatus(id: string, status: VehicleStatus): Promise<Vehicle> {
  return updateVehicle(id, {
    status,
    soldAt: status === 'vendido' ? new Date().toISOString() : undefined,
  });
}
