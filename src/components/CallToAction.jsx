import React from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const CallToAction = () => {
  const { translations: t } = useLanguage();
  const navigate = useNavigate();
  const revealRef = useReveal();
  if (!t) return null;

  const heading  = t.cta?.heading  ?? "Let's Build Together";
  const sub      = t.cta?.sub      ?? t?.home?.helpText ?? 'Need help on a project? You can contact me.';
  const btnLabel = t.cta?.button   ?? 'Contact me';
  const tagline  = t.cta?.tagline  ?? t?.home?.tagline ?? "Can't build it, can't understand it.";

  return (
    <section
      className="relative px-6"
      style={{
        paddingTop: 'clamp(72px, 10vw, 128px)',
        paddingBottom: 'clamp(72px, 10vw, 128px)',
        borderTop: '1px solid var(--hairline)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(204 82% 58% / 0.06) 0%, transparent 70%)' }}
      />

      <div
        ref={revealRef}
        className="reveal container mx-auto max-w-2xl relative z-10 text-center flex flex-col items-center"
      >
        <h2 className="t-title-1">{heading}</h2>

        <p className="t-lead" style={{ marginTop: 16, maxWidth: '30rem' }}>{sub}</p>

        <button onClick={() => navigate('/contact')} className="btn btn-primary" style={{ marginTop: 32 }}>
          {btnLabel}
          <ArrowRight size={16} className="btn-arrow" />
        </button>

        <p className="t-caption" style={{ marginTop: 28, fontStyle: 'italic', opacity: 0.75 }}>
          {tagline}
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
