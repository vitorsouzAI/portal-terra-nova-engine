import { ResidentialProperty } from '../types';

export const mockResidentialProperties: ResidentialProperty[] = [
  {
    id: 'res-001',
    title: 'Apartamento Duplex de Luxo com Terraço e Jacuzzi — Zona 01',
    slug: 'apartamento-duplex-luxo-zona-01-maringa',
    city: 'Maringá',
    neighborhood: 'Zona 01',
    type: 'Apartamento',
    price: 'R$ 1.650.000',
    priceNumeric: 1650000,
    usefulArea: 210,
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parkingSpaces: 3,
    condoFee: 'R$ 1.200/mês',
    iptuFee: 'R$ 3.800/ano',
    amenities: [
      'Terraço gourmet privativo com churrasqueira',
      'Jacuzzi aquecida para 6 pessoas',
      'Móveis planejados de alto padrão em todos os ambientes',
      'Ar-condicionado inverter instalado em todas as suítes'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80'
    ],
    status: 'Pronto para Morar'
  },
  {
    id: 'res-002',
    title: 'Casa Térrea Moderna em Condomínio Fechado — Residencial Alphaville',
    slug: 'casa-terrea-condominio-alphaville-maringa',
    city: 'Maringá',
    neighborhood: 'Parque Residencial Alphaville',
    type: 'Casa em Condomínio',
    price: 'R$ 2.490.000',
    priceNumeric: 2490000,
    usefulArea: 320,
    bedrooms: 4,
    suites: 4,
    bathrooms: 5,
    parkingSpaces: 4,
    condoFee: 'R$ 950/mês',
    iptuFee: 'R$ 4.200/ano',
    amenities: [
      'Piscina aquecida com energia solar e iluminação em LED',
      'Pé-direito duplo de 6 metros na sala de estar',
      'Energia fotovoltaica instalada (geração própria de energia)',
      'Condomínio com segurança armada 24h e clube completo'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
    ],
    status: 'Pronto para Morar'
  },
  {
    id: 'res-003',
    title: 'Sobrado Contemporâneo — Zona 07 (Próximo à UEM)',
    slug: 'sobrado-contemporaneo-zona-07-uem-maringa',
    city: 'Maringá',
    neighborhood: 'Zona 07',
    type: 'Sobrado',
    price: 'R$ 890.000',
    priceNumeric: 890000,
    usefulArea: 165,
    bedrooms: 3,
    suites: 1,
    bathrooms: 3,
    parkingSpaces: 2,
    amenities: [
      'Área gourmet com churrasqueira no quintal',
      'Acabamento em porcelanato de grande formato',
      'Portão eletrônico e alarme cftv instalado',
      'Excelente localização próximo à UEM e supermercados'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80'
    ],
    status: 'Seminovo'
  }
];
