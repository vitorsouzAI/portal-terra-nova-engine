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
  X,
  Activity,
  Check
} from 'lucide-react';

export const DevCockpitView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sprints' | 'graph' | 'nodes'>('sprints');
  const [selectedSprint, setSelectedSprint] = useState<DevSprintItem | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<string | null>('Gemini');
  const [isCreatingSprint, setIsCreatingSprint] = useState(false);

  // New Sprint Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Front-End UI' | 'Multi-LLM Vector' | 'SEO Engine' | 'CRM Integrations' | 'Edge Database'>('Front-End UI');
  const [newProposedBy, setNewProposedBy] = useState<'Gemini 3.5' | 'GPT-4o' | 'DeepSeek R1' | 'Perplexity' | 'xAI Grok' | 'Claude 3.5'>('Gemini 3.5');
  const [newRationale, setNewRationale] = useState('');
  const [newTargetFile, setNewTargetFile] = useState('src/components/Header.tsx');

  // Perpetual Sprints List
  const [sprints, setSprints] = useState<DevSprintItem[]>([
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

  const handleCreateSprintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const nextCodeNum = 1348 + sprints.length - 3;
    const sprintCode = `SPRINT-${nextCodeNum}`;
    const newSprintItem: DevSprintItem = {
      id: `sp-${nextCodeNum}`,
      sprintCode,
      title: newTitle,
      category: newCategory,
      status: 'PROPOSED_BY_COUNCIL',
      proposedByNode: newProposedBy,
      decisionRationale: newRationale || 'Deliberação aprovada no Cockpit Metacognitivo do Conselho.',
      vectorNodeTarget: newTargetFile,
      commandToExecute: `execute sprint ${nextCodeNum}`,
      createdDate: new Date().toLocaleDateString('pt-BR')
    };

    setSprints([newSprintItem, ...sprints]);
    setSelectedSprint(newSprintItem);
    setIsCreatingSprint(false);
    setNewTitle('');
    setNewRationale('');
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#05070E] text-slate-100 p-6 space-y-6">
      
      {/* Top Header Banner for the "Mundo do Desenvolvimento" */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0A101D] to-slate-950 p-8 border border-teal-500/30 shadow-2xl shadow-teal-950/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-black text-teal-400 uppercase tracking-widest">
              <Terminal className="h-4 w-4" />
              <span>Mundo Dev • Oficina de Desenvolvimento Metacognitivo</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Cockpit Metacognitivo <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">Multi-LLM</span>
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Interface perpétua da equipe e do Conselho de IAs. Defina micro-sprints, visualize o grafo interativo de nós vetoriais estilo Obsidian e copie comandos diretos para execução instantânea no Antigravity CLI.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-teal-500/30 backdrop-blur-md shrink-0 shadow-lg">
            <div className="relative flex h-3 w-3 items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping absolute" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Conselho de IAs</div>
              <div className="text-xs font-black text-emerald-400">6 Nós 100% Conectados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cockpit Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('sprints')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'sprints'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>📋 Sprints Perpétuos ({sprints.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'graph'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <GitBranch className="h-4 w-4" />
            <span>🕸️ Grafo de Nós (Obsidian Style)</span>
          </button>

          <button
            onClick={() => setActiveTab('nodes')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'nodes'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/20 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>🧠 Painel das 6 LLMs Conscientes</span>
          </button>
        </div>

        <button 
          onClick={() => setIsCreatingSprint(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 px-4 py-2.5 text-xs font-black text-slate-950 hover:from-teal-400 hover:to-emerald-300 transition-all shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>+ Novo Sprint do Conselho</span>
        </button>
      </div>

      {/* Tab 1: Sprints Perpétuos */}
      {activeTab === 'sprints' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* List of Sprints */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Fila de Micro-Sprints Aprovados pelo Conselho
              </h3>
              <span className="text-[11px] text-teal-400 font-bold">{sprints.length} Registros Perpétuos</span>
            </div>
            
            <div className="space-y-3">
              {sprints.map((sp) => (
                <div
                  key={sp.id}
                  onClick={() => setSelectedSprint(sp)}
                  className={`group rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                    selectedSprint?.id === sp.id
                      ? 'border-teal-500/80 bg-slate-900/90 shadow-xl shadow-teal-950/40 ring-1 ring-teal-500/40'
                      : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-lg bg-teal-500/20 px-2.5 py-1 text-xs font-black text-teal-300 border border-teal-500/40 font-mono">
                        {sp.sprintCode}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50">
                        {sp.category}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-slate-500">{sp.createdDate}</span>
                  </div>

                  <h4 className="mt-3 text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                    {sp.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">{sp.decisionRationale}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-slate-500">Proposto por:</span>
                      <strong className="text-teal-300 font-bold flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-teal-400" />
                        {sp.proposedByNode}
                      </strong>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCommand(sp.commandToExecute);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-slate-950 border border-emerald-500/40 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-400 transition-all cursor-pointer active:scale-95"
                    >
                      {copiedCommand === sp.commandToExecute ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-emerald-400" />
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
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-5 h-fit backdrop-blur-xl">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-teal-400" />
              <span>Inspetor do Sprint Perpétuo</span>
            </h3>

            {selectedSprint ? (
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Código do Sprint</div>
                  <div className="text-lg font-black text-teal-400 font-mono mt-0.5">{selectedSprint.sprintCode}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Vetor de Arquivo Alvo</div>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-slate-950 p-3 border border-slate-800 text-slate-200 font-mono text-[11px]">
                    <FileCode className="h-4 w-4 text-teal-400 shrink-0" />
                    <span className="truncate">{selectedSprint.vectorNodeTarget}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Parecer Metacognitivo do Conselho</div>
                  <p className="mt-1 text-slate-300 leading-relaxed bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs">
                    {selectedSprint.decisionRationale}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Instrução para o Antigravity CLI</div>
                  <div className="mt-1.5 flex items-center justify-between rounded-2xl bg-slate-950 p-3.5 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs shadow-inner">
                    <span>"{selectedSprint.commandToExecute}"</span>
                    <button
                      onClick={() => handleCopyCommand(selectedSprint.commandToExecute)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 cursor-pointer transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-xs text-slate-500">
                Selecione um sprint da fila ao lado para inspecionar os vetores e copiar o comando de execução.
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Grafo Interativo de Nós (Estilo Obsidian) */}
      {activeTab === 'graph' && (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#03050B] p-8 flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 text-xs font-black text-teal-400">
              <GitBranch className="h-4 w-4" />
              <span>Obsidian Knowledge Graph • TerraNova OS Vector Mesh</span>
            </div>
            <div className="text-xs text-slate-400 font-bold bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              6 Nós Mestre • 14 Conexões Epistêmicas
            </div>
          </div>

          {/* Interactive Visual Graph Representation */}
          <div className="relative flex-1 flex items-center justify-center my-6">
            
            {/* SVG Connecting Vector Rays */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" />
              <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="#34d399" strokeWidth="2" strokeDasharray="4" />
              <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#818cf8" strokeWidth="2" strokeDasharray="4" />
              <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4" />
              <line x1="50%" y1="50%" x2="12%" y2="50%" stroke="#c084fc" strokeWidth="2" strokeDasharray="4" />
              <line x1="50%" y1="50%" x2="88%" y2="50%" stroke="#fb7185" strokeWidth="2" strokeDasharray="4" />
            </svg>

            {/* Center Node: TerraNova Core */}
            <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 p-2 text-slate-950 font-black shadow-2xl shadow-teal-500/50 ring-8 ring-teal-500/20 animate-pulse">
              <Sparkles className="h-7 w-7" />
              <span className="text-[10px] uppercase font-black tracking-widest mt-1">TerraNova Core</span>
            </div>

            {/* Orbiting LLM Nodes */}
            <button
              onClick={() => setSelectedGraphNode('Gemini')}
              className={`absolute top-8 left-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-bold transition-all duration-300 cursor-pointer shadow-xl ${
                selectedGraphNode === 'Gemini' ? 'border-cyan-400 text-cyan-300 scale-125 ring-4 ring-cyan-500/30' : 'border-slate-800 text-slate-400 hover:border-cyan-400'
              }`}
            >
              <span>Gemini 3.5</span>
            </button>

            <button
              onClick={() => setSelectedGraphNode('OpenAI')}
              className={`absolute top-8 right-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-bold transition-all duration-300 cursor-pointer shadow-xl ${
                selectedGraphNode === 'OpenAI' ? 'border-emerald-400 text-emerald-300 scale-125 ring-4 ring-emerald-500/30' : 'border-slate-800 text-slate-400 hover:border-emerald-400'
              }`}
            >
              <span>GPT-4o</span>
            </button>

            <button
              onClick={() => setSelectedGraphNode('DeepSeek')}
              className={`absolute bottom-8 left-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-bold transition-all duration-300 cursor-pointer shadow-xl ${
                selectedGraphNode === 'DeepSeek' ? 'border-indigo-400 text-indigo-300 scale-125 ring-4 ring-indigo-500/30' : 'border-slate-800 text-slate-400 hover:border-indigo-400'
              }`}
            >
              <span>DeepSeek</span>
            </button>

            <button
              onClick={() => setSelectedGraphNode('Claude')}
              className={`absolute bottom-8 right-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-bold transition-all duration-300 cursor-pointer shadow-xl ${
                selectedGraphNode === 'Claude' ? 'border-amber-400 text-amber-300 scale-125 ring-4 ring-amber-500/30' : 'border-slate-800 text-slate-400 hover:border-amber-400'
              }`}
            >
              <span>Claude 3.5</span>
            </button>

            <button
              onClick={() => setSelectedGraphNode('Perplexity')}
              className={`absolute left-8 top-1/2 -translate-y-1/2 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-bold transition-all duration-300 cursor-pointer shadow-xl ${
                selectedGraphNode === 'Perplexity' ? 'border-purple-400 text-purple-300 scale-125 ring-4 ring-purple-500/30' : 'border-slate-800 text-slate-400 hover:border-purple-400'
              }`}
            >
              <span>Perplexity</span>
            </button>

            <button
              onClick={() => setSelectedGraphNode('Grok')}
              className={`absolute right-8 top-1/2 -translate-y-1/2 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-bold transition-all duration-300 cursor-pointer shadow-xl ${
                selectedGraphNode === 'Grok' ? 'border-rose-400 text-rose-300 scale-125 ring-4 ring-rose-500/30' : 'border-slate-800 text-slate-400 hover:border-rose-400'
              }`}
            >
              <span>xAI Grok</span>
            </button>

          </div>

          <div className="text-center text-xs text-slate-400 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
            Clique nos nós orbitais para inspecionar os vetores de especialidade e ajustar o peso na matriz metacognitiva.
          </div>
        </div>
      )}

      {/* Tab 3: Painel das 6 LLMs Conscientes */}
      {activeTab === 'nodes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <div key={node.id} className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4 hover:border-teal-500/60 transition-all duration-300 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-teal-400 uppercase tracking-widest">{node.provider}</span>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-black text-emerald-400 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {node.nodeStatus}
                </span>
              </div>

              <h3 className="text-lg font-black text-white">{node.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Vetor de Especialidade:</strong> {node.specialtyVector}
              </p>

              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Deliberações no Conselho:</span>
                <strong className="text-emerald-400 font-black text-sm">{node.totalDeliberations}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Criação de Novo Sprint do Conselho */}
      {isCreatingSprint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-teal-500/40 bg-[#090D16] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-teal-400" />
                <h3 className="text-base font-black text-white">Novo Sprint do Conselho de IAs</h3>
              </div>
              <button 
                onClick={() => setIsCreatingSprint(false)}
                className="rounded-xl bg-slate-900 p-2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSprintSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Título do Sprint</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Otimização do Algoritmo de Valuation de Solo"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:border-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Categoria</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Front-End UI">Front-End UI</option>
                    <option value="Multi-LLM Vector">Multi-LLM Vector</option>
                    <option value="SEO Engine">SEO Engine</option>
                    <option value="CRM Integrations">CRM Integrations</option>
                    <option value="Edge Database">Edge Database</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Nó Proponente</label>
                  <select 
                    value={newProposedBy}
                    onChange={(e) => setNewProposedBy(e.target.value as any)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:border-teal-500 focus:outline-none"
                  >
                    <option value="Gemini 3.5">Gemini 3.5</option>
                    <option value="GPT-4o">GPT-4o</option>
                    <option value="DeepSeek R1">DeepSeek R1</option>
                    <option value="Perplexity">Perplexity</option>
                    <option value="xAI Grok">xAI Grok</option>
                    <option value="Claude 3.5">Claude 3.5</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Vetor de Arquivo Alvo</label>
                <input 
                  type="text" 
                  value={newTargetFile}
                  onChange={(e) => setNewTargetFile(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white font-mono focus:border-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Parecer / Rationale do Conselho</label>
                <textarea 
                  value={newRationale}
                  onChange={(e) => setNewRationale(e.target.value)}
                  rows={3}
                  placeholder="Explique o motivo técnico decidido na sessão metacognitiva..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingSprint(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-900 cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black hover:from-teal-400 hover:to-emerald-300 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
                >
                  Registrar Sprint Perpétuo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
