export type VehicleStatus = 'disponivel' | 'reservado' | 'vendido';
export type Fuel = 'flex' | 'gasolina' | 'etanol' | 'diesel' | 'hibrido' | 'eletrico' | 'gnv';
export type Transmission = 'manual' | 'automatico' | 'cvt' | 'automatizado';
export type BodyType = 'hatch' | 'sedan' | 'suv' | 'picape' | 'utilitario' | 'minivan' | 'coupe' | 'conversivel';

export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  isCover: boolean;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version: string;
  yearManufacture: number;
  yearModel: number;
  price: number;
  previousPrice?: number | null;
  mileage: number;
  fuel: Fuel;
  fuelLabel?: string;
  transmission: Transmission;
  steering?: string;
  color: string;
  bodyType?: BodyType;
  doors?: number;
  seats?: number;
  plateEnd?: string | null;
  description?: string;
  features: string[];
  differentials?: string[];
  additionalInfo?: string[];
  images: VehicleImage[];
  status: VehicleStatus;
  featured: boolean;
  acceptsTrade?: boolean;
  sourceUrl?: string;
  sellerId?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  soldAt?: string;
}
