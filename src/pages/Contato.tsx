import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CARPLUS_PHONE_DISPLAY, buildWhatsAppLink } from '../lib/whatsapp';
import { createLead } from '../services/leads';
import { Container } from '../components/ui/Container';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';

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
    <div className="bg-white min-h-screen">
      {/* Page Hero Preto */}
      <PageHero
        kicker="ATENDIMENTO OFICIAL"
        title="FALE CONOSCO"
        subtitle="Estamos à disposição para tirar dúvidas, agendar visitas ao showroom ou prestar consultoria na escolha do seu próximo veículo."
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Contato' },
        ]}
      />

      <div className="py-12 sm:py-16">
        <Container>
          {/* Grid Contato */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Informações e WhatsApp */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <h2 className="font-display font-bold text-2xl uppercase text-[#121212] tracking-wide pb-4 border-b border-[#E0E0E0]">
                  CANAIS DE ATENDIMENTO
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] shrink-0 flex items-center justify-center shadow-xs">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#121212]">
                        Endereço da Loja
                      </h3>
                      <p className="text-sm text-[#666666] mt-1 leading-relaxed">
                        <strong className="text-[#121212]">Av. Pres. Arthur da Silva Bernardes, 1323</strong><br />
                        Portão — Curitiba/PR — CEP 80320-300
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <img
                      src="https://img.carplusautos.com.br/auto/paulo.jpeg"
                      alt="Paulo — Carplus Autos"
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#F59C00] shrink-0 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#121212]">
                        Atendimento Direto com Paulo
                      </h3>
                      <p className="text-xs text-[#666666] mt-0.5">Ligação e WhatsApp Único:</p>
                      <a
                        href="tel:+5541988740258"
                        className="font-display font-bold text-xl text-[#F59C00] hover:text-[#F7941D] transition-colors block mt-0.5"
                      >
                        {CARPLUS_PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] shrink-0 flex items-center justify-center shadow-xs">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#121212]">
                        Horário de Funcionamento
                      </h3>
                      <p className="text-sm text-[#666666] mt-1">
                        <span className="font-semibold text-[#121212]">Segunda a Sexta:</span> 08:00 às 18:00<br />
                        <span className="font-semibold text-[#121212]">Sábado:</span> 08:00 às 12:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E0E0E0]">
                  <a
                    href={buildWhatsAppLink('Olá! Gostaria de falar com a equipe da Carplus Autos.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 bg-[#25D366] hover:bg-[#20BA5A] text-black font-display font-bold text-sm tracking-wider uppercase rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/25 select-none"
                  >
                    <MessageSquare className="w-5 h-5 text-black fill-current" />
                    <span>CHAMAR NO WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Iframe Mapa */}
              <div className="h-72 rounded-3xl overflow-hidden border border-[#E0E0E0] shadow-md">
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
              <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-6 sm:p-10 shadow-xl">
                {success ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h2 className="font-display font-bold text-3xl uppercase tracking-wide text-[#121212]">
                      Mensagem Enviada!
                    </h2>
                    <p className="text-base text-[#666666] max-w-md mx-auto leading-relaxed">
                      Agradecemos o seu contato. Nossa equipe responderá o mais breve possível no WhatsApp ou e-mail.
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={() => setSuccess(false)}
                        variant="primary"
                      >
                        ENVIAR OUTRA MENSAGEM
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="font-display font-bold text-2xl uppercase text-[#121212] tracking-wide mb-2">
                      ENVIE UMA MENSAGEM
                    </h2>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div>
                      <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                        Mensagem *
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Como podemos te ajudar? Digite sua dúvida ou veículo de interesse..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-white border border-[#E0E0E0] rounded-xl p-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                      />
                    </div>

                    {/* Checkbox LGPD */}
                    <label className="flex items-start gap-3 text-xs text-[#666666] cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        required
                        checked={lgpdAccepted}
                        onChange={(e) => setLgpdAccepted(e.target.checked)}
                        className="rounded border-[#CCCCCC] text-[#F59C00] focus:ring-0 w-5 h-5 mt-0.5"
                      />
                      <span>
                        Concordo com o tratamento dos meus dados conforme a{' '}
                        <Link to="/politica-de-privacidade" target="_blank" className="text-[#121212] font-bold underline">
                          Política de Privacidade
                        </Link>.
                      </span>
                    </label>

                    {errorMsg && (
                      <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-4 rounded-xl border border-red-200">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        variant="primary"
                        size="lg"
                        icon={<Send className="w-5 h-5 text-black" />}
                      >
                        {loading ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
}
