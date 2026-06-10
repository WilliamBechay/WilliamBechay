import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Activity, Shield, ArrowDown } from 'lucide-react';

const IntroSection = () => {
  const { translations: t } = useLanguage();
  if (!t?.home?.intro) return null;

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { label: t.intro?.stats?.experience ?? 'Years Experience', value: '6+' },
    { label: t.intro?.stats?.projects   ?? 'Projects Completed', value: '10+' },
    { label: t.intro?.stats?.technologies ?? 'Technologies', value: '15+' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center px-4 pt-14 overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-[-120px] left-[-80px] w-[520px] h-[520px] rounded-full blur-[120px] opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(204 82% 58%) 0%, transparent 70%)', animation: 'ce-orb1 14s ease-in-out infinite alternate' }} />
      <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.10] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(168 50% 60%) 0%, transparent 70%)', animation: 'ce-orb2 18s ease-in-out infinite alternate' }} />
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center space-y-8">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase"
            style={{ background: 'rgba(100,160,255,0.08)', border: '1px solid rgba(100,160,255,0.18)', color: 'hsl(204 82% 70%)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'hsl(168 50% 60%)' }} />
            {t.intro?.badge ?? 'Full Stack Developer · Available'}
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="block" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, hsl(204 82% 74% / 0.90) 50%, hsl(168 50% 68% / 0.80) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Building Digital
            </span>
            <span className="block" style={{ background: 'linear-gradient(135deg, hsl(168 50% 68% / 0.85) 0%, hsl(204 82% 74% / 0.90) 60%, rgba(255,255,255,0.92) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Experiences
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.home.intro.greeting}
          </motion.p>

          {/* Accent line */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.55 }}
            className="h-px w-20 mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(204 82% 58% / 0.5), hsl(168 50% 60% / 0.4), transparent)' }} />

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3">
            {stats.map((s) => (
              <div key={s.label} className="px-5 py-3 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderTopColor: 'rgba(255,255,255,0.10)' }}>
                <div className="text-2xl font-bold" style={{ color: 'hsl(204 82% 68%)' }}>{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA button — slim */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:gap-3"
              style={{ background: 'rgba(100,160,255,0.10)', border: '1px solid rgba(100,160,255,0.20)', color: 'hsl(204 82% 70%)' }}
            >
              {t.intro?.scrollCta ?? t.hero?.button ?? 'View my projects'}
              <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Status row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Activity size={10} />
              <span>{t.intro?.status?.openToWork ?? 'Open to work'}</span>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'hsl(168 50% 60%)' }} />
              <span style={{ color: 'hsl(168 50% 65%)' }}>{t.intro?.status?.active ?? 'Active'}</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Shield size={10} />
              <span>{t.intro?.status?.location ?? 'Montreal, QC'}</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
