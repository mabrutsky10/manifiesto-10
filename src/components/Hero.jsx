import React from 'react';

export default function Hero({ t }) {
  return (
    <section id="hero" className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <div className="space-y-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-center">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 text-center font-light">
          {t.hero.subtitle}
        </p>
        <div className="pt-8 space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {t.hero.opening.map((line, idx) => (
            <p key={idx} className="text-center">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
