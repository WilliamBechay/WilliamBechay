import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import { Toaster } from '@/components/ui/toaster';

// Contact et Admin sont les deux seules pages qui parlent a Supabase, et
// Contact est la seule qui a besoin du Select de Radix. Chargees a la demande,
// elles sortent du bundle initial : la page d-accueil n-attend plus le code de
// pages que le visiteur n-a pas ouvertes.
const Contact = lazy(() => import('@/pages/Contact.jsx'));
const Admin = lazy(() => import('@/pages/Admin'));

const AppContent = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Fond ambiant global — unique source de verite, fixe, derriere tout.
          Evite les coupures visibles entre sections (chaque section avait avant son propre halo flou
          enferme dans overflow-hidden, ce qui creait une rupture nette a chaque frontiere de section). */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] left-[-10%] w-[520px] h-[520px] rounded-full blur-[130px] opacity-[0.10]"
          style={{ background: 'radial-gradient(circle, hsl(204 82% 58%) 0%, transparent 70%)', animation: 'ce-orb1 16s ease-in-out infinite alternate' }} />
        <div className="absolute bottom-[-15%] right-[-10%] w-[440px] h-[440px] rounded-full blur-[120px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, hsl(168 50% 60%) 0%, transparent 70%)', animation: 'ce-orb2 20s ease-in-out infinite alternate' }} />
      </div>

      <Header />
      {/* La hauteur de la barre vient du token --nav-h, pas d-une utilitaire
          recopiee : deux endroits qui doivent valoir la meme chose doivent
          lire la meme valeur, sinon ils divergent au premier ajustement. */}
      <main className="flex-grow overflow-x-hidden relative" style={{ paddingTop: 'var(--nav-h)' }}>
        {/* Le repli garde la hauteur de l-ecran au lieu de laisser la page se
            replier sur elle-meme pendant le chargement d-une route. */}
        <Suspense fallback={<div className="min-screen" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    // reducedMotion="user" : la requete media CSS ne touche pas les
    // animations de framer-motion, qui sont pilotees en JS. Sans ce
    // reglage, une preference systeme "moins d-animations" est ignoree
    // par tout ce qui apparait au defilement.
    <MotionConfig reducedMotion="user">
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
