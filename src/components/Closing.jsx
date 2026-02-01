import React from 'react';

export default function Closing({ t }) {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 md:py-28 border-t border-gray-900/50">
      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 tracking-tight">
          {t.closing.title}
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed">
          {t.closing.lines.map((line, idx) => (
            <p key={idx}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
