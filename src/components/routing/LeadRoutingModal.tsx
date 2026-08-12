import React from 'react';
import { ShieldCheck, UserCheck, Building2, MessageCircle, X, Sparkles, Award, Compass, Layers } from 'lucide-react';

interface LeadRoutingModalProps {
  isOpen: boolean;
  propertyTitle: string;
  developerName?: string;
  onClose: () => void;
  onSelectRoute: (routeType: 'terranova_specialist' | 'multi_development_curatorship' | 'direct_advertiser') => void;
}

export const LeadRoutingModal: React.FC<LeadRoutingModalProps> = ({
  isOpen,
  propertyTitle,
  developerName,
  onClose,
  onSelectRoute
}) => {
  if (!isOpen) return null;

  const isDevelopment = !!developerName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-teal-500/40 bg-[#080C14] p-6 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl bg-slate-900/80 p-2 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-400 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/20">
            <Compass className="h-6 w-6" />
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-white">
            Filtro de Curadoria Inteligente
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Você solicitou atendimento para o lançamento: <strong className="text-teal-300 block truncate font-semibold mt-0.5">"{propertyTitle}"</strong>
          </p>
        </div>

        {/* Options Grid (Filtro de Curadoria e Intenção) */}
        <div className="space-y-3">
          
          {/* Option A: Multi-Development Curatorship in Maringá (High Value Strategy) */}
          <button
            onClick={() => onSelectRoute('multi_development_curatorship')}
            className="group relative flex w-full items-start gap-4 rounded-2xl border border-teal-500/50 bg-gradient-to-r from-teal-950/50 via-slate-900 to-cyan-950/30 p-4 text-left transition-all hover:border-teal-400 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-teal-500/15 cursor-pointer"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
              <Sparkles className="h-5 w-5" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white group-hover:text-teal-300">
                  Curadoria com Especialista em Lançamentos (Maringá)
                </span>
                <span className="rounded-full bg-teal-500/20 px-2 py-0.5 text-[10px] font-bold text-teal-300 border border-teal-500/30">
                  Mais Escolhida
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Abre o leque de oportunidades: compara {developerName || 'as construtoras'} com outros lançamentos de Maringá para encontrar a planta perfeita e agendar visitas integradas.
              </p>
            </div>
          </button>

          {/* Option B: Direct Developer Connection */}
          <button
            onClick={() => onSelectRoute('direct_advertiser')}
            className="group flex w-full items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition-all hover:border-slate-700 hover:bg-slate-900 cursor-pointer"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200 transition-colors">
              <Building2 className="h-5 w-5" />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-200 group-hover:text-white">
                Falar Exclusivamente com a Construtora {developerName ? `(${developerName})` : ''}
              </div>
              <p className="text-xs text-slate-400">
                Encaminhamento direto para o plantão de vendas oficial da construtora responsável por este lançamento.
              </p>
            </div>
          </button>

        </div>

        {/* Footer Disclaimer */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
          <span>Curadoria neutra auditada por regras RLS TerraNova OS</span>
        </div>

      </div>
    </div>
  );
};
