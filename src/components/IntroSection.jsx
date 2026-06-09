import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowDown } from 'lucide-react';

const IntroSection = () => {
  const { translations } = useLanguage();

  if (!translations?.home?.intro) return null;

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-14 overflow-hidden bg-background">
      {/* Orbs — CE style */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full blur-3xl" style={{ width: 600, height: 600, top: '5%', left: '10%', opacity: 0.12, background: 'radial-gradient(circle, hsl(204, 82%, 58%) 0%, transparent 70%)', animation: 'ce-orb1 14s ease-in-out infinite alternate' }} />
        <div className="absolute rounded-full blur-3xl" style={{ width: 450, height: 450, bottom: '10%', right: '8%', opacity: 0.10, background: 'radial-gradient(circle, hsl(168, 50%, 56%) 0%, transparent 70%)', animation: 'ce-orb2 18s ease-in-out infinite alternate' }} />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Name — gradient inline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none"
            style={{
              background: 'linear-gradient(135deg, hsl(204, 82%, 58%) 0%, hsl(204, 82%, 46%) 42%, hsl(168, 50%, 56%) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            William Béchay
          </h1>

          {/* Role — muted, uppercase, spaced */}
          <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'hsl(210, 12%, 45%)' }}>
            Software Engineer
          </p>

          {/* Bio */}
          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'hsl(210, 12%, 52%)' }}
          >
            {translations.home.intro.greeting}
          </p>

          {/* CTA */}
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'linear-gradient(135deg, hsl(204, 82%, 52%), hsl(168, 50%, 48%))',
              boxShadow: '0 0 0 1px hsl(204, 82%, 58%, 0.25), 0 8px 24px hsl(204, 82%, 58%, 0.20)',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            {translations.hero?.button || 'View my projects'}
            <ArrowDown style={{ width: 16, height: 16 }} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
