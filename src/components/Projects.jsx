import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
import { Sparkles } from 'lucide-react';
import { sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';
import nexfendImage from '@/assets/nexfend.svg';
import wiibecImage from '@/assets/wiibec.png';
import mindovestImage from '@/assets/mindo.png';
import docustratImage from '@/assets/docustrat.png';

const Projects = () => {
  const { translations: t } = useLanguage();
  if (!t?.projects) return null;

  // Un seul tag court par projet (catégorie + plateforme), affiché en
  // overlay fixe sur l'image de la card. Remplace l'ancienne liste de
  // technologies dépliable : plus de changement de hauteur au clic, plus
  // de texte qui déborde d'un pill rounded-full trop étroit pour du texte
  // long ("Tailwind CSS", "TypeScript"...). Le detail complet des
  // technologies reste disponible via l'attribut title (tooltip natif au
  // survol), sans jamais affecter le layout.
  const projects = [
    {
      id: 1, title: 'NexFend', description: t.projects.nexfendDescription,
      imageSrc: nexfendImage, imageAlt: 'NexFend', link: 'https://nexfend.com',
      tag: t.projects.nexfendTag, technologies: ['React', 'Vite', 'Capacitor', 'TypeScript', 'Supabase', 'Stripe'],
    },
    {
      id: 2, title: 'Wiibec.com', description: t.projects.wiibecDescription,
      imageSrc: wiibecImage, imageAlt: 'Wiibec.com', link: 'https://wiibec.com',
      tag: t.projects.wiibecTag, technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Supabase', 'Stripe'],
    },
    {
      id: 3, title: 'Docustrat.com', description: t.projects.docustratDescription,
      imageSrc: docustratImage, imageAlt: 'Docustrat.com', link: 'https://docustrat.com',
      tag: t.projects.docustratTag, technologies: ['React', 'TypeScript', 'Supabase', 'AI/LLM', 'Tailwind CSS'],
    },
    {
      id: 4, title: 'Mindovest.com', description: t.projects.mindovestDescription,
      imageSrc: mindovestImage, imageAlt: 'Mindovest.com', link: 'https://mindovest.com',
      tag: t.projects.mindovestTag, technologies: ['React', 'Vite', 'Tailwind CSS', 'Capacitor', 'Supabase', 'TypeScript'],
    },
  ];

  const badgeLabel = t.projects.badge ?? 'Featured Work';

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
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
