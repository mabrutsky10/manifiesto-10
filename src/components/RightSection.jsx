import React from 'react';

export default function RightSection({ id, right, t, children }) {
  const isFirst = id === 'identidad';
  return (
    <section id={id} className={`max-w-3xl mx-auto px-6 py-20 md:py-28 ${!isFirst ? 'border-t border-gray-900/50' : ''}`}>
      <div className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 tracking-tight">
          {right.label}
        </h2>
        
        <div className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed">
          {right.lines.map((line, idx) => {
            // Check if this is a key line (callout) - usually the last one
            const isKeyLine = idx === right.lines.length - 1 && right.lines.length > 2;
            
            return (
              <p
                key={idx}
                className={isKeyLine ? "text-gray-300 italic font-light border-l-2 border-gray-700/60 pl-6 my-10 text-base md:text-lg" : ""}
              >
                {line}
              </p>
            );
          })}
        </div>

        {children}

        {right.example && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-800/50">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                {right.example.title}
              </p>
              <p className="text-base text-gray-400 leading-relaxed">
                {right.example.content}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
