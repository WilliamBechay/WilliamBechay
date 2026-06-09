import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Code2, Sparkles, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import wiibecImage from '@/assets/wiibec.png';
import mindovestImage from '@/assets/mindo.png';

const Projects = () => {
  const { translations } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!translations || !translations.projects) return null;

  const projects = [
    {
      id: 1,
      title: 'Wiibec.com',
      description: translations.projects.wiibecDescription,
      imageSrc: wiibecImage,
      imageAlt: 'Wiibec.com project screenshot',
      link: 'https://wiibec.com',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Supabase', 'Stripe'],
      tags: [],
    },
    {
      id: 2,
      title: 'Mindovest.com',
      description: translations.projects.mindovestDescription,
      imageSrc: mindovestImage,
      imageAlt: 'Mindovest.com investment platform interface',
      link: 'https://mindovest.com',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Capacitor', 'Supabase', 'TypeScript'],
      tags: [],
    },
    {
      id: 3,
      title: 'Docustrat.com',
      description: translations.projects.docustratDescription ||
        'Docustrat is an AI-powered document strategy platform that helps businesses structure, generate and optimize their professional documentation with intelligent workflows.',
      imageSrc: null,
      imageAlt: 'Docustrat.com document strategy platform',
      link: 'https://docustrat.com',
      technologies: ['React', 'TypeScript', 'Supabase', 'AI/LLM', 'Tailwind CSS'],
      tags: [],
    },
  ];

  return (
    <section id="projects" className={cn(
      'relative py-16 md:py-24 px-4 overflow-hidden',
      isDark ? 'bg-[#0d0e11]' : 'bg-[#f4f6f9]'
    )}>
      {/* Background decoration */}
      <div className={cn(
        'absolute inset-0',
        isDark ? 'bg-gradient-to-b from-[#13151b]/60 to-[#0d0e11]' : 'bg-gradient-to-b from-white/40 to-[#f4f6f9]'
      )} />
      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full"
            style={{
              background: isDark ? 'rgba(100,160,255,0.08)' : 'rgba(100,160,255,0.12)',
              border: `1px solid ${isDark ? 'rgba(100,160,255,0.18)' : 'rgba(100,160,255,0.28)'}`,
            }}
          >
            <Code2 className="w-3 h-3 md:w-4 md:h-4" style={{ color: isDark ? 'hsl(204 82% 68%)' : 'hsl(204 82% 40%)' }} />
            <span className="text-xs md:text-sm font-medium" style={{ color: isDark ? 'hsl(204 82% 68%)' : 'hsl(204 82% 40%)' }}>Featured Work</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-2">
            <span className="ce-title-gradient">
              {translations.projects.heading}
            </span>
          </h2>

          {translations.projects.subheading && (
            <p className={cn(
              'text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4',
              isDark ? 'text-[rgba(255,255,255,0.55)]' : 'text-[rgba(0,0,0,0.50)]'
            )}>
              {translations.projects.subheading}
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-4"
            >
              {project.imageSrc ? (
                <ProjectCard project={project} index={index} />
              ) : (
                /* Docustrat — no screenshot yet, use a stylized placeholder */
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1',
                    isDark
                      ? 'bg-[#13151b] border-white/[0.07] hover:border-white/[0.14]'
                      : 'bg-white border-black/[0.08] hover:border-black/[0.16] shadow-sm hover:shadow-md'
                  )}
                >
                  <div
                    className="relative flex items-center justify-center h-44 overflow-hidden"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, #13151b 0%, #1a1d27 50%, #13151b 100%)'
                        : 'linear-gradient(135deg, #eef2f8 0%, #e2e8f4 50%, #eef2f8 100%)'
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <div className="w-32 h-32 rounded-full blur-2xl bg-sky-400" />
                    </div>
                    <div className="relative text-center space-y-1">
                      <div className="text-2xl font-bold ce-title-gradient">{project.title}</div>
                      <div className={cn('text-xs', isDark ? 'text-[rgba(255,255,255,0.35)]' : 'text-[rgba(0,0,0,0.35)]')}>docustrat.com</div>
                    </div>
                    <div className={cn(
                      'absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity',
                      isDark ? 'text-white/50' : 'text-black/40'
                    )}>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className={cn('text-sm leading-relaxed', isDark ? 'text-[rgba(255,255,255,0.60)]' : 'text-[rgba(0,0,0,0.55)]')}>
                      {project.description}
                    </p>
                  </div>
                </a>
              )}

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className={cn(
                  'rounded-xl md:rounded-2xl p-4 md:p-5 space-y-2 md:space-y-3 border',
                  isDark
                    ? 'bg-white/[0.02] border-white/[0.06]'
                    : 'bg-white/70 border-black/[0.07] shadow-sm'
                )}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" style={{ color: isDark ? 'hsl(168 50% 60%)' : 'hsl(168 50% 40%)' }} />
                  <h4 className={cn('text-xs md:text-sm font-semibold uppercase tracking-wider', isDark ? 'text-[rgba(255,255,255,0.50)]' : 'text-[rgba(0,0,0,0.45)]')}>
                    Tech Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        'px-2.5 py-1 text-xs font-medium rounded-full border transition-transform hover:scale-105 cursor-default',
                        isDark
                          ? 'bg-white/[0.04] border-white/[0.08] text-[rgba(255,255,255,0.75)]'
                          : 'bg-black/[0.04] border-black/[0.08] text-[rgba(0,0,0,0.65)]'
                      )}
                    >
                      {tech}
                    </span>
                  ))}
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
