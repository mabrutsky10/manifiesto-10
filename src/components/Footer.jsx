import React from 'react';

export default function Footer({ t }) {
  return (
    <footer className="max-w-3xl mx-auto px-6 py-16 border-t border-gray-800">
      <nav className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8" aria-label="Footer navigation">
        <div className="flex flex-wrap gap-6 md:gap-8 text-sm text-gray-500">
          {/* TODO: Replace placeholder URLs with actual links */}
          <a
            href="#"
            className="hover:text-gray-300 transition-colors focus-ring rounded"
            aria-label={t.footer.links.completo}
          >
            {t.footer.links.completo}
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors focus-ring rounded"
            aria-label={t.footer.links.plataforma}
          >
            {t.footer.links.plataforma}
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors focus-ring rounded"
            aria-label={t.footer.links.productos}
          >
            {t.footer.links.productos}
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors focus-ring rounded"
            aria-label={t.footer.links.sumar}
          >
            {t.footer.links.sumar}
          </a>
        </div>
        
        <div className="text-xs text-gray-600 space-y-1">
          <p>{t.footer.copyright}</p>
          {/* TODO: Replace placeholder email with actual contact email */}
          <a
            href={`mailto:${t.footer.contact}`}
            className="hover:text-gray-400 transition-colors focus-ring rounded"
          >
            {t.footer.contact}
          </a>
        </div>
      </nav>
    </footer>
  );
}
