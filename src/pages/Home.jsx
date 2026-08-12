import React from 'react';
import { Helmet } from 'react-helmet';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import CallToAction from '@/components/CallToAction';
import IntroSection from '@/components/IntroSection';
import { useLanguage } from '@/components/LanguageProvider';

const Home = () => {
  const { translations } = useLanguage();

  if (!translations || !translations.home) return null;

  return (
    <>
      <Helmet>
        <title>{translations.home.meta.title}</title>
        <meta name="description" content={translations.home.meta.description} />
      </Helmet>
      <div className="flex flex-col w-full overflow-x-hidden">
        <IntroSection />
        <Projects />
        <Skills />
        <CallToAction />
      </div>
    </>
  );
};

export default Home;