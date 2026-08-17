import { BodyType, Fuel, Transmission } from './vehicle';

export type VehicleSortOption = 
  | 'price-asc' 
  | 'price-desc' 
  | 'year-desc' 
  | 'mileage-asc' 
  | 'recent';

export interface VehicleFiltersState {
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  maxMileage?: number;
  fuel?: Fuel;
  transmission?: Transmission;
  bodyType?: BodyType;
  color?: string;
  search?: string;
  status?: string;
}
