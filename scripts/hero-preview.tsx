// Development-only fixture. Not an application entry point or inventory change.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { Hero } from '../src/components/home/Hero';
import '../src/index.css';

const mode = new URLSearchParams(location.search).get('mode');
const actualMatchMedia = window.matchMedia.bind(window);
if (mode === 'reduced') {
  window.matchMedia = query => {
    const result = actualMatchMedia(query);
    if (query === '(prefers-reduced-motion: reduce)') Object.defineProperty(result, 'matches', { value: true });
    return result;
  };
}
if (mode === 'save-data') {
  Object.defineProperty(navigator, 'connection', { value: Object.assign(new EventTarget(), { saveData: true }), configurable: true });
}
if (mode === 'blocked') {
  // Simulate a browser denying both declarative and programmatic autoplay.
  const setAttribute = HTMLVideoElement.prototype.setAttribute;
  HTMLVideoElement.prototype.setAttribute = function(name, value) {
    if (name.toLowerCase() !== 'autoplay') setAttribute.call(this, name, value);
  };
  HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'));
}
createRoot(document.getElementById('root')!).render(<MemoryRouter><Hero /></MemoryRouter>);
