import { Lead, Message, Property } from '../types';

export const mockProperties: Property[] = [
  {
    id: 'prop-101',
    title: 'Fazenda Vale do Araguaia - 2.400 Hectares',
    type: 'rural',
    price: 'R$ 28.500.000',
    location: 'Cocalinho, MT',
    area: '2.400 ha (1.600 ha abertos em lavoura)',
    farmType: 'Grãos/Soja',
    details: [
      'Teor de argila: 32% a 38%',
      'Duas safras consolidadas (Soja/Milho)',
      'Outorga de água aprovada para pivô 300ha',
      'Sede completa com alojamento e pivôs'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    carStatus: '100% Regular (SIGEF / GEO OK)',
    clayContent: '35% Média',
    waterPermit: true
  },
  {
    id: 'prop-102',
    title: 'Penthouse Mansão Jardins Europa',
    type: 'urban',
    price: 'R$ 14.800.000',
    location: 'Jardins, São Paulo - SP',
    area: '480 m² privativos',
    urbanType: 'Penthouse',
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpaces: 6,
    condoFee: 'R$ 6.800 / mês',
    iptuFee: 'R$ 3.200 / mês',
    amenities: [
      'Vista 360° panorâmica para o clube',
      'Piscina privativa aquecida com borda infinita',
      'Automação de iluminação Lutron',
      'Segurança armada 24h e elevador privativo codificado'
    ],
    details: [
      '4 suítes com varanda privativa',
      'Piscina com borda infinita na cobertura',
      '6 vagas determinadas + depósito privado',
      'Acabamento em mármore Calacatta'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prop-103',
    title: 'Haras & Fazenda Santa Maria',
    type: 'rural',
    price: 'R$ 18.200.000',
    location: 'Avaré, SP',
    area: '450 Hectares',
    farmType: 'Haras',
    details: [
      'Pistas cobertas para treinamento de marcha',
      '30 colcheiras em alvenaria com estrutura veterinária',
      'Recursos hídricos abundantes com nascente própria',
      'Casarão colonial centenário restaurado'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    carStatus: '100% Regularizado',
    clayContent: '28% Argiloso',
    waterPermit: true
  },
  {
    id: 'prop-104',
    title: 'Residência Villa Alpha - Alphaville 1',
    type: 'urban',
    price: 'R$ 8.900.000',
    location: 'Alphaville, Barueri - SP',
    area: '620 m² construídos',
    urbanType: 'Casa em Condomínio',
    bedrooms: 5,
    suites: 5,
    bathrooms: 7,
    parkingSpaces: 4,
    condoFee: 'R$ 2.400 / mês',
    iptuFee: 'R$ 1.100 / mês',
    amenities: [
      'Espaço gourmet integrado com parrilla',
      'Piscina aquecida com prainha e SPA',
      'Home theater acústico para 12 pessoas',
      'Usina fotovoltaica instalada (Energia Solar)'
    ],
    details: [
      '5 suítes master com closet espaçoso',
      'Projeto assinado por arquiteto renomado',
      'Amplo jardim com paisagismo tropical',
      'Garagem coberta para 4 veículos grandes'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Dr. Roberto Silveira',
    phone: '+55 (11) 98765-4321',
    email: 'roberto.silveira@investagro.com.br',
    origin: 'Meta Ads',
    status: 'ia_attending',
    qualificationScore: 94,
    budget: 'R$ 25M a R$ 30M',
    urgency: 'Imediata (30d)',
    propertyOfInterest: mockProperties[0],
    lastMessage: 'Qual é o prazo de pagamento da fazenda no Mato Grosso?',
    lastMessageTime: 'Agora',
    unreadCount: 1,
    assignedBroker: 'SDR IA Terra Nova'
  },
  {
    id: 'lead-002',
    name: 'Juliana Camargo Mendes',
    phone: '+55 (11) 99123-8877',
    email: 'juliana.mendes@advocacia.com.br',
    origin: 'ZAP Imóveis',
    status: 'visit_scheduled',
    qualificationScore: 98,
    budget: 'R$ 15.000.000',
    urgency: 'Imediata (30d)',
    propertyOfInterest: mockProperties[1],
    lastMessage: 'Perfeito! Confirmado a visita amanhã às 14:30 na Penthouse.',
    lastMessageTime: '14:18',
    assignedBroker: 'Carlos Eduardo (Corretor)'
  },
  {
    id: 'lead-003',
    name: 'Marcos Vinícius Prado',
    phone: '+55 (19) 97788-5544',
    origin: 'Google Ads',
    status: 'requires_human',
    qualificationScore: 88,
    budget: 'R$ 18.000.000',
    urgency: 'Média (90d)',
    propertyOfInterest: mockProperties[2],
    lastMessage: 'Gostaria de saber se aceita 40% em permuta por imóveis em Campinas?',
    lastMessageTime: '13:45',
    unreadCount: 2,
    assignedBroker: 'Aguardando Atendimento'
  },
  {
    id: 'lead-004',
    name: 'Dra. Beatriz Fontana',
    phone: '+55 (11) 97711-2233',
    email: 'beatriz.fontana@med.com.br',
    origin: 'Meta Ads',
    status: 'ia_attending',
    qualificationScore: 92,
    budget: 'R$ 9.000.000',
    urgency: 'Imediata (30d)',
    propertyOfInterest: mockProperties[3],
    lastMessage: 'A casa em Alphaville tem energia solar instalada?',
    lastMessageTime: '12:05',
    assignedBroker: 'SDR IA Terra Nova'
  }
];

export const mockMessagesMap: Record<string, Message[]> = {
  'lead-001': [
    {
      id: 'm-1',
      leadId: 'lead-001',
      sender: 'lead',
      text: 'Olá! Vi o anúncio da Fazenda Vale do Araguaia de 2.400 ha no Facebook. Ela tem outorga de água para irrigação?',
      timestamp: '14:22'
    },
    {
      id: 'm-2',
      leadId: 'lead-001',
      sender: 'ai',
      text: 'Olá Dr. Roberto! Seja muito bem-vindo ao Portal Terra Nova. 🚜\n\nSim, a Fazenda Vale do Araguaia possui outorga de água aprovada para pivô de 300 hectares, além de 1.600 ha já consolidados em lavoura com teor de argila entre 32% e 38%.\n\nO valor investido é de R$ 28.500.000. O senhor busca ampliação de área própria ou investimento para arrendamento?',
      timestamp: '14:22',
      responseTimeSeconds: 11
    },
    {
      id: 'm-3',
      leadId: 'lead-001',
      sender: 'lead',
      text: 'Busco área própria para plantio de soja e milho. Qual é a forma e prazo de pagamento negociável?',
      timestamp: '14:24'
    },
    {
      id: 'm-4',
      leadId: 'lead-001',
      sender: 'ai',
      text: 'Perfeito! Para produtores com foco em safra/safrinha, o proprietário estuda entrada de 40% e o saldo em até 3 parcelas anuais indexadas em sacas de soja.\n\nTenho a apresentação técnica em PDF com análise de solo e mapas do CAR. Posso enviar no seu WhatsApp agora ou prefere agendar uma ligação com nosso especialista agronômico?',
      timestamp: '14:24',
      responseTimeSeconds: 14,
      propertyCard: mockProperties[0]
    }
  ],
  'lead-002': [
    {
      id: 'm-201',
      leadId: 'lead-002',
      sender: 'lead',
      text: 'Boa tarde! Gostaria de agendar uma visita na Penthouse do Jardim Europa.',
      timestamp: '14:10'
    },
    {
      id: 'm-202',
      leadId: 'lead-002',
      sender: 'ai',
      text: 'Boa tarde Juliana! Com certeza. A Penthouse Mansão Jardins Europa tem 480 m², 4 suítes, 6 vagas e piscina privativa aquecida com borda infinita. 🏙️\n\nTenho horários disponíveis amanhã às 10:00 ou 14:30. Qual fica melhor para você?',
      timestamp: '14:10',
      responseTimeSeconds: 12
    },
    {
      id: 'm-203',
      leadId: 'lead-002',
      sender: 'lead',
      text: 'Amanhã às 14:30 fica perfeito!',
      timestamp: '14:15'
    },
    {
      id: 'm-204',
      leadId: 'lead-002',
      sender: 'ai',
      text: 'Excelente! Visita confirmada para amanhã, 07/08 às 14:30. O corretor especializado Carlos Eduardo estará no local para acompanhá-la.',
      timestamp: '14:15',
      responseTimeSeconds: 10,
      appointmentDetails: {
        date: 'Amanhã, 07/08/2026',
        time: '14:30',
        location: 'Rua Hungria, 1200 - Penthouse 221 - Jardins, São Paulo'
      }
    }
  ],
  'lead-004': [
    {
      id: 'm-401',
      leadId: 'lead-004',
      sender: 'lead',
      text: 'A casa em Alphaville tem energia solar instalada?',
      timestamp: '12:05'
    },
    {
      id: 'm-402',
      leadId: 'lead-004',
      sender: 'ai',
      text: 'Olá Dra. Beatriz! Sim, a Residência Villa Alpha em Alphaville 1 possui usina fotovoltaica completa instalada, gerando autossuficiência de energia solar. 🏡\n\nSão 620 m² de área construída, 5 suítes master, espaço gourmet com parrilla e piscina aquecida com SPA.\n\nO valor investido é de R$ 8.900.000. Gostaria de receber o tour virtual 3D ou agendar uma visita presencial?',
      timestamp: '12:05',
      responseTimeSeconds: 11,
      propertyCard: mockProperties[3]
    }
  ]
};
