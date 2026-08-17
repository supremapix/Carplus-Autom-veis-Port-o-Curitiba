import { Seller } from '../../types/seller';

// MOCK DATA — SUBSTITUIR PELO BANCO DE DADOS (ETAPA 2).
export const MOCK_SELLERS: Seller[] = [
  {
    id: 'seller-1',
    name: 'Carlos Henrique',
    role: 'Consultor de Vendas',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    whatsapp: '554130827282',
    email: 'carlos@carplusautos.com.br',
    slug: 'carlos-henrique',
    active: true,
  },
  {
    id: 'seller-2',
    name: 'Mariana Souza',
    role: 'Especialista em Seminovos',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    whatsapp: '554130827282',
    email: 'mariana@carplusautos.com.br',
    slug: 'mariana-souza',
    active: true,
  },
];
