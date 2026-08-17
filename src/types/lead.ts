export type LeadStatus = 'novo' | 'em_atendimento' | 'negociacao' | 'vendido' | 'perdido';
export type LeadSource = 'google' | 'google_ads' | 'google_maps' | 'instagram' | 'facebook' | 'whatsapp' | 'direto' | 'consignacao' | 'outro';

export interface LeadUtm {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
  vehicleId?: string;
  vehicleName?: string;
  message?: string;
  hasTradeIn: boolean;
  source: LeadSource;
  utm?: LeadUtm;
  status: LeadStatus;
  notes: LeadNote[];
  createdAt: string;
}

export interface FinancingRequestPayload {
  name: string;
  whatsapp: string;
  email?: string;
  cpf?: string;
  birthDate?: string;
  hasCnh?: boolean;
  hasTradeIn?: boolean;
  vehicleId?: string;
  vehicleSlug?: string;
  vehicleName?: string;
  downPayment?: number;
  installments: number; // 12, 24, 36, 48, 60
  lgpdAccepted: boolean;
}

export interface TradeInRequestPayload {
  name: string;
  whatsapp: string;
  targetVehicleId?: string;
  targetVehicleName?: string;
  tradeBrand: string;
  tradeModel: string;
  tradeVersion: string;
  tradeYear: number;
  tradeMileage: number;
  tradeColor: string;
  expectedPrice?: number;
  notes?: string;
  images?: string[];
  lgpdAccepted: boolean;
}

export interface SellRequestPayload {
  name: string;
  whatsapp: string;
  email?: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  color: string;
  expectedPrice?: number;
  notes?: string;
  images?: string[];
  source?: 'venda' | 'consignacao';
  lgpdAccepted: boolean;
}
