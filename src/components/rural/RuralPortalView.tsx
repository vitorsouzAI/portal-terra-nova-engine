import React, { useState } from 'react';
import { RuralProperty } from '../../types';
import { mockRuralProperties } from '../../data/mockRuralProperties';
import { RuralCard } from './RuralCard';
import { RuralDetailView } from './RuralDetailView';
import { Search, Filter, Tractor } from 'lucide-react';

interface RuralPortalViewProps {
  onOpenWhatsAppLead: (propertyId: string, propertyTitle: string) => void;
  routedPropertiesMap: Record<string, string>;
}

export const RuralPortalView: React.FC<RuralPortalViewProps> = ({ 
  onOpenWhatsAppLead,
  routedPropertiesMap
}) => {
  const [properties] = useState<RuralProperty[]>(mockRuralProperties);
  const [selectedProperty, setSelectedProperty] = useState<RuralProperty | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAptitude, setSelectedAptitude] = useState<string>('all');

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAptitude = 
      selectedAptitude === 'all' || p.aptitude === selectedAptitude;

    return matchesSearch && matchesAptitude;
  });

  if (selectedProperty) {
    return (
      <RuralDetailView 
        property={selectedProperty} 
        onBack={() => setSelectedProperty(null)}
        onOpenWhatsAppLead={onOpenWhatsAppLead}
        isRouted={!!routedPropertiesMap[selectedProperty.id]}
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#080C14] px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Banner Hero Portal Rural */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 p-8 border border-emerald-500/20 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Tractor className="h-4 w-4" />
              <span>Inteligência Agro & Imóveis Rurais Auditados</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Portal Rural TerraNova <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">OS</span>
            </h1>
            <p className="text-sm text-slate-300">
              Fazendas de Soja, Núcleos Aviários Dark House, Haras e Terra Nua na Região de Maringá e Paraná. 
              Fichas IOT 100% auditadas com Nota de Liquidez ALS e certidão CAR.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-slate-900/90 p-4 border border-slate-800 backdrop-blur-md">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por município (Santa Fé, Astorga, Mandaguari), aptidão ou palavra-chave..."
              className="w-full rounded-xl bg-slate-950 border border-slate-800 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-emerald-400 shrink-0" />
            <select
              value={selectedAptitude}
              onChange={(e) => setSelectedAptitude(e.target.value)}
              className="rounded-xl bg-slate-950 border border-slate-800 py-2.5 px-3 text-xs font-semibold text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Todas as Aptidões</option>
              <option value="Lavoura / Soja">Lavoura / Soja</option>
              <option value="Aviário Dark House">Aviário Dark House</option>
              <option value="Haras">Haras</option>
              <option value="Pecuária">Pecuária</option>
              <option value="Terra Nua">Terra Nua</option>
            </select>
          </div>
        </div>

        {/* Grid of Rural Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <RuralCard 
              key={property.id} 
              property={property} 
              onSelectProperty={(p) => setSelectedProperty(p)} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};
