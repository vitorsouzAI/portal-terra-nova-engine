import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeadListColumn } from './components/LeadListColumn';
import { ChatColumn } from './components/ChatColumn';
import { CRMSidebarColumn } from './components/CRMSidebarColumn';
import { OnboardingModal } from './components/OnboardingModal';
import { PropertyManagerModal } from './components/PropertyManagerModal';
import { LeadRoutingModal } from './components/routing/LeadRoutingModal';
import { UserQualificationModal } from './components/onboarding/UserQualificationModal';
import { CouncilChatModal } from './components/council/CouncilChatModal';
import { RuralPortalView } from './components/rural/RuralPortalView';
import { MaringaDevelopersView } from './components/dwv/MaringaDevelopersView';
import { ResidentialPortalView } from './components/residential/ResidentialPortalView';
import { DevCockpitView } from './components/dev/DevCockpitView';

import { mockLeads, mockMessagesMap, mockProperties } from './data/mockData';
import { Lead, Message, Property, MainSectionMode } from './types';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<MainSectionMode>('rural');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [activeLeadId, setActiveLeadId] = useState<string>('lead-001');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(mockMessagesMap);
  
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isPropertyManagerOpen, setIsPropertyManagerOpen] = useState<boolean>(false);
  const [isCouncilChatOpen, setIsCouncilChatOpen] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<'tenant' | 'autonomous'>('tenant');

  // Routing state map: propertyId -> routeType (only after user clarifies where the lead goes)
  const [routedPropertiesMap, setRoutedPropertiesMap] = useState<Record<string, 'terranova_specialist' | 'direct_advertiser' | 'multi_development_curatorship'>>({});

  // Hidden Intent Filter Routing Modal State
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState<boolean>(false);
  const [routingPropertyId, setRoutingPropertyId] = useState<string>('');
  const [routingPropertyTitle, setRoutingPropertyTitle] = useState<string>('');
  const [routingDeveloperName, setRoutingDeveloperName] = useState<string | undefined>(undefined);

  // Unidentified User Profile Qualification Popup State
  const [userProfile, setUserProfile] = useState<'buyer' | 'broker' | 'owner' | 'unidentified'>('unidentified');
  const [isQualificationModalOpen, setIsQualificationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userProfile === 'unidentified') {
        setIsQualificationModalOpen(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [userProfile]);

  const activeLead = leads.find((l) => l.id === activeLeadId) || leads[0];
  const activeMessages = messagesMap[activeLeadId] || [];

  const handleSelectLead = (id: string) => {
    setActiveLeadId(id);
  };

  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  // Triggers the Hidden Intent Filter Modal
  const handleOpenWhatsAppLead = (propertyId: string, propertyTitle: string, developerName?: string) => {
    // If routing is already clear for this property, open schedule visit action directly
    if (routedPropertiesMap[propertyId]) {
      alert(`[Agendar Visita Liberado]: O atendimento deste imóvel já está roteado para "${routedPropertiesMap[propertyId]}". Abrindo agenda de visitas.`);
      setActiveSection('crm');
      return;
    }

    setRoutingPropertyId(propertyId);
    setRoutingPropertyTitle(propertyTitle);
    setRoutingDeveloperName(developerName);
    setIsRoutingModalOpen(true);
  };

  // Handles routing choice from the LeadRoutingModal
  const handleSelectRoute = (routeType: 'terranova_specialist' | 'multi_development_curatorship' | 'direct_advertiser') => {
    setIsRoutingModalOpen(false);
    
    // Store that routing is now clear for this property
    setRoutedPropertiesMap((prev) => ({
      ...prev,
      [routingPropertyId]: routeType
    }));

    setActiveSection('crm');

    if (routeType === 'multi_development_curatorship') {
      alert(`[Roteamento Confirmado]: Atendimento direcionado para Curadoria Neutra de Lançamentos. O botão "Agendar Visita" está agora LIBERADO.`);
    } else if (routeType === 'terranova_specialist') {
      alert(`[Roteamento Confirmado]: Atendimento direcionado para Especialista Conselheiro TerraNova OS. O botão "Agendar Visita" está agora LIBERADO.`);
    } else {
      alert(`[Roteamento Confirmado]: Atendimento direcionado para o Anunciante/Construtora. O botão "Agendar Visita" está agora LIBERADO.`);
    }
  };

  const handleSelectProfile = (profile: 'buyer' | 'broker' | 'owner') => {
    setUserProfile(profile);
    setIsQualificationModalOpen(false);
    if (profile === 'broker') {
      setActiveSection('crm');
    }
  };

  const handleSkipQualification = () => {
    setIsQualificationModalOpen(false);
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      leadId: activeLeadId,
      sender: 'broker',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeLeadId]: [...(prev[activeLeadId] || []), newMessage]
    }));

    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === activeLeadId) {
          return {
            ...l,
            status: 'human_active',
            aiPaused: true,
            lastMessage: `[Corretor]: ${text}`,
            lastMessageTime: newMessage.timestamp
          };
        }
        return l;
      })
    );
  };

  const handleToggleAi = () => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === activeLeadId) {
          const isCurrentlyPaused = l.aiPaused || l.status === 'human_active';
          return {
            ...l,
            aiPaused: !isCurrentlyPaused,
            status: !isCurrentlyPaused ? 'human_active' : 'ia_attending'
          };
        }
        return l;
      })
    );
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#080C14] text-slate-100 font-sans">
      
      {/* Top Header Navigation with "Mundos" theme */}
      <Header
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
        onOpenPropertyManager={() => setIsPropertyManagerOpen(true)}
        onOpenCouncilChat={() => setIsCouncilChatOpen(true)}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex flex-1 overflow-hidden">
        
        {/* Mundo 1: Portal Rural (Agro) */}
        {activeSection === 'rural' && (
          <RuralPortalView 
            onOpenWhatsAppLead={(id, title) => handleOpenWhatsAppLead(id, title)}
            routedPropertiesMap={routedPropertiesMap}
          />
        )}

        {/* Mundo 2: Construtoras Maringá (Lançamentos DWV) */}
        {activeSection === 'maringa-construtoras' && (
          <MaringaDevelopersView 
            onOpenWhatsAppLead={(id, title, dev) => handleOpenWhatsAppLead(id, title, dev)} 
            routedPropertiesMap={routedPropertiesMap}
          />
        )}

        {/* Mundo 3: Imóveis Prontos de Luxo */}
        {activeSection === 'prontos' && (
          <ResidentialPortalView 
            onOpenWhatsAppLead={(id, title) => handleOpenWhatsAppLead(id, title)} 
            routedPropertiesMap={routedPropertiesMap}
          />
        )}

        {/* Mundo Dev: A Oficina do Desenvolvimento Metacognitivo (Cockpit Multi-LLM) */}
        {activeSection === 'dev-cockpit' && (
          <DevCockpitView />
        )}


        {/* Central do Corretor / Omnichannel CRM Inbox */}
        {activeSection === 'crm' && (
          <div className="flex w-full h-full">
            {/* Column 1: Lead List & Filters */}
            <div className="w-full sm:w-80 shrink-0 h-full border-r border-slate-800">
              <LeadListColumn
                leads={leads}
                activeLeadId={activeLeadId}
                onSelectLead={handleSelectLead}
              />
            </div>

            {/* Column 2: Real-time Chat Feed */}
            <div className="hidden sm:flex flex-1 h-full flex-col">
              <ChatColumn
                lead={activeLead}
                messages={activeMessages}
                onSendMessage={handleSendMessage}
                onToggleAi={handleToggleAi}
              />
            </div>

            {/* Column 3: CRM Sidebar */}
            <div className="hidden lg:block w-84 shrink-0 h-full border-l border-slate-800">
              <CRMSidebarColumn
                lead={activeLead}
                onOpenPropertyManager={() => setIsPropertyManagerOpen(true)}
              />
            </div>
          </div>
        )}

      </main>

      {/* Antigravity Multi-LLM Council Meta-Chat Interface */}
      <CouncilChatModal
        isOpen={isCouncilChatOpen}
        onClose={() => setIsCouncilChatOpen(false)}
      />

      {/* Unidentified User Qualification Modal */}
      <UserQualificationModal
        isOpen={isQualificationModalOpen}
        onSelectProfile={handleSelectProfile}
        onSkip={handleSkipQualification}
      />

      {/* Multi-Development Curatorship & Hidden Intent Routing Modal */}
      <LeadRoutingModal
        isOpen={isRoutingModalOpen}
        propertyTitle={routingPropertyTitle}
        developerName={routingDeveloperName}
        onClose={() => setIsRoutingModalOpen(false)}
        onSelectRoute={handleSelectRoute}
      />

      {/* Transparent Onboarding Modal Wizard */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* Property Registration Modal Wizard */}
      <PropertyManagerModal
        isOpen={isPropertyManagerOpen}
        onClose={() => setIsPropertyManagerOpen(false)}
        onAddProperty={handleAddProperty}
      />

    </div>
  );
};

export default App;
