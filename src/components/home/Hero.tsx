import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Container } from '../ui/Container';
import { BrandsMarquee } from './BrandsMarquee';

export function Hero() {
  return (
    <section className="relative bg-[#070707] text-white min-h-[88vh] lg:min-h-[92vh] lg:max-h-[920px] flex flex-col justify-between overflow-hidden">
      {/* Background Hero com Imagem Oficial Carplus Autos */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://img.supremasite.com.br/carplus-autos.webp"
          alt="Carplus Autos — Showroom de Seminovos Curitiba"
          className="w-full h-full object-cover object-[60%_center] lg:object-[left_center] filter brightness-[0.78] contrast-[1.08]"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Overlay gradiente horizontal invertido no desktop (transparente à esquerda → preto à direita) + base escura sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-black/50 lg:to-black/85" />
      </div>

      {/* Espaçador superior para manter equilíbrio visual */}
      <div className="hidden lg:block h-6" />

      {/* Conteúdo Central do Hero */}
      <Container className="relative z-10 w-full py-8 lg:py-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Coluna vazia à esquerda no desktop para liberar a fachada e o carro */}
          <div className="hidden lg:block lg:col-span-7" />

          {/* Bloco de texto na coluna direita (col-span 5 / col-start 8) no desktop */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-5 text-left max-w-[520px] ml-auto">
            {/* Kicker simples sem pílula */}
            <div className="text-[#F59C00] font-display font-medium text-xs sm:text-sm uppercase tracking-[0.25em]">
              COMPRA · VENDA · TROCA · CONSIGNAÇÃO
            </div>

            {/* Título Principal Editorial ajustado para caber em 3 linhas */}
            <h1 className="font-display font-bold uppercase text-white tracking-tight leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)' }}>
              SEU PRÓXIMO CARRO ESTÁ NA{' '}
              <span className="text-[#F59C00] block mt-1.5">
                CARPLUS AUTOS
              </span>
            </h1>

            {/* Subtítulo max-width 44ch */}
            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed" style={{ maxWidth: '44ch' }}>
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
        </div>
      </Container>

      {/* Faixa de Marcas Flutuantes com Fundo Branco Suave (Camufla 100% o fundo dos arquivos) */}
      <div className="relative z-10 w-full bg-white border-t border-white/20 shadow-xs">
        <BrandsMarquee />
      </div>
    </section>
  );
}
