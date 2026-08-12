import React, { useState } from 'react';
import { MaringaDevelopment } from '../../types';
import { mockMaringaDevelopments } from '../../data/mockMaringaDevelopments';
import { Building, Video, Sparkles, MapPin, ExternalLink, MessageCircle, CheckCircle2, Calendar, Filter, Search, Grid, List } from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { SEOService } from '../../services/seoService';

interface MaringaDevelopersViewProps {
  onOpenWhatsAppLead: (propertyId: string, propertyTitle: string, developerName?: string) => void;
  routedPropertiesMap: Record<string, string>;
}

export const MaringaDevelopersView: React.FC<MaringaDevelopersViewProps> = ({ 
  onOpenWhatsAppLead,
  routedPropertiesMap
}) => {
  const [developments] = useState<MaringaDevelopment[]>(mockMaringaDevelopments);
  const [selectedDev, setSelectedDev] = useState<MaringaDevelopment | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeveloperFilter, setSelectedDeveloperFilter] = useState<string>('all');
  const [selectedNeighborhoodFilter, setSelectedNeighborhoodFilter] = useState<string>('all');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

  const filteredDevelopments = developments.filter((dev) => {
    const matchesSearch = 
      dev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.developerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDev = selectedDeveloperFilter === 'all' || dev.developerName === selectedDeveloperFilter;
    const matchesNeigh = selectedNeighborhoodFilter === 'all' || dev.neighborhood.includes(selectedNeighborhoodFilter);

    return matchesSearch && matchesDev && matchesNeigh;
  });

  const defaultSEO = SEOService.generateDevelopmentSEO(developments[0]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#080C14] px-4 py-6 text-slate-100">
      <SEOHead seo={defaultSEO} />

      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Banner Hero Construtoras de Maringá - Layout Familiar e Identificável */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-950/90 via-slate-900 to-cyan-950/90 p-8 border border-teal-500/20 shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <Building className="h-4 w-4" />
              <span>Portal de Lançamentos Imobiliários • Maringá/PR</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Lançamentos & Apartamentos na Planta <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">Maringá</span>
            </h1>
            <p className="text-sm text-slate-300">
              Encontre lançamentos em obras e prontos para morar das maiores construtoras de Maringá (A.Yoshii, Catamarã, Plaenge, Vanguard). Tabela oficial de preços e plantas atualizadas.
            </p>
          </div>
        </div>

        {/* Familiar Search & Filter Bar for Launch Portals */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-slate-900/90 p-4 border border-slate-800 backdrop-blur-md">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por empreendimento, construtora ou bairro (Zona 01, Zona 03, Novo Centro)..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-200 placeholder-slate-500 focus:border-teal-500 focus:outline-none"
            />
          </div>

          {/* Builder Selector Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-teal-400 shrink-0" />
            <select
              value={selectedDeveloperFilter}
              onChange={(e) => setSelectedDeveloperFilter(e.target.value)}
              className="rounded-xl bg-slate-950 border border-slate-800 py-2.5 px-3 text-xs font-semibold text-slate-200 focus:border-teal-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Todas as Construtoras</option>
              <option value="A.Yoshii Engenharia">A.Yoshii Engenharia</option>
              <option value="Catamarã Engenharia">Catamarã Engenharia</option>
              <option value="Plaenge Empreendimentos">Plaenge Empreendimentos</option>
            </select>

            {/* Layout Toggle (Grid vs List) */}
            <div className="hidden sm:flex rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button 
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-lg transition-all ${viewLayout === 'grid' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewLayout('list')}
                className={`p-1.5 rounded-lg transition-all ${viewLayout === 'list' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Developments Grid / List View (Familiar & Ultra-responsive with Lazy Loading) */}
        <div className={viewLayout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredDevelopments.map((dev) => {
            const isRouted = !!routedPropertiesMap[dev.id];

            return (
              <div 
                key={dev.id}
                onClick={() => setSelectedDev(dev)}
                className={`group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-teal-500/10 cursor-pointer ${
                  viewLayout === 'list' ? 'flex flex-col md:flex-row gap-6 items-center' : 'flex flex-col'
                }`}
              >
                {/* Image & Developer Logo Overlay */}
                <div className={`relative overflow-hidden rounded-xl bg-slate-950 shrink-0 ${viewLayout === 'list' ? 'w-full md:w-72 aspect-[16/10]' : 'w-full aspect-[16/10]'}`}>
                  <img 
                    src={dev.imageUrl} 
                    alt={dev.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg bg-teal-500 px-2.5 py-1 text-xs font-extrabold text-slate-950 shadow-md">
                    <span>{dev.status}</span>
                  </div>

                  {/* Delivery Year Tag */}
                  <div className="absolute top-3 right-3 rounded-lg bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-teal-300 border border-teal-500/30 backdrop-blur-md">
                    Entrega {dev.deliveryYear}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 left-3">
                    <div className="text-[10px] font-semibold text-slate-400">A partir de</div>
                    <div className="text-xl font-extrabold text-white">{dev.priceFrom}</div>
                  </div>
                </div>

                {/* Development Info */}
                <div className="mt-4 md:mt-0 flex flex-1 flex-col justify-between space-y-3 w-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-400">{dev.developerName}</span>
                      <span className="text-[11px] text-slate-500 font-medium">DWV #{dev.dwvId}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-100 group-hover:text-teal-400 transition-colors line-clamp-1">
                      {dev.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                      <span>{dev.neighborhood} • Maringá/PR</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold">Plantas Privativas</div>
                      <div className="font-bold text-slate-200">{dev.areaFrom}m² a {dev.areaTo}m²</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold">Configuração</div>
                      <div className="font-bold text-teal-400">{dev.bedroomsRange}</div>
                    </div>
                  </div>

                  {/* Dynamic CTA Button: Shows "Agendar Visita" ONLY AFTER routing choice is made! */}
                  {isRouted ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenWhatsAppLead(dev.id, dev.title, dev.developerName);
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer animate-in fade-in"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>🗓️ Agendar Visita ao Empreendimento</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenWhatsAppLead(dev.id, dev.title, dev.developerName);
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 py-2.5 text-xs font-bold text-slate-950 hover:from-teal-400 hover:to-cyan-400 transition-all cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 fill-slate-950" />
                      <span>Solicitar Curadoria & Tabela de Valores</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal de Detalhes do Empreendimento DWV */}
      {selectedDev && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-800 bg-[#080C14] p-6 space-y-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-teal-400">{selectedDev.developerName} • DWV Code: {selectedDev.dwvId}</span>
                <h2 className="text-2xl font-black text-white">{selectedDev.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedDev(null)}
                className="rounded-xl bg-slate-900 p-2 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-800">
              <img src={selectedDev.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Diferenciais do Empreendimento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedDev.differentials.map((diff, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-xl bg-slate-900/80 p-3 text-xs font-semibold text-slate-200 border border-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4">
              <div>
                <div className="text-xs text-slate-400">Valores a partir de</div>
                <div className="text-2xl font-black text-white">{selectedDev.priceFrom}</div>
              </div>

              {routedPropertiesMap[selectedDev.id] ? (
                <button
                  onClick={() => {
                    const devId = selectedDev.id;
                    const devName = selectedDev.developerName;
                    const devTitle = selectedDev.title;
                    setSelectedDev(null);
                    onOpenWhatsAppLead(devId, devTitle, devName);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-extrabold text-slate-950 shadow-lg cursor-pointer"
                >
                  <Calendar className="h-5 w-5" />
                  <span>🗓️ Agendar Visita ao Empreendimento</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    const devId = selectedDev.id;
                    const devName = selectedDev.developerName;
                    const devTitle = selectedDev.title;
                    setSelectedDev(null);
                    onOpenWhatsAppLead(devId, devTitle, devName);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 hover:from-teal-400 hover:to-cyan-400 shadow-lg cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5 fill-slate-950" />
                  <span>Solicitar Curadoria & Tabela no WhatsApp</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
