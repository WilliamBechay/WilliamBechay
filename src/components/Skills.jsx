import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowRight, Cpu } from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import { useReveal } from '@/hooks/useReveal';

// L-echelonnement est une propriete CSS (--reveal-delay) lue par
// animation-delay, et non un orchestrateur JavaScript. L-ancienne version
// montait 16 animations framer pilotees par un staggerChildren ; chacune
// ecrivait sa valeur d-arrivee avant de repartir de son depart, ce qui se
// voyait comme un clignotement par vignette.
const Skills = () => {
  const navigate = useNavigate();
  const { translations: t } = useLanguage();
  const skills = useMemo(() => t?.skills?.items || [], [t]);
  const revealRef = useReveal();
  if (!t?.skills) return null;

  return (
    <section
      id="skills"
      className="relative px-6"
      style={{
        paddingTop: 'clamp(72px, 10vw, 128px)',
        paddingBottom: 'clamp(72px, 10vw, 128px)',
        borderTop: '1px solid var(--hairline)',
      }}
    >
      <div className="container mx-auto relative z-10">
        <SectionHead
          eyebrow={t.skills.badge ?? 'Technical Expertise'}
          icon={<Cpu size={12} />}
          title={t.skills.heading}
          subtitle={t.skills.subheading}
        />

        <ul
          className="flex flex-wrap justify-center"
          style={{ marginTop: 'clamp(40px, 5vw, 64px)', gap: 'clamp(14px, 1.8vw, 20px)' }}
        >
          {skills.map((skill, index) => (
            <li
              key={skill.name}
              ref={revealRef}
              className="reveal skill-chip tile"
              style={{ '--reveal-delay': `${Math.min(index, 12) * 35}ms` }}
            >
              <img
                src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>

        <div
          ref={revealRef}
          className="reveal flex justify-center"
          style={{ marginTop: 'clamp(40px, 5vw, 56px)' }}
        >
          <button onClick={() => navigate('/contact')} className="btn btn-secondary">
            {t.skills.contactButton}
            <ArrowRight size={16} className="btn-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
