import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Calculator, CheckCircle2, AlertCircle, Send, Banknote, ShieldCheck } from 'lucide-react';
import { createFinancingRequest } from '../services/leads';
import { getVehicles } from '../services/vehicles';
import { Vehicle } from '../types/vehicle';
import { Container } from '../components/ui/Container';
import { PageHero } from '../components/ui/PageHero';
import { Button } from '../components/ui/Button';

export function Financiamento() {
  const [searchParams] = useSearchParams();
  const preSelectedSlug = searchParams.get('veiculo');

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cnh, setCnh] = useState('sim');
  const [hasVehicle, setHasVehicle] = useState('nao');
  const [downPayment, setDownPayment] = useState<number | ''>('');
  const [installments, setInstallments] = useState(48);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [lgpdAccepted, setLgpdAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getVehicles().then((data) => {
      setVehicles(data);
      if (preSelectedSlug) {
        const found = data.find((v) => v.slug === preSelectedSlug);
        if (found) setSelectedVehicleId(found.id);
      }
    });
  }, [preSelectedSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !whatsapp.trim() || !cpf.trim()) {
      setErrorMsg('Por favor, preencha nome, CPF e WhatsApp.');
      return;
    }

    if (!lgpdAccepted) {
      setErrorMsg('É necessário aceitar a Política de Privacidade para prosseguir.');
      return;
    }

    setLoading(true);
    try {
      const chosenVehicle = vehicles.find((v) => v.id === selectedVehicleId);

      await createFinancingRequest({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim() || undefined,
        cpf: cpf.trim(),
        birthDate: birthDate || undefined,
        hasCnh: cnh === 'sim',
        hasTradeIn: hasVehicle === 'sim',
        downPayment: downPayment ? Number(downPayment) : 0,
        installments: Number(installments),
        vehicleId: selectedVehicleId || undefined,
        vehicleName: chosenVehicle
          ? `${chosenVehicle.brand} ${chosenVehicle.model} ${chosenVehicle.version} ${chosenVehicle.yearModel}`
          : undefined,
        lgpdAccepted,
      });

      setSuccess(true);
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao enviar sua solicitação de financiamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero Preto */}
      <PageHero
        kicker="TAXAS COMPETITIVAS"
        title="SIMULAÇÃO DE FINANCIAMENTO"
        subtitle="Parceria direta com os principais bancos e financeiras. Simule prazos em até 60x com as menores taxas de juros de Curitiba."
        breadcrumbs={[
          { label: 'Início', href: '/' },
          { label: 'Financiamento' },
        ]}
      />

      <div className="py-12 sm:py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Benefícios Financiamento */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl p-6 text-center shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] flex items-center justify-center mx-auto mb-4">
                  <Banknote className="w-6 h-6" />
                </div>
                <h2 className="font-display font-bold text-base uppercase text-[#121212] tracking-wide">
                  Até 60 Parcelas
                </h2>
                <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
                  Planos flexíveis que cabem no seu orçamento mensal.
                </p>
              </div>

              <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl p-6 text-center shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="font-display font-bold text-base uppercase text-[#121212] tracking-wide">
                  Aprovação Ágil
                </h2>
                <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
                  Resposta rápida dos bancos parceiros diretamente no WhatsApp.
                </p>
              </div>

              <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl p-6 text-center shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-black text-[#F59C00] flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="font-display font-bold text-base uppercase text-[#121212] tracking-wide">
                  Sem Burocracia
                </h2>
                <p className="text-xs text-[#666666] mt-1.5 leading-relaxed">
                  Cuidamos de todo o processo de análise e documentação.
                </p>
              </div>
            </div>

            {/* Card do Formulário */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-3xl p-6 sm:p-10 shadow-xl">
              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h2 className="font-display font-bold text-3xl uppercase tracking-wide text-[#121212]">
                    Solicitação Enviada com Sucesso!
                  </h2>
                  <p className="text-base text-[#666666] max-w-md mx-auto leading-relaxed">
                    Nossa equipe entrará em contato via WhatsApp com as opções de planos e taxas de financiamento.
                  </p>
                  <div className="pt-4">
                    <Button
                      onClick={() => setSuccess(false)}
                      variant="primary"
                    >
                      NOVA SIMULAÇÃO
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Seleção do Veículo */}
                  <div>
                    <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#F59C00] mb-4 pb-2 border-b border-[#E0E0E0] flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      <span>1. Veículo Desejado</span>
                    </h2>
                    <div>
                      <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                        Escolha o veículo do estoque (ou deixe em branco para simulação geral)
                      </label>
                      <select
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                        className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00] font-medium"
                      >
                        <option value="">Ainda não escolhi o modelo específico</option>
                        {vehicles.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.brand} {v.model} {v.version} ({v.yearModel}) — R$ {v.price.toLocaleString('pt-BR')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dados Pessoais */}
                  <div>
                    <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#F59C00] mb-4 pb-2 border-b border-[#E0E0E0]">
                      2. Seus Dados Pessoais
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Seu nome"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          CPF *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="000.000.000-00"
                          value={cpf}
                          onChange={(e) => setCpf(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="(41) 99999-9999"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Data de Nascimento
                        </label>
                        <input
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Simulação de Valores */}
                  <div>
                    <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#F59C00] mb-4 pb-2 border-b border-[#E0E0E0]">
                      3. Condições Desejadas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Valor de Entrada (R$)
                        </label>
                        <input
                          type="number"
                          placeholder="Ex: 20000"
                          value={downPayment}
                          onChange={(e) => setDownPayment(e.target.value ? Number(e.target.value) : '')}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Número de Parcelas
                        </label>
                        <select
                          value={installments}
                          onChange={(e) => setInstallments(Number(e.target.value))}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        >
                          <option value={12}>12x</option>
                          <option value={24}>24x</option>
                          <option value={36}>36x</option>
                          <option value={48}>48x</option>
                          <option value={60}>60x</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#121212] mb-1.5">
                          Possui CNH?
                        </label>
                        <select
                          value={cnh}
                          onChange={(e) => setCnh(e.target.value)}
                          className="w-full h-12 bg-white border border-[#E0E0E0] rounded-xl px-4 text-sm text-[#121212] focus:outline-none focus:border-[#F59C00]"
                        >
                          <option value="sim">Sim, possuo CNH</option>
                          <option value="nao">Não possuo</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Checkbox LGPD */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 text-xs text-[#666666] cursor-pointer font-medium">
                      <input
                        type="checkbox"
                        required
                        checked={lgpdAccepted}
                        onChange={(e) => setLgpdAccepted(e.target.checked)}
                        className="rounded border-[#CCCCCC] text-[#F59C00] focus:ring-0 w-5 h-5 mt-0.5"
                      />
                      <span>
                        Autorizo a consulta e envio das informações para análise cadastral conforme a{' '}
                        <Link to="/politica-de-privacidade" target="_blank" className="text-[#121212] font-bold underline">
                          Política de Privacidade
                        </Link>.
                      </span>
                    </label>
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-4 rounded-xl border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="primary"
                      size="lg"
                      icon={<Send className="w-5 h-5 text-black" />}
                    >
                      {loading ? 'ENVIANDO DADOS...' : 'SOLICITAR SIMULAÇÃO DE FINANCIAMENTO'}
                    </Button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
}
