import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { Activity, Shield, ArrowDown } from 'lucide-react';
import { badge, accentLine, gradientText } from '@/styles/shared';

const IntroSection = () => {
  const { translations: t } = useLanguage();
  if (!t?.home?.intro) return null;

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { label: t.intro?.stats?.experience  ?? 'Years Experience',    value: '6+' },
    { label: t.intro?.stats?.projects    ?? 'Projects Completed',  value: '10+' },
    { label: t.intro?.stats?.technologies ?? 'Technologies',       value: '15+' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center px-4 overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-[-120px] left-[-80px] w-[520px] h-[520px] rounded-full blur-[120px] opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(204 82% 58%) 0%, transparent 70%)', animation: 'ce-orb1 14s ease-in-out infinite alternate' }} />
      <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.10] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(168 50% 60%) 0%, transparent 70%)', animation: 'ce-orb2 18s ease-in-out infinite alternate' }} />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center flex flex-col items-center gap-7">

          {/* Badge — style shared.js */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
            <div style={badge}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'hsl(168 50% 60%)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              {t.intro?.badge ?? 'Full Stack Developer · Available'}
            </div>
          </motion.div>

          {/* Headline — style shared.js (gradientText + taille hero) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{
              ...gradientText,
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            {t.intro?.headingLine1 ?? 'Building Digital'}<br />
            {t.intro?.headingLine2 ?? 'Experiences'}
          </motion.h1>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.home.intro.greeting}
          </motion.p>

          {/* Accent line — style shared.js */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.55 }}>
            <div style={accentLine} />
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3">
            {stats.map((s) => (
              <div key={s.label} className="px-5 py-3 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderTopColor: 'rgba(255,255,255,0.10)' }}>
                <div style={{ ...gradientText, fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{s.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA button */}
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
