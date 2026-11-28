import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHead from '@/components/SectionHead';

// Le rewrite de vercel.json renvoie index.html pour toute URL : sans cette
// route, une adresse mal tapee affichait l-en-tete et le pied de page autour
// d-un vide, sans rien dire au visiteur.
const NotFound = () => {
  const { translations: t } = useLanguage();
  const nf = t?.notFound ?? {};

  return (
    <>
      <Helmet>
        <title>{nf.metaTitle ?? 'Page not found - William Béchay'}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="min-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center">
          <SectionHead
            reveal={false}
            eyebrow="404"
            icon={<Compass size={12} />}
            title={nf.title ?? 'This page does not exist'}
            subtitle={nf.subtitle ?? 'The link may be broken or the page may have moved.'}
          />
          <Link to="/" className="btn btn-primary" style={{ marginTop: 32 }}>
            <ArrowLeft size={16} />
            {nf.back ?? 'Back to home'}
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
