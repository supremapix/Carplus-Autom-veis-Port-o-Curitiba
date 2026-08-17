import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, CheckCircle2, AlertCircle, Trash2, Send } from 'lucide-react';
import { createSellRequest } from '../services/leads';

export function VendaSeuCarro() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [mileage, setMileage] = useState<number | ''>('');
  const [color, setColor] = useState('');
  const [expectedPrice, setExpectedPrice] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    const remainingSlots = 10 - images.length;
    const selectedFiles = files.slice(0, remainingSlots);

    selectedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !whatsapp.trim() || !brand.trim() || !model.trim()) {
      setErrorMsg('Por favor, preencha os campos obrigatórios (Nome, WhatsApp, Marca e Modelo).');
      return;
    }

    if (!lgpdAccepted) {
      setErrorMsg('É necessário concordar com a Política de Privacidade para enviar os dados.');
      return;
    }

    setLoading(true);
    try {
      await createSellRequest({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim() || undefined,
        brand: brand.trim(),
        model: model.trim(),
        version: version.trim(),
        year: year ? Number(year) : new Date().getFullYear(),
        mileage: mileage ? Number(mileage) : 0,
        color: color.trim() || 'Não informada',
        expectedPrice: expectedPrice ? Number(expectedPrice) : undefined,
        notes: notes.trim(),
        images,
        source: 'venda',
        lgpdAccepted,
      });

      setSuccess(true);
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao enviar sua solicitação. Tente novamente ou chame no WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              AVALIAÇÃO EM CURITIBA
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-slate-900 tracking-wide">
            QUER VENDER SEU CARRO?
          </h1>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Preencha o formulário abaixo com as informações do seu veículo para receber uma proposta justa e sem compromisso.
          </p>
        </div>

        {/* 3 Passos explicativos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
            <span className="font-display font-bold text-2xl text-[#d97706] block mb-1">1</span>
            <h2 className="font-display font-bold text-sm uppercase text-slate-900 tracking-wide">
              Envio dos Dados
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Você preenche as características e anexa fotos do veículo.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
            <span className="font-display font-bold text-2xl text-[#d97706] block mb-1">2</span>
            <h2 className="font-display font-bold text-sm uppercase text-slate-900 tracking-wide">
              Avaliação Especializada
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Nossa equipe analisa o modelo com base no histórico e mercado.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-xs">
            <span className="font-display font-bold text-2xl text-[#d97706] block mb-1">3</span>
            <h2 className="font-display font-bold text-sm uppercase text-slate-900 tracking-wide">
              Contato & Proposta
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Entramos em contato via WhatsApp com o retorno da avaliação.
            </p>
          </div>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5">
          {success ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h2 className="font-display font-bold text-3xl uppercase tracking-wide text-slate-900">
                Dados Enviados com Sucesso!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Recebemos as informações do seu veículo. Nossa equipe entrará em contato via WhatsApp para apresentar o parecer de avaliação.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 bg-[#F59C00] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                >
                  Enviar Outro Veículo
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Seção 1: Dados Pessoais */}
              <div>
                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#d97706] mb-4 pb-2 border-b border-slate-100">
                  1. Seus Dados de Contato
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(41) 99999-9999"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 2: Dados do Veículo */}
              <div>
                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#d97706] mb-4 pb-2 border-b border-slate-100">
                  2. Dados do Veículo
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Marca *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Toyota"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Modelo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Corolla"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Versão
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: XEi 2.0"
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Ano Modelo
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 2022"
                      value={year}
                      onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Quilometragem (km)
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 35000"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value ? Number(e.target.value) : '')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Cor
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Branco"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Preço Pretendido (R$)
                    </label>
                    <input
                      type="number"
                      placeholder="Ex: 130000"
                      value={expectedPrice}
                      onChange={(e) => setExpectedPrice(e.target.value ? Number(e.target.value) : '')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Observações sobre o estado de conservação
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Histórico de revisões, detalhes de lataria, acessórios instalados, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                  />
                </div>
              </div>

              {/* Seção 3: Upload de Fotos */}
              <div>
                <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#d97706] mb-4 pb-2 border-b border-slate-100">
                  3. Fotos do Veículo (opcional — máx. 10 fotos)
                </h2>

                <div className="border-2 border-dashed border-slate-300 hover:border-amber-400 transition-colors rounded-2xl p-6 text-center cursor-pointer relative bg-slate-50">
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UploadCloud className="w-10 h-10 text-[#d97706]" />
                    <p className="text-sm font-bold text-slate-800">
                      Clique ou arraste as fotos aqui
                    </p>
                    <p className="text-xs text-slate-500">
                      Suporte a JPG, PNG e WebP (até 10 imagens)
                    </p>
                  </div>
                </div>

                {/* Previews de Fotos */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                    {images.map((img, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-300 group shadow-xs">
                        <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                          title="Remover foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkbox LGPD */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    required
                    checked={lgpdAccepted}
                    onChange={(e) => setLgpdAccepted(e.target.checked)}
                    className="rounded border-slate-300 text-[#F59C00] focus:ring-0 w-4 h-4 mt-0.5"
                  />
                  <span>
                    Concordo com a coleta e tratamento dos meus dados para fins de avaliação do veículo conforme a{' '}
                    <Link to="/politica-de-privacidade" target="_blank" className="text-[#d97706] underline">
                      Política de Privacidade
                    </Link>.
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-1.5 text-red-600 text-xs bg-red-50 p-3 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all transform active:scale-95 shadow-lg shadow-[#F59C00]/25 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'ENVIANDO DADOS...' : 'SOLICITAR AVALIAÇÃO'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
