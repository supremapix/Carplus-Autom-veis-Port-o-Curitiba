import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { createTradeInRequest } from '../../services/leads';

interface TradeInModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function TradeInModal({ vehicle, isOpen, onClose }: TradeInModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tradeBrand, setTradeBrand] = useState('');
  const [tradeModel, setTradeModel] = useState('');
  const [tradeVersion, setTradeVersion] = useState('');
  const [tradeYear, setTradeYear] = useState<number | ''>('');
  const [tradeMileage, setTradeMileage] = useState<number | ''>('');
  const [tradeColor, setTradeColor] = useState('');
  const [expectedPrice, setExpectedPrice] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [lgpdAccepted, setLgpdAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !whatsapp.trim()) {
      setErrorMsg('Por favor, informe seu nome e WhatsApp.');
      return;
    }

    if (!tradeBrand.trim() || !tradeModel.trim()) {
      setErrorMsg('Por favor, informe a marca e o modelo do seu veículo usado.');
      return;
    }

    if (!lgpdAccepted) {
      setErrorMsg('É necessário concordar com a Política de Privacidade.');
      return;
    }

    setLoading(true);
    try {
      await createTradeInRequest({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        targetVehicleId: vehicle.id,
        targetVehicleName: `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearModel}`,
        tradeBrand: tradeBrand.trim(),
        tradeModel: tradeModel.trim(),
        tradeVersion: tradeVersion.trim(),
        tradeYear: tradeYear ? Number(tradeYear) : new Date().getFullYear(),
        tradeMileage: tradeMileage ? Number(tradeMileage) : 0,
        tradeColor: tradeColor.trim() || 'Não informada',
        expectedPrice: expectedPrice ? Number(expectedPrice) : undefined,
        notes: notes.trim(),
        lgpdAccepted,
      });

      setSuccess(true);
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao enviar a proposta de troca. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-[#d97706]" />
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-slate-900">
              Avaliação de Troca
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Veículo de Interesse */}
        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3.5">
          <img
            src={vehicle.images[0]?.url}
            alt={vehicle.model}
            className="w-16 h-12 rounded-xl object-cover"
          />
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#d97706] font-bold block">
              Veículo de Interesse:
            </span>
            <p className="text-sm font-bold text-slate-900">
              {vehicle.brand} {vehicle.model} {vehicle.version} ({vehicle.yearModel})
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-display text-2xl uppercase tracking-wider text-slate-900">
              Proposta de Troca Recebida!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Nossa equipe de avaliação entrará em contato via WhatsApp para solicitar fotos complementares e passar a proposta do seu usado.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-[#F59C00] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl"
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#F59C00] focus:bg-white"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-display uppercase tracking-wider text-[#d97706] font-bold mb-3">
                Dados do seu veículo usado
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Marca *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fiat"
                    value={tradeBrand}
                    onChange={(e) => setTradeBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Argo"
                    value={tradeModel}
                    onChange={(e) => setTradeModel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Versão
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Drive 1.0"
                    value={tradeVersion}
                    onChange={(e) => setTradeVersion(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Ano / Modelo
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 2021"
                    value={tradeYear}
                    onChange={(e) => setTradeYear(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Quilometragem (km)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 45000"
                    value={tradeMileage}
                    onChange={(e) => setTradeMileage(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Cor
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Prata"
                    value={tradeColor}
                    onChange={(e) => setTradeColor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Valor Pretendido (R$)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 60000"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                />
              </div>

              <div className="mt-3">
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Observações adicionais (opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Detalhes sobre manutenção, opcionais, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                />
              </div>
            </div>

            {/* Checkbox LGPD */}
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-2 font-medium">
              <input
                type="checkbox"
                required
                checked={lgpdAccepted}
                onChange={(e) => setLgpdAccepted(e.target.checked)}
                className="rounded border-slate-300 text-[#F59C00] focus:ring-0 w-4 h-4 mt-0.5"
              />
              <span>
                Concordo com o tratamento dos meus dados para avaliação do veículo de acordo com a LGPD.
              </span>
            </label>

            {errorMsg && (
              <div className="flex items-center gap-1.5 text-red-600 text-xs bg-red-50 p-2.5 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'SOLICITAR AVALIAÇÃO'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
