import { MOCK_SELLERS } from '../data/mock/sellers.mock';
import { Seller } from '../types/seller';

let localSellers: Seller[] = [...MOCK_SELLERS];

export async function getSellers(): Promise<Seller[]> {
  await new Promise(resolve => setTimeout(resolve, 40));
  return [...localSellers];
}

export async function getSellerById(id?: string): Promise<Seller | null> {
  if (!id) return null;
  return localSellers.find(s => s.id === id) || null;
}

export async function createSeller(payload: Omit<Seller, 'id'>): Promise<Seller> {
  const newSeller: Seller = {
    ...payload,
    id: `seller-${Date.now()}`,
  };
  localSellers.push(newSeller);
  return newSeller;
}

export async function updateSeller(id: string, payload: Partial<Seller>): Promise<Seller> {
  const index = localSellers.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Vendedor não encontrado');
  localSellers[index] = { ...localSellers[index], ...payload };
  return localSellers[index];
}

export async function deleteSeller(id: string): Promise<boolean> {
  localSellers = localSellers.filter(s => s.id !== id);
  return true;
}
