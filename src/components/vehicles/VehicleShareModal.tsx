import React, { useState } from 'react';
import { Share2, MessageCircle, X as CloseIcon, Copy, Check } from 'lucide-react';
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

  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '';
  const encodedUrl = encodeURIComponent(currentUrl);
  const shareText = encodeURIComponent(`Confira este ${vehicle.brand} ${vehicle.model} ${vehicle.yearModel} por ${formatPrice(vehicle.price)} na Carplus Autos Curitiba:`);
  const rawText = `Confira este ${vehicle.brand} ${vehicle.model} ${vehicle.yearModel} por ${formatPrice(vehicle.price)} na Carplus Autos Curitiba`;
  const vehicleImage = vehicle.images?.[0] ? encodeURIComponent(vehicle.images[0]) : '';

  const handleCopyLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`${rawText} — ${currentUrl}`).then(() => {
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
          text: rawText,
          url: currentUrl,
        });
        onClose();
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl shadow-2xl p-6 text-white space-y-5 animate-fade-in focus:outline-none z-10">
        <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
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

        {/* Informações do Veículo */}
        <div className="bg-[#141414] border border-[#222222] p-3.5 rounded-xl flex items-center gap-3">
          {vehicle.images?.[0] && (
            <img
              src={vehicle.images[0]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-14 h-14 rounded-lg object-cover border border-[#333333] shrink-0"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate font-display uppercase">
              {vehicle.brand} {vehicle.model}
            </h4>
            <p className="text-xs text-[#AAAAAA]">{vehicle.yearModel} · {formatPrice(vehicle.price)}</p>
          </div>
        </div>

        {/* Grade 4x2 com Pinterest, Threads, WhatsApp, etc */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%2520-%2520${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">WhatsApp</span>
          </a>

          {/* Threads */}
          <a
            href={`https://threads.net/intent/post?text=${shareText}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no Threads"
          >
            <ThreadsIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">Threads</span>
          </a>

          {/* Pinterest */}
          <a
            href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${vehicleImage}&description=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no Pinterest"
          >
            <PinterestIcon className="w-5 h-5 text-[#E60023] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">Pinterest</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no Facebook"
          >
            <Share2 className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">Facebook</span>
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no X (Twitter)"
          >
            <Share2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">X / Twitter</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar no LinkedIn"
          >
            <Share2 className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">LinkedIn</span>
          </a>

          {/* E-mail */}
          <a
            href={`mailto:?subject=${encodeURIComponent(`${vehicle.brand} ${vehicle.model} - Carplus Autos`)}&body=${shareText}%0A%0A${encodedUrl}`}
            onClick={onClose}
            className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
            aria-label="Compartilhar por E-mail"
          >
            <Share2 className="w-5 h-5 text-[#F59C00] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">E-mail</span>
          </a>

          {/* Native Share ou Copiar */}
          {typeof navigator !== 'undefined' && 'share' in navigator ? (
            <button
              type="button"
              onClick={handleNativeShare}
              className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
              aria-label="Mais opções"
            >
              <Share2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">Mais</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCopyLink}
              className="h-16 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
              aria-label="Copiar link"
            >
              <Copy className="w-5 h-5 text-[#F59C00] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] sm:text-[11px] text-[#AAAAAA] font-medium">Copiar</span>
            </button>
          )}
        </div>

        {/* Botão Copiar Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full h-12 bg-black hover:bg-[#151515] text-white border border-[#333333] rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#F59C00]" />}
          <span>{copied ? 'Link Copiado!' : 'Copiar Link do Anúncio'}</span>
        </button>
      </div>
    </div>
  );
}
