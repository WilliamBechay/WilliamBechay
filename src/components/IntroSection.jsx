import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Sparkles, Code2 } from 'lucide-react';

const IntroSection = () => {
  const { translations } = useLanguage();

  if (!translations?.home?.intro) return null;

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden min-h-[80vh] md:min-h-[90vh] flex items-center">
      {/* Background orbs */}
      <div className="absolute rounded-full blur-3xl pointer-events-none" style={{ width: 480, height: 480, top: 40, left: 20, opacity: 0.12, background: 'hsl(204 82% 58%)', animation: 'ce-orb1 14s ease-in-out infinite alternate' }} />
      <div className="absolute rounded-full blur-3xl pointer-events-none" style={{ width: 380, height: 380, bottom: 40, right: 20, opacity: 0.08, background: 'hsl(168 50% 56%)', animation: 'ce-orb2 18s ease-in-out infinite alternate' }} />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center flex flex-col items-center gap-5 md:gap-7"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{
              background: 'hsl(204 82% 58% / 0.08)',
              borderColor: 'hsl(204 82% 58% / 0.20)',
            }}
          >
            <Sparkles className="w-3 h-3" style={{ color: 'hsl(204, 82%, 62%)' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(204, 82%, 62%)' }}>
              Full Stack Developer
            </span>
            <Code2 className="w-3 h-3" style={{ color: 'hsl(168, 50%, 56%)' }} />
          </motion.div>

          {/* Main heading — light weight, tight tracking, professional */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, hsl(204, 82%, 62%) 0%, hsl(204, 82%, 50%) 45%, hsl(168, 50%, 56%) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Building Digital<br />
            <span style={{ fontWeight: 600 }}>Experiences</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ maxWidth: 560, lineHeight: 1.7, color: 'hsl(210, 12%, 52%)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
          >
            {translations.home.intro.greeting}
          </motion.p>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.55, ease: 'easeOut' }}
            style={{ height: 1, width: 48, background: 'linear-gradient(90deg, hsl(204, 82%, 58%), hsl(168, 50%, 56%))', borderRadius: 999 }}
          />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap justify-center gap-3 md:gap-5"
          >
            {[
              { label: 'Years Experience', value: '3+' },
              { label: 'Projects Completed', value: '10+' },
              { label: 'Technologies', value: '15+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 + index * 0.08 }}
                className="glass rounded-xl px-5 py-3 cursor-default"
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, hsl(204, 82%, 58%), hsl(168, 50%, 56%))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: 'hsl(210, 12%, 50%)', marginTop: 2, letterSpacing: '0.04em' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
