export type LeadStatus = 'ia_attending' | 'visit_scheduled' | 'requires_human' | 'human_active';

export type MainSectionMode = 'rural' | 'maringa-construtoras' | 'prontos' | 'crm' | 'dev-cockpit';

export type PropertyType = 'rural' | 'urban' | 'lancamento';

export type RuralAptitude = 'Lavoura / Soja' | 'Pecuária' | 'Aviário Dark House' | 'Haras' | 'Terra Nua' | 'Mista';

export interface Story7Step {
  hook: string;
  expectationSubversion: string;
  anchorMetric: string;
  unfairAdvantage: string;
  assetLandBreakdown: string;
  marketPositioning: string;
  highIntentCTA: string;
}

export interface ClaimProvenance {
  claimId: string;
  statement: string;
  status: 'VERIFIED' | 'ACCEPTED_WITH_CAUTION' | 'INFERRED' | 'MISSING';
  confidence: number;
  source: string;
  validatedBy: string[];
}

export interface RuralProperty {
  id: string;
  title: string;
  slug: string;
  city: string;
  state: string;
  region: string;
  price: string;
  priceNumeric: number;
  areaHectares: number;
  areaAlqueires: number;
  alqueireType: 'Paulista (24.200m²)' | 'Mineiro (48.400m²)' | 'Baiano (96.800m²)';
  aptitude: RuralAptitude;
  carStatus: 'CAR Ativo & Auditado' | 'CAR em Análise' | 'Pendente';
  carNumber?: string;
  incraId?: string;
  clayContent?: string;
  waterResources?: string;
  infrastructure?: string[];
  aviaryCapacity?: string;
  liquidityScore: number;
  iotStatus: 'VERIFIED' | 'IOT_PRELIMINARY' | 'DRAFT';
  missingData?: string[];
  imageUrl: string;
  galleryImages: string[];
  droneVideoUrl?: string;
  storyNarrative: Story7Step;
  provenanceClaims: ClaimProvenance[];
}

export interface MaringaDevelopment {
  id: string;
  dwvId: string;
  developerName: string;
  developerLogo: string;
  title: string;
  slug: string;
  neighborhood: string;
  city: string;
  deliveryYear: number;
  status: 'Lançamento' | 'Em Obras' | 'Pronto para Morar';
  priceFrom: string;
  priceFromNumeric: number;
  areaFrom: number;
  areaTo: number;
  bedroomsRange: string;
  parkingSpaces: number;
  featuredVideoUrl?: string;
  instagramHandle?: string;
  description: string;
  differentials: string[];
  imageUrl: string;
  galleryImages: string[];
  floorsCount?: number;
  unitsPerFloor?: number;
  brokerCommissionPercent?: number;
  salesContactWhatsapp: string;
}

export interface ResidentialProperty {
  id: string;
  title: string;
  slug: string;
  city: string;
  neighborhood: string;
  type: 'Apartamento' | 'Casa em Condomínio' | 'Sobrado' | 'Terreno Urbano' | 'Comercial';
  price: string;
  priceNumeric: number;
  usefulArea: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  condoFee?: string;
  iptuFee?: string;
  amenities: string[];
  imageUrl: string;
  galleryImages: string[];
  status: 'Pronto para Morar' | 'Seminovo' | 'Em Reforma';
}

export interface SEOData {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords: string[];
  ogImage: string;
  schemaJsonLd: object;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: string;
  location: string;
  area: string;
  details: string[];
  imageUrl: string;
  
  carStatus?: string;
  clayContent?: string;
  waterPermit?: boolean;
  farmType?: 'Grãos/Soja' | 'Pecuária' | 'Haras' | 'Mixta';
  
  bedrooms?: number;
  suites?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  condoFee?: string;
  iptuFee?: string;
  amenities?: string[];
  urbanType?: 'Apartamento' | 'Penthouse' | 'Casa em Condomínio' | 'Terreno Urbano';
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  origin: 'Meta Ads' | 'Google Ads' | 'ZAP Imóveis' | 'Direct WABA' | 'Portal Rural' | 'DWV Maringá';
  status: LeadStatus;
  qualificationScore: number;
  budget: string;
  urgency: 'Imediata (30d)' | 'Média (90d)' | 'Especulativa';
  propertyOfInterest: Property;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  assignedBroker?: string;
  aiPaused?: boolean;
}

export interface Message {
  id: string;
  leadId: string;
  sender: 'lead' | 'ai' | 'broker';
  text: string;
  timestamp: string;
  responseTimeSeconds?: number;
  propertyCard?: Property;
  appointmentDetails?: {
    date: string;
    time: string;
    location: string;
  };
}

export interface DevSprintItem {
  id: string;
  sprintCode: string;
  title: string;
  category: 'Front-End UI' | 'Multi-LLM Vector' | 'SEO Engine' | 'CRM Integrations' | 'Edge Database';
  status: 'PROPOSED_BY_COUNCIL' | 'APPROVED_BY_FOUNDER' | 'IN_EXECUTION' | 'COMPLETED' | 'PERPETUAL_RECORD';
  proposedByNode: 'Gemini 3.5' | 'GPT-4o' | 'DeepSeek R1' | 'Perplexity' | 'xAI Grok' | 'Claude 3.5';
  decisionRationale: string;
  vectorNodeTarget: string;
  commandToExecute: string;
  createdDate: string;
}

export interface DevCouncilNode {
  id: string;
  name: string;
  provider: 'Gemini' | 'OpenAI' | 'DeepSeek' | 'Perplexity' | 'Grok' | 'Claude';
  nodeStatus: 'ONLINE' | 'DELIBERATING' | 'STANDBY';
  specialtyVector: string;
  totalDeliberations: number;
}
