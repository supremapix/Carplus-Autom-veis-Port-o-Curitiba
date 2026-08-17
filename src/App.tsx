import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';

import { Home } from './pages/Home';
import { Estoque } from './pages/Estoque';
import { Veiculo } from './pages/Veiculo';
import { VendaSeuCarro } from './pages/VendaSeuCarro';
import { Financiamento } from './pages/Financiamento';
import { Consignacao } from './pages/Consignacao';
import { Empresa } from './pages/Empresa';
import { Contato } from './pages/Contato';
import { PoliticaPrivacidade } from './pages/PoliticaPrivacidade';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#F59C00] selection:text-black">
        {/* Barra Superior com Contato e Horários */}
        <TopBar />

        {/* Cabeçalho Fixo com Logotipo Oficial Carplus Autos */}
        <Header />

        {/* Conteúdo Principal */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/estoque/:slug" element={<Veiculo />} />
            <Route path="/venda-seu-carro" element={<VendaSeuCarro />} />
            <Route path="/financiamento" element={<Financiamento />} />
            <Route path="/consignacao" element={<Consignacao />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Rodapé com Links Institucionais e Crédito Suprema */}
        <Footer />

        {/* Botão Flutuante de Atendimento WhatsApp */}
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  );
}
