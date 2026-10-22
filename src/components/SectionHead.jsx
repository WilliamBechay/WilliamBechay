import React from 'react';
import { useReveal } from '@/hooks/useReveal';

// L-en-tete de section etait recopie a l-identique dans Projects, Skills
// et Contact — surtitre, titre, sous-titre — avec a chaque fois ses
// propres marges. Trois copies divergent des la premiere retouche ;
// celle-ci est la seule.
const SectionHead = ({ eyebrow, icon, title, subtitle, reveal = true }) => {
  const revealRef = useReveal();

  return (
    <header ref={reveal ? revealRef : undefined} className={`flex flex-col items-center text-center${reveal ? ' reveal' : ''}`}>
      {eyebrow && (
        <span className="eyebrow">
          {icon}
          {eyebrow}
        </span>
      )}
      <h2 className="t-title-1" style={{ marginTop: eyebrow ? 20 : 0 }}>{title}</h2>
      {subtitle && (
        <p className="t-lead" style={{ marginTop: 14, maxWidth: '34rem' }}>{subtitle}</p>
      )}
    </header>
  );
};

export default SectionHead;
