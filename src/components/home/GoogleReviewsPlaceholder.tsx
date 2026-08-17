import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export function GoogleReviewsPlaceholder() {
  const reviews: Review[] = [];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              OPINIÃO DOS CLIENTES
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-slate-900 tracking-wide">
            AVALIAÇÕES GOOGLE
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Acompanhe a reputação da Carplus Centro Automotivo e Carplus Autos no Google.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-xs">
            <div className="flex justify-center gap-1 text-[#F59C00] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F59C00]" />
              ))}
            </div>
            <p className="text-sm text-slate-900 font-bold">
              Avaliações verificadas do Google
            </p>
            <p className="text-xs text-slate-500 mt-1">
              As avaliações em tempo real do Google Meu Negócio serão integradas na ETAPA 2.
            </p>
            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=Carplus+Centro+Automotivo+Curitiba"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#d97706] hover:text-[#b45309] font-bold uppercase tracking-wider"
              >
                <span>Ver localização e perfil no Google Maps →</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
                <div className="flex gap-1 text-[#F59C00] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59C00]" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-4">{rev.text}</p>
                <span className="text-xs font-bold text-slate-900 block">{rev.author}</span>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
