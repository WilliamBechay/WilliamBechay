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
        isDark ? 'bg-[#13151b] border-white/[0.07] hover:border-white/[0.14]' : 'bg-white border-black/[0.08] hover:border-black/[0.16] shadow-sm hover:shadow-md'
      )}
    >
      <div className="aspect-video relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full h-full object-cover"
          src={project.imageSrc}
          alt={project.imageAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
      </div>

      <div className="flex flex-col flex-grow p-5 md:p-6 gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <div className="h-px w-10 group-hover:w-16 transition-all duration-300" style={{ background: 'linear-gradient(90deg, hsl(204,82%,58%), hsl(168,50%,56%))' }} />
          </div>
          <a
            href={project.link} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl text-white shadow hover:scale-110 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, hsl(204,82%,52%), hsl(168,50%,48%))' }}
            aria-label={`Visit ${project.title}`}
          >
            <ArrowUpRight style={{ width: 15, height: 15 }} />
          </a>
        </div>
        <p className="text-sm leading-relaxed flex-grow line-clamp-4 text-muted-foreground">
          {project.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: 'linear-gradient(90deg, hsl(204,82%,58%), hsl(168,50%,56%))' }} />
    </motion.article>
  );
};

export default ProjectCard;
