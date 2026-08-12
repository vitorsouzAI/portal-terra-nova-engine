import React, { useState } from 'react';
import { Lead, Message } from '../types';
import { 
  Bot, 
  PauseCircle, 
  PlayCircle, 
  Send, 
  CalendarCheck, 
  MapPin, 
  Sparkles, 
  ShieldAlert, 
  CheckCheck,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

interface ChatColumnProps {
  lead: Lead;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onToggleAi: () => void;
}

export const ChatColumn: React.FC<ChatColumnProps> = ({
  lead,
  messages,
  onSendMessage,
  onToggleAi
}) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  const isAiActive = lead.status === 'ia_attending' && !lead.aiPaused;

  return (
    <div className="flex h-full flex-col bg-[#0B101D] border-r border-slate-800/80">
      
      {/* Active Lead Header & Master Control Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/80 p-3.5 backdrop-blur-md">
        
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-emerald-400 border border-slate-700">
            {lead.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100">{lead.name}</h2>
              <span className="text-xs text-slate-400">({lead.phone})</span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>Interesse: <strong className="text-slate-200">{lead.propertyOfInterest.title}</strong></span>
            </p>
          </div>
        </div>

        {/* Master Control Button: PAUSE IA / ASSUMIR CHAT */}
        <div className="flex items-center gap-2">
          {isAiActive ? (
            <button
              onClick={onToggleAi}
              className="flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-all shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95"
            >
              <PauseCircle className="h-4 w-4 text-amber-400" />
              <span>Assumir Chat (Pausar IA)</span>
            </button>
          ) : (
            <button
              onClick={onToggleAi}
              className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 transition-all shadow-lg shadow-emerald-500/10 cursor-pointer active:scale-95"
            >
              <PlayCircle className="h-4 w-4 text-emerald-400" />
              <span>Devolver Atendimento para IA</span>
            </button>
          )}
        </div>

      </div>

      {/* AI Status Banner */}
      <div className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
        isAiActive 
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
          : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
      }`}>
        <span className="flex items-center gap-1.5 font-medium">
          {isAiActive ? (
            <>
              <Bot className="h-4 w-4 text-emerald-400 animate-pulse" />
              SDR IA Ativo — Respondendo leads em &lt; 30s com base no pgvector
            </>
          ) : (
            <>
              <ShieldAlert className="h-4 w-4 text-blue-400" />
              IA Pausada — Atendimento Humano Ativo (O corretor está digitando)
            </>
          )}
        </span>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
          {isAiActive ? 'IA no Controle' : 'Humano no Controle'}
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isLead = msg.sender === 'lead';
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isLead ? 'items-start' : 'items-end'}`}
            >
              {/* Sender Subheader Badge */}
              <div className="mb-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                {isLead ? (
                  <span>{lead.name}</span>
                ) : isAi ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Bot className="h-3.5 w-3.5 text-emerald-400" />
                    SDR Agent Terra Nova • {msg.responseTimeSeconds || 12}s
                  </span>
                ) : (
                  <span className="text-blue-400 font-bold">👤 Corretor Humano</span>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                  isLead
                    ? 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-sm'
                    : isAi
                    ? 'bg-gradient-to-br from-emerald-950/80 to-slate-900 text-slate-100 border border-emerald-500/30 rounded-tr-sm glow-emerald'
                    : 'bg-gradient-to-br from-blue-950/80 to-slate-900 text-slate-100 border border-blue-500/30 rounded-tr-sm'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Optional Embedded Property Preview Card */}
                {msg.propertyCard && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-emerald-500/30 bg-slate-950/80 p-2.5">
                    <div className="flex gap-2.5">
                      <img
                        src={msg.propertyCard.imageUrl}
                        alt={msg.propertyCard.title}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{msg.propertyCard.title}</h4>
                        <div className="text-xs font-extrabold text-emerald-400">{msg.propertyCard.price}</div>
                        <div className="text-[10px] text-slate-400">{msg.propertyCard.location}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Optional Appointment Confirmation Card */}
                {msg.appointmentDetails && (
                  <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-amber-200">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300 mb-1">
                      <CalendarCheck className="h-4 w-4" />
                      <span>Visita Agendada pela IA</span>
                    </div>
                    <div className="text-xs text-slate-200 font-semibold">{msg.appointmentDetails.date} às {msg.appointmentDetails.time}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-amber-400" /> {msg.appointmentDetails.location}
                    </div>
                  </div>
                )}

                <div className="mt-1 flex justify-end">
                  <CheckCheck className="h-3 w-3 text-emerald-400" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Input Bar & Quick Actions */}
      <form onSubmit={handleSend} className="border-t border-slate-800/80 bg-slate-950 p-3">
        
        {/* Quick Action Chips */}
        <div className="mb-2 flex items-center gap-2 overflow-x-auto pb-1 text-[11px] no-scrollbar">
          <button
            type="button"
            onClick={() => setInputMessage('Olá! Seguem as fotos e a ficha técnica completa do imóvel.')}
            className="flex items-center gap-1 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-slate-300 hover:border-emerald-500/40 hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            <ImageIcon className="h-3 w-3 text-emerald-400" /> Enviar Fotos
          </button>
          <button
            type="button"
            onClick={() => setInputMessage('Gostaria de agendar uma visita presencial para esta semana?')}
            className="flex items-center gap-1 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-slate-300 hover:border-amber-500/40 hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            <CalendarCheck className="h-3 w-3 text-amber-400" /> Sugerir Visita
          </button>
          <button
            type="button"
            onClick={() => setInputMessage('Vou preparar a minuta da proposta e te envio em minutos.')}
            className="flex items-center gap-1 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-slate-300 hover:border-teal-500/40 hover:text-white transition-all cursor-pointer whitespace-nowrap"
          >
            <FileText className="h-3 w-3 text-teal-400" /> Minuta de Proposta
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={
              isAiActive
                ? 'Digite para intervir no chat (a IA pausará automaticamente)...'
                : 'Digite sua mensagem como corretor...'
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 rounded-xl bg-slate-900 border border-slate-800 py-2.5 px-4 text-xs text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all font-bold cursor-pointer active:scale-95 shadow-md shadow-emerald-500/20"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
