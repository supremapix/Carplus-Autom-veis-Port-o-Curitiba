import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, RefreshCw, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { createLead } from '../../services/leads';
import { buildWhatsAppLink, buildVehicleWhatsAppMessage } from '../../lib/whatsapp';

interface InterestFormProps {
  vehicle: Vehicle;
  onOpenTradeInModal: () => void;
}

export function InterestForm({ vehicle, onOpenTradeInModal }: InterestFormProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isSold = vehicle.status === 'vendido';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (honeypot) {
      setSuccess(true);
      return;
    }

    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) {
      setErrorMsg('Por favor, informe um WhatsApp válido com DDD.');
      return;
    }
    if (!lgpdAccepted) {
      setErrorMsg('É necessário concordar com a Política de Privacidade para enviar sua proposta.');
      return;
    }

    setLoading(true);
    try {
      await createLead({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim() || undefined,
        vehicleId: vehicle.id,
        vehicleName: `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearModel}`,
        hasTradeIn,
        message: `Interesse enviado através da página do veículo ${vehicle.brand} ${vehicle.model} ${vehicle.yearModel}.${hasTradeIn ? ' Possui veículo na troca.' : ''}`,
      });

      setSuccess(true);
      setName('');
      setWhatsapp('');
      setEmail('');
      setHasTradeIn(false);
      setLgpdAccepted(false);
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao enviar sua proposta. Tente novamente ou use o WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsAppMessage = buildVehicleWhatsAppMessage({
    brand: vehicle.brand,
    model: vehicle.model,
    version: vehicle.version,
    yearModel: vehicle.yearModel,
    slug: vehicle.slug,
  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-lg shadow-slate-900/5 space-y-6">
      {/* Botões de Ação Imediata */}
      <div className="space-y-3">
        {!isSold && (
          <a
            href={buildWhatsAppLink(whatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-md shadow-[#F59C00]/25 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-black" />
            <span>Falar no WhatsApp Agora</span>
          </a>
        )}

        {!isSold && (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onOpenTradeInModal}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#F59C00] text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Troca com Usado</span>
            </button>

            <Link
              to={`/financiamento?veiculo=${vehicle.slug}`}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#F59C00] text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-center"
            >
              <span>Simular Parcelas</span>
            </Link>
          </div>
        )}
      </div>

      {/* Formulário de Proposta */}
      {!isSold && (
        <div className="pt-6 border-t border-slate-100">
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-slate-900 mb-1">
            Tenho interesse neste veículo
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Envie seus dados e nossa equipe entrará em contato prontamente.
          </p>

          {success ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-2 text-white">
              <CheckCircle2 className="w-8 h-8 text-[#F59C00] mx-auto" />
              <p className="text-sm font-bold text-white">
                Proposta enviada com sucesso!
              </p>
              <p className="text-xs text-slate-300">
                Nosso consultor entrará em contato via WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-3 text-xs text-[#F59C00] underline hover:text-white font-medium cursor-pointer"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Honeypot field */}
              <input
                type="text"
                name="website_url_check"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  E-mail (opcional)
                </label>
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                />
              </div>

              {/* Checkbox Troca */}
              <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer pt-1 font-medium">
                <input
                  type="checkbox"
                  checked={hasTradeIn}
                  onChange={(e) => setHasTradeIn(e.target.checked)}
                  className="rounded border-slate-300 text-[#F59C00] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                />
                <span>Tenho um veículo para dar na troca</span>
              </label>

              {/* Checkbox LGPD */}
              <label className="flex items-start gap-2.5 text-[11px] text-slate-500 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={lgpdAccepted}
                  onChange={(e) => setLgpdAccepted(e.target.checked)}
                  className="rounded border-slate-300 text-[#F59C00] focus:ring-0 focus:ring-offset-0 w-4 h-4 mt-0.5 cursor-pointer shrink-0"
                />
                <span>
                  Concordo com o tratamento dos dados nos termos da{' '}
                  <Link to="/politica-de-privacidade" target="_blank" className="text-[#d97706] underline font-medium">
                    Política de Privacidade
                  </Link>.
                </span>
              </label>

              {errorMsg && (
                <div className="flex items-center gap-1.5 text-red-600 text-xs bg-red-50 p-2.5 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-[#F59C00]/25 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Enviando proposta...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ENVIAR PROPOSTA</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
