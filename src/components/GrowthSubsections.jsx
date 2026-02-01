import React from 'react';

export default function GrowthSubsections({ subsections, t }) {
  return (
    <div className="mt-12 space-y-8">
      {Object.values(subsections).map((subsection, idx) => (
        <div key={idx} className="pl-4 md:pl-6 border-l border-gray-800">
          <h3 className="text-xl md:text-2xl font-light text-gray-300 mb-3">
            {subsection.label}
          </h3>
          <p className="text-lg text-gray-400 leading-relaxed">
            {subsection.content}
          </p>
        </div>
      ))}
    </div>
  );
}
