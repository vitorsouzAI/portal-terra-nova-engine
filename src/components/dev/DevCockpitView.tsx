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
  Users,
  MessageSquare,
  UserPlus,
  Send,
  Radio,
  UserCheck,
  Award
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarColor: string;
  status: 'ONLINE' | 'IN_SPRINT' | 'AWAY';
  xPos: number; // Percentage for spatial placement
  yPos: number;
  currentSprint?: string;
  bio: string;
  messages: { sender: string; text: string; time: string }[];
}

export const DevCockpitView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cyber-office' | 'game-map' | 'sprints' | 'nodes' | 'achievements'>('cyber-office');
  const [selectedSprint, setSelectedSprint] = useState<DevSprintItem | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>('Gemini');
  const [isCreatingSprint, setIsCreatingSprint] = useState(false);
  const [isInvitingMember, setIsInvitingMember] = useState(false);
  const [activeTeammateChat, setActiveTeammateChat] = useState<TeamMember | null>(null);
  const [chatInputText, setChatInputText] = useState('');

  const [systemXp, setSystemXp] = useState(15400);
  const [systemLevel, setSystemLevel] = useState(13);
  const [simulatingSprintId, setSimulatingSprintId] = useState<string | null>(null);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  // Node Weights
  const [nodeWeights, setNodeWeights] = useState<Record<string, number>>({
    Gemini: 95,
    OpenAI: 92,
    DeepSeek: 98,
    Perplexity: 90,
    Grok: 96,
    Claude: 99
  });

  // Team Members in Cyber Office (Spatial Avatar Office)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'tm-1',
      name: 'Vitor (Fundador & Arquiteto)',
      role: 'Founder & Visionary Architect',
      avatarColor: 'from-amber-400 to-emerald-400',
      status: 'ONLINE',
      xPos: 50,
      yPos: 50,
      currentSprint: 'SPRINT-1347 (Motor Editorial Grok)',
      bio: 'Liderando a estratégia de Otimização Vetorial Multi-LLM e expansão do ecossistema TerraNova.',
      messages: [
        { sender: 'Vitor', text: 'Conselho, precisamos otimizar a velocidade dos áudios no WhatsApp.', time: '16:45' },
        { sender: 'Gemini 3.5', text: 'Entendido, Vitor. Aplicando filtro de isolamento espectral no WebAudio.', time: '16:46' }
      ]
    },
    {
      id: 'tm-2',
      name: 'Engenheiro Lead de Sistemas',
      role: 'Core Systems & Supabase Guardian',
      avatarColor: 'from-cyan-400 to-blue-500',
      status: 'IN_SPRINT',
      xPos: 25,
      yPos: 35,
      currentSprint: 'SPRINT-1346 (pgvector Setup)',
      bio: 'Responsável pela integridade das tabelas, RLS e migrações no banco de produção sa-east-1.',
      messages: [
        { sender: 'Lead Eng', text: 'Migração de blindagem de segurança SQL pronta para execução.', time: '16:50' }
      ]
    },
    {
      id: 'tm-3',
      name: 'Especialista em Growth & WABA',
      role: 'SDR & WhatsApp Cloud API Specialist',
      avatarColor: 'from-emerald-400 to-teal-500',
      status: 'ONLINE',
      xPos: 75,
      yPos: 65,
      currentSprint: 'SPRINT-1345 (Receptor Sensorial)',
      bio: 'Orquestrando a automação de leads e qualificação via Meta WhatsApp WABA.',
      messages: [
        { sender: 'Growth SDR', text: 'As respostas automáticas do Gemini estão atingindo 99% de aprovação dos fazendeiros!', time: '17:00' }
      ]
    }
  ]);

  // Invite Form State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');

  // Sprints Form State
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
    { title: 'Escritório Espacial Ativo', desc: 'Rede de colaboração espacial da equipe ativada.', icon: Users, unlocked: true },
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
      `[CYBER OFFICE] Sincronizando com a equipe de engenharia...`,
      `[MULTI-LLM MATRIX] Nó ${sprint.proposedByNode} projetando vetores em ${sprint.vectorNodeTarget}...`,
      `[COMPILER] Sintaxe TypeScript auditada com 0 erros.`,
      `[RESULT] Sprint ${sprint.sprintCode} pronto para execução!`
    ]);
    setSystemXp(prev => prev + 500);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim() || !activeTeammateChat) return;

    const newMsg = { sender: 'Você', text: chatInputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    setTeamMembers(prev => prev.map(m => {
      if (m.id === activeTeammateChat.id) {
        return { ...m, messages: [...m.messages, newMsg] };
      }
      return m;
    }));

    setActiveTeammateChat(prev => prev ? { ...prev, messages: [...prev.messages, newMsg] } : null);
    setChatInputText('');
    setSystemXp(prev => prev + 100);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember: TeamMember = {
      id: `tm-${teamMembers.length + 1}`,
      name: newMemberName,
      role: newMemberRole || 'Engenheiro Colaborador',
      avatarColor: 'from-purple-400 to-indigo-500',
      status: 'ONLINE',
      xPos: Math.floor(Math.random() * 60) + 20,
      yPos: Math.floor(Math.random() * 60) + 20,
      bio: 'Membro convidado da equipe no Escritório Espacial TerraNova OS.',
      messages: [{ sender: 'Sistema', text: 'Boas-vindas ao Escritório Espacial!', time: 'Agora' }]
    };

    setTeamMembers([...teamMembers, newMember]);
    setIsInvitingMember(false);
    setNewMemberName('');
    setNewMemberRole('');
    setSystemXp(prev => prev + 400);
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
                  Oficina Dev <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">Cyber Office</span>
                </h1>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-black text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
                  Spatial Collaboration
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

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInvitingMember(true)}
              className="flex items-center gap-2 rounded-2xl bg-slate-900 border border-teal-500/40 px-4 py-2.5 text-xs font-black text-teal-300 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
            >
              <UserPlus className="h-4 w-4" />
              <span>+ Convidar Membro da Equipe</span>
            </button>

            <button 
              onClick={() => setIsCreatingSprint(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 px-4 py-2.5 text-xs font-black text-slate-950 hover:from-teal-400 hover:to-emerald-300 transition-all shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>+ Criar Sprint do Conselho</span>
            </button>
          </div>

        </div>
      </div>

      {/* Cockpit Navigation Game Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('cyber-office')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'cyber-office'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.03]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>🏢 Escritório Espacial 2D ({teamMembers.length} No Ar)</span>
          </button>

          <button
            onClick={() => setActiveTab('game-map')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'game-map'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-[1.03]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <GitBranch className="h-4 w-4" />
            <span>🗺️ Mapa tático (Obsidian Game)</span>
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
            <span>🎛️ Moduladores das IAs</span>
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
            <span>🏆 Conquistas</span>
          </button>
        </div>
      </div>

      {/* Tab 0: Cyber Office (Spatial Avatar Office & Live Chat) */}
      {activeTab === 'cyber-office' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Spatial 2D Cyber-Office Canvas */}
          <div className="lg:col-span-2 relative aspect-video w-full overflow-hidden rounded-3xl border border-teal-500/30 bg-[#020408] p-6 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-black text-teal-400">
                <Radio className="h-4 w-4 animate-ping text-emerald-400" />
                <span>ESCRITÓRIO ESPACIAL DA EQUIPE • CLIQUE EM QUALQUER PERSONAGEM</span>
              </div>
              <div className="text-[11px] font-bold text-slate-400 bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800">
                {teamMembers.length} Colaboradores no Mapa
              </div>
            </div>

            {/* Cyberpunk Grid Floor Plan */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

            {/* Interactive Avatar Nodes */}
            <div className="relative flex-1">
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setActiveTeammateChat(member)}
                  style={{ left: `${member.xPos}%`, top: `${member.yPos}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                    activeTeammateChat?.id === member.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${member.avatarColor} p-0.5 shadow-xl shadow-teal-500/20 ring-4 ${activeTeammateChat?.id === member.id ? 'ring-teal-400' : 'ring-slate-900'}`}>
                    <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 font-black text-white text-xs">
                      {member.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-slate-950">
                      <span className="h-2 w-2 rounded-full bg-emerald-950 animate-ping" />
                    </span>
                  </div>

                  <span className="mt-1 rounded-md bg-slate-950/90 px-2 py-0.5 text-[10px] font-black text-slate-200 border border-slate-800 shadow-md">
                    {member.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-center text-xs text-slate-400 bg-slate-950/90 p-3 rounded-2xl border border-slate-800 z-10">
              Clique em qualquer avatar no escritório para abrir o chat em tempo real e ver as tarefas ativas!
            </div>
          </div>

          {/* Teammate Chat & Profile Inspector */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 flex flex-col justify-between backdrop-blur-xl h-full">
            {activeTeammateChat ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-teal-400" />
                      <div>
                        <h3 className="text-sm font-black text-white">{activeTeammateChat.name}</h3>
                        <p className="text-[10px] text-slate-400">{activeTeammateChat.role}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[9px] font-black text-emerald-400 border border-emerald-500/30">
                      ONLINE
                    </span>
                  </div>

                  {activeTeammateChat.currentSprint && (
                    <div className="rounded-xl bg-slate-950 p-3 border border-teal-500/30 text-xs">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Sprint Ativo Atribuído:</div>
                      <div className="font-bold text-teal-300 mt-0.5">{activeTeammateChat.currentSprint}</div>
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    {activeTeammateChat.bio}
                  </p>

                  {/* Chat Messages */}
                  <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs">
                    {activeTeammateChat.messages.map((msg, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-slate-900/80 space-y-0.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <strong className="text-teal-400">{msg.sender}</strong>
                          <span className="text-slate-500">{msg.time}</span>
                        </div>
                        <p className="text-slate-200">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Chat Input */}
                <form onSubmit={handleSendChatMessage} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder={`Enviar mensagem em tempo real para ${activeTeammateChat.name.split(' ')[0]}...`}
                    className="flex-1 rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white focus:border-teal-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 hover:from-teal-400 hover:to-emerald-300 transition-all cursor-pointer font-black"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-20 text-center text-xs text-slate-500">
                Selecione um personagem no Escritório Espacial para conversar e alinhar sprints.
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 1: Game Map (Obsidian Game Interface) */}
      {activeTab === 'game-map' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative aspect-video w-full overflow-hidden rounded-3xl border border-teal-500/30 bg-[#020409] p-6 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-black text-teal-400">
                <Activity className="h-4 w-4 animate-spin" />
                <span>OBSIDIAN COGNITIVE ARENA • SELECIONE QUALQUER NÓ</span>
              </div>
              <div className="text-[11px] font-bold text-slate-400 bg-slate-900/90 px-3 py-1 rounded-xl border border-slate-800">
                Clique nos Nós de IA para Injetar Boost (+150 XP)
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
              <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="75%" y2="20%" stroke="#34d399" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#818cf8" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="12%" y2="50%" stroke="#c084fc" strokeWidth="2" strokeDasharray="6" />
              <line x1="50%" y1="50%" x2="88%" y2="50%" stroke="#fb7185" strokeWidth="2" strokeDasharray="6" />
            </svg>

            <div className="relative flex-1 flex items-center justify-center">
              <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 p-2 text-slate-950 font-black shadow-2xl shadow-teal-500/60 ring-8 ring-teal-500/30 animate-pulse">
                <Sparkles className="h-8 w-8" />
                <span className="text-[10px] uppercase font-black tracking-widest mt-1">TerraNova</span>
              </div>

              <button
                onClick={() => setSelectedGraphNode('Gemini')}
                className={`absolute top-6 left-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'Gemini' ? 'border-cyan-400 text-cyan-300 scale-125 ring-4 ring-cyan-500/40 shadow-xl' : 'border-slate-800 text-slate-400 hover:border-cyan-400'
                }`}
              >
                <span>Gemini</span>
                <span className="text-[9px] text-cyan-400 font-mono">{nodeWeights.Gemini}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('OpenAI')}
                className={`absolute top-6 right-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'OpenAI' ? 'border-emerald-400 text-emerald-300 scale-125 ring-4 ring-emerald-500/40 shadow-xl' : 'border-slate-800 text-slate-400 hover:border-emerald-400'
                }`}
              >
                <span>GPT-4o</span>
                <span className="text-[9px] text-emerald-400 font-mono">{nodeWeights.OpenAI}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('DeepSeek')}
                className={`absolute bottom-6 left-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'DeepSeek' ? 'border-indigo-400 text-indigo-300 scale-125 ring-4 ring-indigo-500/40 shadow-xl' : 'border-slate-800 text-slate-400 hover:border-indigo-400'
                }`}
              >
                <span>DeepSeek</span>
                <span className="text-[9px] text-indigo-400 font-mono">{nodeWeights.DeepSeek}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('Claude')}
                className={`absolute bottom-6 right-1/4 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'Claude' ? 'border-amber-400 text-amber-300 scale-125 ring-4 ring-amber-500/40 shadow-xl' : 'border-slate-800 text-slate-400 hover:border-amber-400'
                }`}
              >
                <span>Claude</span>
                <span className="text-[9px] text-amber-400 font-mono">{nodeWeights.Claude}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('Perplexity')}
                className={`absolute left-6 top-1/2 -translate-y-1/2 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'Perplexity' ? 'border-purple-400 text-purple-300 scale-125 ring-4 ring-purple-500/40 shadow-xl' : 'border-slate-800 text-slate-400 hover:border-purple-400'
                }`}
              >
                <span>Perplexity</span>
                <span className="text-[9px] text-purple-400 font-mono">{nodeWeights.Perplexity}%</span>
              </button>

              <button
                onClick={() => setSelectedGraphNode('Grok')}
                className={`absolute right-6 top-1/2 -translate-y-1/2 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-slate-950 border-2 text-[10px] font-black transition-all duration-300 cursor-pointer ${
                  selectedGraphNode === 'Grok' ? 'border-rose-400 text-rose-300 scale-125 ring-4 ring-rose-500/40 shadow-xl' : 'border-slate-800 text-slate-400 hover:border-rose-400'
                }`}
              >
                <span>Grok</span>
                <span className="text-[9px] text-rose-400 font-mono">{nodeWeights.Grok}%</span>
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 space-y-4 flex flex-col justify-between backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black text-teal-400 uppercase">Módulo Tático</span>
                <span className="text-xs font-mono font-bold text-emerald-400">200 OK</span>
              </div>
              <div className="text-lg font-black text-white">{selectedGraphNode} Node</div>
              <button
                onClick={() => handleBoostNodeWeight(selectedGraphNode)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 p-3 text-xs font-black text-slate-950 hover:from-teal-400 hover:to-emerald-300 cursor-pointer shadow-md"
              >
                <Zap className="h-4 w-4 fill-current" />
                <span>Injetar Boost de Foco (+5% / +150 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sprints Perpétuos */}
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
                  <span className="rounded-lg bg-teal-500/20 px-2.5 py-1 text-xs font-black text-teal-300 border border-teal-500/40 font-mono">
                    {sp.sprintCode}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{sp.createdDate}</span>
                </div>
                <h4 className="mt-3 text-base font-bold text-white group-hover:text-teal-400">{sp.title}</h4>
                <p className="mt-1.5 text-xs text-slate-300 line-clamp-2">{sp.decisionRationale}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRunSprintSimulation(sp);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 px-3.5 py-2 text-xs font-black text-slate-950 hover:from-teal-400 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Lançar Simulação (+500 XP)</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCommand(sp.commandToExecute);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-950 border border-emerald-500/40 px-3.5 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-950/40 cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copiar Comando CLI</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 h-fit">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-3">
              Inspetor Tático
            </h3>
            {selectedSprint ? (
              <div className="space-y-4 text-xs">
                <div className="text-lg font-black text-teal-400 font-mono">{selectedSprint.sprintCode}</div>
                <div className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">{selectedSprint.decisionRationale}</div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-500">Selecione um sprint da fila.</div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Moduladores de Peso */}
      {activeTab === 'nodes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <div key={node.id} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <span className="text-xs font-black text-teal-400 uppercase">{node.provider}</span>
              <h3 className="text-lg font-black text-white">{node.name}</h3>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={nodeWeights[node.provider] || 95}
                onChange={(e) => setNodeWeights({ ...nodeWeights, [node.provider]: parseInt(e.target.value) })}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Conquistas */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ac, idx) => (
            <div key={idx} className="flex items-start gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <ac.icon className="h-7 w-7 text-teal-400" />
              <div>
                <h3 className="text-base font-black text-white">{ac.title}</h3>
                <p className="text-xs text-slate-400">{ac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Convidar Membro da Equipe */}
      {isInvitingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-teal-500/40 bg-[#090D16] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-teal-400" />
                <h3 className="text-base font-black text-white">Convidar Membro da Equipe</h3>
              </div>
              <button onClick={() => setIsInvitingMember(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Nome do Colaborador</label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Ex: Ana Silva (Frontend Lead)"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:border-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Função / Cargo</label>
                <input
                  type="text"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="Ex: Engenheira de IA & Prompt Guardian"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInvitingMember(false)}
                  className="px-4 py-2 text-slate-400 hover:bg-slate-900 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black rounded-xl cursor-pointer"
                >
                  Gerar Acesso & Entrar no Escritório (+400 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Criar Sprint */}
      {isCreatingSprint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl border border-teal-500/40 bg-[#090D16] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">Criar Novo Sprint Perpétuo</h3>
              <button onClick={() => setIsCreatingSprint(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleCreateSprintSubmit} className="space-y-4 text-xs">
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Título do Sprint" className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-white" required />
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black rounded-xl cursor-pointer">Registrar Sprint (+350 XP)</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
