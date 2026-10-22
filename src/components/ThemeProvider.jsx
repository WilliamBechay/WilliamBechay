import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', setTheme: () => null });

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// Le theme est deja applique par le script inline de index.html, avant le
// premier rendu. On repart de ce que la page PORTE deja, pas d-une seconde
// lecture du stockage : deux sources qui repondent separement finissent par
// ne plus dire la meme chose, et l-ecart se voit sous la forme d-un
// basculement de couleur au chargement.
const readAppliedTheme = (fallback) => {
  if (typeof document === 'undefined') return fallback;
  const applied = document.documentElement.classList;
  if (applied.contains('light')) return 'light';
  if (applied.contains('dark')) return 'dark';
  return fallback;
};

export const ThemeProvider = ({ children, defaultTheme = 'dark' }) => {
  const [theme, setThemeState] = useState(() => readAppliedTheme(defaultTheme));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
};
