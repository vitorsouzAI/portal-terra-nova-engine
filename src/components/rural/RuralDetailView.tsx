import React from 'react';
import { RuralProperty } from '../../types';
import { 
  ArrowLeft, 
  MapPin, 
  FileText, 
  MessageCircle, 
  Sparkles,
  Tractor,
  Award,
  Video,
  Calendar
} from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { SEOService } from '../../services/seoService';

interface RuralDetailViewProps {
  property: RuralProperty;
  onBack: () => void;
  onOpenWhatsAppLead: (propertyId: string, propertyTitle: string) => void;
  isRouted: boolean;
}

export const RuralDetailView: React.FC<RuralDetailViewProps> = ({
  property,
  onBack,
  onOpenWhatsAppLead,
  isRouted
}) => {
  const seoData = SEOService.generateRuralSEO(property);

  return (
    <div className="flex-1 overflow-y-auto bg-[#080C14] px-4 py-6 text-slate-100">
      <SEOHead seo={seoData} />

      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para o Portal Rural</span>
        </button>

        {/* Title Header & Main Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Tractor className="h-4 w-4" />
              <span>{property.aptitude}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{property.region}</span>
            </div>
            <h1 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              {property.title}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              <span>{property.city}/{property.state} • CAR: {property.carNumber || 'Auditado no SICAR'}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Preço Solicitado</div>
              <div className="text-2xl font-black text-white">{property.price}</div>
            </div>

            {/* Dynamic CTA Button: Shows "Agendar Visita" ONLY AFTER routing choice is made! */}
            {isRouted ? (
              <button
                onClick={() => onOpenWhatsAppLead(property.id, property.title)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer animate-in fade-in"
              >
                <Calendar className="h-5 w-5" />
                <span>🗓️ Agendar Visita Técnica</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenWhatsAppLead(property.id, property.title)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 fill-slate-950" />
                <span>Solicitar Dossiê & Curadoria</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery & Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800">
            <img 
              src={property.imageUrl} 
              alt={property.title} 
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-xl bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-emerald-400 backdrop-blur-md border border-emerald-500/30">
              <Award className="h-4 w-4" />
              <span>Asset Liquidity Score: {property.liquidityScore}/100</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {property.galleryImages.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                <img src={img} alt="" className="h-full w-full object-cover" />
              </div>
            ))}

            {property.droneVideoUrl && (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 p-4 text-xs font-bold text-emerald-400 hover:bg-slate-800 cursor-pointer">
                <Video className="h-5 w-5" />
                <span>Assistir Tour Virtual de Drone (HD)</span>
              </div>
            )}
          </div>
        </div>

        {/* 7-Step Commercial Narrative (Story Engine) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <Sparkles className="h-5 w-5" />
              <h2>Tese Comercial em 7 Passos (Story Engine Auditado)</h2>
            </div>
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
              Fatos 100% Verificados
            </span>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            {/* Step 1: Hook */}
            <div className="rounded-xl bg-slate-950/80 p-4 border-l-4 border-emerald-500">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Passo 1 • O Gancho</div>
              <p className="mt-1 font-semibold text-white">{property.storyNarrative.hook}</p>
            </div>

            {/* Step 2: Expectation Subversion */}
            <div className="rounded-xl bg-slate-950/80 p-4 border-l-4 border-teal-500">
              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Passo 2 • Quebra de Expectativa</div>
              <p className="mt-1">{property.storyNarrative.expectationSubversion}</p>
            </div>

            {/* Step 3: Anchor Metric */}
            <div className="rounded-xl bg-slate-950/80 p-4 border-l-4 border-amber-500">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Passo 3 • Métrica Âncora</div>
              <p className="mt-1 font-bold text-amber-300">{property.storyNarrative.anchorMetric}</p>
            </div>

            {/* Step 4 & 5 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Passo 4 • Diferencial Estrutural</div>
                <p className="mt-1 text-slate-200">{property.storyNarrative.unfairAdvantage}</p>
              </div>

              <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Passo 5 • Divisão Terra + Benfeitorias</div>
                <p className="mt-1 text-slate-200">{property.storyNarrative.assetLandBreakdown}</p>
              </div>
            </div>

            {/* Step 6 & 7 */}
            <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Passo 6 • Posicionamento de Mercado</div>
              <p className="mt-1 text-slate-200">{property.storyNarrative.marketPositioning}</p>
            </div>

            <div className="rounded-xl bg-emerald-950/30 p-4 border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Passo 7 • Chamada para Ação (CTA)</div>
                <p className="mt-1 font-bold text-white">{property.storyNarrative.highIntentCTA}</p>
              </div>
              <button
                onClick={() => onOpenWhatsAppLead(property.id, property.title)}
                className="shrink-0 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer"
              >
                {isRouted ? '🗓️ Agendar Visita' : 'Solicitar Atendimento'}
              </button>
            </div>
          </div>
        </div>

        {/* Claim Provenance Audit Section */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2>Rastreabilidade Epistêmica de Claims (Claim Provenance)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {property.provenanceClaims.map((claim) => (
              <div key={claim.claimId} className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">{claim.status}</span>
                  <span className="text-slate-400">Confiança: {(claim.confidence * 100).toFixed(0)}%</span>
                </div>
                <p className="text-xs font-semibold text-slate-200">{claim.statement}</p>
                <div className="text-[11px] text-slate-500">Fonte: {claim.source}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
