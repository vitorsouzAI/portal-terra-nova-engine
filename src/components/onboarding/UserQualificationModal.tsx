import React from 'react';
import { Sparkles, Building2, UserCheck, KeyRound, ArrowRight } from 'lucide-react';

interface UserQualificationModalProps {
  isOpen: boolean;
  onSelectProfile: (profile: 'buyer' | 'broker' | 'owner') => void;
  onSkip: () => void;
}

export const UserQualificationModal: React.FC<UserQualificationModalProps> = ({
  isOpen,
  onSelectProfile,
  onSkip
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-500/30 bg-[#080C14] p-8 shadow-2xl space-y-6">
        
        {/* Modal Header — NO "X" CLOSE BUTTON HERE */}
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/25">
            <Sparkles className="h-7 w-7" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            Para personalizar sua experiência
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Selecione qual perfil melhor descreve o seu objetivo no <strong className="text-emerald-400 font-semibold">TerraNova OS</strong>:
          </p>
        </div>

        {/* 3 Profile Selection Cards */}
        <div className="space-y-3">
          
          {/* Profile 1: Comprador / Investidor */}
          <button
            onClick={() => onSelectProfile('buyer')}
            className="group flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                  Sou Comprador / Investidor
                </div>
                <div className="text-xs text-slate-400">
                  Procuro fazendas, lançamentos ou imóveis urbanos em Maringá.
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
          </button>

          {/* Profile 2: Corretor ou Imobiliária */}
          <button
            onClick={() => onSelectProfile('broker')}
            className="group flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left transition-all hover:border-teal-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-teal-500/10 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white group-hover:text-teal-400 transition-colors">
                  Sou Corretor ou Imobiliária
                </div>
                <div className="text-xs text-slate-400">
                  Quero anunciar meu portfólio e usar o atendimento automatizado.
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all shrink-0" />
          </button>

          {/* Profile 3: Proprietário de Imóvel ou Terra */}
          <button
            onClick={() => onSelectProfile('owner')}
            className="group flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left transition-all hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                  Sou Proprietário de Imóvel ou Terra
                </div>
                <div className="text-xs text-slate-400">
                  Quero avaliar o ativo com Nota de Liquidez ALS e vender com rapidez.
                </div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
          </button>

        </div>

        {/* Footer Option "agora não" — NO HIGHLIGHT, NO UNDERLINE, SMALL GREY TEXT */}
        <div className="pt-2 text-center">
          <button 
            onClick={onSkip}
            className="text-[11px] font-normal text-slate-600 hover:text-slate-400 transition-colors cursor-pointer select-none"
          >
            agora não
          </button>
        </div>

      </div>
    </div>
  );
};
