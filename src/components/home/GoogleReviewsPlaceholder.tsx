import React from 'react';
import { Star, CheckCircle2, ExternalLink } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  vehicle?: string;
}

export function GoogleReviewsPlaceholder() {
  const reviews: Review[] = [
    {
      id: '1',
      author: 'Marcos Vinicius Sampaio',
      location: 'Curitiba - PR',
      rating: 5,
      vehicle: 'Toyota Hilux SW4',
      text: 'Experiência impecável do primeiro contato à entrega. Veículo periciado com laudo 100% aprovado e revisado no próprio centro automotivo da Carplus no Portão. Recomendo de olhos fechados.',
      date: 'Há 2 semanas',
    },
    {
      id: '2',
      author: 'Roberto C. Guimarães',
      location: 'Curitiba - PR',
      rating: 5,
      vehicle: 'Consignação Toyota Corolla',
      text: 'Deixei meu veículo em consignação e venderam em menos de duas semanas pelo valor que combinamos. Transparência absoluta, contrato claro e transferência imediata sem dor de cabeça.',
      date: 'Há 1 mês',
    },
    {
      id: '3',
      author: 'Eduardo F. Alencar',
      location: 'Curitiba - PR',
      rating: 5,
      vehicle: 'Jeep Compass Limited',
      text: 'Segunda compra que realizo na Carplus. Atendimento transparente, avaliação justa do meu seminovo na troca e financiamento aprovado no mesmo dia com taxa excelente.',
      date: 'Há 1 mês',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFA] border-b border-[#E0E0E0]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E0E0E0]">
          <SectionHeading
            kicker="REPUTAÇÃO & CONFIANÇA"
            title={
              <>
                AVALIAÇÕES NO <span className="text-[#F59C00] italic">GOOGLE</span>
              </>
            }
            subtitle="Veja o que nossos clientes dizem sobre a experiência de compra, venda e pós-venda na Carplus Autos."
          />

          <div className="flex items-center gap-3 self-start md:self-end bg-white border border-[#E0E0E0] rounded-2xl px-4 py-2.5 shadow-xs">
            <div className="flex items-center gap-1 text-[#F59C00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59C00]" />
              ))}
            </div>
            <span className="font-display font-bold text-base text-[#121212]">5.0</span>
            <span className="text-xs text-[#666666] font-medium">· Avaliação Máxima</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#E0E0E0] hover:border-[#F59C00] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex gap-1 text-[#F59C00]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59C00]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#888888] font-medium">{rev.date}</span>
                </div>

                <p className="text-sm text-[#333333] leading-relaxed mb-6 font-normal">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-display font-bold text-[#121212] uppercase tracking-wide">
                      {rev.author}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" title="Cliente Verificado" />
                  </div>
                  <span className="text-[11px] text-[#777777] block mt-0.5">{rev.location} · {rev.vehicle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://maps.google.com/?q=Carplus+Centro+Automotivo+Curitiba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#121212] hover:text-[#F59C00] transition-colors"
          >
            <span>Ver showroom e perfil no Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#F59C00]" />
          </a>
        </div>
      </Container>
    </section>
  );
}
