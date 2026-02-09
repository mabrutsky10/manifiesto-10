import React, { useState } from 'react';
import soccerBallGif from '../img/soccer-ball-football.gif';

// Instagram icon SVG
const InstagramIcon = ({ className }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Web/Globe icon SVG
const WebIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

// Email icon SVG
const EmailIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Modal component with bouncing ball animation
const ConstructionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-near-black border border-gray-800 rounded-lg p-8 md:p-12 max-w-md mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors focus-ring rounded"
          aria-label="Cerrar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center space-y-6">
          {/* Bouncing soccer ball animation */}
          <div className="relative w-32 h-32 flex items-end justify-center">
            <div className="absolute bottom-0 w-16 h-16 animate-bounce-ball shadow-lg">
              <img
                src={soccerBallGif}
                alt="Pelota de fútbol"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Text */}
          <h3 className="text-2xl md:text-3xl font-light text-gray-200 text-center">
            Lo estamos construyendo
          </h3>
        </div>
      </div>
    </div>
  );
};

export default function Footer({ t }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <footer className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-800">
        <nav className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8" aria-label="Footer navigation">
          <div className="flex flex-wrap gap-6 md:gap-8 text-sm text-gray-500">
            {/* TODO: Replace placeholder URLs with actual links */}
            <button
              onClick={handleModalOpen}
              className="hover:text-gray-300 transition-colors focus-ring rounded text-left"
              aria-label={t.footer.links.completo}
            >
              {t.footer.links.completo}
            </button>
          <a
            href="https://mas10.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors focus-ring rounded"
            aria-label={t.footer.links.plataforma}
          >
            {t.footer.links.plataforma}
          </a>
          <button
            onClick={handleModalOpen}
            className="hover:text-gray-300 transition-colors focus-ring rounded text-left"
            aria-label={t.footer.links.productos}
          >
            {t.footer.links.productos}
          </button>
          <button
            onClick={handleModalOpen}
            className="hover:text-gray-300 transition-colors focus-ring rounded text-left"
            aria-label={t.footer.links.sumar}
          >
            {t.footer.links.sumar}
          </button>
        </div>
        
        <div className="text-xs text-gray-600 space-y-2">
          <div className="flex items-center gap-2">
            <EmailIcon className="w-3 h-3" />
            <a
              href={`mailto:${t.footer.contact}`}
              className="hover:text-gray-400 transition-colors focus-ring rounded"
            >
              {t.footer.contact}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <InstagramIcon className="w-3 h-3" />
            <a
              href={`https://instagram.com/${t.footer.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors focus-ring rounded"
            >
              {t.footer.instagram}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <WebIcon className="w-2.5 h-2.5" />
            <a
              href={`https://${t.footer.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors focus-ring rounded"
            >
              {t.footer.website}
            </a>
          </div>
        </div>
      </nav>
    </footer>
    <ConstructionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
