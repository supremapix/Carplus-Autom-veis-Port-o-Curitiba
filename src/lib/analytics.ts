/// <reference types="vite/client" />
// Google Analytics 4 & Conversion Tracking Helper
// GA4 ID: G-01W2EZP6FP

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    gtag_report_conversion?: (url?: string) => boolean;
    fbq?: (...args: any[]) => void;
    uetq?: any[];
    dataLayer?: any[];
  }
}

export interface AnalyticsEventParams {
  [key: string]: any;
}

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  try {
    const isDev = import.meta.env.DEV;
    const enrichedParams = {
      ...params,
      page_path: window.location.pathname,
      ...(isDev ? { debug_mode: true } : {}),
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, enrichedParams);
    }

    // Conversion hooks for Ads, Meta, Bing
    if (name === 'whatsapp_click' || name === 'phone_click') {
      if (typeof window.gtag_report_conversion === 'function') {
        try { window.gtag_report_conversion(); } catch (e) {}
      }
      if (typeof window.fbq === 'function') {
        try { window.fbq('track', 'Contact'); } catch (e) {}
      }
      if (window.uetq && Array.isArray(window.uetq)) {
        try { window.uetq.push('event', 'contact', {}); } catch (e) {}
      }
    }

    if (name === 'generate_lead') {
      if (typeof window.gtag_report_conversion === 'function') {
        try { window.gtag_report_conversion(); } catch (e) {}
      }
      if (typeof window.fbq === 'function') {
        try { window.fbq('track', 'Lead'); } catch (e) {}
      }
      if (window.uetq && Array.isArray(window.uetq)) {
        try { window.uetq.push('event', 'generate_lead', {}); } catch (e) {}
      }
    }

    if (isDev) {
      console.log(`[GA4 Event] ${name}`, enrichedParams);
    }
  } catch (err) {
    console.error('Analytics error:', err);
  }
}

// Global Click Event Delegation Listener
export function initAnalyticsListeners() {
  if (typeof window === 'undefined') return;

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement)?.closest('a, button, [data-track-click]');
    if (!target) return;

    const anchor = target.tagName === 'A' ? (target as HTMLAnchorElement) : target.querySelector('a') || target.closest('a');
    const href = anchor?.getAttribute('href') || target.getAttribute('data-href') || '';
    const buttonText = (target.textContent || '').trim().substring(0, 100);

    // Find click_location via data-track-location or closest ancestor
    const locationEl = target.closest('[data-track-location]');
    const clickLocation = locationEl?.getAttribute('data-track-location') || 'outro';

    // Find vehicle data if inside card or vehicle page
    const vehicleEl = target.closest('[data-vehicle-name]');
    const vehicleName = vehicleEl?.getAttribute('data-vehicle-name');
    const vehicleBrand = vehicleEl?.getAttribute('data-vehicle-brand');
    const vehicleYear = vehicleEl?.getAttribute('data-vehicle-year');
    const priceStr = vehicleEl?.getAttribute('data-vehicle-price');
    const value = priceStr ? Number(priceStr) : undefined;

    const baseParams: AnalyticsEventParams = {
      click_location: clickLocation,
      button_text: buttonText || 'Botão',
      link_url: href || window.location.href,
      ...(vehicleName ? { vehicle_name: vehicleName } : {}),
      ...(vehicleBrand ? { vehicle_brand: vehicleBrand } : {}),
      ...(vehicleYear ? { vehicle_year: vehicleYear } : {}),
      ...(value !== undefined && !isNaN(value) ? { value, currency: 'BRL' } : {}),
    };

    // 1. WhatsApp Clicks
    if (
      href.includes('wa.me') ||
      href.includes('api.whatsapp.com') ||
      href.includes('web.whatsapp.com') ||
      href.includes('whatsapp://') ||
      target.getAttribute('data-whatsapp') !== null
    ) {
      trackEvent('whatsapp_click', {
        ...baseParams,
        contact_method: 'whatsapp',
      });
      return;
    }

    // 2. Phone Clicks
    if (href.startsWith('tel:') || target.getAttribute('data-phone') !== null) {
      trackEvent('phone_click', {
        ...baseParams,
        contact_method: 'telefone',
      });
      return;
    }

    // 3. Email Clicks
    if (href.startsWith('mailto:')) {
      trackEvent('email_click', baseParams);
      return;
    }

    // 4. Directions / Map Clicks
    if (
      href.includes('google.com/maps') ||
      href.includes('maps.app.goo.gl') ||
      href.includes('waze.com')
    ) {
      trackEvent('directions_click', baseParams);
      return;
    }

    // 5. Social Links
    if (
      href.includes('instagram.com') ||
      href.includes('facebook.com') ||
      href.includes('youtube.com') ||
      href.includes('linkedin.com') ||
      href.includes('tiktok.com')
    ) {
      trackEvent('social_click', baseParams);
      return;
    }
  });
}
