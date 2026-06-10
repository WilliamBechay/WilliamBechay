import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowRight } from 'lucide-react';
import { gradientText, sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';

const Skills = () => {
  const navigate = useNavigate();
  const { translations: t } = useLanguage();
  const skills = useMemo(() => t?.skills?.items || [], [t]);
  if (!t?.skills) return null;

  return (
    <section id="skills" className="relative py-16 md:py-24 px-4 overflow-hidden bg-background">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 flex flex-col items-center gap-4">
          <div style={badge}>
            <span style={{ fontSize: 10 }}>⚙</span>
            {t.skills.badge ?? 'Technical Expertise'}
          </div>
          <h2 style={sectionTitle}>{t.skills.heading}</h2>
          <p style={subtitleStyle}>{t.skills.subheading}</p>
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
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{ background: 'linear-gradient(135deg, hsl(204,82%,58%/0.20), hsl(168,50%,56%/0.20))' }} />
                <img src={`https://skillicons.dev/icons?i=${skill.icon}&theme=dark`} alt={skill.name} className="w-12 h-12 md:w-14 md:h-14 relative z-10" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Slim button */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center">
          <button
            onClick={() => navigate('/contact')}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:gap-3"
            style={{ background: 'rgba(100,160,255,0.10)', border: '1px solid rgba(100,160,255,0.20)', color: 'hsl(204 82% 70%)' }}
          >
            {t.skills.contactButton}
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
