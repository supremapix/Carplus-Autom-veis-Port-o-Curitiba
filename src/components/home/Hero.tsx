import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Container } from '../ui/Container';

export function Hero() {
  return (
    <section className="relative bg-[#070707] text-white min-h-[82vh] lg:min-h-[88vh] lg:max-h-[860px] flex flex-col justify-end overflow-hidden pb-12 lg:pb-16">
      {/* Background Hero com Imagem Oficial Carplus Autos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://img.supremasite.com.br/carplus-autos.webp"
          alt="Carplus Autos — Showroom de Seminovos Curitiba"
          className="w-full h-full object-cover object-[65%_center] lg:object-center filter brightness-[0.75] contrast-[1.08]"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Gradiente overlay: preto 85% na base → 35% no topo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35" />
      </div>

      <Container className="relative z-10 w-full pb-6 lg:pb-10">
        <div className="max-w-4xl space-y-5 text-left">
          {/* Kicker simples sem pílula */}
          <div className="text-[#F59C00] font-display font-medium text-xs sm:text-sm uppercase tracking-[0.25em]">
            COMPRA · VENDA · TROCA · CONSIGNAÇÃO
          </div>

          {/* Título Principal Editorial */}
          <h1 className="font-display font-bold uppercase text-white tracking-tight leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5.5rem)', maxWidth: '14ch' }}>
            SEU PRÓXIMO CARRO ESTÁ NA{' '}
            <span className="text-[#F59C00] block mt-1.5">
              CARPLUS AUTOS
            </span>
          </h1>

          {/* Subtítulo em uma linha */}
          <p className="text-base sm:text-lg lg:text-xl text-white/80 font-normal leading-relaxed" style={{ maxWidth: '46ch' }}>
            Compra, venda e troca de veículos em Curitiba com segurança, transparência e atendimento especializado.
          </p>

          {/* Botões do Hero (Lado a lado, empilham abaixo de 400px) */}
          <div className="pt-2 flex flex-col min-[400px]:flex-row items-stretch min-[400px]:items-center gap-3">
            <Link
              to="/estoque"
              className="h-[52px] px-7 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-full flex items-center justify-center transition-all shadow-md shadow-[#F59C00]/20 select-none cursor-pointer"
            >
              VER ESTOQUE
            </Link>

            <Link
              to="/venda-seu-carro"
              className="h-[52px] px-7 bg-transparent hover:bg-white hover:text-black text-white font-display font-bold text-sm tracking-wider uppercase rounded-full border border-white/40 hover:border-white flex items-center justify-center transition-all select-none cursor-pointer"
            >
              VENDER MEU CARRO
            </Link>
          </div>

          {/* Linha discreta de endereço */}
          <div className="pt-3 flex items-center gap-2 text-xs sm:text-sm text-white/60 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#F59C00] shrink-0" />
            <span>Av. Pres. Arthur da Silva Bernardes, 1323 · Portão, Curitiba</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
