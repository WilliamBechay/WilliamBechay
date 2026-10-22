import { useCallback } from 'react';

// Revelation au defilement, pilotee par le CSS.
//
// Pourquoi pas whileInView de framer-motion : pour animer, framer ecrit
// d-abord la valeur d-arrivee sur l-element, puis lance l-animation depuis
// la valeur de depart. S-il y a un rendu entre les deux, l-element est
// peint VISIBLE pendant une image, puis repasse invisible, puis arrive en
// fondu. Une fois par element, quelques millisiemes de seconde. Les
// elements portant un delai (les cartes projets etaient echelonnees de
// 70ms) tiennent cet etat visible pendant toute la duree du delai, donc
// le clignotement y est le plus net.
//
// En CSS le probleme ne peut pas se poser : .reveal vaut opacity 0 des la
// premiere resolution du style, et l-animation porte animation-fill-mode
// both, qui maintient l-image de depart pendant le delai. Il n-existe
// aucun instant ou l-element est peint a sa valeur d-arrivee avant de
// commencer.
//
// Avantage secondaire : une animation CSS d-opacite tourne hors du fil
// principal. Mesure dans un onglet d-arriere-plan bride, les quatre
// cartes projets restaient bloquees a opacity 0 parce que la boucle
// requestAnimationFrame de framer ne recevait que 10 images en 6
// secondes. Du contenu qui n-existe que si une animation JS aboutit est
// du contenu qu-on peut perdre.

let observer = null;

const getObserver = () => {
  if (observer) return observer;
  if (typeof IntersectionObserver === 'undefined') return null;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        // Une seule fois : la revelation n-est pas un etat, c-est un passage.
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  return observer;
};

export const useReveal = () => {
  return useCallback((node) => {
    if (!node) return;
    const io = getObserver();
    // Sans IntersectionObserver, on montre tout de suite plutot que de
    // laisser du contenu invisible.
    if (!io) { node.classList.add('is-in'); return; }
    io.observe(node);
  }, []);
};

export default useReveal;
