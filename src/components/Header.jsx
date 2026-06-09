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
    'relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
    isActive(pathOrId)
      ? 'text-foreground'
      : 'text-muted-foreground hover:text-foreground'
  );

  const iconBtnClass = cn(
    'flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200',
    isDark
      ? 'text-[rgba(255,255,255,0.55)] hover:text-[rgba(255,255,255,0.9)] hover:bg-white/[0.06]'
      : 'text-[rgba(0,0,0,0.50)] hover:text-[rgba(0,0,0,0.85)] hover:bg-black/[0.06]'
  );

  if (!translations) return null;

  const scrolledHeaderClass = isScrolled
    ? cn(
        'border-b shadow-sm',
        isDark
          ? 'bg-[#111318] border-[rgba(255,255,255,0.07)] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
          : 'bg-[rgba(255,255,255,0.92)] border-[rgba(0,0,0,0.08)] backdrop-blur-md'
      )
    : 'bg-transparent';

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolledHeaderClass)}>
      <nav className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between max-w-6xl">

        {/* Logo */}
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            {/* DNA node indicator — inspired by Cognitive Engine */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-60',
                isDark ? 'bg-sky-400' : 'bg-sky-500'
              )} />
              <span className={cn(
                'relative inline-flex rounded-full h-2 w-2',
                isDark ? 'bg-sky-400' : 'bg-sky-500'
              )} />
            </span>
            <span className={cn(
              'text-sm font-semibold tracking-tight',
              isDark ? 'text-[rgba(255,255,255,0.92)]' : 'text-[rgba(0,0,0,0.85)]'
            )}>
              William Bechay
            </span>
          </motion.div>
        </Link>

        {/* Desktop nav — only 2 tabs: Projects & Contact */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scrollToSection('projects')}
            className={cn(
              navItemClass('projects'),
              isActive('projects')
                ? isDark ? 'bg-white/[0.06] border border-white/[0.08]' : 'bg-black/[0.05] border border-black/[0.08]'
                : isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.04]'
            )}
          >
            {translations.header.projects}
          </button>
          <button
            onClick={() => handleNavigate('/contact')}
            className={cn(
              navItemClass('/contact'),
              isActive('/contact')
                ? isDark ? 'bg-white/[0.06] border border-white/[0.08]' : 'bg-black/[0.05] border border-black/[0.08]'
                : isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.04]'
            )}
          >
            {translations.header.contact}
          </button>

          <div className={cn('w-px h-4 mx-2', isDark ? 'bg-white/[0.08]' : 'bg-black/[0.10]')} />

          <button onClick={toggleLanguage} className={iconBtnClass} aria-label="Toggle language" title="Toggle language">
            <Languages className="w-4 h-4" />
          </button>
          <button onClick={handleToggleTheme} className={iconBtnClass} aria-label="Toggle theme" title="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.22 }}
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
                initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.22 }}
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
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
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
            className={cn(
              'md:hidden overflow-hidden border-t',
              isDark ? 'border-white/[0.06] bg-[#111318]' : 'border-black/[0.07] bg-white/95 backdrop-blur-md'
            )}
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              <button
                onClick={() => scrollToSection('projects')}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isDark ? 'text-[rgba(255,255,255,0.75)] hover:text-white hover:bg-white/[0.05]' : 'text-[rgba(0,0,0,0.65)] hover:text-black hover:bg-black/[0.05]'
                )}
              >
                {translations.header.projects}
              </button>
              <button
                onClick={() => handleNavigate('/contact')}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isDark ? 'text-[rgba(255,255,255,0.75)] hover:text-white hover:bg-white/[0.05]' : 'text-[rgba(0,0,0,0.65)] hover:text-black hover:bg-black/[0.05]'
                )}
              >
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
