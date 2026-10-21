import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/useScrollSpy';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { translations, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === 'dark';

  const sectionIds = ['projects', 'skills'];
  const activeSection = useScrollSpy(sectionIds, { rootMargin: '-50% 0px -50% 0px' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavigate = (path) => { navigate(path); setIsMenuOpen(false); };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleToggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const isActive = (pathOrId) => {
    if (pathOrId.startsWith('/')) return location.pathname === pathOrId;
    return location.pathname === '/' && activeSection === pathOrId;
  };

  // Un item de nav est un bouton de la meme famille que tous les autres :
  // il herite donc de la cible tactile de 44px sur un pointeur grossier.
  const navItemClass = (pathOrId) => cn(
    'btn btn-ghost btn-sm',
    isActive(pathOrId) && 'is-active'
  );

  const navItemStyle = (pathOrId) => isActive(pathOrId)
    ? { background: 'var(--surface-2)', color: 'hsl(var(--foreground))', fontWeight: 600 }
    : undefined;

  if (!translations) return null;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 'var(--nav-h)',
        // La barre est TOUJOURS depolie — c-est elle qui fait flotter la
        // page dessous. Seul le filet du bas apparait au defilement, pour
        // separer la barre du contenu une fois qu-il passe derriere.
        background: 'var(--chrome-bg)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: `1px solid ${isScrolled ? 'var(--hairline)' : 'transparent'}`,
        transition: 'border-color var(--dur) var(--ease)',
      }}
    >
      <nav className="container mx-auto px-4 h-full flex items-center justify-between gap-2">

        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="brand-link shrink-0 rounded-lg"
          style={{ fontSize: 'var(--fs-callout)', fontWeight: 600, letterSpacing: '-0.015em', color: 'hsl(var(--foreground))' }}
        >
          William Bechay
        </Link>

        {/* Nav bureau */}
        <div className="hidden md:flex items-center gap-1">
          <button onClick={() => scrollToSection('projects')} className={navItemClass('projects')} style={navItemStyle('projects')}>
            {translations.header.projects}
          </button>
          <button onClick={() => handleNavigate('/contact')} className={navItemClass('/contact')} style={navItemStyle('/contact')}>
            {translations.header.contact}
          </button>

          <div className="w-px h-4 mx-2" style={{ background: 'var(--hairline-strong)' }} />

          <button onClick={toggleLanguage} className="btn btn-ghost btn-sm hit" style={{ padding: 0, width: 38 }} aria-label="Toggle language">
            <Languages size={16} />
          </button>
          <button onClick={handleToggleTheme} className="btn btn-ghost btn-sm hit" style={{ padding: 0, width: 38 }} aria-label="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Commandes mobiles */}
        <div className="flex md:hidden items-center gap-0.5">
          <button onClick={toggleLanguage} className="btn btn-ghost btn-sm hit" style={{ padding: 0, width: 40 }} aria-label="Toggle language">
            <Languages size={17} />
          </button>
          <button onClick={handleToggleTheme} className="btn btn-ghost btn-sm hit" style={{ padding: 0, width: 40 }} aria-label="Toggle theme">
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost btn-sm hit"
            style={{ padding: 0, width: 40 }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile — fond opaque : un panneau translucide pose sur du
          texte qui defile derriere lui n-est plus lisible. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: 'var(--chrome-solid)', borderTop: '1px solid var(--hairline)', boxShadow: 'var(--shadow-2)' }}
          >
            <div className="container mx-auto px-4 py-2 flex flex-col">
              <button onClick={() => scrollToSection('projects')} className="btn btn-ghost" style={{ justifyContent: 'flex-start', ...navItemStyle('projects') }}>
                {translations.header.projects}
              </button>
              <button onClick={() => handleNavigate('/contact')} className="btn btn-ghost" style={{ justifyContent: 'flex-start', ...navItemStyle('/contact') }}>
                {translations.header.contact}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
