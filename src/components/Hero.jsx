import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const Hero = () => {
  const { translations } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!translations) return null;

  return (
    <section className={cn(
      'relative min-h-screen flex items-center justify-center px-4 pt-14 overflow-hidden',
      isDark ? 'bg-[#0d0e11]' : 'bg-[#f4f6f9]'
    )}>
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: 520, height: 520,
            top: '10%', left: '15%',
            background: isDark
              ? 'radial-gradient(circle, hsl(204 82% 58%) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(204 82% 58% / 0.35) 0%, transparent 70%)',
            animation: 'ce-orb1 14s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-15"
          style={{
            width: 400, height: 400,
            bottom: '15%', right: '12%',
            background: isDark
              ? 'radial-gradient(circle, hsl(168 50% 60%) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(168 50% 60% / 0.30) 0%, transparent 70%)',
            animation: 'ce-orb2 18s ease-in-out infinite alternate',
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {translations.hero.heading}
          </h1>

          <p className={cn(
            'text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed',
            isDark ? 'text-[rgba(255,255,255,0.60)]' : 'text-[rgba(0,0,0,0.55)]'
          )}>
            {translations.hero.subheading}
          </p>

          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {translations.hero.button}
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
