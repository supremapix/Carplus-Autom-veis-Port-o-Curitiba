import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { getBrands, getModelsByBrand } from '../../services/vehicles';
import { Container } from '../ui/Container';

export function QuickSearchSection() {
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
    <section className="bg-white py-10 sm:py-14 border-b border-[#E0E0E0]">
      <Container>
        <div className="max-w-6xl mx-auto bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center mb-8 pb-4 border-b border-[#E0E0E0]">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-wide text-[#121212]">
                Buscar veículo
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] mt-1">
                Filtre pelo modelo, ano e faixa de investimento ideal
              </p>
            </div>
          </div>

          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Marca */}
            <div>
              <label className="block text-xs font-display font-bold text-[#666666] uppercase tracking-wider mb-2">
                Marca
              </label>
              <div className="relative">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full h-[52px] bg-white border border-[#D0D0D0] rounded-xl px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] focus:ring-1 focus:ring-[#F59C00] font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="">Todas as marcas</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <ChevronRight className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Modelo */}
            <div>
              <label className="block text-xs font-display font-bold text-[#666666] uppercase tracking-wider mb-2">
                Modelo
              </label>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedBrand}
                  className="w-full h-[52px] bg-white border border-[#D0D0D0] rounded-xl px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] focus:ring-1 focus:ring-[#F59C00] disabled:opacity-40 font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="">Todos os modelos</option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <ChevronRight className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Ano Mínimo */}
            <div>
              <label className="block text-xs font-display font-bold text-[#666666] uppercase tracking-wider mb-2">
                Ano Mínimo
              </label>
              <div className="relative">
                <select
                  value={selectedMinYear}
                  onChange={(e) => setSelectedMinYear(e.target.value)}
                  className="w-full h-[52px] bg-white border border-[#D0D0D0] rounded-xl px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] focus:ring-1 focus:ring-[#F59C00] font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="">Qualquer ano</option>
                  <option value="2024">2024 ou superior</option>
                  <option value="2023">2023 ou superior</option>
                  <option value="2022">2022 ou superior</option>
                  <option value="2021">2021 ou superior</option>
                  <option value="2020">2020 ou superior</option>
                  <option value="2015">2015 ou superior</option>
                </select>
                <ChevronRight className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Preço Máximo */}
            <div>
              <label className="block text-xs font-display font-bold text-[#666666] uppercase tracking-wider mb-2">
                Preço Máximo
              </label>
              <div className="relative">
                <select
                  value={selectedMaxPrice}
                  onChange={(e) => setSelectedMaxPrice(e.target.value)}
                  className="w-full h-[52px] bg-white border border-[#D0D0D0] rounded-xl px-3.5 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] focus:ring-1 focus:ring-[#F59C00] font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="">Qualquer valor</option>
                  <option value="60000">Até R$ 60.000</option>
                  <option value="100000">Até R$ 100.000</option>
                  <option value="150000">Até R$ 150.000</option>
                  <option value="250000">Até R$ 250.000</option>
                  <option value="400000">Até R$ 400.000</option>
                </select>
                <ChevronRight className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Botão de Busca */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-[52px] bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-[#F59C00]/20 cursor-pointer select-none"
              >
                <Search className="w-4 h-4 text-black shrink-0" />
                <span>BUSCAR</span>
              </button>
            </div>
          </form>

          {/* Atalhos Rápidos de Marcas Populares */}
          <div className="mt-6 pt-6 border-t border-[#E0E0E0]">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-display font-bold text-[#888888] uppercase tracking-wider">
                Marcas mais procuradas:
              </span>
            </div>
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { name: 'BMW', logo: 'https://www.maiscar.com.br/cdn/shop/collections/BMW-png_450x.webp?v=1756475604' },
                { name: 'Toyota', logo: 'https://www.maiscar.com.br/cdn/shop/collections/Toyota-80-jpg_450x.webp?v=1756478765' },
                { name: 'Jeep', logo: 'https://www.maiscar.com.br/cdn/shop/collections/JEEP_450x.png?v=1756477389' },
                { name: 'Volkswagen', logo: 'https://www.maiscar.com.br/cdn/shop/collections/Volksvaguen-80_450x.jpg?v=1756178743' },
                { name: 'Chevrolet', logo: 'https://www.maiscar.com.br/cdn/shop/collections/pngwing.com_450x.png?v=1756251450' },
                { name: 'Audi', logo: 'https://www.maiscar.com.br/cdn/shop/collections/AUDI_450x.png?v=1756475413' },
                { name: 'Honda', logo: 'https://www.maiscar.com.br/cdn/shop/collections/Honda-80_450x.jpg?v=1756476585' },
                { name: 'Hyundai', logo: 'https://www.maiscar.com.br/cdn/shop/collections/Hyundai-80_450x.jpg?v=1756476868' },
                { name: 'Mercedes-Benz', logo: 'https://www.maiscar.com.br/cdn/shop/collections/MERCEDES-BENZ_450x.png?v=1756477831' },
                { name: 'Land Rover', logo: 'https://www.maiscar.com.br/cdn/shop/collections/LAND_ROVER_450x.png?v=1756477671' },
                { name: 'BYD', logo: 'https://www.maiscar.com.br/cdn/shop/collections/BYD_450x.png?v=1756475201' },
                { name: 'Ford', logo: 'https://www.maiscar.com.br/cdn/shop/collections/Ford-1-80_450x.webp?v=1756476222' },
              ].map((brand) => (
                <button
                  key={brand.name}
                  type="button"
                  onClick={() => {
                    setSelectedBrand(brand.name);
                    navigate(`/estoque?marca=${encodeURIComponent(brand.name)}`);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                    selectedBrand === brand.name
                      ? 'bg-black text-[#F59C00] border-black shadow-xs'
                      : 'bg-white hover:bg-white text-[#121212] border-[#E0E0E0] hover:border-[#F59C00]'
                  }`}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-5 w-auto max-w-[36px] object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-display font-bold uppercase tracking-wider">
                    {brand.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
