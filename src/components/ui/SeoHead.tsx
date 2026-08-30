import React, { useEffect } from 'react';

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

export function SeoHead({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://img.carplusautos.com.br/redes.png',
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper to update meta tags
    const updateMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Meta description
    updateMeta('meta[name="description"]', 'name', 'description', description);

    // 3. Open Graph
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);

    // 4. Twitter Card
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // 6. JSON-LD scripts management
    const scriptId = 'page-json-ld';
    let scriptEl = document.getElementById(scriptId);
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonicalUrl, ogType, ogImage, jsonLd]);

  return null;
}
