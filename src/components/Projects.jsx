import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import { Code2, Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import wiibecImage from '@/assets/wiibec.png';
import mindovestImage from '@/assets/mindo.png';

/* ── Docustrat placeholder image (gradient canvas, no external dep) ── */
const DocustratPlaceholder = ({ isDark }) => (
  <div
    className="w-full h-full flex items-center justify-center relative overflow-hidden"
    style={{
      background: isDark
        ? 'linear-gradient(135deg, #13151b 0%, #1a2035 50%, #111827 100%)'
        : 'linear-gradient(135deg, #e8edf6 0%, #d6e4f7 50%, #e8edf6 100%)',
    }}
  >
    {/* subtle glow */}
    <div className="absolute w-40 h-40 rounded-full blur-3xl opacity-25"
      style={{ background: 'hsl(204 82% 58%)', top: '20%', left: '25%' }} />
    <div className="absolute w-32 h-32 rounded-full blur-3xl opacity-20"
      style={{ background: 'hsl(168 50% 55%)', bottom: '15%', right: '20%' }} />
    {/* wordmark */}
    <div className="relative text-center select-none">
      <span
        className="text-3xl md:text-4xl font-extrabold tracking-tight"
        style={{
          fontFamily: "'Geist', 'Inter var', 'Inter', system-ui, sans-serif",
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, hsl(204 82% 74% / 0.92) 45%, hsl(168 50% 65% / 0.85) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        DocuStrat
      </span>
      <p className={cn(
        'mt-1 text-xs font-medium tracking-widest uppercase',
        isDark ? 'text-white/30' : 'text-black/30'
      )}>
        AI · Documents · Strategy
      </p>
    </div>
  </div>
);

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
    },
    {
      id: 2,
      title: 'Mindovest.com',
      description: translations.projects.mindovestDescription,
      imageSrc: mindovestImage,
      imageAlt: 'Mindovest.com investment platform',
      link: 'https://mindovest.com',
      technologies: ['React', 'Vite', 'Tailwind CSS', 'Capacitor', 'Supabase', 'TypeScript'],
    },
    {
      id: 3,
      title: 'Docustrat.com',
      description:
        translations.projects.docustratDescription ||
        'Docustrat is an AI-powered document strategy platform that helps businesses structure, generate and optimize their professional documentation with intelligent workflows.',
      imageSrc: null,
      imageAlt: 'Docustrat.com AI document platform',
      link: 'https://docustrat.com',
      technologies: ['React', 'TypeScript', 'Supabase', 'AI/LLM', 'Tailwind CSS'],
    },
  ];

  return (
    <section
      id="projects"
      className={cn(
        'relative py-16 md:py-24 px-4 overflow-hidden',
        isDark ? 'bg-[#0d0e11]' : 'bg-[#f4f6f9]'
      )}
    >
      <div className={cn(
        'absolute inset-0',
        isDark
          ? 'bg-gradient-to-b from-[#13151b]/60 to-[#0d0e11]'
          : 'bg-gradient-to-b from-white/40 to-[#f4f6f9]'
      )} />
      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
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
            <Code2
              className="w-3 h-3 md:w-4 md:h-4"
              style={{ color: isDark ? 'hsl(204 82% 68%)' : 'hsl(204 82% 40%)' }}
            />
            <span
              className="text-xs md:text-sm font-medium"
              style={{ color: isDark ? 'hsl(204 82% 68%)' : 'hsl(204 82% 40%)' }}
            >
              Featured Work
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-2">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {translations.projects.heading}
            </span>
          </h2>

          {translations.projects.subheading && (
            <p className={cn(
              'text-base md:text-lg max-w-2xl mx-auto px-4',
              isDark ? 'text-[rgba(255,255,255,0.55)]' : 'text-[rgba(0,0,0,0.50)]'
            )}>
              {translations.projects.subheading}
            </p>
          )}
        </motion.div>

        {/*
          Grid:
          - mobile  : 1 col
          - md      : 2 col (Wiibec + Mindovest)
          - lg (3p) : 3 col
          All cards share the same structure via ProjectCard or the Docustrat variant below.
          items-stretch ensures equal height per row.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              {/* Card — same height for all */}
              <div className="flex-grow">
                {project.imageSrc ? (
                  <ProjectCard project={project} index={index} />
                ) : (
                  /* Docustrat: same wrapper shape as ProjectCard */
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className={cn(
                      'group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 h-full',
                      isDark
                        ? 'bg-[#13151b] border-white/[0.07] hover:border-white/[0.14]'
                        : 'bg-white border-black/[0.08] hover:border-black/[0.16] shadow-sm hover:shadow-md'
                    )}
                  >
                    {/* Placeholder image — same aspect-video as real cards */}
                    <div className="aspect-video relative overflow-hidden flex-shrink-0">
                      <DocustratPlaceholder isDark={isDark} />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
                    </div>

                    {/* Content — identical structure to ProjectCard */}
                    <div className="flex flex-col flex-grow p-5 md:p-6 gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <h3
                            className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200"
                            style={{ fontFamily: "'Geist', 'Inter var', 'Inter', system-ui, sans-serif" }}
                          >
                            {project.title}
                          </h3>
                          <div className="h-0.5 w-10 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-16 transition-all duration-300" />
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow hover:shadow-primary/40 hover:scale-110 transition-all duration-200"
                          aria-label="Visit Docustrat.com"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                      <p className={cn(
                        'text-sm md:text-base leading-relaxed flex-grow line-clamp-4',
                        isDark ? 'text-[rgba(255,255,255,0.60)]' : 'text-[rgba(0,0,0,0.55)]'
                      )}>
                        {project.description}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </motion.article>
                )}
              </div>

              {/* Tech stack — uniform style for all */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className={cn(
                  'rounded-xl p-4 border',
                  isDark
                    ? 'bg-white/[0.02] border-white/[0.06]'
                    : 'bg-white/70 border-black/[0.07] shadow-sm'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles
                    className="w-3.5 h-3.5"
                    style={{ color: isDark ? 'hsl(168 50% 60%)' : 'hsl(168 50% 40%)' }}
                  />
                  <h4 className={cn(
                    'text-xs font-semibold uppercase tracking-wider',
                    isDark ? 'text-[rgba(255,255,255,0.40)]' : 'text-[rgba(0,0,0,0.40)]'
                  )}>
                    Tech Stack
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={cn(
                        'px-2.5 py-1 text-xs font-medium rounded-full border',
                        isDark
                          ? 'bg-white/[0.04] border-white/[0.08] text-[rgba(255,255,255,0.70)]'
                          : 'bg-black/[0.04] border-black/[0.08] text-[rgba(0,0,0,0.60)]'
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
