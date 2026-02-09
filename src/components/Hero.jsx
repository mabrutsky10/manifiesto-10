import React from 'react';

export default function Hero({ t }) {
  return (
    <section id="hero" className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <div className="space-y-10">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-center">
            {Array.isArray(t.hero.title) ? (
              <>
                <span className="block text-gray-200">{t.hero.title[0]}</span>
                <span className="block text-gray-600 text-2xl md:text-3xl lg:text-4xl font-extralight mt-1 tracking-wide">
                  {t.hero.title[1]}
                </span>
              </>
            ) : (
              t.hero.title
            )}
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-center text-white mt-8">
            {t.hero.subtitle}
          </h2>
        </div>
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
