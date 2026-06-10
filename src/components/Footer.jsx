import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';
import { gradientText } from '@/styles/shared';

const Footer = () => {
  const { translations: t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Github,   href: 'https://github.com/WilliamBechay', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com',             label: 'LinkedIn' },
    { icon: Mail,     href: '/contact',                         label: 'Contact' },
  ];

  return (
    <footer className="relative border-t border-border/40 overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="flex flex-col items-center gap-6">

          <div className="text-center">
            <span style={{ ...gradientText, fontSize: '1.2rem', fontWeight: 300, letterSpacing: '-0.02em' }}>
              William Bechay
            </span>
            <p className="text-xs text-muted-foreground mt-1" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {t?.footer?.role ?? 'Full Stack Developer'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="p-2.5 rounded-xl glass text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={s.label}
              >
                <s.icon style={{ width: 15, height: 15 }} />
              </motion.a>
            ))}
          </div>

          <div className="w-32 h-px" style={{ background: 'linear-gradient(90deg, transparent, hsl(210,14%,22%), transparent)' }} />

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>© {year} William Bechay</span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1">
              {t?.footer?.crafted_with ?? 'Crafted with'}
              <Heart style={{ width: 11, height: 11, color: 'hsl(0,70%,60%)', fill: 'hsl(0,70%,60%)' }} />
            </span>
            <span className="opacity-30">·</span>
            <Link to="/admin" className="hover:text-primary transition-colors">
              {t?.header?.admin ?? 'Admin'}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
