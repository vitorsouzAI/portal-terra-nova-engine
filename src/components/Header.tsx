import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Tractor, 
  Building, 
  Home, 
  MessageSquare,
  PlusCircle, 
  Plus,
  UserCheck,
  Sparkles,
  Terminal
} from 'lucide-react';
import { MainSectionMode } from '../types';
import { AttributionService, BrokerAttribution } from '../services/attributionService';

interface HeaderProps {
  activeSection: MainSectionMode;
  onSelectSection: (section: MainSectionMode) => void;
  onOpenOnboarding: () => void;
  onOpenPropertyManager: () => void;
  onOpenCouncilChat: () => void;
  selectedMode: 'tenant' | 'autonomous';
  setSelectedMode: (mode: 'tenant' | 'autonomous') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeSection,
  onSelectSection,
  onOpenOnboarding, 
  onOpenPropertyManager,
  onOpenCouncilChat,
  selectedMode, 
  setSelectedMode 
}) => {
  const [activeAttribution, setActiveAttribution] = useState<BrokerAttribution | null>(null);

  useEffect(() => {
    const attr = AttributionService.detectAndStoreAttribution();
    setActiveAttribution(attr);
  }, []);

  return (
    <header className="glass-panel sticky top-0 z-40 border-b border-slate-800/80 px-4 py-3 bg-[#080C14]/95 backdrop-blur-xl">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-400 to-cyan-400 font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
            <Building2 className="h-5 w-5 text-slate-950" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white cursor-pointer" onClick={() => onSelectSection('rural')}>
                TerraNova <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">OS</span>
              </h1>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                Cognitive OS
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Vitrine de Luxo & Agronegócio</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Atribuição de Afiliado Ativa
              </span>
            </p>
          </div>
        </div>

        {/* Personalized Broker Attribution Badge */}
        {activeAttribution && (
          <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/40 px-3.5 py-1.5 shadow-lg animate-in fade-in">
            <UserCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-400">Atendimento Exclusivo: </span>
              <strong className="text-emerald-300 font-bold">{activeAttribution.brokerName}</strong>
            </div>
          </div>
        )}

        {/* Immersive "Mundos" Navigation Tabs */}
        <nav className="flex items-center gap-1.5 rounded-2xl bg-slate-950/90 p-1.5 border border-slate-800 shadow-inner">
          
          {/* Mundo 1: Agro & Rural */}
          <button
            onClick={() => onSelectSection('rural')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSection === 'rural'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Tractor className="h-4 w-4" />
            <span>Mundo Agro</span>
          </button>

          {/* Mundo 2: Construtoras Maringá (DWV) */}
          <button
            onClick={() => onSelectSection('maringa-construtoras')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSection === 'maringa-construtoras'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Building className="h-4 w-4" />
            <span>Mundo Lançamentos (DWV)</span>
          </button>

          {/* Mundo 3: Prontos de Luxo */}
          <button
            onClick={() => onSelectSection('prontos')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSection === 'prontos'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Mundo Prontos</span>
          </button>

          {/* Central do Corretor */}
          <button
            onClick={() => onSelectSection('crm')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSection === 'crm'
                ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Central Corretor</span>
          </button>

          {/* Mundo Dev / Oficina Metacognitiva do Desenvolvimento */}
          <button
            onClick={() => onSelectSection('dev-cockpit')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSection === 'dev-cockpit'
                ? 'bg-gradient-to-r from-purple-500 via-teal-400 to-cyan-400 text-slate-950 shadow-lg shadow-purple-500/25 scale-[1.02]'
                : 'text-purple-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Terminal className="h-4 w-4 text-purple-400" />
            <span>Mundo Dev</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Antigravity Meta-Chat Button */}
          <button
            onClick={onOpenCouncilChat}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 border border-teal-500/40 px-3.5 py-2 text-xs font-extrabold text-teal-300 transition-all cursor-pointer shadow-md active:scale-95"
          >
            <Sparkles className="h-4 w-4 text-teal-400 animate-pulse" />
            <span>🏛️ Meta-Chat IAs</span>
          </button>

          <button
            onClick={onOpenPropertyManager}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-bold text-slate-200 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Plus className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">+ Novo Imóvel</span>
          </button>

          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Conectar Imobiliária</span>
          </button>
        </div>

      </div>
    </header>
  );
};
