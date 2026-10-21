import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import SectionHead from '@/components/SectionHead';
import { useLanguage } from '@/components/LanguageProvider';
import { Sparkles } from 'lucide-react';
import nexfendImage from '@/assets/nexfend.png';
import wiibecImage from '@/assets/wiibec.png';
import mindovestImage from '@/assets/mindo.png';
import docustratImage from '@/assets/Docustrat.png';

const Projects = () => {
  const { translations: t } = useLanguage();
  if (!t?.projects) return null;

  // Un seul tag court par projet (categorie + plateforme), affiche en
  // overlay fixe sur l-image de la carte. Remplace l-ancienne liste de
  // technologies depliable : plus de changement de hauteur au clic, plus
  // de texte qui deborde d-une pastille trop etroite. Le detail complet
  // reste disponible via l-attribut title.
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

  return (
    <section id="projects" className="relative px-6" style={{ paddingTop: 'clamp(72px, 10vw, 128px)', paddingBottom: 'clamp(72px, 10vw, 128px)' }}>
      <div className="container mx-auto max-w-7xl relative z-10">
        <SectionHead
          eyebrow={t.projects.badge ?? 'Featured Work'}
          icon={<Sparkles size={12} />}
          title={t.projects.heading}
          subtitle={t.projects.subheading || null}
        />

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-stretch"
          style={{ marginTop: 'clamp(40px, 5vw, 64px)', gap: 'clamp(20px, 2.2vw, 28px)' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.32, 0.72, 0, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
