import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const ProjectCard = ({ project }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
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
      {/* Image — fixed aspect ratio so all cards are identical */}
      <div className="aspect-video relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full h-full object-cover"
          src={project.imageSrc}
          alt={project.imageAlt}
        />
        {/* shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 md:p-6 gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <div className="h-0.5 w-10 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-16 transition-all duration-300" />
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow hover:shadow-primary/40 hover:scale-110 transition-all duration-200"
            aria-label={`Visit ${project.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Description — fixed line-clamp so text never breaks symmetry */}
        <p className={cn(
          'text-sm md:text-base leading-relaxed flex-grow line-clamp-4',
          isDark ? 'text-[rgba(255,255,255,0.60)]' : 'text-[rgba(0,0,0,0.55)]'
        )}>
          {project.description}
        </p>
      </div>

      {/* bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.article>
  );
};

export default ProjectCard;
