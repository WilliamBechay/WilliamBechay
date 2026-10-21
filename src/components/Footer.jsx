import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const Footer = () => {
  const { translations: t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Github,   href: 'https://github.com/williambechay',              label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/william-bechay',    label: 'LinkedIn' },
    { icon: Mail,     href: '/contact',                                      label: 'Contact' },
  ];

  return (
    <footer className="relative" style={{ borderTop: '1px solid var(--hairline)', background: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-6" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="flex flex-col items-center gap-7">

          <div className="text-center">
            <p style={{ fontSize: 'var(--fs-title-3)', fontWeight: 600, letterSpacing: '-0.02em', color: 'hsl(var(--foreground))' }}>
              William Bechay
            </p>
            <p className="t-caption" style={{ marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11 }}>
              {t?.footer?.role ?? 'Full Stack Developer'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="social-link"
                aria-label={s.label}
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>

          <div className="w-full" style={{ maxWidth: 380, height: 1, background: 'var(--hairline)' }} />

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 t-caption">
            <span>&copy; {year} William Bechay</span>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>&middot;</span>
            <span className="inline-flex items-center gap-1.5">
              {t?.footer?.crafted_with ?? 'Crafted with'}
              <Heart size={12} style={{ color: 'hsl(352 70% 58%)', fill: 'hsl(352 70% 58%)' }} />
            </span>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>&middot;</span>
            <Link to="/admin" className="footer-link">
              {t?.header?.admin ?? 'Admin'}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
