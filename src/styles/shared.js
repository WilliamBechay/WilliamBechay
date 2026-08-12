// Styles partagés — une seule source de vérité pour tout le site

export const GRADIENT = 'linear-gradient(135deg, hsl(204, 82%, 62%) 0%, hsl(204, 82%, 50%) 45%, hsl(168, 50%, 56%) 100%)';

export const gradientText = {
  background: GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

export const sectionTitle = {
  ...gradientText,
  fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)',
  fontWeight: 300,
  letterSpacing: '-0.03em',
  lineHeight: 1.15,
};

export const badge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 12px',
  borderRadius: 999,
  background: 'hsl(204, 82%, 58%, 0.08)',
  border: '1px solid hsl(204, 82%, 58%, 0.20)',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'hsl(204, 82%, 62%)',
};

export const subtitleStyle = {
  color: 'hsl(210, 12%, 52%)',
  fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
  lineHeight: 1.7,
  maxWidth: 560,
};

export const accentLine = {
  height: 1,
  width: 40,
  background: GRADIENT,
  borderRadius: 999,
  margin: '0 auto',
};
