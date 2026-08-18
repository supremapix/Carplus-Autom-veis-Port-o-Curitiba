import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Car, ChevronRight, ShieldCheck, MapPin, RefreshCw, FileCheck, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
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

  const quickCategories = [
    { label: 'SUVs & Utilitários', filter: 'carroceria=SUV' },
    { label: 'Sedans Executivos', filter: 'carroceria=Sedan' },
    { label: 'Picapes & 4x4', filter: 'carroceria=Picape' },
    { label: 'Até R$ 120.000', filter: 'precoMax=120000' },
  ];

  const trustHighlights = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#F59C00]" />,
      title: 'Laudo Cautelar 100%',
      desc: 'Perícia rigorosa e aprovada',
    },
    {
      icon: <FileCheck className="w-5 h-5 text-[#F59C00]" />,
      title: 'Garantia & Procedência',
      desc: 'Histórico e motor certificados',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#F59C00]" />,
      title: 'Melhor Avaliação',
      desc: 'Troca justa com troco na hora',
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#F59C00]" />,
      title: 'Showroom no Portão',
      desc: 'Av. Pres. Arthur Bernardes, 1323',
    },
  ];

  return (
    <section className="relative bg-[#070707] text-white pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24 border-b border-[#222222] overflow-hidden">
      {/* Background Hero com Imagem Oficial Carplus Autos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/carplus-hero-wide.png"
          alt="Carplus Autos — Showroom de Seminovos Curitiba"
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.12]"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Camadas gradientes de profundidade cinematográfica */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-[#070707]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/80" />
      </div>

      {/* Halo de iluminação dourada sutil no topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F59C00]/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Bloco Central do Hero */}
        <div className="max-w-4xl mx-auto text-center space-y-7">
          {/* Kicker de Prestígio */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-[#F59C00] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F59C00] shadow-[0_0_8px_#F59C00] animate-pulse" />
            <span className="text-xs font-display font-bold uppercase tracking-[0.2em]">
              CURADORIA AUTOMOTIVA · CURITIBA - PR
            </span>
          </div>

          {/* Título Principal com Tipografia Editorial */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white tracking-tight leading-[1.04]">
            EXPERIÊNCIA & PROCEDÊNCIA EM{' '}
            <span className="text-[#F59C00] block mt-1.5 drop-shadow-[0_2px_24px_rgba(245,156,0,0.35)]">
              SEMINOVOS SELECIONADOS
            </span>
          </h1>

          {/* Subtítulo Sofisticado */}
          <p className="text-base sm:text-lg md:text-xl text-[#C7C7C7] max-w-2xl mx-auto font-normal leading-relaxed">
            Veículos periciados com laudo 100% aprovado, garantia certificada e a mais respeitada assessoria de compra, troca e consignação no bairro Portão.
          </p>

          {/* 4 Cartões de Confiança com Acabamento Refinado de Luxo */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto text-left">
            {trustHighlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-[#F59C00]/40 transition-all duration-300 shadow-sm group"
              >
                <div className="p-2 rounded-xl bg-black/60 border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#A0A0A0] mt-0.5 leading-normal truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Busca Rápida de Alto Padrão (The Luxury Vehicle Finder) */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="bg-[#121212]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden">
            {/* Linha decorativa de topo */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F59C00] to-transparent opacity-80" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F59C00]/15 border border-[#F59C00]/30 flex items-center justify-center text-[#F59C00]">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-display font-bold uppercase tracking-wider text-white">
                    LOCALIZADOR DE SEMINOVOS
                  </h2>
                  <p className="text-xs text-[#8E8E8E] font-medium">
                    Filtre pelo modelo, ano e faixa de investimento ideal
                  </p>
                </div>
              </div>

              {/* Categorias Rápidas */}
              <div className="flex items-center flex-wrap gap-2">
                {quickCategories.map((cat, i) => (
                  <Link
                    key={i}
                    to={`/estoque?${cat.filter}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#F59C00] hover:text-black border border-white/10 hover:border-[#F59C00] text-[#D4D4D4] font-medium transition-all select-none"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Marca */}
              <div>
                <label className="block text-xs font-display font-bold text-[#A8A8A8] uppercase tracking-wider mb-2">
                  Marca do Veículo
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full h-[52px] bg-[#1A1A1A] border border-[#333333] rounded-xl px-3.5 text-sm text-white focus:outline-none focus:border-[#F59C00] focus:ring-1 focus:ring-[#F59C00] font-medium transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1A1A1A] text-white">Todas as marcas</option>
                    {brands.map((b) => (
                      <option key={b} value={b} className="bg-[#1A1A1A] text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Modelo */}
              <div>
                <label className="block text-xs font-display font-bold text-[#A8A8A8] uppercase tracking-wider mb-2">
                  Modelo
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full h-[52px] bg-[#1A1A1A] border border-[#333333] rounded-xl px-3.5 text-sm text-white focus:outline-none focus:border-[#F59C00] focus:ring-1 focus:ring-[#F59C00] disabled:opacity-40 font-medium transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1A1A1A] text-white">Todos os modelos</option>
                    {models.map((m) => (
                      <option key={m} value={m} className="bg-[#1A1A1A] text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Ano Mínimo */}
              <div>
                <label className="block text-xs font-display font-bold text-[#A8A8A8] uppercase tracking-wider mb-2">
                  Ano Mínimo
                </label>
                <div className="relative">
                  <select
                    value={selectedMinYear}
                    onChange={(e) => setSelectedMinYear(e.target.value)}
                    className="w-full h-[52px] bg-[#1A1A1A] border border-[#333333] rounded-xl px-3.5 text-sm text-white focus:outline-none focus:border-[#F59C00] focus:ring-1 focus:ring-[#F59C00] font-medium transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1A1A1A] text-white">Qualquer ano</option>
                    <option value="2024" className="bg-[#1A1A1A] text-white">2024 ou superior</option>
                    <option value="2023" className="bg-[#1A1A1A] text-white">2023 ou superior</option>
                    <option value="2022" className="bg-[#1A1A1A] text-white">2022 ou superior</option>
                    <option value="2021" className="bg-[#1A1A1A] text-white">2021 ou superior</option>
                    <option value="2020" className="bg-[#1A1A1A] text-white">2020 ou superior</option>
                    <option value="2015" className="bg-[#1A1A1A] text-white">2015 ou superior</option>
                  </select>
                  <ChevronRight className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Preço Máximo */}
              <div>
                <label className="block text-xs font-display font-bold text-[#A8A8A8] uppercase tracking-wider mb-2">
                  Preço Máximo
                </label>
                <div className="relative">
                  <select
                    value={selectedMaxPrice}
                    onChange={(e) => setSelectedMaxPrice(e.target.value)}
                    className="w-full h-[52px] bg-[#1A1A1A] border border-[#333333] rounded-xl px-3.5 text-sm text-white focus:outline-none focus:border-[#F59C00] focus:ring-1 focus:ring-[#F59C00] font-medium transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1A1A1A] text-white">Qualquer valor</option>
                    <option value="60000" className="bg-[#1A1A1A] text-white">Até R$ 60.000</option>
                    <option value="100000" className="bg-[#1A1A1A] text-white">Até R$ 100.000</option>
                    <option value="150000" className="bg-[#1A1A1A] text-white">Até R$ 150.000</option>
                    <option value="250000" className="bg-[#1A1A1A] text-white">Até R$ 250.000</option>
                    <option value="400000" className="bg-[#1A1A1A] text-white">Até R$ 400.000</option>
                  </select>
                  <ChevronRight className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Botão de Busca Dourado */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-[52px] bg-[#F59C00] hover:bg-[#F7941D] active:bg-[#E68A00] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F59C00]/30 hover:shadow-[#F59C00]/50 hover:scale-[1.02] active:scale-95 cursor-pointer select-none"
                >
                  <Search className="w-4 h-4 text-black shrink-0" />
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
