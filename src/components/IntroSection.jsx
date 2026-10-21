import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { ArrowDown, MapPin } from 'lucide-react';

const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.32, 0.72, 0, 1] },
});

const IntroSection = () => {
  const { translations: t } = useLanguage();
  const navigate = useNavigate();
  if (!t?.home?.intro) return null;

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });

  const stats = [
    { label: t.intro?.stats?.experience   ?? 'Years Experience',   value: '6+' },
    { label: t.intro?.stats?.projects     ?? 'Projects Completed', value: '10+' },
    { label: t.intro?.stats?.technologies ?? 'Technologies',       value: '15+' },
  ];

  return (
    <section className="min-screen relative flex items-center px-6">
      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center flex flex-col items-center">

          <motion.div {...rise(0.05)}>
            <span className="eyebrow">
              <span
                className="animate-soft-pulse"
                style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}
              />
              {t.intro?.badge ?? 'Full Stack Developer'}
            </span>
          </motion.div>

          {/* Le degrade de marque tient sur UN mot. Un titre entier en
              degrade perd sa hierarchie : il n-a plus ni noir ni blanc a
              opposer au texte qui le suit. */}
          <motion.h1 {...rise(0.12)} className="t-display hero-title">
            {t.intro?.headingLine1 ?? 'Building Digital'}
            <br />
            <span className="t-gradient">{t.intro?.headingLine2 ?? 'Experiences'}</span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="t-lead hero-lead">
            {t.home.intro.greeting}
          </motion.p>

          <motion.div {...rise(0.28)} className="hero-actions flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button onClick={scrollToProjects} className="btn btn-primary w-full sm:w-auto">
              {t.intro?.scrollCta ?? 'View my projects'}
              <ArrowDown size={16} className="btn-arrow btn-arrow-down" />
            </button>
            <button onClick={() => navigate('/contact')} className="btn btn-secondary w-full sm:w-auto">
              {t.header?.contact ?? 'Contact'}
            </button>
          </motion.div>

          {/* Chiffres : une rangee separee par des filets, pas trois
              pastilles. Le chiffre est une donnee — il se lit en pleine
              couleur, a sa taille, sans decor. */}
          <motion.dl
            {...rise(0.36)}
            className="hero-stats grid grid-cols-3 w-full"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center px-2"
                style={i > 0 ? { borderLeft: '1px solid var(--hairline)' } : undefined}
              >
                <dd className="t-title-2" style={{ color: 'hsl(var(--foreground))' }}>{s.value}</dd>
                <dt className="t-caption" style={{ marginTop: 4 }}>{s.label}</dt>
              </div>
            ))}
          </motion.dl>

          <motion.div
            {...rise(0.44)}
            className="hero-status flex flex-wrap items-center justify-center gap-x-5 gap-y-2 t-caption"
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="animate-soft-pulse"
                style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--tint-accent-text)' }}
              />
              {t.intro?.status?.openToWork ?? 'Open to work'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} />
              {t.intro?.status?.location ?? 'Montreal, QC'}
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;
