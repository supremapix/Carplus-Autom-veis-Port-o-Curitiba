import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Camera, Users, ArrowRight } from 'lucide-react';

export function Consignacao() {
  const advantages = [
    {
      icon: <Camera className="w-6 h-6 text-[#d97706]" />,
      title: 'Divulgação Profissional',
      description: 'Fotografia de alta qualidade, anúncio completo em nosso estoque online e nas principais plataformas automotivas.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#d97706]" />,
      title: 'Atendimento & Triagem',
      description: 'Nossa equipe atende todos os interessados, filtra curiosos e conduz as propostas reais com segurança.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#d97706]" />,
      title: 'Segurança & Comodidade',
      description: 'Seu carro exposto em loja física no bairro Portão em Curitiba sem que você precise receber estranhos na sua residência.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-2 h-4 bg-[#F59C00] rounded-xs inline-block" />
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#d97706]">
              VENDA COM SEGURANÇA
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-slate-900 tracking-wide">
            CONSIGNAÇÃO DE VEÍCULOS
          </h1>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Deixe seu seminovo em nossa loja física em Curitiba e conte com a estrutura da Carplus Autos para intermediar a venda do seu carro.
          </p>
        </div>

        {/* Bloco explicativo */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 mb-12 space-y-6 shadow-xl shadow-slate-900/5">
          <h2 className="font-display font-bold text-2xl uppercase text-slate-900 tracking-wide">
            Como funciona a Consignação na Carplus Autos?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            A consignação é a melhor alternativa para quem deseja vender seu carro pelo valor de mercado sem abrir mão da tranquilidade. Você nos confia o veículo, e nós cuidamos de toda a vitrine, atendimento a potenciais compradores, apresentação presencial, esclarecimento de dúvidas e trâmites de transferência.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            {advantages.map((adv, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  {adv.icon}
                </div>
                <h3 className="font-display font-bold text-base uppercase text-slate-900 mb-1.5">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Deseja avaliar a consignação do seu carro?
              </p>
              <p className="text-xs text-slate-500">
                Preencha os dados do veículo pelo nosso formulário online.
              </p>
            </div>

            <Link
              to="/venda-seu-carro"
              className="px-8 py-3.5 bg-[#F59C00] hover:bg-[#F7941D] text-black font-display font-bold text-sm tracking-wider uppercase rounded-xl transition-all transform active:scale-95 shadow-lg shadow-[#F59C00]/20 flex items-center gap-2"
            >
              <span>QUERO VENDER MEU VEÍCULO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
