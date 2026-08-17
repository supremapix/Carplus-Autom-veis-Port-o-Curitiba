import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Car, ChevronRight, ShieldCheck, MapPin, RefreshCw, FileCheck } from 'lucide-react';
import { getBrands, getModelsByBrand } from '../../services/vehicles';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function Hero() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const [selectedMinYear, setSelectedMinYear] = useState('');

  useEffect(() => {
    getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      getModelsByBrand(selectedBrand).then(setModels);
      setSelectedModel('');
    } else {
      setModels([]);
      setSelectedModel('');
    }
  }, [selectedBrand]);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBrand) params.set('marca', selectedBrand);
    if (selectedModel) params.set('modelo', selectedModel);
    if (selectedMaxPrice) params.set('precoMax', selectedMaxPrice);
    if (selectedMinYear) params.set('anoMin', selectedMinYear);

    navigate(`/estoque?${params.toString()}`);
  };

  const trustBadges = [
    { icon: <ShieldCheck className="w-5 h-5 text-[#F59C00]" />, text: 'Procedência Garantida' },
    { icon: <MapPin className="w-5 h-5 text-[#F59C00]" />, text: 'Portão – Curitiba' },
    { icon: <RefreshCw className="w-5 h-5 text-[#F59C00]" />, text: 'Aceitamos Troca' },
    { icon: <FileCheck className="w-5 h-5 text-[#F59C00]" />, text: 'Laudo Cautelar 100%' },
  ];

  return (
    <section className="relative bg-black text-white pt-10 sm:pt-16 pb-16 lg:pb-24 border-b border-[#2E2E2E] overflow-hidden">
      {/* Background Hero com Overlay Preto Rigoroso */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
          alt="Carplus Autos Estoque de Seminovos Curitiba"
          className="w-full h-full object-cover object-center filter grayscale"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black" />
      </div>

      {/* Brilho decorativo sutil */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#F59C00]/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Bloco Central do Hero */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Kicker Superior */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] text-[#F59C00] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#F59C00] animate-pulse" />
            <span className="text-xs font-display font-bold uppercase tracking-widest">
              COMPRA · VENDA · TROCA · CONSIGNAÇÃO
            </span>
          </div>

          {/* H1 Oswald 700 com Última Linha em Laranja (Padrão Carplus Oficial) */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white tracking-tight leading-[1.05]">
            COMPRE OU VENDA SEU CARRO NA{' '}
            <span className="text-[#F59C00] block mt-1">CARPLUS AUTOS</span>
          </h1>

          {/* Subtítulo em Inter */}
          <p className="text-base sm:text-lg md:text-xl text-[#B3B3B3] max-w-2xl mx-auto font-normal leading-relaxed">
            Seminovos revisados, periciados com laudo 100% aprovado, garantia e o melhor atendimento de Curitiba no bairro Portão.
          </p>

          {/* Botões Pill CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              to="/estoque"
              variant="primary"
              size="lg"
              icon={<Car className="w-5 h-5 text-black" />}
              className="w-full sm:w-auto"
            >
              VER ESTOQUE COMPLETO
            </Button>

            <Button
              to="/venda-seu-carro"
              variant="dark"
              size="lg"
              iconRight={<ChevronRight className="w-5 h-5 text-[#F59C00]" />}
              className="w-full sm:w-auto"
            >
              VENDER OU TROCAR MEU CARRO
            </Button>
          </div>

          {/* Fileira de 4 Selos com Borda Laranja à Esquerda (Padrão Site Aprovado) */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3.5 bg-[#1A1A1A] border-l-4 border-l-[#F59C00] border-y border-r border-[#2E2E2E] rounded-r-xl shadow-xs"
              >
                <div className="shrink-0">{badge.icon}</div>
                <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Busca Rápida Sobreposto (Fundo Branco com Tipografia Nítida) */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="bg-white border border-[#E0E0E0] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#121212]">
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#E0E0E0]">
              <Search className="w-5 h-5 text-[#F59C00]" />
              <h2 className="text-sm sm:text-base font-display font-bold uppercase tracking-wider text-[#121212]">
                BUSCA RÁPIDA NO ESTOQUE CARPLUS
              </h2>
            </div>

            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Marca */}
              <div>
                <label className="block text-xs font-display font-bold text-[#121212] uppercase tracking-wider mb-2">
                  Marca do Veículo
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full h-[52px] bg-[#F2F2F2] border border-[#E0E0E0] rounded-xl px-3.5 text-base text-[#121212] focus:outline-none focus:border-[#F59C00] focus:bg-white font-medium"
                >
                  <option value="">Todas as marcas</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modelo */}
              <div>
                <label className="block text-xs font-display font-bold text-[#121212] uppercase tracking-wider mb-2">
                  Modelo
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand}
                  className="w-full h-[52px] bg-[#F2F2F2] border border-[#E0E0E0] rounded-xl px-3.5 text-base text-[#121212] focus:outline-none focus:border-[#F59C00] focus:bg-white disabled:opacity-40 font-medium"
                >
                  <option value="">Todos os modelos</option>
                  {models.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ano Mínimo */}
              <div>
                <label className="block text-xs font-display font-bold text-[#121212] uppercase tracking-wider mb-2">
                  Ano a partir de
                </label>
                <select
                  value={selectedMinYear}
                  onChange={(e) => setSelectedMinYear(e.target.value)}
                  className="w-full h-[52px] bg-[#F2F2F2] border border-[#E0E0E0] rounded-xl px-3.5 text-base text-[#121212] focus:outline-none focus:border-[#F59C00] focus:bg-white font-medium"
                >
                  <option value="">Qualquer ano</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2015">2015 ou mais antigo</option>
                </select>
              </div>

              {/* Preço Máximo */}
              <div>
                <label className="block text-xs font-display font-bold text-[#121212] uppercase tracking-wider mb-2">
                  Preço até
                </label>
                <select
                  value={selectedMaxPrice}
                  onChange={(e) => setSelectedMaxPrice(e.target.value)}
                  className="w-full h-[52px] bg-[#F2F2F2] border border-[#E0E0E0] rounded-xl px-3.5 text-base text-[#121212] focus:outline-none focus:border-[#F59C00] focus:bg-white font-medium"
                >
                  <option value="">Qualquer valor</option>
                  <option value="50000">Até R$ 50.000</option>
                  <option value="120000">Até R$ 120.000</option>
                  <option value="220000">Até R$ 220.000</option>
                  <option value="350000">Até R$ 350.000</option>
                </select>
              </div>

              {/* Botão de Busca */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-[52px] sm:h-[56px] bg-[#F59C00] hover:bg-[#F7941D] active:bg-[#E68A00] text-black font-display font-bold text-base tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-[#F59C00]/25 cursor-pointer select-none"
                >
                  <Search className="w-5 h-5 text-black" />
                  <span>BUSCAR</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
