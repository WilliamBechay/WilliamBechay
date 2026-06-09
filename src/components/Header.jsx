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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  const navItemClass = (pathOrId) => cn(
    'relative px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
    isActive(pathOrId)
      ? 'text-foreground bg-white/[0.06] border border-white/[0.08]'
      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
  );

  const iconBtnClass = 'flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-colors';

  if (!translations) return null;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#111318] border-b border-white/[0.07] shadow-[0_1px_0_rgba(255,255,255,0.05)]'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo — plain text, no extra decoration */}
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-foreground/90 tracking-tight"
          >
            William Bechay
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <button onClick={() => scrollToSection('projects')} className={navItemClass('projects')}>
            {translations.header.projects}
          </button>
          <button onClick={() => handleNavigate('/contact')} className={navItemClass('/contact')}>
            {translations.header.contact}
          </button>

          <div className="w-px h-4 bg-white/[0.08] mx-2" />

          <button onClick={toggleLanguage} className={iconBtnClass} aria-label="Toggle language">
            <Languages className="w-4 h-4" />
          </button>
          <button onClick={handleToggleTheme} className={iconBtnClass} aria-label="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button onClick={toggleLanguage} className={iconBtnClass} aria-label="Toggle language">
            <Languages className="w-4 h-4" />
          </button>
          <button onClick={handleToggleTheme} className={iconBtnClass} aria-label="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={iconBtnClass}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? 'close' : 'open'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#111318]"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              <button onClick={() => scrollToSection('projects')} className={navItemClass('projects')}>
                {translations.header.projects}
              </button>
              <button onClick={() => handleNavigate('/contact')} className={navItemClass('/contact')}>
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
