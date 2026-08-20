import React, { useState } from 'react';
import { Share2, MessageCircle, X as CloseIcon, Copy, Check, ExternalLink } from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { PinterestIcon, ThreadsIcon } from '../ui/SocialIcons';
import { formatPrice } from '../../lib/utils';

interface VehicleShareModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function VehicleShareModal({ vehicle, isOpen, onClose }: VehicleShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // URL oficial da imagem para compartilhamento nas redes
  const REDES_SHARE_IMAGE = 'https://img.carplusautos.com.br/redes.png';
  const encodedImage = encodeURIComponent(REDES_SHARE_IMAGE);

  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : 'https://www.carplusautos.com.br';
  const encodedUrl = encodeURIComponent(currentUrl);
  
  const rawTitle = `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.yearModel}`;
  const rawPrice = formatPrice(vehicle.price);
  const rawDescription = `Confira este ${rawTitle} por ${rawPrice} na Carplus Autos Curitiba. Veículo periciado e revisado com garantia!`;
  
  const shareText = encodeURIComponent(rawDescription);
  const shareTitle = encodeURIComponent(`${rawTitle} | Carplus Autos`);

  // URLs oficiais e funcionais de compartilhamento com parâmetros de imagem suportados
  // 1. WhatsApp
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}%0A${encodedUrl}`;
  
  // 2. Threads (Meta Threads intent URL)
  const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(`${rawTitle} por ${rawPrice} na Carplus Autos Curitiba\n\n${currentUrl}`)}`;
  
  // 3. Pinterest (Suporta url, media=IMAGEM_ABSOLUTA, description=TEXTO)
  const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${shareText}`;
  
  // 4. LinkedIn (endpoint moderno de compartilhamento offsite)
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  
  // 5. Facebook
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  
  // 6. Twitter / X
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`;
  
  // 7. E-mail
  const mailUrl = `mailto:?subject=${shareTitle}&body=${shareText}%0A%0AConfira no site:%20${encodedUrl}`;

  const handleCopyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`${rawDescription}\n\n${currentUrl}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${vehicle.brand} ${vehicle.model} - Carplus Autos`,
          text: rawDescription,
          url: currentUrl,
        });
        onClose();
      } catch {
        // usuário cancelou
      }
    }
  };

  const coverImg = vehicle.images?.find(img => img.isCover)?.url || vehicle.images?.[0]?.url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-[#2A2A2A] rounded-3xl shadow-2xl p-5 sm:p-6 text-white space-y-4 sm:space-y-5 animate-fade-in focus:outline-none z-10">
        {/* Topo do Modal */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#222222]">
          <div>
            <h3 className="font-display font-bold text-sm tracking-widest text-[#F59C00] uppercase">
              COMPARTILHAR VEÍCULO
            </h3>
            <p className="text-xs text-[#888888] mt-0.5">{vehicle.brand} {vehicle.model} {vehicle.version}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Card de Preview do Carro com a Foto Real */}
        <div className="bg-[#141414] border border-[#262626] p-3 rounded-2xl flex items-center gap-3">
          {coverImg && (
            <img
              src={coverImg}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-16 h-16 rounded-xl object-cover border border-[#333333] shrink-0"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-display font-bold uppercase text-[#F59C00] tracking-wider block">
              {vehicle.brand}
            </span>
            <h4 className="text-sm font-bold text-white truncate font-display uppercase leading-tight">
              {vehicle.model} {vehicle.version}
            </h4>
            <p className="text-xs text-[#AAAAAA] mt-0.5">{vehicle.yearModel} · <strong className="text-white">{formatPrice(vehicle.price)}</strong></p>
          </div>
        </div>

        {/* Grade de Redes Sociais */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#25D366] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">WhatsApp</span>
          </a>

          {/* Pinterest com Imagem Direta */}
          <a
            href={pinterestUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#E60023] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no Pinterest com Foto"
          >
            <PinterestIcon className="w-5 h-5 text-[#E60023] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">Pinterest</span>
          </a>

          {/* Threads */}
          <a
            href={threadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-white flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no Threads"
          >
            <ThreadsIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">Threads</span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#0A66C2] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no LinkedIn"
          >
            <Share2 className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">LinkedIn</span>
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#1877F2] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no Facebook"
          >
            <Share2 className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">Facebook</span>
          </a>

          {/* Twitter / X */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-white flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no X (Twitter)"
          >
            <Share2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">X / Twitter</span>
          </a>

          {/* E-mail */}
          <a
            href={mailUrl}
            onClick={onClose}
            className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#F59C00] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar por E-mail"
          >
            <Share2 className="w-5 h-5 text-[#F59C00] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">E-mail</span>
          </a>

          {/* Mais Opções / Compartilhamento Nativo */}
          {typeof navigator !== 'undefined' && 'share' in navigator ? (
            <button
              type="button"
              onClick={handleNativeShare}
              className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#F59C00] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
              aria-label="Mais opções de compartilhamento"
            >
              <ExternalLink className="w-5 h-5 text-[#F59C00] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">Outros</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCopyLink}
              className="h-16 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#F59C00] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
              aria-label="Copiar link"
            >
              <Copy className="w-5 h-5 text-[#F59C00] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium group-hover:text-white">Copiar</span>
            </button>
          )}
        </div>

        {/* Botão Copiar Link com feedback visual */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full h-11 sm:h-12 bg-black hover:bg-[#151515] text-white border border-[#333333] hover:border-[#F59C00] rounded-2xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#F59C00]" />}
          <span>{copied ? 'Link e Descrição Copiados!' : 'Copiar Link Completo do Anúncio'}</span>
        </button>
      </div>
    </div>
  );
}
