import React, { createContext, useContext, useState, useEffect } from 'react';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

// Les deux catalogues sont importes STATIQUEMENT, pas en import() dynamique.
//
// Avec l-import dynamique, ce provider renvoyait null tant que le fichier de
// langue n-etait pas arrive — et il ne partait qu-une fois le bundle principal
// execute. Mesure sur la production : premier rendu a 584ms, premier CONTENU a
// 836ms. Un quart de seconde de page peinte et vide a chaque rechargement,
// puis tout qui apparait d-un coup. C-est ce que l-on voyait clignoter.
//
// Les deux catalogues pesent environ 5,6ko gzip au total. Ils partent
// maintenant dans le bundle principal : un aller-retour reseau de moins sur le
// chemin critique, et plus aucun ecran vide.
const CATALOGUES = { en, fr };
const FALLBACK = 'en';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const readStoredLanguage = () => {
  try {
    const stored = localStorage.getItem('language');
    return CATALOGUES[stored] ? stored : FALLBACK;
  } catch {
    // Navigation privee, stockage bloque : la langue par defaut suffit.
    return FALLBACK;
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(readStoredLanguage);

  useEffect(() => {
    try { localStorage.setItem('language', language); } catch {}
    // L-attribut lang de la page doit suivre la langue affichee : il est lu
    // par les lecteurs d-ecran pour choisir la prononciation, et par le
    // navigateur pour la cesure.
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const value = {
    language,
    toggleLanguage,
    translations: CATALOGUES[language] ?? CATALOGUES[FALLBACK],
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};
