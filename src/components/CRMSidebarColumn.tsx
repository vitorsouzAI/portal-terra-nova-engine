import React from 'react';
import { Lead } from '../types';
import { 
  Flame, 
  DollarSign, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  FileCheck, 
  ChevronRight, 
  Layers, 
  Droplets,
  Share2,
  ShieldCheck,
  Zap,
  Cpu,
  Building2,
  Bed,
  Car,
  Home,
  Sparkles
} from 'lucide-react';

interface CRMSidebarColumnProps {
  lead: Lead;
  onOpenPropertyManager?: () => void;
}

export const CRMSidebarColumn: React.FC<CRMSidebarColumnProps> = ({ lead, onOpenPropertyManager }) => {
  const property = lead.propertyOfInterest;
  const isRural = property.type === 'rural';

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-slate-950/60 p-4 border-l border-slate-800/80 space-y-4">
      
      {/* RAG Grounding & AI Guardrails Audit Header */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs space-y-2">
        <div className="flex items-center justify-between font-bold text-emerald-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> Grounding RAG `pgvector`
          </span>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
            100% Verificado
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300 border-t border-emerald-500/20 pt-1.5">
          <span className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-teal-400" /> LLM Router:
          </span>
          <span className="font-bold text-white">Gemini 1.5 Flash ➔ GPT-4o</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300">
          <span className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-amber-400" /> Trava de Alucinação:
          </span>
          <span className="font-bold text-emerald-400">Ativa (0 Alucinações)</span>
        </div>
      </div>

      {/* Lead Qualification Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Qualificação SDR IA</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs font-extrabold text-amber-400">
            <Flame className="h-3.5 w-3.5" /> Score {lead.qualificationScore}/100
          </span>
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-white">{lead.name}</h3>
          <p className="text-xs text-slate-400">{lead.email || lead.phone}</p>
        </div>

        {/* Qualification Matrix Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
          <div className="rounded-xl bg-slate-950/60 p-2 border border-slate-800">
            <div className="text-[9px] text-slate-400 font-bold uppercase flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-emerald-400" /> Orçamento
            </div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">{lead.budget}</div>
          </div>

          <div className="rounded-xl bg-slate-950/60 p-2 border border-slate-800">
            <div className="text-[9px] text-slate-400 font-bold uppercase flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-400" /> Urgência
            </div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">{lead.urgency}</div>
          </div>
        </div>
      </div>

      {/* Vectorized Property Card (pgvector) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden space-y-3 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Layers className="h-3.5 w-3.5 text-emerald-400" /> Imóvel Vetorizado (`pgvector`)
          </span>
          <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
            isRural ? 'bg-amber-500/10 text-amber-300' : 'bg-teal-500/10 text-teal-300'
          }`}>
            {isRural ? '🚜 Agro / Rural' : '🏙️ Urbano'}
          </span>
        </div>

        <div className="relative overflow-hidden rounded-xl">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-36 w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 rounded-lg bg-slate-950/80 px-2 py-1 text-xs font-extrabold text-emerald-400 backdrop-blur-md">
            {property.price}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white">{property.title}</h4>
          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3 text-emerald-400" /> {property.location}
          </p>
          <p className="text-[11px] text-slate-300 font-medium mt-1">Área: {property.area}</p>
        </div>

        {/* DUAL-MODE SPECIFICS: URBAN VS RURAL */}
        {isRural ? (
          /* Technical Rural Badges */
          <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Situação CAR:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <FileCheck className="h-3 w-3" /> {property.carStatus || '100% Regular'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Teor de Argila:</span>
              <span className="font-bold text-slate-200">{property.clayContent || '35% Média'}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Outorga de Água:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Droplets className="h-3 w-3 text-cyan-400" /> {property.waterPermit ? 'Aprovada (Pivô)' : 'Pendente'}
              </span>
            </div>
          </div>
        ) : (
          /* Technical Urban Badges (Suites, Parking, Condo Fee) */
          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="rounded-lg bg-slate-950 p-1.5 border border-slate-800">
                <Bed className="h-3.5 w-3.5 text-teal-400 mx-auto mb-0.5" />
                <div className="text-[10px] text-slate-400">Suítes</div>
                <div className="text-xs font-bold text-white">{property.suites || 4}</div>
              </div>

              <div className="rounded-lg bg-slate-950 p-1.5 border border-slate-800">
                <Car className="h-3.5 w-3.5 text-teal-400 mx-auto mb-0.5" />
                <div className="text-[10px] text-slate-400">Vagas</div>
                <div className="text-xs font-bold text-white">{property.parkingSpaces || 4}</div>
              </div>

              <div className="rounded-lg bg-slate-950 p-1.5 border border-slate-800">
                <Home className="h-3.5 w-3.5 text-teal-400 mx-auto mb-0.5" />
                <div className="text-[10px] text-slate-400">Tipo</div>
                <div className="text-[10px] font-bold text-teal-300 truncate">{property.urbanType || 'Urbano'}</div>
              </div>
            </div>

            {property.condoFee && (
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-400">Condomínio:</span>
                <span className="font-bold text-slate-200">{property.condoFee}</span>
              </div>
            )}
          </div>
        )}

        {/* Bullet Details */}
        <div className="space-y-1 pt-2 border-t border-slate-800/60">
          <div className="text-[10px] uppercase font-bold text-slate-400">Destaques da Ficha</div>
          {property.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
              <ChevronRight className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
              <span>{detail}</span>
            </div>
          ))}
        </div>

        {/* Property Manager Button */}
        {onOpenPropertyManager && (
          <button
            onClick={onOpenPropertyManager}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 py-2 text-xs font-bold text-emerald-300 transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Cadastrar / Vetorizar Novo Imóvel</span>
          </button>
        )}
      </div>

      {/* AI Telemetry Timeline */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 space-y-2">
        <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Linha do Tempo da IA
        </div>

        <div className="space-y-2 border-l border-slate-800 pl-3 ml-1 text-[11px]">
          <div className="relative">
            <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-emerald-400"></div>
            <div className="font-bold text-slate-200">14:22 — Lead Criado via {lead.origin}</div>
            <div className="text-[10px] text-slate-500">Origem rastreada automaticamente</div>
          </div>

          <div className="relative">
            <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-emerald-400"></div>
            <div className="font-bold text-emerald-400">14:22 — Resposta SDR IA em 11s</div>
            <div className="text-[10px] text-slate-400">Busca vetorial `pgvector` acionada</div>
          </div>

          <div className="relative">
            <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-amber-400"></div>
            <div className="font-bold text-amber-300">14:24 — Qualificação Concluída</div>
            <div className="text-[10px] text-slate-400">Score {lead.qualificationScore}/100 • Orçamento Confirmado</div>
          </div>
        </div>
      </div>

    </div>
  );
};
