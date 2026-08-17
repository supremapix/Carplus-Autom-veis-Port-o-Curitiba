import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, RefreshCw, Send, CheckCircle2, AlertCircle, Calculator } from 'lucide-react';
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
    <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      {/* Botões de Ação Imediata */}
      <div className="space-y-3">
        {!isSold && (
          <a
            href={buildWhatsAppLink(whatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-14 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#F59C00]/25 select-none"
          >
            <MessageSquare className="w-5 h-5 text-black fill-current" />
            <span>FALAR NO WHATSAPP AGORA</span>
          </a>
        )}

        {!isSold && (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onOpenTradeInModal}
              className="w-full h-12 bg-white hover:bg-black hover:text-[#F59C00] border border-[#E0E0E0] text-[#121212] text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-4 h-4 text-[#F59C00]" />
              <span>Troca c/ Usado</span>
            </button>

            <Link
              to={`/financiamento?veiculo=${vehicle.slug}`}
              className="w-full h-12 bg-white hover:bg-black hover:text-[#F59C00] border border-[#E0E0E0] text-[#121212] text-xs font-display font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 text-center shadow-xs"
            >
              <Calculator className="w-4 h-4 text-[#F59C00]" />
              <span>Simular Parcelas</span>
            </Link>
          </div>
        )}
      </div>

      {/* Formulário de Proposta */}
      {!isSold && (
        <div className="pt-6 border-t border-[#E0E0E0]">
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-[#121212] mb-1">
            TENHO INTERESSE NESTE VEÍCULO
          </h3>
          <p className="text-xs text-[#666666] mb-4">
            Envie seus dados e nossa equipe retornará prontamente com as condições.
          </p>

          {success ? (
            <div className="bg-black border border-[#222222] rounded-2xl p-6 text-center space-y-2 text-white">
              <CheckCircle2 className="w-10 h-10 text-[#F59C00] mx-auto" />
              <p className="text-base font-display font-bold uppercase text-white">
                Proposta enviada com sucesso!
              </p>
              <p className="text-xs text-[#999999]">
                Nosso consultor entrará em contato via WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-3 text-xs text-[#F59C00] uppercase font-bold tracking-wider hover:underline cursor-pointer"
              >
                Enviar nova proposta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                  E-mail (opcional)
                </label>
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                />
              </div>

              {/* Checkbox Troca */}
              <label className="flex items-center gap-3 text-xs text-[#121212] cursor-pointer pt-1 font-medium">
                <input
                  type="checkbox"
                  checked={hasTradeIn}
                  onChange={(e) => setHasTradeIn(e.target.checked)}
                  className="rounded border-[#CCCCCC] text-[#F59C00] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span>Tenho um veículo para dar na troca</span>
              </label>

              {/* Checkbox LGPD */}
              <label className="flex items-start gap-3 text-xs text-[#666666] cursor-pointer pt-1 font-medium">
                <input
                  type="checkbox"
                  required
                  checked={lgpdAccepted}
                  onChange={(e) => setLgpdAccepted(e.target.checked)}
                  className="rounded border-[#CCCCCC] text-[#F59C00] focus:ring-0 w-4 h-4 mt-0.5 cursor-pointer shrink-0"
                />
                <span>
                  Concordo com os termos da{' '}
                  <Link to="/politica-de-privacidade" target="_blank" className="text-[#121212] font-bold underline">
                    Política de Privacidade
                  </Link>.
                </span>
              </label>

              {errorMsg && (
                <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-xl border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-black hover:bg-[#F59C00] text-[#F59C00] hover:text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
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
