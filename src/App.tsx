import React, { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { BottomNavMobile } from './components/layout/BottomNavMobile';

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
  const { pathname, hash, search } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        const headerOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        return;
      }
    }

    // Always scroll to top immediately before paint
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    // Shift focus to main heading for screen readers
    const h1 = document.querySelector('h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Skip Link para Acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#F59C00] focus:text-black focus:font-bold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-xl"
      >
        Ir para o conteúdo principal
      </a>

      <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-white text-[#121212] selection:bg-[#F59C00] selection:text-black">
        {/* Barra Superior com Contato e Horários */}
        <TopBar />

        {/* Cabeçalho Fixo com Logotipo Oficial Carplus Autos */}
        <Header />

        {/* Conteúdo Principal com compensação para a barra móvel inferior */}
        <main id="main-content" className="flex-1 w-full max-w-full overflow-x-clip pb-16 lg:pb-0">
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

        {/* Rodapé Institucional Completo */}
        <Footer />

        {/* Barra Inferior Fixa Mobile (3 Ações Imediatas) */}
        <BottomNavMobile />

        {/* Ações Flutuantes (Compartilhamento + Contato Rápido + Topo) */}
        <FloatingActions />
      </div>
    </BrowserRouter>
  );
}
