import { RuralProperty } from '../types';

export const mockRuralProperties: RuralProperty[] = [
  {
    id: 'rural-001',
    title: 'Fazenda Santa Fé — Lavoura de Soja de Alta Produtividade',
    slug: 'fazenda-santa-fe-maringa-soja',
    city: 'Santa Fé',
    state: 'PR',
    region: 'Região Metropolita de Maringá (45 km)',
    price: 'R$ 24.500.000',
    priceNumeric: 24500000,
    areaHectares: 677.6,
    areaAlqueires: 280,
    alqueireType: 'Paulista (24.200m²)',
    aptitude: 'Lavoura / Soja',
    carStatus: 'CAR Ativo & Auditado',
    carNumber: 'PR-4125707-88912A34901B',
    incraId: '950.082.019.281-0',
    clayContent: '58% a 64% (Terra Roxa)',
    waterResources: 'Rio Jacupiranga nos fundos + 2 poços artesianos de alta vazão',
    infrastructure: [
      'Barracão fechado de 800m² para maquinários',
      'Balança rodoviária automatizada 80 toneladas',
      'Casa sede duplex climatizada + 3 casas de colaboradores',
      'Secador e moega para grãos'
    ],
    liquidityScore: 92,
    iotStatus: 'VERIFIED',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1600&q=80'
    ],
    droneVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    storyNarrative: {
      hook: 'E se uma propriedade rural na região de Maringá já viesse com a operação de soja 100% pronta e alto teor de argila?',
      expectationSubversion: 'Não é uma terra de pastagem adaptada: são 280 Alqueires Paulistas de Terra Roxa consolidada há mais de 15 anos com média de 82 sacas/ha.',
      anchorMetric: '📊 Projeção de Faturamento Bruto Anual: R$ 4,80 MILHÕES com dupla safra (Soja + Milho Safrinha).',
      unfairAdvantage: 'Apenas 8 km do asfalto na PR-317 e 45 km das cooperativas Cocamar e Coamo em Maringá.',
      assetLandBreakdown: '230 Alqueires em lavoura contínua e mecanizada + 50 Alqueires em reserva legal averbada e infraestrutura.',
      marketPositioning: 'Imóvel ideal para produtores em expansão ou fundos de investimento agro buscando liquidez e segurança jurídica.',
      highIntentCTA: 'Receba a certidão ONR + laudo agronômico completo e memorial fotográfico enviando SANTA FE no WhatsApp.'
    },
    provenanceClaims: [
      {
        claimId: 'clm-001',
        statement: 'Área total de 280 Alqueires Paulistas (677,6 Hectares)',
        status: 'VERIFIED',
        confidence: 0.98,
        source: 'Matrícula Cartório de Registro de Imóveis + Georreferenciamento INCRA',
        validatedBy: ['Poder A (Gemini)', 'Poder B (Claude)']
      },
      {
        claimId: 'clm-002',
        statement: 'Teor de Argila médio de 58% a 64%',
        status: 'VERIFIED',
        confidence: 0.95,
        source: 'Laudo de Análise de Solo de Laboratório Credenciado',
        validatedBy: ['Poder C (DeepSeek)']
      },
      {
        claimId: 'clm-003',
        statement: 'CAR Ativo sem sobreposição em terras indígenas ou APPs',
        status: 'VERIFIED',
        confidence: 0.99,
        source: 'Sistema SICAR / IAT Paraná (Agosto 2026)',
        validatedBy: ['Poder D (Perplexity)']
      }
    ]
  },
  {
    id: 'rural-002',
    title: 'Núcleo Aviário Dark House — 140 Mil Aves Climatizadas',
    slug: 'nucleo-aviario-dark-house-astorga-maringa',
    city: 'Astorga',
    state: 'PR',
    region: 'Região de Maringá (30 km)',
    price: 'R$ 8.900.000',
    priceNumeric: 8900000,
    areaHectares: 60.5,
    areaAlqueires: 2.5,
    alqueireType: 'Paulista (24.200m²)',
    aptitude: 'Aviário Dark House',
    carStatus: 'CAR Ativo & Auditado',
    carNumber: 'PR-4102101-99214F',
    waterResources: '2 Poços artesianos com outorga IAT + reservatório 100.000 litros',
    infrastructure: [
      '4 Galpões Dark House (150x16m) com sistema Nipple e Pad Cooling',
      'Gerador automático de emergência STEMAC 250 kVA',
      'Sistema de aquecimento a pélete com abastecimento automático',
      'Casa de apoio técnico + escritório climatizado'
    ],
    aviaryCapacity: '140.000 aves por lote (~6 lotes/ano)',
    liquidityScore: 88,
    iotStatus: 'VERIFIED',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80'
    ],
    storyNarrative: {
      hook: 'E se a sua propriedade rural já viesse com uma operação industrial rentável e contrato de integração ativo?',
      expectationSubversion: 'Não é uma granja antiga: são 4 galpões Dark House 100% automatizados com integração ativa.',
      anchorMetric: '📊 Projeção de Faturamento Bruto: R$ 1,30 MILHÃO em ~6 lotes por ano.',
      unfairAdvantage: 'Gerador STEMAC automático + outorga de água aprovada para 100 mil litros/dia.',
      assetLandBreakdown: '2,5 Alqueires com núcleo produtivo isolado + residência e apoio operacional.',
      marketPositioning: 'Excelente para quem busca renda mensal previsível no agronegócio com infraestrutura prêmio.',
      highIntentCTA: 'Solicite a planilha de fluxo de caixa dos últimos 12 meses enviando AVIARIO no WhatsApp.'
    },
    provenanceClaims: [
      {
        claimId: 'clm-aviario-1',
        statement: 'Capacidade instalada de 140.000 aves climatizadas',
        status: 'VERIFIED',
        confidence: 0.99,
        source: 'Inspeção Técnica + Contrato de Integração',
        validatedBy: ['Poder A (Gemini)', 'Poder C (DeepSeek)']
      }
    ]
  },
  {
    id: 'rural-003',
    title: 'Haras & Estância de Lazer TerraNova — Mandaguari',
    slug: 'haras-estancia-terra-nova-mandaguari-maringa',
    city: 'Mandaguari',
    state: 'PR',
    region: 'Região de Maringá (25 km)',
    price: 'R$ 12.800.000',
    priceNumeric: 12800000,
    areaHectares: 121.0,
    areaAlqueires: 5.0,
    alqueireType: 'Paulista (24.200m²)',
    aptitude: 'Haras',
    carStatus: 'CAR Ativo & Auditado',
    infrastructure: [
      '20 Baías completas em alvenaria com cochos em inox',
      'Pista de treinamento coberta de 60x30m com iluminação em LED',
      'Redondel elétrico automatizado para 6 cavalos',
      'Casa sede de altíssimo luxo com piscina aquecida e área gourmet'
    ],
    liquidityScore: 85,
    iotStatus: 'VERIFIED',
    imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80'
    ],
    storyNarrative: {
      hook: 'Um haras cinematográfico a apenas 20 minutos do centro de Maringá.',
      expectationSubversion: 'Combinação perfeita entre criação de cavalos de raça e estância de lazer de altíssimo padrão.',
      anchorMetric: '🏛️ 20 baías de luxo + Pista Coberta oficial de 1.800 m².',
      unfairAdvantage: 'Fácil acesso pela BR-376 duplicada com total privacidade e segurança.',
      assetLandBreakdown: '5 Alqueires com pastagens piquetedas em Tifton 85 e infraestrutura ecuestre completa.',
      marketPositioning: 'Destinado a investidores e criadores exigentes que buscam refúgio exclusivo na região metropolitana.',
      highIntentCTA: 'Agende uma visita privativa enviando HARAS no WhatsApp.'
    },
    provenanceClaims: [
      {
        claimId: 'clm-haras-1',
        statement: 'Infraestrutura de 20 baías e pista coberta oficial',
        status: 'VERIFIED',
        confidence: 0.97,
        source: 'Levantamento de Campo e Fotos de Drone',
        validatedBy: ['Poder A (Gemini)']
      }
    ]
  }
];
