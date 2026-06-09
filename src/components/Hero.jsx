import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Cpu } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const Hero = () => {
  const { translations } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  const fullTitle = 'William Bechay';

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullTitle.slice(0, i));
      if (i >= fullTitle.length) { clearInterval(interval); setDone(true); }
    }, 68);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!translations) return null;

  return (
    <section className={cn(
      'relative min-h-screen flex items-center justify-center px-4 pt-14 overflow-hidden',
      isDark ? 'bg-[#0d0e11]' : 'bg-[#f4f6f9]'
    )}>
      {/* Background orbs — CE style */}
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

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
            style={{
              background: isDark ? 'rgba(100,160,255,0.08)' : 'rgba(100,160,255,0.12)',
              borderColor: isDark ? 'rgba(100,160,255,0.18)' : 'rgba(100,160,255,0.28)',
              color: isDark ? 'hsl(204 82% 68%)' : 'hsl(204 82% 40%)'
            }}
          >
            <Cpu className="w-3 h-3" />
            <span>Full-Stack Engineer</span>
          </motion.div>

          {/* Main title — typewriter effect */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span
                className="ce-title-gradient"
                style={{ fontFeatureSettings: '"ss01", "cv11"' }}
              >
                {displayed}
                <span
                  className={cn(
                    'inline-block w-[3px] ml-1 rounded-full align-middle h-[0.8em]',
                    done ? 'animate-blink' : 'opacity-100',
                    isDark ? 'bg-sky-400' : 'bg-sky-500'
                  )}
                />
              </span>
            </h1>
            <p className={cn(
              'text-base sm:text-lg md:text-xl font-medium tracking-wide uppercase',
              isDark ? 'text-[rgba(255,255,255,0.38)]' : 'text-[rgba(0,0,0,0.35)]'
            )}>
              {translations.header.projects && 'Software Engineer · Web Developer'}
            </p>
          </div>

          {/* Subheading */}
          <p className={cn(
            'text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2',
            isDark ? 'text-[rgba(255,255,255,0.60)]' : 'text-[rgba(0,0,0,0.55)]'
          )}>
            {translations.hero.subheading}
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, hsl(204 82% 55%), hsl(168 50% 55%))'
                  : 'linear-gradient(135deg, hsl(204 82% 45%), hsl(168 50% 42%))',
                color: '#fff',
                boxShadow: isDark
                  ? '0 0 0 1px rgba(100,160,255,0.25), 0 8px 24px rgba(100,160,255,0.20)'
                  : '0 4px 16px rgba(100,160,255,0.30)'
              }}
            >
              <Code2 className="w-4 h-4" />
              {translations.hero.button}
            </motion.button>
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200',
                isDark
                  ? 'border-white/[0.10] text-[rgba(255,255,255,0.75)] hover:text-white hover:border-white/[0.18] hover:bg-white/[0.04]'
                  : 'border-black/[0.12] text-[rgba(0,0,0,0.65)] hover:text-black hover:border-black/[0.20] hover:bg-black/[0.04]'
              )}
            >
              <ArrowDown className="w-4 h-4" />
              Scroll down
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
