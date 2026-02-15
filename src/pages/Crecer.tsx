import React, { useState, useEffect } from 'react';
import { i18n } from '../i18n';
import Header from '../components/Header';
import IdentidadScrollGallery from '../components/IdentidadScrollGallery';
import ScrollIndicator from '../components/ScrollIndicator';

// Import images - using Vite's import.meta.glob for dynamic imports
// This will automatically import all PNG files from the crecer folder
const imageModules = import.meta.glob('../img/crecer/*.png', { eager: true }) as Record<string, { default: string }>;
const images = Object.keys(imageModules)
  .map((path) => imageModules[path].default)
  .sort((a, b) => {
    // Sort by filename number
    const aMatch = a.match(/(\d+)\.png$/);
    const bMatch = b.match(/(\d+)\.png$/);
    if (aMatch && bMatch) {
      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
    }
    return a.localeCompare(b);
  });

// Import video - using import.meta.glob
const videoModule = import.meta.glob('../img/crecer/*-optimized.mp4', { eager: true }) as Record<string, { default: string }>;
const videoSrc = Object.values(videoModule)[0]?.default || '';

// Debug: log video loading
console.log('Crecer - Video modules found:', Object.keys(videoModule));
console.log('Crecer - Video src:', videoSrc);
console.log('Crecer - Video module values:', Object.values(videoModule));

// Combine images and video into media items array
// Video first, then images
const mediaItems = [
  ...(videoSrc ? [{ type: 'video' as const, src: videoSrc }] : []),
  ...images.map(src => ({ type: 'image' as const, src }))
];

// Debug: log media items
console.log('Media items for Crecer:', mediaItems);

// Helper function to render text with bold formatting (**text**)
function renderTextWithBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-semibold text-gray-300">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function Crecer() {
  const [lang, setLang] = useState('es');
  const t = i18n[lang];

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Description text from i18n
  const description = t.rights.crecer.lines;

  return (
    <div className="min-h-screen bg-near-black" style={{ position: 'relative' }}>
      <Header lang={lang} setLang={setLang} t={t} />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
            {t.header.nav.crecer}
          </h1>
          
          {/* Description */}
          <div className="space-y-6 text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {description.map((line, idx) => (
              <p key={idx}>
                {renderTextWithBold(line)}
              </p>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          {mediaItems.length > 0 && <ScrollIndicator />}
        </div>
      </section>
      
      {/* Scroll Gallery */}
      {mediaItems.length > 0 && <IdentidadScrollGallery items={mediaItems} />}
    </div>
  );
}
