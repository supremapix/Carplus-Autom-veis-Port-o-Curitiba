import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, CheckCircle2, AlertCircle, Trash2, Send, ShieldCheck, DollarSign, Clock } from 'lucide-react';
import { createSellRequest } from '../services/leads';
import { Container } from '../components/ui/Container';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';

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
    <div className="bg-white min-h-screen">
      {/* Page Hero Preto */}
      <PageHero
        kicker="AVALIAÇÃO EM CURITIBA"
        title="VENDA SEU CARRO"
        subtitle="Preencha o formulário com os dados do seu veículo e receba uma avaliação justa com base no mercado real de Curitiba."
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Venda seu Carro' },
        ]}
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* 3 Passos explicativos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl p-6 text-center shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl">
                  1
                </div>
                <h2 className="font-display font-bold text-base uppercase text-[#121212] tracking-wide">
                  Envio dos Dados
                </h2>
                <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
                  Você preenche as características e anexa fotos do veículo.
                </p>
              </div>

              <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl p-6 text-center shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl">
                  2
                </div>
                <h2 className="font-display font-bold text-base uppercase text-[#121212] tracking-wide">
                  Avaliação Técnica
                </h2>
                <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
                  Nossa equipe analisa o modelo com base no histórico e tabela FIPE.
                </p>
              </div>

              <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl p-6 text-center shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl">
                  3
                </div>
                <h2 className="font-display font-bold text-base uppercase text-[#121212] tracking-wide">
                  Pagamento Rápido
                </h2>
                <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
                  Retornamos via WhatsApp e pagamos à vista com total segurança.
                </p>
              </div>
            </div>

            {/* Card do Formulário */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-6 sm:p-10 shadow-xl">
              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h2 className="font-display font-bold text-3xl uppercase tracking-wide text-[#121212]">
                    Dados Enviados com Sucesso!
                  </h2>
                  <p className="text-base text-[#666666] max-w-md mx-auto leading-relaxed">
                    Recebemos as informações do seu veículo. Nossa equipe entrará em contato via WhatsApp para apresentar a proposta.
                  </p>
                  <div className="pt-4">
                    <Button
                      onClick={() => setSuccess(false)}
                      variant="primary"
                    >
                      ENVIAR OUTRO VEÍCULO
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Seção 1: Dados Pessoais */}
                  <div>
                    <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#F59C00] mb-4 pb-2 border-b border-[#E0E0E0]">
                      1. Seus Dados de Contato
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Seu Nome *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nome completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(41) 99999-9999"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          E-mail (opcional)
                        </label>
                        <input
                          type="email"
                          placeholder="seuemail@exemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seção 2: Dados do Veículo */}
                  <div>
                    <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#F59C00] mb-4 pb-2 border-b border-[#E0E0E0]">
                      2. Dados do Veículo
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Marca *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Toyota"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Modelo *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Corolla"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Versão
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: XEi 2.0"
                          value={version}
                          onChange={(e) => setVersion(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Ano Modelo
                        </label>
                        <input
                          type="number"
                          placeholder="Ex: 2022"
                          value={year}
                          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Quilometragem (km)
                        </label>
                        <input
                          type="number"
                          placeholder="Ex: 35000"
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value ? Number(e.target.value) : '')}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Cor
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Branco"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Preço Pretendido (R$)
                        </label>
                        <input
                          type="number"
                          placeholder="Ex: 130000"
                          value={expectedPrice}
                          onChange={(e) => setExpectedPrice(e.target.value ? Number(e.target.value) : '')}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                        Observações sobre o estado de conservação
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Histórico de revisões, detalhes de lataria, acessórios instalados, etc."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-white border border-[#E0E0E0] rounded-xl p-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                      />
                    </div>
                  </div>

                  {/* Seção 3: Upload de Fotos */}
                  <div>
                    <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#F59C00] mb-4 pb-2 border-b border-[#E0E0E0]">
                      3. Fotos do Veículo (opcional — máx. 10 fotos)
                    </h2>

                    <div className="border-2 border-dashed border-[#CCCCCC] hover:border-[#F59C00] transition-colors rounded-2xl p-8 text-center cursor-pointer relative bg-white">
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <UploadCloud className="w-10 h-10 text-[#F59C00]" />
                        <p className="text-sm font-bold text-[#121212]">
                          Clique ou arraste as fotos aqui
                        </p>
                        <p className="text-xs text-[#666666]">
                          Suporte a JPG, PNG e WebP (até 10 imagens)
                        </p>
                      </div>
                    </div>

                    {/* Previews de Fotos */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                        {images.map((img, i) => (
                          <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E0E0E0] group shadow-xs">
                            <img
                              src={img}
                              alt={`Foto ${i + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(i)}
                              className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
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
                    <label className="flex items-start gap-3 text-xs text-[#666666] cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        required
                        checked={lgpdAccepted}
                        onChange={(e) => setLgpdAccepted(e.target.checked)}
                        className="rounded border-[#CCCCCC] text-[#F59C00] focus:ring-0 w-5 h-5 mt-0.5"
                      />
                      <span>
                        Concordo com a coleta e tratamento dos meus dados para fins de avaliação do veículo conforme a{' '}
                        <Link to="/politica-de-privacidade" target="_blank" className="text-[#121212] font-bold underline">
                          Política de Privacidade
                        </Link>.
                      </span>
                    </label>
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-4 rounded-xl border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="primary"
                      size="lg"
                      icon={<Send className="w-5 h-5 text-black" />}
                    >
                      {loading ? 'ENVIANDO DADOS...' : 'SOLICITAR AVALIAÇÃO'}
                    </Button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
}
