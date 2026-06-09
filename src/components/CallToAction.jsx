import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gradientText, accentLine } from '@/styles/shared';

const CallToAction = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  if (!translations) return null;

  const helpText = translations?.home?.helpText || 'Need help on a project? You can contact me.';
  const tagline = translations?.home?.tagline || "Can't build it, can't understand it.";

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(204 82% 58% / 0.05) 0%, transparent 70%)' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="container mx-auto max-w-2xl relative z-10">
        <div className="glass rounded-2xl p-8 md:p-12 text-center flex flex-col items-center gap-6">

          <h2 style={{ ...gradientText, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            Let's Build Together
          </h2>

          <p style={{ color: 'hsl(210, 12%, 52%)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 420 }}>
            {helpText}
          </p>

          <div style={accentLine} />

          <motion.button
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ background: 'linear-gradient(135deg, hsl(204,82%,52%), hsl(168,50%,48%))', boxShadow: '0 0 0 1px hsl(204 82% 58% / 0.25), 0 8px 24px hsl(204 82% 58% / 0.18)', color: '#fff', border: 'none', padding: '11px 26px', borderRadius: 12, fontWeight: 600, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            Contact me <ArrowRight style={{ width: 15, height: 15 }} />
          </motion.button>

          <p style={{ fontSize: 12, fontStyle: 'italic', color: 'hsl(210, 12%, 42%)', marginTop: -8 }}>
            {tagline}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
