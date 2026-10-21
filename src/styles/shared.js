// Styles partages — une seule source de verite pour tout le site.
//
// Ce module exportait des OBJETS passes a style={{ }}. Il exporte
// maintenant des NOMS DE CLASSE definis dans src/index.css.
//
// Pourquoi : un style inline gagne contre toute regle de feuille de
// style, donc il echappe au theme. Une surface ecrite
// rgba(255,255,255,0.03) est juste en sombre et invisible en clair, et
// aucune regle ne peut la rattraper. En CSS, la meme surface est un
// token qui change avec le theme.
//
// Tout ce qui reste ici est une VALEUR, pas une decoration : le degrade
// de marque, utilise la ou une classe ne suffit pas (un masque SVG, un
// canvas, un favicon).

export const GRADIENT =
  'linear-gradient(135deg, hsl(204 82% 62%) 0%, hsl(204 82% 52%) 44%, hsl(168 50% 54%) 100%)';

// Surtitre : la pastille en capitales au-dessus d-un titre de section.
export const eyebrow = 'eyebrow';

// Titre de section. Pleine couleur, pas en degrade : la hierarchie se
// lit a la taille et a la graisse, et la couleur de marque est gardee
// pour ce qui se clique.
export const sectionTitle = 't-title-1';

// Sous-titre d-une section.
export const subtitle = 't-lead';

// Le degrade sur un mot — jamais sur un titre entier.
export const gradientWord = 't-gradient';
