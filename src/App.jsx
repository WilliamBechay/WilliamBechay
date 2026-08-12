import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact.jsx';
import Admin from '@/pages/Admin';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import { Toaster } from '@/components/ui/toaster';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';

const AppContent = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col relative">
      {/* Fond ambiant global — unique source de vérité, fixe, derrière tout.
          Évite les coupures visibles entre sections (chaque section avait avant son propre halo flou
          enfermé dans overflow-hidden, ce qui créait une rupture nette à chaque frontière de section). */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[520px] h-[520px] rounded-full blur-[130px] opacity-[0.10]"
          style={{ background: 'radial-gradient(circle, hsl(204 82% 58%) 0%, transparent 70%)', animation: 'ce-orb1 16s ease-in-out infinite alternate' }} />
        <div className="absolute bottom-[-15%] right-[-10%] w-[440px] h-[440px] rounded-full blur-[120px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, hsl(168 50% 60%) 0%, transparent 70%)', animation: 'ce-orb2 20s ease-in-out infinite alternate' }} />
      </div>

      <Header />
      {/* pt-14 = 3.5rem = h-14, la hauteur exacte du header (fixe, identique sur tous les appareils) —
          garantit un espacement constant et prévisible entre le header et le premier élément de chaque page. */}
      <main className="flex-grow overflow-x-hidden pt-14 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <LanguageProvider>
        <SupabaseAuthProvider>
          <AppContent />
        </SupabaseAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;