import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gradientText, sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';

// Un seul parent piloté par viewport (containerVariants) au lieu d'un
// whileInView + spring individuel par icône : ça évite de déclencher
// 15-20 IntersectionObserver + animations physiques simultanément, qui
// est ce qui causait le lag à l'apparition. Le stagger est géré ici,
// avec un simple tween (moins coûteux qu'un spring) sur chaque enfant.
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const Skills = () => {
  const navigate = useNavigate();
  const { translations: t } = useLanguage();
  const skills = useMemo(() => t?.skills?.items || [], [t]);
  // Grille de la stack repliée par défaut : rien ne s'affiche tant qu'on
  // n'a pas cliqué sur le bouton, même pattern que TechStackBox dans
  // Projects.jsx pour rester cohérent avec le reste du site.
  const [expanded, setExpanded] = useState(false);
  if (!t?.skills) return null;

  const showLabel = t.skills.showButton ?? 'Show tech stack';
  const hideLabel = t.skills.hideButton ?? 'Hide';

  return (
    <section id="skills" className="relative py-14 md:py-20 px-4">
      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14 flex flex-col items-center gap-4">
          <div style={badge}>
            <span style={{ fontSize: 10 }}>⚙</span>
            {t.skills.badge ?? 'Technical Expertise'}
          </div>
          <h2 style={sectionTitle}>{t.skills.heading}</h2>
          <p style={subtitleStyle}>{t.skills.subheading}</p>
          <div style={accentLine} />
        </motion.div>

        <div className="flex justify-center mb-8 md:mb-10">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="skills-grid"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:gap-3"
            style={{ background: 'rgba(100,160,255,0.10)', border: '1px solid rgba(100,160,255,0.20)', color: 'hsl(204 82% 70%)' }}
          >
            {expanded ? hideLabel : showLabel}
            <ChevronDown size={13} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id="skills-grid"
              key="skills-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14 mb-10 md:mb-14 pt-2"
              >
                {skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.08, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div className="relative glass rounded-2xl p-3 md:p-4">
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                        style={{ background: 'linear-gradient(135deg, hsl(204,82%,58%/0.20), hsl(168,50%,56%/0.20))' }} />
                      <img
                        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                        alt={skill.name}
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        className="w-12 h-12 md:w-14 md:h-14 relative z-10"
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slim button */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center">
          <button
            onClick={() => navigate('/contact')}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:gap-3"
            style={{ background: 'rgba(100,160,255,0.10)', border: '1px solid rgba(100,160,255,0.20)', color: 'hsl(204 82% 70%)' }}
          >
            {t.skills.contactButton}
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
