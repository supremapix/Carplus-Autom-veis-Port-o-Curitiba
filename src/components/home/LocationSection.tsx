import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { CARPLUS_PHONE_DISPLAY } from '../../lib/whatsapp';

export function LocationSection() {
  const addressUrl = 'https://maps.google.com/?q=Av.+Presidente+Arthur+da+Silva+Bernardes,+1323+-+Port%C3%A3o,+Curitiba+-+PR';

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Informações da Loja */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
                <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
                  LOJA FÍSICA
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-slate-900 tracking-wide">
                ONDE ESTAMOS EM CURITIBA
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Venha tomar um café conosco e conhecer nosso estoque de perto no tradicional bairro Portão em Curitiba. Estrutura moderna com amplo estacionamento e oficina integrada.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="p-2 rounded-xl bg-white text-[#d97706] shrink-0 border border-slate-200/80 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-slate-900">
                    Endereço
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Av. Presidente Arthur da Silva Bernardes, 1323<br />
                    Bairro Portão — Curitiba/PR — CEP 80320-300
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="p-2 rounded-xl bg-white text-[#d97706] shrink-0 border border-slate-200/80 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-slate-900">
                    Telefone & WhatsApp
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    <a href="tel:4130827282" className="font-semibold text-slate-900 hover:text-[#d97706] transition-colors">
                      {CARPLUS_PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="p-2 rounded-xl bg-white text-[#d97706] shrink-0 border border-slate-200/80 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-slate-900">
                    Horário de Funcionamento
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Segunda a Sexta: 08:00 às 18:00<br />
                    Sábado: 08:00 às 12:00
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-[#F59C00]/25"
              >
                <Navigation className="w-4 h-4" />
                <span>COMO CHEGAR (GOOGLE MAPS)</span>
              </a>
            </div>
          </div>

          {/* Iframe Mapa */}
          <div className="lg:col-span-7 h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative">
            <iframe
              title="Localização Carplus Autos no Portão Curitiba"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.4939227546747!2d-49.2870749!3d-25.4770000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce365e8a75e3f%3A0x6b6070b13524b01e!2sAv.%20Pres.%20Arthur%20da%20Silva%20Bernardes%2C%201323%20-%20Port%C3%A3o%2C%20Curitiba%20-%20PR%2C%2080320-300!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
