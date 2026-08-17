import {
  FinancingRequestPayload,
  Lead,
  LeadStatus,
  SellRequestPayload,
  TradeInRequestPayload
} from '../types/lead';
import { getUtmFromUrl } from '../lib/utils';

// Mock in-memory database for leads in ETAPA 1
let localLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rodrigo Guimarães',
    whatsapp: '41998765432',
    email: 'rodrigo@gmail.com',
    vehicleId: 'veh-1',
    vehicleName: 'Toyota Corolla XEi 2.0 2022',
    message: 'Gostaria de saber se aceitam Onix 2020 como parte do pagamento.',
    hasTradeIn: true,
    source: 'google',
    status: 'novo',
    notes: [
      {
        id: 'note-1',
        text: 'Cliente demonstrou alto interesse para visita no sábado.',
        createdAt: '2026-08-16T14:20:00Z',
        author: 'Carlos Henrique',
      },
    ],
    createdAt: '2026-08-16T14:00:00Z',
  },
  {
    id: 'lead-2',
    name: 'Ana Paula Ferreira',
    whatsapp: '41988112233',
    email: 'anapaula@outlook.com',
    vehicleId: 'veh-2',
    vehicleName: 'Jeep Compass Limited 1.3 Turbo 2023',
    message: 'Solicitação de simulação de financiamento (entrada R$ 50.000, 48x).',
    hasTradeIn: false,
    source: 'instagram',
    status: 'em_atendimento',
    notes: [],
    createdAt: '2026-08-15T10:30:00Z',
  },
  {
    id: 'lead-3',
    name: 'Marcos Vinicius',
    whatsapp: '41977665544',
    email: 'marcosv@hotmail.com',
    vehicleName: 'Avaliação de HB20 2019',
    message: 'Venda direta: Hyundai HB20 1.0 2019 com 55.000 km.',
    hasTradeIn: false,
    source: 'direto',
    status: 'negociacao',
    notes: [],
    createdAt: '2026-08-14T16:45:00Z',
  },
];

export async function getLeads(): Promise<Lead[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return [...localLeads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createLead(payload: {
  name: string;
  whatsapp: string;
  email?: string;
  vehicleId?: string;
  vehicleName?: string;
  message?: string;
  hasTradeIn?: boolean;
  source?: string;
}): Promise<Lead> {
  await new Promise(resolve => setTimeout(resolve, 100));

  const utm = getUtmFromUrl();
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name: payload.name,
    whatsapp: payload.whatsapp,
    email: payload.email,
    vehicleId: payload.vehicleId,
    vehicleName: payload.vehicleName,
    message: payload.message,
    hasTradeIn: !!payload.hasTradeIn,
    source: (payload.source as any) || 'direto',
    utm,
    status: 'novo',
    notes: [],
    createdAt: new Date().toISOString(),
  };

  localLeads = [newLead, ...localLeads];
  return newLead;
}

export async function createFinancingRequest(payload: FinancingRequestPayload): Promise<Lead> {
  const downPaymentFormatted = payload.downPayment ? ` com entrada de R$ ${payload.downPayment}` : '';
  const message = `Solicitação de simulação de financiamento em ${payload.installments}x${downPaymentFormatted} para o veículo ${payload.vehicleName || payload.vehicleSlug || 'não especificado'}.`;

  return createLead({
    name: payload.name,
    whatsapp: payload.whatsapp,
    email: payload.email,
    vehicleId: payload.vehicleId,
    vehicleName: payload.vehicleName,
    message,
    source: 'direto',
  });
}

export async function createTradeInRequest(payload: TradeInRequestPayload): Promise<Lead> {
  const message = `Proposta de troca: Usado ${payload.tradeBrand} ${payload.tradeModel} ${payload.tradeVersion} (${payload.tradeYear}, ${payload.tradeMileage} km, cor ${payload.tradeColor}, valor pretendido R$ ${payload.expectedPrice || 'a avaliar'}). Observações: ${payload.notes || 'Nenhuma'}.`;

  return createLead({
    name: payload.name,
    whatsapp: payload.whatsapp,
    vehicleId: payload.targetVehicleId,
    vehicleName: payload.targetVehicleName,
    message,
    hasTradeIn: true,
    source: 'direto',
  });
}

export async function createSellRequest(payload: SellRequestPayload): Promise<Lead> {
  const isConsign = payload.source === 'consignacao';
  const prefix = isConsign ? 'Solicitação de Consignação' : 'Solicitação de Venda de Carro';
  const message = `${prefix}: ${payload.brand} ${payload.model} ${payload.version} (${payload.year}, ${payload.mileage} km, cor ${payload.color}, valor pretendido R$ ${payload.expectedPrice || 'a combinar'}). Obs: ${payload.notes || 'Nenhuma'}`;

  return createLead({
    name: payload.name,
    whatsapp: payload.whatsapp,
    email: payload.email,
    vehicleName: `${payload.brand} ${payload.model} ${payload.year}`,
    message,
    hasTradeIn: false,
    source: isConsign ? 'consignacao' : 'direto',
  });
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
  const lead = localLeads.find(l => l.id === id);
  if (!lead) throw new Error('Lead não encontrado');
  lead.status = status;
  return lead;
}

export async function addLeadNote(id: string, text: string, author: string = 'Administrador'): Promise<Lead> {
  const lead = localLeads.find(l => l.id === id);
  if (!lead) throw new Error('Lead não encontrado');
  lead.notes.push({
    id: `note-${Date.now()}`,
    text,
    createdAt: new Date().toISOString(),
    author,
  });
  return lead;
}
