import { RuralProperty, MaringaDevelopment, ResidentialProperty, SEOData } from '../types';

export class SEOService {
  /**
   * Generates programmatic SEO Metadata & Schema.org JSON-LD for Rural Properties
   */
  static generateRuralSEO(property: RuralProperty): SEOData {
    const title = `${property.title} — ${property.areaAlqueires} Alqueires em ${property.city}/PR | TerraNova OS`;
    const description = `Confira ${property.title} em ${property.city}/PR. ${property.areaHectares} Hectares, ${property.aptitude}, ${property.carStatus}, Teor de Argila ${property.clayContent || 'selecionado'}. Ficha técnica auditada com Nota de Liquidez ALS ${property.liquidityScore}/100.`;
    const canonicalUrl = `https://terranova.os/fazendas/pr/${property.city.toLowerCase()}/${property.slug}`;
    
    const schemaJsonLd = {
      "@context": "https://schema.org",
      "@type": "SingleFamilyResidence",
      "name": property.title,
      "description": description,
      "url": canonicalUrl,
      "image": property.imageUrl,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.city,
        "addressRegion": property.state,
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -23.5505,
        "longitude": -46.6333
      },
      "offers": {
        "@type": "Offer",
        "price": property.priceNumeric,
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Área Total (Hectares)",
          "value": property.areaHectares
        },
        {
          "@type": "PropertyValue",
          "name": "Área Total (Alqueires)",
          "value": property.areaAlqueires
        },
        {
          "@type": "PropertyValue",
          "name": "Aptidão Agrícola",
          "value": property.aptitude
        },
        {
          "@type": "PropertyValue",
          "name": "Asset Liquidity Score (ALS)",
          "value": property.liquidityScore
        }
      ]
    };

    return {
      title,
      description,
      canonicalUrl,
      keywords: [
        `fazenda a venda ${property.city}`,
        `soja ${property.city} parana`,
        `terras rurais ${property.city}`,
        `alqueires ${property.city}`,
        `comprar fazenda maringa`
      ],
      ogImage: property.imageUrl,
      schemaJsonLd
    };
  }

  /**
   * Generates programmatic SEO Metadata for Maringá Developers & DWV Launches
   */
  static generateDevelopmentSEO(dev: MaringaDevelopment): SEOData {
    const title = `${dev.title} — Lançamento ${dev.developerName} em ${dev.neighborhood} Maringá`;
    const description = `Lançamento ${dev.title} da construtora ${dev.developerName} em Maringá (${dev.neighborhood}). ${dev.bedroomsRange}, ${dev.areaFrom}m² a ${dev.areaTo}m², entregas em ${dev.deliveryYear}. Valores a partir de ${dev.priceFrom}. Assista ao vídeo e fale no WhatsApp.`;
    const canonicalUrl = `https://terranova.os/construtoras-maringa/${dev.slug}`;

    const schemaJsonLd = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": `${dev.developerName} — Lançamentos Maringá`,
      "url": canonicalUrl,
      "logo": dev.developerLogo,
      "image": dev.imageUrl,
      "description": description
    };

    return {
      title,
      description,
      canonicalUrl,
      keywords: [
        `lancamentos maringa ${dev.neighborhood.toLowerCase()}`,
        `construtora ${dev.developerName.toLowerCase()} maringa`,
        `apartamento na planta maringa`,
        `imoveis maringa ${dev.developerName.toLowerCase()}`
      ],
      ogImage: dev.imageUrl,
      schemaJsonLd
    };
  }

  /**
   * Generates programmatic SEO for Ready / Resale Properties
   */
  static generateResidentialSEO(res: ResidentialProperty): SEOData {
    const title = `${res.title} — ${res.neighborhood} Maringá | TerraNova OS`;
    const description = `${res.type} à venda no ${res.neighborhood} em Maringá. ${res.usefulArea}m² área útil, ${res.bedrooms} quartos (${res.suites} suítes), ${res.parkingSpaces} vagas. Valor: ${res.price}.`;
    const canonicalUrl = `https://terranova.os/imoveis/pr/maringa/${res.neighborhood.toLowerCase()}/${res.slug}`;

    const schemaJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": res.title,
      "image": res.imageUrl,
      "description": description,
      "offers": {
        "@type": "Offer",
        "price": res.priceNumeric,
        "priceCurrency": "BRL"
      }
    };

    return {
      title,
      description,
      canonicalUrl,
      keywords: [
        `${res.type.toLowerCase()} a venda maringa ${res.neighborhood.toLowerCase()}`,
        `imoveis prontos maringa`,
        `comprar ${res.type.toLowerCase()} maringa`
      ],
      ogImage: res.imageUrl,
      schemaJsonLd
    };
  }

  /**
   * Generates Programmatic XML Sitemap entries for Google Search Console
   */
  static generateSitemapXml(urls: string[]): string {
    const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    const xmlBody = urls.map(url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n');
    const xmlFooter = `\n</urlset>`;
    return xmlHeader + xmlBody + xmlFooter;
  }
}
