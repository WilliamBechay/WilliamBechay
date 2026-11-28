import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// BrowserRouter garde la position de defilement d-une page a l-autre : le
// bouton Contact du bas de l-accueil ouvrait /contact deja defile, le
// formulaire hors de l-ecran. Une ancre (#projects) garde son comportement.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // 'instant' : le scroll-behavior: smooth du CSS animerait sinon la
    // remontee, et la nouvelle page apparaitrait en train de defiler.
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
