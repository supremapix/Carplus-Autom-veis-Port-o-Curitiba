import React from 'react';
import { buildWhatsAppLink } from '../../lib/whatsapp';

export function RequestContinuation({ message = 'Olá! Gostaria de continuar meu atendimento na Carplus Autos.' }: { message?: string }) {
  return <div className="space-y-3 text-sm">
    <p>Para concluir, envie sua solicitação pelo WhatsApp. O preenchimento deste formulário não confirma o recebimento pela loja. Anexe as fotos na conversa, se necessário.</p>
    <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-[#F59C00] px-5 py-3 font-bold text-black focus-visible:outline-2 focus-visible:outline-offset-2">
      Continuar pelo WhatsApp
    </a>
  </div>;
}
