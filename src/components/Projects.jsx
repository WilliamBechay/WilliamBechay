import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';
import wiibecImage from '@/assets/wiibec.png';
import mindovestImage from '@/assets/mindo.png';
import docustratImage from '@/assets/docustrat.png';

const Projects = () => {
  const { translations: t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  if (!t?.projects) return null;

  const projects = [
    { id: 1, title: 'Wiibec.com',     description: t.projects.wiibecDescription,    imageSrc: wiibecImage,    imageAlt: 'Wiibec.com',     link: 'https://wiibec.com',     technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Supabase', 'Stripe'] },
    { id: 2, title: 'Mindovest.com',  description: t.projects.mindovestDescription,  imageSrc: mindovestImage, imageAlt: 'Mindovest.com',  link: 'https://mindovest.com',  technologies: ['React', 'Vite', 'Tailwind CSS', 'Capacitor', 'Supabase', 'TypeScript'] },
    { id: 3, title: 'Docustrat.com',  description: t.projects.docustratDescription,  imageSrc: docustratImage, imageAlt: 'Docustrat.com',  link: 'https://docustrat.com',  technologies: ['React', 'TypeScript', 'Supabase', 'AI/LLM', 'Tailwind CSS'] },
  ];

  const techTag = cn('px-2.5 py-1 text-xs font-medium rounded-full border', isDark ? 'bg-white/[0.04] border-white/[0.08] text-[rgba(255,255,255,0.70)]' : 'bg-black/[0.04] border-black/[0.08] text-[rgba(0,0,0,0.60)]');
  const techBox = cn('rounded-xl p-4 border', isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white/70 border-black/[0.07] shadow-sm');

  const badgeLabel = t.projects.badge   ?? 'Featured Work';
  const techLabel  = t.projects.techStack ?? 'Tech Stack';

  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 overflow-hidden bg-background">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 flex flex-col items-center gap-4">
          <div style={badge}><Sparkles style={{ width: 12, height: 12 }} />{badgeLabel}</div>
          <h2 style={sectionTitle}>{t.projects.heading}</h2>
          {t.projects.subheading && <p style={subtitleStyle}>{t.projects.subheading}</p>}
          <div style={accentLine} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex flex-col gap-4">
              <div className="flex-grow">
                <ProjectCard project={project} />
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 + 0.2 }} className={techBox}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles style={{ width: 12, height: 12, color: 'hsl(168,50%,56%)' }} />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'hsl(210,12%,45%)' }}>{techLabel}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map(tech => <span key={tech} className={techTag}>{tech}</span>)}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
