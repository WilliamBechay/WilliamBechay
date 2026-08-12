import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Sparkles, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';
import nexfendImage from '@/assets/nexfend.svg';
import wiibecImage from '@/assets/wiibec.png';
import mindovestImage from '@/assets/mindo.png';
import docustratImage from '@/assets/docustrat.png';

// Bloc "Tech Stack" entièrement replié par défaut : rien n'est affiché
// tant qu'on n'a pas cliqué sur le bouton. Un clic déroule la liste des
// technologies avec une animation de hauteur ; un second clic la referme.
const TechStackBox = ({ technologies, techLabel, techTag, techBox, showLabel, hideLabel }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={techBox}>
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between gap-2 group/tech"
      >
        <span className="flex items-center gap-2">
          <Sparkles style={{ width: 12, height: 12, color: 'hsl(168,50%,56%)' }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(210,12%,45%)' }}>
            {techLabel}
          </span>
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground group-hover/tech:text-primary transition-colors">
          {expanded ? hideLabel : showLabel}
          <ChevronDown size={13} className={cn('transition-transform duration-200', expanded && 'rotate-180')} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="tech-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 pt-3">
              {technologies.map(tech => <span key={tech} className={techTag}>{tech}</span>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Projects = () => {
  const { translations: t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  if (!t?.projects) return null;

  const showLabel = t.projects.showTechStack ?? 'View tech stack';
  const hideLabel = t.projects.hideTechStack ?? 'Hide';

  const projects = [
    { id: 1, title: 'NexFend',        description: t.projects.nexfendDescription,   imageSrc: nexfendImage,   imageAlt: 'NexFend',        link: 'https://nexfend.com',    technologies: ['React', 'Vite', 'Capacitor', 'TypeScript', 'Supabase', 'Stripe'] },
    { id: 2, title: 'Wiibec.com',     description: t.projects.wiibecDescription,    imageSrc: wiibecImage,    imageAlt: 'Wiibec.com',     link: 'https://wiibec.com',     technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Supabase', 'Stripe'] },
    { id: 3, title: 'Docustrat.com',  description: t.projects.docustratDescription,  imageSrc: docustratImage, imageAlt: 'Docustrat.com',  link: 'https://docustrat.com',  technologies: ['React', 'TypeScript', 'Supabase', 'AI/LLM', 'Tailwind CSS'] },
    { id: 4, title: 'Mindovest.com',  description: t.projects.mindovestDescription,  imageSrc: mindovestImage, imageAlt: 'Mindovest.com',  link: 'https://mindovest.com',  technologies: ['React', 'Vite', 'Tailwind CSS', 'Capacitor', 'Supabase', 'TypeScript'] },
  ];

  const techTag = cn('px-2.5 py-1 text-xs font-medium rounded-full border', isDark ? 'bg-white/[0.04] border-white/[0.08] text-[rgba(255,255,255,0.70)]' : 'bg-black/[0.04] border-black/[0.08] text-[rgba(0,0,0,0.60)]');
  const techBox = cn('rounded-xl p-4 border', isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white/70 border-black/[0.07] shadow-sm');

  const badgeLabel = t.projects.badge   ?? 'Featured Work';
  const techLabel  = t.projects.techStack ?? 'Tech Stack';

  return (
    <section id="projects" className="relative py-14 md:py-20 px-4">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14 flex flex-col items-center gap-4">
          <div style={badge}><Sparkles style={{ width: 12, height: 12 }} />{badgeLabel}</div>
          <h2 style={sectionTitle}>{t.projects.heading}</h2>
          {t.projects.subheading && <p style={subtitleStyle}>{t.projects.subheading}</p>}
          <div style={accentLine} />
        </motion.div>

        {/* 1 colonne (mobile) -> 2 colonnes (tablette) -> 4 colonnes (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex flex-col gap-4">
              <div className="flex-grow">
                <ProjectCard project={project} />
              </div>
              <TechStackBox
                technologies={project.technologies}
                techLabel={techLabel}
                techTag={techTag}
                techBox={techBox}
                showLabel={showLabel}
                hideLabel={hideLabel}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
