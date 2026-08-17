import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Car, ChevronRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { getBrands, getModelsByBrand } from '../../services/vehicles';

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

  return (
    <div className="relative bg-gradient-to-b from-slate-100 via-white to-slate-50 pt-8 pb-16 lg:pb-20 overflow-hidden border-b border-slate-200">
      {/* Background Decorativo Suave */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1920"
          alt="Carplus Autos Veículos Seminovos em Curitiba"
          className="w-full h-full object-cover object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/90 via-white/95 to-slate-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Bloco Central Hero */}
        <div className="max-w-4xl mx-auto text-center space-y-5">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#F59C00] animate-pulse" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              COMPRA · VENDA · TROCA · CONSIGNAÇÃO
            </span>
          </div>

          {/* H1 Principal */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-slate-900 tracking-tight leading-[1.05]">
            SEU PRÓXIMO CARRO ESTÁ NA <span className="text-[#F59C00]">CARPLUS AUTOS</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Compra, venda e troca de veículos em Curitiba com segurança, laudo pericial, transparência e atendimento especializado.
          </p>

          {/* CTAs Primário & Secundário */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/estoque"
              className="w-full sm:w-auto px-8 py-4 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-base tracking-wider uppercase rounded-xl transition-all transform active:scale-95 shadow-lg shadow-[#F59C00]/25 flex items-center justify-center gap-2"
            >
              <Car className="w-5 h-5" />
              <span>VER ESTOQUE</span>
            </Link>

            <Link
              to="/venda-seu-carro"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-300 hover:border-slate-900 rounded-xl font-display font-bold text-base tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>VENDER MEU CARRO</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Card de Busca Rápida Sobreposto */}
        <div className="mt-10 sm:mt-14 max-w-5xl mx-auto">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xl shadow-slate-900/5">
            <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
              <Search className="w-4 h-4 text-[#F59C00]" />
              <h2 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-slate-900">
                Busca Rápida de Veículos
              </h2>
            </div>

            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {/* Marca */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Marca
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
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
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Modelo
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white disabled:opacity-40"
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
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ano a partir de
                </label>
                <select
                  value={selectedMinYear}
                  onChange={(e) => setSelectedMinYear(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                >
                  <option value="">Qualquer ano</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2018">2018 ou mais antigo</option>
                </select>
              </div>

              {/* Faixa de Preço */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preço até
                </label>
                <select
                  value={selectedMaxPrice}
                  onChange={(e) => setSelectedMaxPrice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                >
                  <option value="">Qualquer valor</option>
                  <option value="80000">Até R$ 80.000</option>
                  <option value="100000">Até R$ 100.000</option>
                  <option value="130000">Até R$ 130.000</option>
                  <option value="160000">Até R$ 160.000</option>
                  <option value="200000">Até R$ 200.000</option>
                  <option value="250000">Até R$ 250.000</option>
                </select>
              </div>

              {/* Botão Buscar */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase py-2.5 sm:py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F59C00]/20 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>BUSCAR</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
