import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Sparkles, Code2 } from 'lucide-react';

const IntroSection = () => {
  const { translations } = useLanguage();

  if (!translations?.home?.intro) return null;

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden min-h-[80vh] md:min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 20%, hsl(204 82% 58% / 0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, hsl(168 50% 56% / 0.06) 0%, transparent 60%)' }} />
      <div className="absolute rounded-full blur-3xl" style={{ width: 480, height: 480, top: 40, left: 20, opacity: 0.15, background: 'hsl(204 82% 58%)', animation: 'ce-orb1 14s ease-in-out infinite alternate' }} />
      <div className="absolute rounded-full blur-3xl" style={{ width: 380, height: 380, bottom: 40, right: 20, opacity: 0.10, background: 'hsl(168 50% 56%)', animation: 'ce-orb2 18s ease-in-out infinite alternate' }} />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-6 md:space-y-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full glass border border-primary/30 relative overflow-hidden group"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" style={{ color: 'hsl(204, 82%, 58%)' }} />
            <span
              className="text-xs md:text-sm font-semibold relative z-10"
              style={{
                background: 'linear-gradient(135deg, hsl(204, 82%, 58%) 0%, hsl(168, 50%, 56%) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              Full Stack Developer
            </span>
            <Code2 className="w-3 h-3 md:w-4 md:h-4" style={{ color: 'hsl(168, 50%, 56%)' }} />
          </motion.div>

          {/* Main heading */}
          <div className="space-y-2 md:space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight px-2"
            >
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, hsl(204, 82%, 58%) 0%, hsl(204, 82%, 46%) 50%, hsl(168, 50%, 56%) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                Building Digital
              </span>
              <br />
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, hsl(168, 50%, 56%) 0%, hsl(204, 82%, 58%) 50%, hsl(204, 82%, 72%) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                Experiences
              </span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-4 text-muted-foreground"
          >
            {translations.home.intro.greeting}
          </motion.p>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
            className="h-0.5 w-32 md:w-48 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(204, 82%, 58%), hsl(168, 50%, 56%))' }}
          />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12 px-2"
          >
            {[
              { label: 'Years Experience', value: '3+' },
              { label: 'Projects Completed', value: '10+' },
              { label: 'Technologies', value: '15+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.08, y: -4 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass rounded-2xl px-4 md:px-6 py-3 md:py-4 min-w-[100px] md:min-w-[120px] cursor-default"
              >
                <div
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, hsl(204, 82%, 58%), hsl(168, 50%, 56%))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
