import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// La carte entiere est le lien. Avant, seule une pastille de 36px dans
// le coin menait au projet : la cible etait sous le minimum tactile et
// invisible comme affordance tant qu-on ne la survolait pas.
const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group relative flex flex-col overflow-hidden h-full"
      aria-label={`${project.title} — ${project.tag ?? ''}`}
    >
      <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '16 / 10' }}>
        <img
          className="w-full h-full object-cover card-shot"
          src={project.imageSrc}
          alt=""
          loading="lazy"
          decoding="async"
        />
        {/* Un voile tres leger en bas de l-image : il fait tenir la
            pastille et separe l-image du texte sans l-assombrir. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(8,10,14,0.38) 0%, rgba(8,10,14,0.04) 42%, transparent 70%)' }}
        />

        {/* Taille fixe, jamais de retour a la ligne : la pastille ne fait
            pas grandir la carte. Le detail des technologies reste au survol
            via title. */}
        {project.tag && (
          <span
            title={project.technologies?.join(', ')}
            className="absolute top-3 left-3 max-w-[80%] truncate whitespace-nowrap"
            style={{
              borderRadius: 'var(--r-pill)',
              padding: '5px 11px',
              fontSize: 'var(--fs-eyebrow)',
              fontWeight: 500,
              color: '#fff',
              background: 'rgba(10,12,16,0.58)',
              border: '1px solid rgba(255,255,255,0.16)',
              backdropFilter: 'blur(12px) saturate(160%)',
              WebkitBackdropFilter: 'blur(12px) saturate(160%)',
            }}
          >
            {project.tag}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow gap-2" style={{ padding: '20px 20px 22px' }}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="t-title-3 card-title">{project.title}</h3>
          <span
            aria-hidden="true"
            className="flex items-center justify-center shrink-0"
            style={{ width: 28, height: 28 }}
          >
            <ArrowUpRight size={17} className="card-arrow" />
          </span>
        </div>

        <p className="card-copy flex-grow">
          {project.description}
        </p>
      </div>
    </a>
  );
};

export default ProjectCard;
