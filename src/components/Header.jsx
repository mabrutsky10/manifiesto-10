import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header({ lang, setLang, t }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLangToggle = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHomeClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      scrollToSection('hero');
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleIdentidadClick = () => {
    handleMenuClose();
    if (!isHomePage) {
      navigate('/identidad');
    } else {
      navigate('/identidad');
    }
  };

  const handleConectarClick = () => {
    handleMenuClose();
    navigate('/conectar');
  };

  const handleCrecerClick = () => {
    handleMenuClose();
    navigate('/crecer');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-near-black/95 backdrop-blur-sm border-b border-gray-800/50">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="text-2xl font-light tracking-tight focus-ring rounded"
              aria-label={t.header.title}
            >
              {t.header.wordmark}
            </Link>
            <Link
              to="/"
              onClick={handleHomeClick}
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors focus-ring rounded hidden sm:block"
            >
              {t.header.title}
            </Link>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Navigation - visible on md+ */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
              <Link
                to="/identidad"
                className="hover:text-gray-200 transition-colors focus-ring rounded"
              >
                {t.header.nav.identidad}
              </Link>
              <span className="text-gray-600">/</span>
              <Link
                to="/conectar"
                className="hover:text-gray-200 transition-colors focus-ring rounded"
              >
                {t.header.nav.conectar}
              </Link>
              <span className="text-gray-600">/</span>
              <Link
                to="/crecer"
                className="hover:text-gray-200 transition-colors focus-ring rounded"
              >
                {t.header.nav.crecer}
              </Link>
            </div>

            {/* Mobile Menu Button - visible only on mobile */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors focus-ring rounded"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          onClick={handleMenuClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="absolute top-0 left-0 right-0 bg-near-black border-b border-gray-800/50 shadow-lg pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="max-w-4xl mx-auto px-6 py-6 space-y-0">
              <button
                onClick={handleIdentidadClick}
                className="block w-full text-left text-lg text-gray-300 hover:text-white transition-colors py-4 border-b border-gray-800/50 focus-ring rounded first:pt-0"
              >
                {t.header.nav.identidad}
              </button>
              <button
                onClick={handleConectarClick}
                className="block w-full text-left text-lg text-gray-300 hover:text-white transition-colors py-4 border-b border-gray-800/50 focus-ring rounded"
              >
                {t.header.nav.conectar}
              </button>
              <button
                onClick={handleCrecerClick}
                className="block w-full text-left text-lg text-gray-300 hover:text-white transition-colors py-4 border-b border-gray-800/50 focus-ring rounded last:border-b-0"
              >
                {t.header.nav.crecer}
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
