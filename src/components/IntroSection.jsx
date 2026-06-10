import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Sparkles, ArrowDown } from 'lucide-react';
import { gradientText, sectionTitle, badge, subtitleStyle, accentLine } from '@/styles/shared';

const IntroSection = () => {
  const { translations } = useLanguage();
  if (!translations?.home?.intro) return null;

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden min-h-[80vh] flex items-center">
      <div className="absolute rounded-full blur-3xl pointer-events-none" style={{ width: 480, height: 480, top: 40, left: 20, opacity: 0.12, background: 'hsl(204 82% 58%)', animation: 'ce-orb1 14s ease-in-out infinite alternate' }} />
      <div className="absolute rounded-full blur-3xl pointer-events-none" style={{ width: 380, height: 380, bottom: 40, right: 20, opacity: 0.08, background: 'hsl(168 50% 56%)', animation: 'ce-orb2 18s ease-in-out infinite alternate' }} />

      <div className="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center gap-5 md:gap-7">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center gap-5 md:gap-7 w-full">

          <div style={badge}>
            <Sparkles style={{ width: 12, height: 12, color: 'hsl(204, 82%, 62%)' }} />
            Full Stack Developer
          </div>

          <h1 style={{ ...sectionTitle, fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 300 }}>
            Building Digital<br />Experiences
          </h1>

          <p style={{ ...subtitleStyle, maxWidth: 580 }}>
            {translations.home.intro.greeting}
          </p>

          <div style={accentLine} />

          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            {[{ label: 'Years Experience', value: '6+' }, { label: 'Projects Completed', value: '10+' }, { label: 'Technologies', value: '15+' }].map((stat, i) => (
              <motion.div key={stat.label} whileHover={{ y: -3 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.08 }} className="glass rounded-xl px-5 py-3 cursor-default">
                <div style={{ ...gradientText, fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: 'hsl(210, 12%, 50%)', marginTop: 2, letterSpacing: '0.04em' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ background: 'linear-gradient(135deg, hsl(204, 82%, 52%), hsl(168, 50%, 48%))', boxShadow: '0 0 0 1px hsl(204 82% 58% / 0.25), 0 8px 24px hsl(204 82% 58% / 0.18)', color: '#fff', border: 'none', padding: '11px 26px', borderRadius: 12, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            {translations.hero?.button || 'View my projects'}
            <ArrowDown style={{ width: 15, height: 15 }} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
