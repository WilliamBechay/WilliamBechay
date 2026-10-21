import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowRight, Cpu } from 'lucide-react';
import SectionHead from '@/components/SectionHead';

// Un seul parent pilote par viewport (containerVariants) au lieu d-un
// whileInView + spring individuel par icone : ca evite de declencher
// 15-20 IntersectionObserver + animations physiques simultanees, qui
// est ce qui causait le lag a l-apparition. Le stagger est gere ici,
// avec un simple tween (moins couteux qu-un spring) sur chaque enfant.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
};

const Skills = () => {
  const navigate = useNavigate();
  const { translations: t } = useLanguage();
  const skills = useMemo(() => t?.skills?.items || [], [t]);
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

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="flex flex-wrap justify-center"
          style={{ marginTop: 'clamp(40px, 5vw, 64px)', gap: 'clamp(14px, 1.8vw, 20px)' }}
        >
          {skills.map((skill) => (
            <motion.li key={skill.name} variants={itemVariants} className="skill-chip tile">
              <img
                src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              <span>{skill.name}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="flex justify-center"
          style={{ marginTop: 'clamp(40px, 5vw, 56px)' }}
        >
          <button onClick={() => navigate('/contact')} className="btn btn-secondary">
            {t.skills.contactButton}
            <ArrowRight size={16} className="btn-arrow" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
