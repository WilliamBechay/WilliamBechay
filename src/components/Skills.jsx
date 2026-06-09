import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { Wrench, ArrowRight } from 'lucide-react';
import { gradientText, sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';

const Skills = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const skills = useMemo(() => translations?.skills?.items || [], [translations]);
  if (!translations?.skills) return null;

  return (
    <section id="skills" className="relative py-16 md:py-24 px-4 overflow-hidden bg-background">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16 flex flex-col items-center gap-4">
          <div style={badge}><Wrench style={{ width: 12, height: 12 }} />Technical Expertise</div>
          <h2 style={sectionTitle}>{translations.skills.heading}</h2>
          <p style={subtitleStyle}>{translations.skills.subheading}</p>
          <div style={accentLine} />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14 mb-12 md:mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -10, scale: 1.08, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="relative glass rounded-2xl p-3 md:p-4">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" style={{ background: 'linear-gradient(135deg, hsl(204,82%,58%/0.20), hsl(168,50%,56%/0.20))' }} />
                <img src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`} alt={skill.name} className="w-12 h-12 md:w-14 md:h-14 relative z-10" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center">
          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ background: 'linear-gradient(135deg, hsl(204,82%,52%), hsl(168,50%,48%))', boxShadow: '0 0 0 1px hsl(204 82% 58% / 0.25), 0 8px 24px hsl(204 82% 58% / 0.18)', color: '#fff', border: 'none', padding: '11px 26px', borderRadius: 12, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            {translations.skills.contactButton}
            <ArrowRight style={{ width: 15, height: 15 }} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
