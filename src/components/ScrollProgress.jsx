// Barre de progression de lecture. Animée en CSS par `animation-timeline:
// scroll()` (voir `.barre-progression` dans index.css) : elle n'exécute plus
// aucun JavaScript au défilement.
export default function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="barre-progression fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-99"
    />
  );
}
