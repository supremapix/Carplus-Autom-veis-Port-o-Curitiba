import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { handleVehicleImageError, FALLBACK_VEHICLE_IMAGES } from '../../lib/images';

export function SellPromo() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E0E0E0]">
      <Container>
        <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl shadow-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Coluna Texto */}
            <div className="space-y-6">
              <SectionHeading
                kicker="AVALIAÇÃO DE VEÍCULOS"
                title={
                  <>
                    QUER VENDER OU TROCAR SEU <span className="text-[#F59C00] italic">CARRO?</span>
                  </>
                }
                subtitle="Na Carplus Autos, você tem um processo transparente, rápido e sem burocracia para vender ou consignar seu veículo em Curitiba."
              />

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3 text-base text-[#121212]">
                  <CheckCircle2 className="w-5 h-5 text-[#F59C00] shrink-0" />
                  <span className="font-medium">Envie os dados e fotos do seu veículo pelo formulário</span>
                </div>
                <div className="flex items-center gap-3 text-base text-[#121212]">
                  <CheckCircle2 className="w-5 h-5 text-[#F59C00] shrink-0" />
                  <span className="font-medium">Nossa equipe avalia seu seminovo com base no mercado real</span>
                </div>
                <div className="flex items-center gap-3 text-base text-[#121212]">
                  <CheckCircle2 className="w-5 h-5 text-[#F59C00] shrink-0" />
                  <span className="font-medium">Pagamento à vista seguro ou troca com troco garantida</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  to="/venda-seu-carro"
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight className="w-5 h-5 text-black" />}
                >
                  SOLICITAR AVALIAÇÃO DO MEU CARRO
                </Button>
              </div>
            </div>

            {/* Coluna Imagem / Destaque Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E0E0E0] shadow-xl aspect-[4/3] bg-black">
                <img
                  src="/images/veiculos/toyota-hilux-sw4-srx-platinum-4x4-2-8-diesel-2024/01.jpg"
                  alt="Avaliação de veículos Carplus Autos Curitiba"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleVehicleImageError(e, FALLBACK_VEHICLE_IMAGES.suv)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-5 bg-white rounded-2xl border border-[#E0E0E0] shadow-lg">
                  <span className="text-xs font-display font-bold text-[#F59C00] uppercase tracking-wider block">
                    ATENDIMENTO DIRETO NO PORTÃO
                  </span>
                  <p className="text-sm text-[#121212] font-medium mt-1">
                    Equipe especializada pronta para avaliar seu veículo presencialmente na Av. Pres. Arthur Bernardes, 1323 ou via WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

