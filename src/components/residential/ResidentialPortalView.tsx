import React, { useState } from 'react';
import { ResidentialProperty } from '../../types';
import { mockResidentialProperties } from '../../data/mockResidentialProperties';
import { Home, MapPin, Search, MessageCircle, Calendar } from 'lucide-react';
import { SEOHead } from '../seo/SEOHead';
import { SEOService } from '../../services/seoService';

interface ResidentialPortalViewProps {
  onOpenWhatsAppLead: (propertyId: string, propertyTitle: string) => void;
  routedPropertiesMap: Record<string, string>;
}

export const ResidentialPortalView: React.FC<ResidentialPortalViewProps> = ({ 
  onOpenWhatsAppLead,
  routedPropertiesMap
}) => {
  const [properties] = useState<ResidentialProperty[]>(mockResidentialProperties);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProperties = properties.filter((p) => {
    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const defaultSEO = SEOService.generateResidentialSEO(properties[0]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#080C14] px-4 py-6 text-slate-100">
      <SEOHead seo={defaultSEO} />

      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Banner Hero Imóveis Prontos */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 p-8 border border-cyan-500/20 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <Home className="h-4 w-4" />
              <span>Imóveis Prontos & Usados em Maringá</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Imóveis Prontos para Morar <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">Maringá/PR</span>
            </h1>
            <p className="text-sm text-slate-300">
              Apartamentos duplex, casas em condomínios fechados (Alphaville) e sobrados nos melhores bairros de Maringá (Zona 01, Zona 03, Zona 07).
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-slate-900/90 p-4 border border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por bairro (Zona 01, Alphaville, Zona 07) ou tipo..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-200 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-800 py-2.5 px-3 text-xs font-semibold text-slate-200 focus:border-cyan-500 focus:outline-none cursor-pointer"
          >
            <option value="all">Todos os Tipos</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa em Condomínio">Casa em Condomínio</option>
            <option value="Sobrado">Sobrado</option>
          </select>
        </div>

        {/* Grid of Residential Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((p) => {
            const isRouted = !!routedPropertiesMap[p.id];

            return (
              <div 
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
                  <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 rounded-lg bg-cyan-500 px-2.5 py-1 text-xs font-bold text-slate-950">
                    {p.status}
                  </div>
                  <div className="absolute bottom-3 left-3 text-xl font-extrabold text-white">{p.price}</div>
                </div>

                <div className="mt-4 flex flex-1 flex-col justify-between space-y-3">
                  <div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{p.neighborhood} • {p.city}</span>
                    </div>
                    <h3 className="mt-1 text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2">{p.title}</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-950/60 p-2 text-center text-xs border border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold">Área</div>
                      <div className="font-bold text-slate-200">{p.usefulArea} m²</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold">Quartos</div>
                      <div className="font-bold text-slate-200">{p.bedrooms} ({p.suites}S)</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold">Vagas</div>
                      <div className="font-bold text-slate-200">{p.parkingSpaces}</div>
                    </div>
                  </div>

                  {isRouted ? (
                    <button
                      onClick={() => onOpenWhatsAppLead(p.id, p.title)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-2.5 text-xs font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-lg cursor-pointer animate-in fade-in"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>🗓️ Agendar Visita Presencial</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenWhatsAppLead(p.id, p.title)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-2.5 text-xs font-bold text-slate-950 hover:from-cyan-400 hover:to-blue-400 transition-all cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4 fill-slate-950" />
                      <span>Solicitar Atendimento & Curadoria</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
