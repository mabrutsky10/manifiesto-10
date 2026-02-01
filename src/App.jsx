import React, { useState, useEffect } from 'react';
import { i18n } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import RightSection from './components/RightSection';
import GrowthSubsections from './components/GrowthSubsections';
import Closing from './components/Closing';
import Footer from './components/Footer';

function App() {
  const [lang, setLang] = useState('es');
  const t = i18n[lang];

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-near-black">
      <Header lang={lang} setLang={setLang} t={t} />
      
      <main>
        <Hero t={t} />
        
        <RightSection id="identidad" right={t.rights.identidad} t={t} />
        
        <RightSection id="conectar" right={t.rights.conectar} t={t} />
        
        <RightSection id="crecer" right={t.rights.crecer} t={t}>
          <GrowthSubsections subsections={t.rights.crecer.subsections} t={t} />
        </RightSection>
        
        <Closing t={t} />
      </main>
      
      <Footer t={t} />
    </div>
  );
}

export default App;
