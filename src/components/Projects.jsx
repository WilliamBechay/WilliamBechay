import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gradientText, sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';
import wiibecImage from '@/assets/wiibec.png';
import mindovestImage from '@/assets/mindo.png';

const DocustratPlaceholder = ({ isDark }) => (
  <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
    style={{ background: isDark ? 'linear-gradient(135deg, #13151b 0%, #1a2035 100%)' : 'linear-gradient(135deg, #e8edf6 0%, #d6e4f7 100%)' }}>
    <div className="absolute w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: 'hsl(204 82% 58%)', top: '20%', left: '25%' }} />
    <div className="relative text-center select-none">
      <span style={{ ...gradientText, fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em' }}>DocuStrat</span>
      <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)', marginTop: 4 }}>AI · Documents · Strategy</p>
    </div>
  </div>
);

const Projects = () => {
  const { translations: t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  if (!t?.projects) return null;

  const projects = [
    { id: 1, title: 'Wiibec.com',     description: t.projects.wiibecDescription,    imageSrc: wiibecImage,    imageAlt: 'Wiibec.com',     link: 'https://wiibec.com',     technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Supabase', 'Stripe'] },
    { id: 2, title: 'Mindovest.com',  description: t.projects.mindovestDescription,  imageSrc: mindovestImage, imageAlt: 'Mindovest.com',  link: 'https://mindovest.com',  technologies: ['React', 'Vite', 'Tailwind CSS', 'Capacitor', 'Supabase', 'TypeScript'] },
    { id: 3, title: 'Docustrat.com',  description: t.projects.docustratDescription,  imageSrc: null,           imageAlt: 'Docustrat.com',  link: 'https://docustrat.com',  technologies: ['React', 'TypeScript', 'Supabase', 'AI/LLM', 'Tailwind CSS'] },
  ];

  const cardBase = cn('group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 h-full', isDark ? 'bg-[#13151b] border-white/[0.07] hover:border-white/[0.14]' : 'bg-white border-black/[0.08] hover:border-black/[0.16] shadow-sm hover:shadow-md');
  const techTag  = cn('px-2.5 py-1 text-xs font-medium rounded-full border', isDark ? 'bg-white/[0.04] border-white/[0.08] text-[rgba(255,255,255,0.70)]' : 'bg-black/[0.04] border-black/[0.08] text-[rgba(0,0,0,0.60)]');
  const techBox  = cn('rounded-xl p-4 border', isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white/70 border-black/[0.07] shadow-sm');

  const badgeLabel   = t.projects.badge   ?? 'Featured Work';
  const techLabel    = t.projects.techStack ?? 'Tech Stack';

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
                {project.imageSrc ? (
                  <ProjectCard project={project} />
                ) : (
                  <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className={cardBase}>
                    <div className="aspect-video relative overflow-hidden flex-shrink-0"><DocustratPlaceholder isDark={isDark} /></div>
                    <div className="flex flex-col flex-grow p-5 md:p-6 gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">{project.title}</h3>
                          <div className="h-px w-10 group-hover:w-16 transition-all duration-300" style={{ background: 'linear-gradient(90deg, hsl(204,82%,58%), hsl(168,50%,56%))' }} />
                        </div>
                        <a href={project.link} target="_blank" rel="noopener noreferrer"
                          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-white transition-all duration-200 hover:scale-110"
                          style={{ background: 'linear-gradient(135deg, hsl(204,82%,52%), hsl(168,50%,48%))' }}
                          aria-label={t.projects.visitProject ?? `Visit ${project.title}`}>
                          <ArrowUpRight style={{ width: 13, height: 13 }} />
                        </a>
                      </div>
                      <p className="text-sm leading-relaxed flex-grow line-clamp-4 text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: 'linear-gradient(90deg, hsl(204,82%,58%), hsl(168,50%,56%))' }} />
                  </motion.article>
                )}
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
