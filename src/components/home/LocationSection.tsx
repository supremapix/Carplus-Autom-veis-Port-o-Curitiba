import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { CARPLUS_PHONE_DISPLAY } from '../../lib/whatsapp';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

export function LocationSection() {
  const addressUrl = 'https://maps.google.com/?q=Av.+Presidente+Arthur+da+Silva+Bernardes,+1323+-+Port%C3%A3o,+Curitiba+-+PR';

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E0E0E0]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Informações da Loja */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              kicker="LOJA FÍSICA & SHOWROOM"
              title={
                <>
                  ONDE ESTAMOS EM <span className="text-[#F59C00] italic">CURITIBA</span>
                </>
              }
              subtitle="Venha tomar um café conosco e conhecer nosso estoque de perto no tradicional bairro Portão. Fácil acesso pela Av. Arthur Bernardes."
            />

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 bg-[#FAFAFA] p-5 rounded-2xl border border-[#E0E0E0]">
                <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] shrink-0 flex items-center justify-center shadow-xs">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#121212]">
                    Endereço Oficial
                  </h3>
                  <p className="text-sm text-[#666666] mt-1 leading-relaxed">
                    <strong className="text-[#121212]">Av. Pres. Arthur da Silva Bernardes, 1323</strong><br />
                    Portão — Curitiba/PR — CEP 80320-300
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#FAFAFA] p-5 rounded-2xl border border-[#E0E0E0]">
                <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] shrink-0 flex items-center justify-center shadow-xs">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[#121212]">
                    Telefone Fixo & Atendimento
                  </h3>
                  <p className="text-sm text-[#666666] mt-1">
                    <a
                      href="tel:+554130827282"
                      className="font-display font-bold text-xl text-[#F59C00] hover:text-[#F7941D] transition-colors"
                    >
                      {CARPLUS_PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#FAFAFA] p-5 rounded-2xl border border-[#E0E0E0]">
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

            <div className="pt-2">
              <Button
                href={addressUrl}
                variant="primary"
                size="lg"
                icon={<Navigation className="w-5 h-5 text-black" />}
              >
                ABRIR NO GOOGLE MAPS
              </Button>
            </div>
          </div>

          {/* Iframe Mapa */}
          <div className="lg:col-span-7 h-[420px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#E0E0E0] shadow-xl relative">
            <iframe
              title="Mapa Carplus Autos"
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
      </Container>
    </section>
  );
}
