import React, { useState } from 'react';
import { Lead, LeadStatus } from '../types';
import { Search, Filter, Bot, CalendarCheck, AlertTriangle, UserCheck, Flame } from 'lucide-react';

interface LeadListColumnProps {
  leads: Lead[];
  activeLeadId: string;
  onSelectLead: (id: string) => void;
}

export const LeadListColumn: React.FC<LeadListColumnProps> = ({
  leads,
  activeLeadId,
  onSelectLead
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<LeadStatus | 'all'>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.propertyOfInterest.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' || lead.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'ia_attending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            IA Atendendo
          </span>
        );
      case 'visit_scheduled':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
            <CalendarCheck className="h-3 w-3" />
            Visita Agendada
          </span>
        );
      case 'requires_human':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/20 animate-pulse">
            <AlertTriangle className="h-3 w-3" />
            Requer Humano
          </span>
        );
      case 'human_active':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/20">
            <UserCheck className="h-3 w-3" />
            Atendimento Humano
          </span>
        );
    }
  };

  return (
    <div className="flex h-full flex-col border-r border-slate-800/80 bg-slate-950/40">
      
      {/* Search & Filter Header */}
      <div className="p-3 border-b border-slate-800/80 space-y-2.5">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou imóvel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-900/80 border border-slate-800 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-all ${
              selectedFilter === 'all'
                ? 'bg-slate-800 text-white font-bold border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({leads.length})
          </button>
          <button
            onClick={() => setSelectedFilter('ia_attending')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedFilter === 'ia_attending'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <Bot className="h-3 w-3" /> IA (2)
          </button>
          <button
            onClick={() => setSelectedFilter('visit_scheduled')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-all ${
              selectedFilter === 'visit_scheduled'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            Agendados (1)
          </button>
          <button
            onClick={() => setSelectedFilter('requires_human')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-all ${
              selectedFilter === 'requires_human'
                ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            Atenção (1)
          </button>
        </div>
      </div>

      {/* Lead Cards List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {filteredLeads.map((lead) => {
          const isActive = lead.id === activeLeadId;
          const isRural = lead.propertyOfInterest.type === 'rural';

          return (
            <div
              key={lead.id}
              onClick={() => onSelectLead(lead.id)}
              className={`group relative rounded-xl p-3 cursor-pointer transition-all border ${
                isActive
                  ? 'bg-slate-900 border-emerald-500/40 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              {/* Top Row: Name & Timestamp */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-emerald-400 border border-slate-700">
                    {lead.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {lead.name}
                    </h3>
                    <span className="text-[10px] text-slate-400">{lead.phone}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">{lead.lastMessageTime}</span>
              </div>

              {/* Status Badge & Property Tag */}
              <div className="flex items-center justify-between gap-2 my-2">
                {getStatusBadge(lead.status)}
                
                <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${
                  isRural
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    : 'bg-teal-500/10 text-teal-300 border border-teal-500/20'
                }`}>
                  {isRural ? '🚜 Agro' : '🏙️ Urbano'}
                </span>
              </div>

              {/* Last Message Snippet */}
              <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                "{lead.lastMessage}"
              </p>

              {/* Footer Score & Origin */}
              <div className="mt-2 flex items-center justify-between border-t border-slate-800/60 pt-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-400">
                  <Flame className="h-3 w-3 text-amber-400" /> Score {lead.qualificationScore}/100
                </span>
                <span className="rounded bg-slate-800/80 px-1.5 py-0.5 text-slate-400">
                  {lead.origin}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
