import React from 'react';
import { motion } from 'framer-motion';

// L-en-tete de section etait recopie a l-identique dans Projects, Skills
// et Contact — surtitre, titre, sous-titre, trait decoratif — avec a
// chaque fois ses propres marges. Trois copies divergent des la premiere
// retouche ; celle-ci est la seule.
const SectionHead = ({ eyebrow, icon, title, subtitle }) => (
  <motion.header
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
    className="flex flex-col items-center text-center"
  >
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
  </motion.header>
);

export default SectionHead;
