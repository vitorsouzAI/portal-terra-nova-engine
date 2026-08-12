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
  Trophy,
  Gamepad2,
  Sliders,
  Flame,
  Target,
  RefreshCw,
  Award,
  ChevronRight
} from 'lucide-react';

export const DevCockpitView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'game-map' | 'sprints' | 'nodes' | 'achievements'>('game-map');
  const [selectedSprint, setSelectedSprint] = useState<DevSprintItem | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>('Gemini');
  const [isCreatingSprint, setIsCreatingSprint] = useState(false);
  const [systemXp, setSystemXp] = useState(14850);
  const [systemLevel, setSystemLevel] = useState(12);
  const [simulatingSprintId, setSimulatingSprintId] = useState<string | null>(null);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  // Node Weights and Focus States
  const [nodeWeights, setNodeWeights] = useState<Record<string, number>>({
    Gemini: 95,
    OpenAI: 92,
    DeepSeek: 98,
    Perplexity: 90,
    Grok: 96,
    Claude: 99
  });

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Front-End UI' | 'Multi-LLM Vector' | 'SEO Engine' | 'CRM Integrations' | 'Edge Database'>('Front-End UI');
  const [newProposedBy, setNewProposedBy] = useState<'Gemini 3.5' | 'GPT-4o' | 'DeepSeek R1' | 'Perplexity' | 'xAI Grok' | 'Claude 3.5'>('Gemini 3.5');
  const [newRationale, setNewRationale] = useState('');
  const [newTargetFile, setNewTargetFile] = useState('src/components/Header.tsx');

  // Sprints
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

  const achievements = [
    { title: 'Soberania Multi-LLM', desc: '6 Nós de Inteligência Artificial conectados ao vivo.', icon: Trophy, unlocked: true },
    { title: 'Dominância Agronômica', desc: 'Motor ALS e Valuation de solo validados pelo DeepSeek.', icon: Target, unlocked: true },
    { title: 'Imperativo de SEO', desc: 'Sitemap XML e Schema.org alimentados pelo xAI Grok.', icon: Flame, unlocked: true },
    { title: 'Blindagem de Produção', desc: 'Script SQL sa-east-1 e RLS otimizados.', icon: Shield, unlocked: true }
  ];

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleBoostNodeWeight = (provider: string) => {
    setNodeWeights(prev => ({
      ...prev,
      [provider]: Math.min(100, prev[provider] + 5)
    }));
    setSystemXp(prev => prev + 150);
  };

  const handleRunSprintSimulation = (sprint: DevSprintItem) => {
    setSimulatingSprintId(sprint.id);
    setSimulationLog([
      `[GAME ENGINE] Inicializando pipeline tático do ${sprint.sprintCode}...`,
      `[MULTI-LLM MATRIX] Nó ${sprint.proposedByNode} projetando vetores em ${sprint.vectorNodeTarget}...`,
      `[COMPILER] Sintaxe TypeScript auditada com 0 erros.`,
      `[RESULT] Sprint ${sprint.sprintCode} pronto para sincronização com o Antigravity!`
    ]);
    setSystemXp(prev => prev + 500);
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
    setSystemXp(prev => prev + 350);
  };

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-[#030509] text-slate-100 p-6 space-y-6 select-none">
      
      {/* Gamified Top Header Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#070D1A] to-slate-950 p-6 border border-teal-500/40 shadow-2xl shadow-teal-950/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Identity & Level */}
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 via-cyan-400 to-emerald-400 p-0.5 shadow-lg shadow-teal-500/30">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 text-teal-400 font-black">
                <Gamepad2 className="h-8 w-8 animate-bounce" />
              </div>
              <span className="absolute -bottom-2 bg-gradient-to-r from-amber-500 to-emerald-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                LVL {systemLevel}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Oficina Dev <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">Game Engine</span>
                </h1>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-black text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
                  100% Interativo
                </span>
              </div>

              {/* XP Progress Bar */}
              <div className="mt-2 flex items-center gap-3">
                <div className="w-48 sm:w-64 bg-slate-900 rounded-full h-3.5 border border-slate-800 p-0.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(systemXp % 2000) / 20}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-teal-300">{systemXp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {/* Quick Game Stats */}
          <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Conselho</div>
              <div className="text-sm font-black text-emerald-400">6 LLMs Ativas</div>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Sprints</div>
              <div className="text-sm font-black text-cyan-400">{sprints.length} Perpétuos</div>
            </div>
            <div className="text-center px-3">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Integridade</div>
              <div className="text-sm font-black text-amber-400">100% 0 Lints</div>
            </div>
          </div>

        </div>
      </div>

      {/* Cockpit Navigation Game Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('game-map')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'game-map'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.03]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <GitBranch className="h-4 w-4" />
            <span>🗺️ Mapa tático de Nós (Obsidian Game)</span>
          </button>

          <button
            onClick={() => setActiveTab('sprints')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'sprints'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.03]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>📋 Sprints Perpétuos ({sprints.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('nodes')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'nodes'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.03]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>🎛️ Moduladores de Peso das IAs</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.03]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Trophy className="h-4 w-4" />
            <span>🏆 Conquistas do Sistema</span>
          </button>
        </div>

        <button 
          onClick={() => setIsCreatingSprint(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 px-4 py-2.5 text-xs font-black text-slate-950 hover:from-teal-400 hover:to-emerald-300 transition-all shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>+ Criar Sprint do Conselho</span>
        </button>
      </div>

      {/* Tab 1: Game Map (Obsidian Game Interface) */}
      {activeTab === 'game-map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Visual Interactive Arena */}
          <div className="lg:col-span-2 relative aspect-video w-full overflow-hidden rounded-3xl border border-teal-500/30 bg-[#020409] p-6 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-black text-teal-400">
                <Activity className="h-4 w-4 animate-spin" />
                <span>OBSIDIAN COGNITIVE ARENA • SELECIONE QUALQUER NÓ</span>
              </div>
              <div className="text-[11px] font-bold text-slate-400 bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800">
                Clique nos Nós de IA para Injetar Boost de Foco (+150 XP)
              </div>
            </div>

            {/* SVG Connecting Ray Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
              <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="#34d399" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#818cf8" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="12%" y2="50%" stroke="#c084fc" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="88%" y2="50%" stroke="#fb7185" strokeWidth="2" strokeDasharray="6" />
            </svg>

            {/* Center Core Node */}
            <div className="relative flex-1 flex items-center justify-center">
              <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 p-2 text-slate-950 font-black shadow-2xl shadow-teal-500/60 ring-8 ring-teal-500/30 animate-pulse">
                <Sparkles className="h-8 w-8" />
                <span className="text-[10px] uppercase font-black tracking-widest mt-1">TerraNova</span>
              </div>

              {/* Orbiting Interactive Buttons */}
              <button
                onClick={() => setSelectedGraphNode('Gemini')}
                className={`absolute top-6 left-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'Gemini' ? 'border-cyan-400 text-cyan-300 scale-125 ring-4 ring-cyan-500/40 shadow-xl shadow-cyan-500/40' : 'border-slate-800 text-slate-400 hover:border-cyan-400'
                }`}
              >
                <span>Gemini</span>
                <span className="text-[9px] text-cyan-400 font-mono">{nodeWeights.Gemini}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('OpenAI')}
                className={`absolute top-6 right-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'OpenAI' ? 'border-emerald-400 text-emerald-300 scale-125 ring-4 ring-emerald-500/40 shadow-xl shadow-emerald-500/40' : 'border-slate-800 text-slate-400 hover:border-emerald-400'
                }`}
              >
                <span>GPT-4o</span>
                <span className="text-[9px] text-emerald-400 font-mono">{nodeWeights.OpenAI}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('DeepSeek')}
                className={`absolute bottom-6 left-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'DeepSeek' ? 'border-indigo-400 text-indigo-300 scale-125 ring-4 ring-indigo-500/40 shadow-xl shadow-indigo-500/40' : 'border-slate-800 text-slate-400 hover:border-indigo-400'
                }`}
              >
                <span>DeepSeek</span>
                <span className="text-[9px] text-indigo-400 font-mono">{nodeWeights.DeepSeek}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('Claude')}
                className={`absolute bottom-6 right-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'Claude' ? 'border-amber-400 text-amber-300 scale-125 ring-4 ring-amber-500/40 shadow-xl shadow-amber-500/40' : 'border-slate-800 text-slate-400 hover:border-amber-400'
                }`}
              >
                <span>Claude</span>
                <span className="text-[9px] text-amber-400 font-mono">{nodeWeights.Claude}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('Perplexity')}
                className={`absolute left-6 top-1/2 -translate-y-1/2 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'Perplexity' ? 'border-purple-400 text-purple-300 scale-125 ring-4 ring-purple-500/40 shadow-xl shadow-purple-500/40' : 'border-slate-800 text-slate-400 hover:border-purple-400'
                }`}
              >
                <span>Perplexity</span>
                <span className="text-[9px] text-purple-400 font-mono">{nodeWeights.Perplexity}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('Grok')}
                className={`absolute right-6 top-1/2 -translate-y-1/2 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'Grok' ? 'border-rose-400 text-rose-300 scale-125 ring-4 ring-rose-500/40 shadow-xl shadow-rose-500/40' : 'border-slate-800 text-slate-400 hover:border-rose-400'
                }`}
              >
                <span>Grok</span>
                <span className="text-[9px] text-rose-400 font-mono">{nodeWeights.Grok}%</span>
              </button>
            </div>

            <div className="text-center text-xs text-slate-400 bg-slate-950/90 p-3 rounded-2xl border border-slate-800">
              Nó selecionado: <strong className="text-teal-300 font-black">{selectedGraphNode}</strong> • Clique no botão de Boost ao lado para aumentar a capacidade analítica.
            </div>
          </div>

          {/* Node Tactical Command Box */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-5 flex flex-col justify-between backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black text-teal-400 uppercase tracking-wider">Módulo Tático de Comando</span>
                <span className="text-xs font-mono font-bold text-emerald-400">200 OK</span>
              </div>

              <div className="space-y-2">
                <div className="text-lg font-black text-white">{selectedGraphNode} Node</div>
                <div className="text-xs text-slate-400">
                  <strong>Poder Analítico Atual:</strong> {nodeWeights[selectedGraphNode] || 95}%
                </div>
              </div>

              <button
                onClick={() => handleBoostNodeWeight(selectedGraphNode)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 p-3 text-xs font-black text-slate-950 hover:from-teal-400 hover:to-emerald-300 transition-all shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-current" />
                <span>Injetar Boost de Foco (+5% / +150 XP)</span>
              </button>
            </div>

            {/* Simulation Log Box */}
            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2 font-mono text-[10px]">
              <div className="text-slate-500 font-bold border-b border-slate-900 pb-1">Console de Log do Sistema:</div>
              {simulationLog.length > 0 ? (
                simulationLog.map((log, idx) => (
                  <div key={idx} className="text-emerald-400">{log}</div>
                ))
              ) : (
                <div className="text-slate-600">Aguardando disparo de simulação de sprint...</div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Sprints Perpétuos com Execução Interativa */}
      {activeTab === 'sprints' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
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
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md">
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRunSprintSimulation(sp);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 px-3.5 py-2 text-xs font-black text-slate-950 hover:from-teal-400 hover:to-emerald-300 transition-all cursor-pointer active:scale-95 shadow-md"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Lançar Simulação (+500 XP)</span>
                  </button>

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
                        <span>Copiar Comando CLI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 h-fit">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-3">
              Inspetor Tático do Sprint
            </h3>

            {selectedSprint ? (
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Código do Sprint</div>
                  <div className="text-lg font-black text-teal-400 font-mono mt-0.5">{selectedSprint.sprintCode}</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Vetor de Arquivo Alvo</div>
                  <div className="mt-1 flex items-center gap-2 rounded-xl bg-slate-950 p-3 border border-slate-800 text-slate-200 font-mono text-[11px]">
                    <FileCode className="h-4 w-4 text-teal-400 shrink-0" />
                    <span className="truncate">{selectedSprint.vectorNodeTarget}</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Parecer do Conselho</div>
                  <p className="mt-1 text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    {selectedSprint.decisionRationale}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-500">
                Selecione um sprint da fila para inspecionar os vetores.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Moduladores de Peso */}
      {activeTab === 'nodes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <div key={node.id} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-teal-500/60 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-teal-400 uppercase tracking-widest">{node.provider}</span>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-black text-emerald-400 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {node.nodeStatus}
                </span>
              </div>

              <h3 className="text-lg font-black text-white">{node.name}</h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Peso de Influência Metacognitiva:</span>
                  <strong className="text-teal-300 font-mono font-bold">{nodeWeights[node.provider] || 95}%</strong>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  value={nodeWeights[node.provider] || 95}
                  onChange={(e) => setNodeWeights({ ...nodeWeights, [node.provider]: parseInt(e.target.value) })}
                  className="w-full accent-teal-400 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Conquistas do Sistema */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ac, idx) => (
            <div key={idx} className="flex items-start gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-300 shrink-0">
                <ac.icon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-white">{ac.title}</h3>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-400 border border-emerald-500/30">
                    DESBLOQUEADO
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{ac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Criação de Sprint */}
      {isCreatingSprint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-teal-500/40 bg-[#090D16] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-teal-400" />
                <h3 className="text-base font-black text-white">Criar Novo Sprint Perpétuo</h3>
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
                  placeholder="Ex: Otimização da Matriz de Valuation"
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
                <label className="block text-slate-400 font-bold mb-1">Parecer do Conselho</label>
                <textarea 
                  value={newRationale}
                  onChange={(e) => setNewRationale(e.target.value)}
                  rows={3}
                  placeholder="Parecer técnico decidido..."
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
                  Registrar Sprint (+350 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
