import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { createTradeInRequest } from '../../services/leads';
import { Button } from '../ui/Button';
import { handleVehicleImageError, getVehicleImageUrl } from '../../lib/images';

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
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white border border-[#E0E0E0] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-[#E0E0E0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-[#F59C00]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-wider text-[#121212]">
              Avaliação de Troca
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#666666] hover:text-black rounded-xl hover:bg-[#FAFAFA] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Veículo de Interesse */}
        <div className="mt-4 p-4 bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl flex items-center gap-4">
          <img
            src={getVehicleImageUrl(vehicle.images[0]?.url, vehicle.bodyType)}
            alt={vehicle.model}
            referrerPolicy="no-referrer"
            onError={(e) => handleVehicleImageError(e)}
            className="w-16 h-12 rounded-xl object-cover"
          />
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#F59C00] font-bold block">
              Veículo de Interesse:
            </span>
            <p className="text-sm font-bold text-[#121212]">
              {vehicle.brand} {vehicle.model} {vehicle.version} ({vehicle.yearModel})
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h4 className="font-display text-2xl uppercase tracking-wider text-[#121212]">
              Proposta de Troca Recebida!
            </h4>
            <p className="text-sm text-[#666666] max-w-md mx-auto leading-relaxed">
              Nossa equipe de avaliação entrará em contato via WhatsApp para solicitar fotos complementares e passar a melhor avaliação no seu seminovo.
            </p>
            <div className="pt-2">
              <Button
                onClick={onClose}
                variant="primary"
              >
                FECHAR
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
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
                  className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E0E0E0]">
              <h4 className="text-xs font-display uppercase tracking-wider text-[#F59C00] font-bold mb-3">
                Dados do seu veículo na troca
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                    Marca *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fiat"
                    value={tradeBrand}
                    onChange={(e) => setTradeBrand(e.target.value)}
                    className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Argo"
                    value={tradeModel}
                    onChange={(e) => setTradeModel(e.target.value)}
                    className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                    Versão
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Drive 1.0"
                    value={tradeVersion}
                    onChange={(e) => setTradeVersion(e.target.value)}
                    className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                    Ano / Modelo
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 2021"
                    value={tradeYear}
                    onChange={(e) => setTradeYear(e.target.value ? Number(e.target.value) : '')}
                    className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                    Quilometragem (km)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 45000"
                    value={tradeMileage}
                    onChange={(e) => setTradeMileage(e.target.value ? Number(e.target.value) : '')}
                    className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                    Cor
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Prata"
                    value={tradeColor}
                    onChange={(e) => setTradeColor(e.target.value)}
                    className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                  Valor Pretendido (R$)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 60000"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                />
              </div>

              <div className="mt-3">
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                  Observações adicionais (opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Detalhes sobre manutenção, opcionais, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#E0E0E0] rounded-xl p-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                />
              </div>
            </div>

            {/* Checkbox LGPD */}
            <label className="flex items-start gap-3 text-xs text-[#666666] cursor-pointer pt-2 font-medium">
              <input
                type="checkbox"
                required
                checked={lgpdAccepted}
                onChange={(e) => setLgpdAccepted(e.target.checked)}
                className="rounded border-[#CCCCCC] text-[#F59C00] focus:ring-0 w-5 h-5 mt-0.5"
              />
              <span>
                Concordo com o tratamento dos meus dados para avaliação do veículo de acordo com a LGPD.
              </span>
            </label>

            {errorMsg && (
              <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E0E0E0]">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
              >
                CANCELAR
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
              >
                {loading ? 'ENVIANDO...' : 'SOLICITAR AVALIAÇÃO'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
