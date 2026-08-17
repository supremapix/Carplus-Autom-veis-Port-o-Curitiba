import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CARPLUS_PHONE_DISPLAY, buildWhatsAppLink } from '../lib/whatsapp';
import { createLead } from '../services/leads';

export function Contato() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [lgpdAccepted, setLgpdAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !whatsapp.trim() || !message.trim()) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!lgpdAccepted) {
      setErrorMsg('É necessário concordar com a Política de Privacidade.');
      return;
    }

    setLoading(true);
    try {
      await createLead({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim() || undefined,
        message: `Mensagem via formulário de contato: ${message.trim()}`,
        source: 'direto',
      });

      setSuccess(true);
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao enviar a mensagem. Tente novamente ou use o WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              ATENDIMENTO
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-slate-900 tracking-wide">
            FALE CONOSCO
          </h1>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Estamos à disposição para tirar dúvidas, agendar visitas ou prestar consultoria na escolha do seu próximo veículo.
          </p>
        </div>

        {/* Grid Contato */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Informações e WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-900/5">
              <h2 className="font-display font-bold text-xl uppercase text-slate-900 tracking-wide pb-3 border-b border-slate-100">
                Canais de Atendimento
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-amber-50 text-[#d97706] shrink-0 border border-amber-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Endereço da Loja
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Av. Presidente Arthur da Silva Bernardes, 1323<br />
                      Bairro Portão — Curitiba / PR<br />
                      CEP: 80320-300
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-amber-50 text-[#d97706] shrink-0 border border-amber-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Telefone Fixo & WhatsApp
                    </h3>
                    <p className="text-xs text-slate-700 font-semibold mt-1">
                      <a href="tel:4130827282" className="hover:text-[#d97706] transition-colors">
                        {CARPLUS_PHONE_DISPLAY}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-amber-50 text-[#d97706] shrink-0 border border-amber-200">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Horário de Funcionamento
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Segunda a Sexta: 08:00 às 18:00<br />
                      Sábado: 08:00 às 12:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={buildWhatsAppLink('Olá! Gostaria de falar com a equipe da Carplus Autos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-display font-bold text-sm tracking-wider uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/20"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Iframe Mapa */}
            <div className="h-64 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <iframe
                title="Mapa Carplus Autos Portão Curitiba"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.4939227546747!2d-49.2870749!3d-25.4770000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce365e8a75e3f%3A0x6b6070b13524b01e!2sAv.%20Pres.%20Arthur%20da%20Silva%20Bernardes%2C%201323%20-%20Port%C3%A3o%2C%20Curitiba%20-%20PR%2C%2080320-300!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Formulário de Mensagem */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5">
              {success ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                  <h2 className="font-display font-bold text-3xl uppercase tracking-wide text-slate-900">
                    Mensagem Enviada!
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Agradecemos o seu contato. Nossa equipe responderá o mais breve possível.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2.5 bg-[#F59C00] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-display font-bold text-xl uppercase text-slate-900 tracking-wide mb-2">
                    Envie uma Mensagem
                  </h2>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(41) 99999-9999"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mensagem *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Como podemos te ajudar? Digite sua dúvida ou veículo de interesse..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#F59C00] focus:bg-white"
                    />
                  </div>

                  {/* Checkbox LGPD */}
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-1 font-medium">
                    <input
                      type="checkbox"
                      required
                      checked={lgpdAccepted}
                      onChange={(e) => setLgpdAccepted(e.target.checked)}
                      className="rounded border-slate-300 text-[#F59C00] focus:ring-0 w-4 h-4 mt-0.5"
                    />
                    <span>
                      Concordo com o tratamento dos meus dados conforme a{' '}
                      <Link to="/politica-de-privacidade" target="_blank" className="text-[#d97706] underline">
                        Política de Privacidade
                      </Link>.
                    </span>
                  </label>

                  {errorMsg && (
                    <div className="flex items-center gap-1.5 text-red-600 text-xs bg-red-50 p-3 rounded-xl border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all transform active:scale-95 shadow-lg shadow-[#F59C00]/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
