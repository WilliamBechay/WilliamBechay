import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gradientText, accentLine } from '@/styles/shared';

const CallToAction = () => {
  const { translations: t } = useLanguage();
  const navigate = useNavigate();
  if (!t) return null;

  const heading  = t.cta?.heading  ?? "Let's Build Together";
  const sub      = t.cta?.sub      ?? t?.home?.helpText ?? 'Need help on a project? You can contact me.';
  const btnLabel = t.cta?.button   ?? 'Contact me';
  const tagline  = t.cta?.tagline  ?? t?.home?.tagline ?? "Can't build it, can't understand it.";

  return (
    <section className="relative py-14 md:py-20 px-4">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(204 82% 58% / 0.05) 0%, transparent 70%)' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="container mx-auto max-w-2xl relative z-10">
        <div className="glass rounded-2xl p-8 md:p-12 text-center flex flex-col items-center gap-6">

          <h2 style={{ ...gradientText, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            {heading}
          </h2>

          <p style={{ color: 'hsl(210, 12%, 52%)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 420 }}>
            {sub}
          </p>

          <div style={accentLine} />

          {/* Slim button */}
          <button
            onClick={() => navigate('/contact')}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:gap-3"
            style={{ background: 'rgba(100,160,255,0.10)', border: '1px solid rgba(100,160,255,0.20)', color: 'hsl(204 82% 70%)' }}
          >
            {btnLabel}
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          <p style={{ fontSize: 12, fontStyle: 'italic', color: 'hsl(210, 12%, 42%)', marginTop: -8 }}>
            {tagline}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
