import React, { useEffect } from 'react';
import { SEOData } from '../../types';

interface SEOHeadProps {
  seo: SEOData;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  useEffect(() => {
    // 1. Update Title
    document.title = seo.title;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // 3. Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonicalUrl);

    // 4. Update Schema.org JSON-LD Script Tag
    let scriptJsonLd = document.querySelector('#seo-json-ld');
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.setAttribute('id', 'seo-json-ld');
      scriptJsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptJsonLd);
    }
    scriptJsonLd.textContent = JSON.stringify(seo.schemaJsonLd);

  }, [seo]);

  return null; // Side-effect component, renders into document.head
};
