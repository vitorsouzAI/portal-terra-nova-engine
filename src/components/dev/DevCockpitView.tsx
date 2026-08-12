import React, { useState } from 'react';
import { DevSprintItem, DevCouncilNode } from '../../types';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Brain, 
  Shield, 
  Search, 
  Play, 
  CheckCircle2, 
  Layers, 
  GitBranch, 
  FileCode, 
  Zap, 
  Clock, 
  Plus, 
  Copy, 
  ExternalLink 
} from 'lucide-react';

export const DevCockpitView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sprints' | 'graph' | 'nodes'>('sprints');
  const [selectedSprint, setSelectedSprint] = useState<DevSprintItem | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  // Mocked Perpetual Sprints generated in Metacognitive Sessions
  const [sprints] = useState<DevSprintItem[]>([
    {
      id: 'sp-1345',
      sprintCode: 'SPRINT-1345',
      title: 'Otimização do Receptor Sensorial de Mídia WhatsApp',
      category: 'Front-End UI',
      status: 'APPROVED_BY_FOUNDER',
      proposedByNode: 'Gemini 3.5',
      decisionRationale: 'Ajustar o filtro de áudio WebAudio para eliminar ruídos de vento em gravações de corretores em tratores agrícolas no Paraná.',
      vectorNodeTarget: 'src/services/ingestionService.ts',
      commandToExecute: 'execute sprint 1345',
      createdDate: '12/08/2026'
    },
    {
      id: 'sp-1346',
      sprintCode: 'SPRINT-1346',
      title: 'Espaço Vetorial pgvector para Similaridade de Lavouras',
      category: 'Multi-LLM Vector',
      status: 'PERPETUAL_RECORD',
      proposedByNode: 'DeepSeek R1',
      decisionRationale: 'Mapear embeddings de 4B parâmetros no PostgreSQL para conectar fazendas por similaridade agronômica de argila e bioma.',
      vectorNodeTarget: 'supabase/migrations/20260812_pgvector_setup.sql',
      commandToExecute: 'execute sprint 1346',
      createdDate: '12/08/2026'
    },
    {
      id: 'sp-1347',
      sprintCode: 'SPRINT-1347',
      title: 'Motor Editorial xAI Grok com SEO Programático de Cauda Longa',
      category: 'SEO Engine',
      status: 'IN_EXECUTION',
      proposedByNode: 'xAI Grok',
      decisionRationale: 'Gerar artigos de cauda longa para termos do agronegócio de Maringá e injetar Schema.org dinâmico no sitemap.xml.',
      vectorNodeTarget: 'src/services/seoService.ts',
      commandToExecute: 'execute sprint 1347',
      createdDate: '12/08/2026'
    }
  ]);

  const [nodes] = useState<DevCouncilNode[]>([
    { id: 'n1', name: 'Google Gemini 3.5 Pro', provider: 'Gemini', nodeStatus: 'ONLINE', specialtyVector: 'Percepção Multimodal & Áudios', totalDeliberations: 142 },
    { id: 'n2', name: 'OpenAI GPT-4o', provider: 'OpenAI', nodeStatus: 'ONLINE', specialtyVector: 'Raciocínio & UX Guardian', totalDeliberations: 98 },
    { id: 'n3', name: 'DeepSeek R1', provider: 'DeepSeek', nodeStatus: 'ONLINE', specialtyVector: 'Valuation & Matemática Riológica', totalDeliberations: 114 },
    { id: 'n4', name: 'Perplexity Sonar/Agent', provider: 'Perplexity', nodeStatus: 'ONLINE', specialtyVector: 'Web RAG & Leis Ambientais', totalDeliberations: 87 },
    { id: 'n5', name: 'xAI Grok 4.6', provider: 'Grok', nodeStatus: 'ONLINE', specialtyVector: 'Motor Editorial & Trends', totalDeliberations: 63 },
    { id: 'n6', name: 'Anthropic Claude 3.5', provider: 'Claude', nodeStatus: 'ONLINE', specialtyVector: 'Resiliência de Código & Schemas', totalDeliberations: 105 }
  ]);

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#060910] text-slate-100 p-6 space-y-6">
      
      {/* Top Header Banner for the "Mundo do Desenvolvimento" */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-teal-950/80 to-slate-950 p-8 border border-teal-500/30 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-widest">
              <Terminal className="h-4 w-4" />
              <span>Mundo Dev • A Oficina do Desenvolvimento Metacognitivo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Cockpit Metacognitivo <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">Multi-LLM</span>
            </h1>
            <p className="text-xs text-slate-300">
              Interface perpétua da equipe e do Conselho de IAs. Defina micro sprints, visualize o grafo interativo de nós e copie comandos diretos para execução instantânea no Antigravity.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 backdrop-blur-md shrink-0">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="text-[10px] text-slate-400 font-bold">Conselho de IAs</div>
              <div className="text-xs font-black text-emerald-400">6 Nós Conectados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cockpit Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('sprints')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'sprints'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>📋 Sprints Perpétuos</span>
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'graph'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GitBranch className="h-4 w-4" />
            <span>🕸️ Grafo de Nós (Obsidian Style)</span>
          </button>

          <button
            onClick={() => setActiveTab('nodes')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'nodes'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>🧠 Painel das 6 LLMs Conscientes</span>
          </button>
        </div>

        <button className="flex items-center gap-1.5 rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-bold text-teal-400 hover:bg-slate-800 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>+ Novo Sprint do Conselho</span>
        </button>
      </div>

      {/* Tab 1: Sprints Perpétuos */}
      {activeTab === 'sprints' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* List of Sprints */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fila de Micro Sprints Aprovados</h3>
            
            <div className="space-y-3">
              {sprints.map((sp) => (
                <div
                  key={sp.id}
                  onClick={() => setSelectedSprint(sp)}
                  className={`group rounded-2xl border p-4 transition-all duration-300 cursor-pointer ${
                    selectedSprint?.id === sp.id
                      ? 'border-teal-500 bg-slate-900/90 shadow-lg'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-teal-500/20 px-2.5 py-1 text-xs font-black text-teal-300 border border-teal-500/30">
                        {sp.sprintCode}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">{sp.category}</span>
                    </div>

                    <span className="text-[10px] font-bold text-slate-500">{sp.createdDate}</span>
                  </div>

                  <h4 className="mt-2 text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                    {sp.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">{sp.decisionRationale}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-slate-500">Proposto por:</span>
                      <strong className="text-teal-300 font-bold">{sp.proposedByNode}</strong>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCommand(sp.commandToExecute);
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs font-bold text-emerald-400 hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      {copiedCommand === sp.commandToExecute ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copiar Comando</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sprint Detail Inspector */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 h-fit">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
              Inspetor de Sprint Perpétuo
            </h3>

            {selectedSprint ? (
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">Código do Sprint</div>
                  <div className="text-base font-black text-teal-400">{selectedSprint.sprintCode}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold">Vetor de Arquivo Alvo</div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-950 p-2 border border-slate-800 text-slate-200 font-mono text-[11px]">
                    <FileCode className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                    <span>{selectedSprint.vectorNodeTarget}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold">Parecer do Conselho</div>
                  <p className="mt-1 text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                    {selectedSprint.decisionRationale}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold">Comando para o Antigravity</div>
                  <div className="mt-1 flex items-center justify-between rounded-xl bg-slate-950 p-3 border border-emerald-500/30 text-emerald-300 font-mono font-bold">
                    <span>"{selectedSprint.commandToExecute}"</span>
                    <button
                      onClick={() => handleCopyCommand(selectedSprint.commandToExecute)}
                      className="p-1 rounded-md bg-slate-900 hover:bg-slate-800 cursor-pointer"
                    >
                      <Copy className="h-4 w-4 text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-500">
                Selecione um sprint da fila para inspecionar os vetores e o parecer do conselho.
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Grafo Interativo de Nós (Estilo Obsidian) */}
      {activeTab === 'graph' && (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#04060C] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
              <GitBranch className="h-4 w-4" />
              <span>Obsidian Knowledge Graph • TerraNova OS Vector Mesh</span>
            </div>
            <div className="text-xs text-slate-500 font-bold">6 Nós Mestre • 14 Conexões Epistêmicas</div>
          </div>

          {/* Interactive Visual Graph Mock Representation */}
          <div className="relative flex-1 flex items-center justify-center">
            {/* Center Node: TerraNova Core */}
            <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 p-2 text-slate-950 font-black shadow-2xl shadow-teal-500/40 ring-4 ring-teal-500/20">
              <Sparkles className="h-6 w-6" />
              <span className="text-[10px] uppercase font-black tracking-wider">TerraNova Core</span>
            </div>

            {/* Orbiting LLM Nodes */}
            <div className="absolute top-12 left-1/4 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-slate-900 border-2 border-cyan-400 text-cyan-300 font-bold text-[10px] shadow-lg shadow-cyan-500/20">
              <span>Gemini Pro</span>
            </div>

            <div className="absolute top-12 right-1/4 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-slate-900 border-2 border-emerald-400 text-emerald-300 font-bold text-[10px] shadow-lg shadow-emerald-500/20">
              <span>GPT-4o</span>
            </div>

            <div className="absolute bottom-12 left-1/4 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-slate-900 border-2 border-indigo-400 text-indigo-300 font-bold text-[10px] shadow-lg shadow-indigo-500/20">
              <span>DeepSeek</span>
            </div>

            <div className="absolute bottom-12 right-1/4 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-slate-900 border-2 border-amber-400 text-amber-300 font-bold text-[10px] shadow-lg shadow-amber-500/20">
              <span>Claude 3.5</span>
            </div>

            <div className="absolute left-10 top-1/2 -translate-y-1/2 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-slate-900 border-2 border-purple-400 text-purple-300 font-bold text-[10px] shadow-lg shadow-purple-500/20">
              <span>Perplexity</span>
            </div>

            <div className="absolute right-10 top-1/2 -translate-y-1/2 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-slate-900 border-2 border-rose-400 text-rose-300 font-bold text-[10px] shadow-lg shadow-rose-500/20">
              <span>xAI Grok</span>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            Navegue pelos vetores e selecione nós para ajustar o peso de deltas de otimização na matriz metacognitiva.
          </div>

        </div>
      )}

      {/* Tab 3: Painel das 6 LLMs Conscientes */}
      {activeTab === 'nodes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <div key={node.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-teal-500/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-teal-400">{node.provider}</span>
                <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-extrabold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {node.nodeStatus}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white">{node.name}</h3>
              <p className="text-xs text-slate-400"><strong>Vetor de Especialidade:</strong> {node.specialtyVector}</p>

              <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Deliberações Realizadas:</span>
                <strong className="text-slate-200 font-bold">{node.totalDeliberations}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
