import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Volume2,
  VolumeX,
  Play,
  ArrowRight,
  Car,
  ShieldCheck,
  MapPin,
  RefreshCw,
  Sparkles,
  Award,
  Phone,
  FileCheck,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BrandsMarquee } from './BrandsMarquee';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Parallax suave no background
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Itens da Task Letreiro (Ticker interativo contendo todas as informações essenciais do Hero)
  const tickerItems = [
    {
      icon: <Car className="w-4 h-4 text-[#F59C00]" />,
      kicker: 'CARPLUS AUTOS',
      title: 'SEU PRÓXIMO CARRO ESTÁ AQUI',
      desc: 'VER ESTOQUE COMPLETO',
      link: '/estoque',
      badge: 'NOVIDADES',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#F59C00]" />,
      kicker: 'PROCEDÊNCIA & GARANTIA',
      title: 'SEMINOVOS PERICIADOS COM LAUDO 100% APROVADO',
      desc: 'CARROS REVISADOS COM GARANTIA',
      link: '/estoque',
      badge: 'QUALIDADE',
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-[#F59C00]" />,
      kicker: 'COMPRA & VENDA',
      title: 'AVALIAÇÃO JUSTA E TROCA COM TROCO',
      desc: 'QUER VENDER OU TROCAR? CLIQUE AQUI',
      link: '/venda-seu-carro',
      badge: 'MELHOR AVALIAÇÃO',
    },
    {
      icon: <Award className="w-4 h-4 text-[#F59C00]" />,
      kicker: 'FINANCIAMENTO FÁCIL',
      title: 'TAXAS ESPECIAIS EM ATÉ 60X',
      desc: 'SIMULE SUA PARCELA AGORA',
      link: '/financiamento',
      badge: 'APROVAÇÃO RÁPIDA',
    },
    {
      icon: <MapPin className="w-4 h-4 text-[#F59C00]" />,
      kicker: 'SHOWROOM CURITIBA',
      title: 'AV. PRES. ARTHUR BERNARDES, 1323 · PORTÃO',
      desc: 'COMO CHEGAR NA LOJA',
      link: '/contato',
      badge: 'PORTÃO / CWB',
    },
    {
      icon: <Phone className="w-4 h-4 text-[#F59C00]" />,
      kicker: 'ATENDIMENTO VIP',
      title: '(41) 98874-0258 · WHATSAPP DIRETO',
      desc: 'FALE COM UM CONSULTOR',
      link: '/contato',
      badge: 'ONLINE',
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative bg-[#050505] text-white min-h-[82vh] sm:min-h-[86vh] lg:min-h-[92vh] lg:max-h-[900px] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 1. BACKGROUND LIMPO: VÍDEO EXCLUSIVO MOBILE & FOTO HIGH-END NO DESKTOP     */}
      {/* ========================================================================= */}
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* MOBILE VIDEO BACKGROUND (Exclusivo < 1024px — 100% limpo e desobstruído) */}
        <div className="block lg:hidden absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src="https://img.carplusautos.com.br/autos-no-portao.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Fallback de imagem enquanto o vídeo carrega */}
          <img
            src="https://img.carplusautos.com.br/hero.webp"
            alt="Carplus Autos Showroom"
            className={`absolute inset-0 w-full h-full object-cover object-[60%_center] filter brightness-[0.80] transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            fetchPriority="high"
            referrerPolicy="no-referrer"
          />

          {/* Gradientes e Vinhetas sutis de cinema */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />
        </div>

        {/* DESKTOP BACKGROUND IMAGE (Exclusivo lg: >= 1024px) */}
        <div className="hidden lg:block absolute inset-0 w-full h-full">
          <img
            src="https://img.carplusautos.com.br/hero.webp"
            alt="Carplus Autos Showroom"
            className="w-full h-full object-cover object-[center_center] filter brightness-[0.88] contrast-[1.05]"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. CONTROLES DE ÁUDIO & PLAY FLUTUANTES NO MOBILE                         */}
      {/* ========================================================================= */}
      <div className="lg:hidden absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
          className="h-9 px-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-[#F59C00] flex items-center gap-1.5 transition-all active:scale-95 shadow-md cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/80" />
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-white/90">Som</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#F59C00] animate-pulse" />
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#F59C00]">Ativo</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all active:scale-95 shadow-md cursor-pointer"
        >
          {isPlaying ? (
            <span className="w-2 h-2 rounded-xs bg-white/80" />
          ) : (
            <Play className="w-3 h-3 text-[#F59C00] fill-[#F59C00] ml-0.5" />
          )}
        </button>
      </div>

      {/* Espaço livre central — Hero 100% limpo para contemplação total do vídeo e do showroom */}
      <div className="flex-1" />

      {/* ========================================================================= */}
      {/* 3. TASK NO RODAPÉ DO HERO: LETREIRO DINÂMICO INTERATIVO & CLICÁVEL        */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full bg-black/85 backdrop-blur-xl border-t border-white/15 shadow-[0_-15px_35px_rgba(0,0,0,0.7)] pointer-events-auto">
        <div className="relative flex overflow-x-hidden py-3 sm:py-3.5">
          {/* Gradientes laterais para fusão impecável de letreiro contínuo */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Letreiro em velocidade média fluida */}
          <div className="animate-ticker flex items-center gap-6 sm:gap-8 whitespace-nowrap">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="group inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-white/[0.06] hover:bg-[#F59C00] border border-white/10 hover:border-[#F59C00] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none"
              >
                {/* Ícone com Box Estilizado */}
                <div className="w-8 h-8 rounded-xl bg-black/60 group-hover:bg-black text-[#F59C00] border border-white/10 group-hover:border-black flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  {item.icon}
                </div>

                {/* Textos Informativos */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-display font-extrabold uppercase tracking-[0.2em] text-[#F59C00] group-hover:text-black transition-colors">
                      {item.kicker}
                    </span>
                    <span className="text-[9px] font-display font-bold uppercase px-1.5 py-0.5 rounded-full bg-white/10 group-hover:bg-black/15 text-white/90 group-hover:text-black transition-colors">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-wide text-white group-hover:text-black transition-colors">
                    {item.title}
                  </span>
                </div>

                {/* Seta Indicativa de Clique */}
                <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-black/20 text-white/80 group-hover:text-black flex items-center justify-center shrink-0 ml-1 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Faixa Inferior de Logos Oficiais Flutuantes */}
        <div className="w-full bg-white border-t border-white/20 shadow-xs">
          <BrandsMarquee />
        </div>
      </div>
    </section>
  );
}
