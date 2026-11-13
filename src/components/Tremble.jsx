import { useId, useState } from "react";

// Signature WigglyPaint : le trait de l'illustration bout en boucle sur
// 3 images, comme un dessin fait à la main. Si le téléphone demande moins
// d'animations, le trait reste tremblé mais figé. Tout le décor passe par ici.
export default function Tremble({ viewBox, className = "", intensite = 3.5, children }) {
  const id = useId();
  const [calme] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [x, y, largeur, hauteur] = viewBox.split(" ").map(Number);

  return (
    <svg aria-hidden="true" viewBox={viewBox} overflow="visible" className={`pointer-events-none ${className}`}>
      {/* Marge de 10 autour du dessin, sinon le déplacement rogne les bords. */}
      <filter id={id} filterUnits="userSpaceOnUse" x={x - 10} y={y - 10} width={largeur + 20} height={hauteur + 20}>
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1">
          {!calme && <animate attributeName="seed" values="1;2;3" dur="0.42s" calcMode="discrete" repeatCount="indefinite" />}
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale={intensite} />
      </filter>
      <g filter={`url(#${CSS.escape(id)})`}>{children}</g>
    </svg>
  );
}
