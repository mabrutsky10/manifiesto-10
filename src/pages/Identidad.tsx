import React, { useState, useEffect } from 'react';
import { i18n } from '../i18n';
import Header from '../components/Header';
import IdentidadScrollGallery from '../components/IdentidadScrollGallery';
import ScrollIndicator from '../components/ScrollIndicator';

// Import images - using Vite's import.meta.glob for dynamic imports
// This will automatically import all PNG files from the identidad folder
const imageModules = import.meta.glob('../img/identidad/*.png', { eager: true }) as Record<string, { default: string }>;
const images = Object.keys(imageModules)
  .map((path) => imageModules[path].default)
  .sort((a, b) => {
    // Sort by filename number (id1.png, id2.png, id3.png)
    const aMatch = a.match(/(\d+)\.png$/);
    const bMatch = b.match(/(\d+)\.png$/);
    if (aMatch && bMatch) {
      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
    }
    return a.localeCompare(b);
  });

// Import video
const videoModule = import.meta.glob('../img/identidad/*-optimized.mp4', { eager: true }) as Record<string, { default: string }>;
const videoSrc = Object.values(videoModule)[0]?.default || '';

// Combine images and video into media items array
// Video first, then images
const mediaItems = [
  ...(videoSrc ? [{ type: 'video' as const, src: videoSrc }] : []),
  ...images.map(src => ({ type: 'image' as const, src }))
];

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

export default function Identidad() {
  const [lang, setLang] = useState('es');
  const t = i18n[lang];

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Description text - improved version
  const description = lang === 'es' 
    ? [
        "Todo jugador tiene derecho a su **CV digital** dentro del fútbol.",
        "Cada equipo tiene derecho a su **escudo**, a su **página web**, a todas las **estadísticas** que año tras año y en cada torneo va construyendo.",
        "Porque lo que no se registra se pierde, y lo que se construye con identidad, trasciende."
      ]
    : [
        "Every player has the right to their **digital CV** within soccer.",
        "Every team has the right to its **crest**, its **website**, to all the **statistics** that year after year and in each tournament it builds.",
        "Because what is not recorded is lost, and what is built with identity, transcends."
      ];

  return (
    <div className="min-h-screen bg-near-black" style={{ position: 'relative' }}>
      <Header lang={lang} setLang={setLang} t={t} />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white">
            {t.header.nav.identidad}
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
          <ScrollIndicator />
        </div>
      </section>
      
      {/* Scroll Gallery */}
      <IdentidadScrollGallery items={mediaItems} />
    </div>
  );
}
