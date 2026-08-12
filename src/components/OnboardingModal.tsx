import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Smartphone, 
  ExternalLink,
  Sparkles,
  Loader2
} from 'lucide-react';
import { MetaService, MetaConnectionData } from '../services/metaService';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectionSuccess?: (data: MetaConnectionData) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose,
  onConnectionSuccess 
}) => {
  const [selectedOption, setSelectedOption] = useState<'option1' | 'option2' | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hasConfirmedDisclaimer, setHasConfirmedDisclaimer] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionData, setConnectionData] = useState<MetaConnectionData | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (option: 'option1' | 'option2') => {
    setSelectedOption(option);
    if (option === 'option1') {
      setShowDisclaimer(true);
    } else {
      setShowDisclaimer(false);
    }
  };

  const handleConfirmConnection = async () => {
    setIsConnecting(true);
    try {
      const data = await MetaService.launchEmbeddedSignup();
      setConnectionData(data);
      if (onConnectionSuccess) {
        onConnectionSuccess(data);
      }
      setTimeout(() => {
        setIsConnecting(false);
        onClose();
      }, 1800);
    } catch (error) {
      console.error('[Onboarding Connection Error]', error);
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-[#0C121E] p-6 shadow-2xl space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-1">
            <Sparkles className="h-3.5 w-3.5" /> Wizard de Conexão Transparente Meta WABA
          </div>
          <h2 className="text-xl font-extrabold text-white">Como você deseja conectar o seu WhatsApp?</h2>
          <p className="text-xs text-slate-400">
            Escolha o modelo ideal para a sua estrutura. Respeitamos 100% a sua privacidade.
          </p>
        </div>

        {/* Options Selection Grid */}
        {!showDisclaimer && !connectionData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* OPTION 1: Meta WABA Official */}
            <div
              onClick={() => handleSelectOption('option1')}
              className={`group relative rounded-2xl border p-4 cursor-pointer transition-all space-y-3 ${
                selectedOption === 'option1'
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  Ideal Imobiliárias
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Opção 1: WABA Meta Oficial (API Cloud)
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Para números comerciais dedicados da empresa. Conexão oficial via Popup Meta em 2 minutos.
                </p>
              </div>

              <ul className="text-[11px] text-slate-300 space-y-1.5 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Atendimento 24h em alta velocidade
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Zero risco de banimento de conta
                </li>
              </ul>
            </div>

            {/* OPTION 2: Autonomous Broker Virtual Assistant */}
            <div
              onClick={() => handleSelectOption('option2')}
              className={`group relative rounded-2xl border p-4 cursor-pointer transition-all space-y-3 ${
                selectedOption === 'option2'
                  ? 'border-teal-500 bg-teal-500/10 shadow-lg shadow-teal-500/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  <UserCheck className="h-5 w-5" />
                </div>
                <span className="rounded bg-teal-500/20 px-2 py-0.5 text-[10px] font-bold text-teal-300">
                  Corretor Autônomo
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                  Opção 2: Secretário Virtual IA
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Para quem usa 1 único celular com vida pessoal. Não mexe nem altera seu WhatsApp pessoal.
                </p>
              </div>

              <ul className="text-[11px] text-slate-300 space-y-1.5 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-teal-400" /> Mantém seu celular pessoal intocado
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" /> Link/QR Code de atendimento IA exclusivo
                </li>
              </ul>
            </div>

          </div>
        )}

        {/* DISCLAIMER MODAL FOR OPTION 1 */}
        {showDisclaimer && !connectionData && (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-3 text-slate-200 animate-fadeIn">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
              <span>Aviso Importante sobre Conexão de Número Comercial (Meta WABA)</span>
            </div>

            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                Para conectar este número à <strong>Cloud API Oficial da Meta</strong>:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                <li>Este número passará a ser uma <strong>Linha Comercial Dedicada</strong> da imobiliária.</li>
                <li>Se este for o seu número PESSOAL de WhatsApp (usado para a família no celular), o app móvel será desconectado para dar lugar à API da empresa.</li>
              </ol>
              <div className="rounded-xl bg-slate-950/80 p-2.5 text-[11px] text-amber-200 border border-amber-500/30">
                💡 <strong>Dica para Corretor Autônomo:</strong> Se você usa 1 único celular com sua vida pessoal, volte e escolha a <strong>Opção 2 (Secretário Virtual IA)</strong> para manter seu WhatsApp de celular intocado!
              </div>
            </div>

            <label className="flex items-center gap-2.5 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasConfirmedDisclaimer}
                onChange={(e) => setHasConfirmedDisclaimer(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-xs font-semibold text-white">
                Li e confirmo que estou conectando um Número Comercial Dedicado.
              </span>
            </label>

            <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
              <button
                onClick={() => setShowDisclaimer(false)}
                className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Voltar e Mudar de Opção
              </button>

              <button
                disabled={!hasConfirmedDisclaimer || isConnecting}
                onClick={handleConfirmConnection}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  hasConfirmedDisclaimer && !isConnecting
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                    <span>Conectando à Meta Cloud API...</span>
                  </>
                ) : (
                  <>
                    <span>Conectar via Meta Embedded Signup</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* CONNECTED SUCCESS STATE */}
        {connectionData && (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 animate-fadeIn">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 glow-emerald">
              <CheckCircle2 className="h-8 w-8 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-white">Conexão Meta WABA Realizada com Sucesso!</h3>
            
            <div className="w-full rounded-2xl bg-slate-900 border border-emerald-500/30 p-3.5 text-left text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Nome Verificado:</span>
                <span className="font-bold text-white">{connectionData.verifiedName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Número Conectado:</span>
                <span className="font-bold text-emerald-400">{connectionData.displayPhoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">WABA ID:</span>
                <span className="font-mono text-slate-400">{connectionData.wabaId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Qualidade de Sinal:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  🟢 {connectionData.qualityRating} ({connectionData.messagingLimitTier})
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-400 font-semibold">
              O SDR Agent Terra Nova já está ativo e respondendo leads em &lt; 30s.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
