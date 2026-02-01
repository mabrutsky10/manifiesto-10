import React from 'react';

export default function Header({ lang, setLang, t }) {
  const handleLangToggle = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-near-black/95 backdrop-blur-sm border-b border-gray-800/50">
      <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="text-2xl font-light tracking-tight focus-ring rounded"
            aria-label={t.header.title}
          >
            {t.header.wordmark}
          </a>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors focus-ring rounded hidden sm:block"
          >
            {t.header.title}
          </a>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
            <a
              href="#identidad"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('identidad');
              }}
              className="hover:text-gray-200 transition-colors focus-ring rounded"
            >
              {t.header.nav.identidad}
            </a>
            <span className="text-gray-600">/</span>
            <a
              href="#conectar"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('conectar');
              }}
              className="hover:text-gray-200 transition-colors focus-ring rounded"
            >
              {t.header.nav.conectar}
            </a>
            <span className="text-gray-600">/</span>
            <a
              href="#crecer"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('crecer');
              }}
              className="hover:text-gray-200 transition-colors focus-ring rounded"
            >
              {t.header.nav.crecer}
            </a>
          </div>
          
          <button
            onClick={handleLangToggle}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors focus-ring rounded px-2 py-1"
            aria-label={t.header.lang.aria}
          >
            <span className="font-medium">{t.header.lang.current}</span>
            <span className="mx-1 text-gray-600">/</span>
            <span className="text-gray-500">{t.header.lang.switch}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
