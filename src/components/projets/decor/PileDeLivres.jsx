import Tremble from "../../Tremble";

// Livres posés à plat, du bas vers le haut, dos tourné vers nous.
const LIVRES = [
  { x: 6, largeur: 128, couleur: "#2d4a6b" },
  { x: 12, largeur: 116, couleur: "#8a3b3b" },
  { x: 2, largeur: 124, couleur: "#c9b79c" },
  { x: 14, largeur: 110, couleur: "#4a3b6b" },
];
const EPAISSEUR = 14;

// Pile de livres au sol, avec la tasse du développeur posée dessus.
export default function PileDeLivres({ className }) {
  const haut = 110 - LIVRES.length * EPAISSEUR;
  return (
    <Tremble viewBox="0 0 140 110" className={className}>
      {LIVRES.map(({ x, largeur, couleur }, i) => {
        const y = 110 - (i + 1) * EPAISSEUR;
        return (
          <g key={couleur}>
            <rect x={x} y={y} width={largeur} height={EPAISSEUR} rx="2" fill={couleur} />
            <path d={`M${x + 10} ${y + 3}v8M${x + largeur - 10} ${y + 3}v8`} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
          </g>
        );
      })}
      {/* La tasse. */}
      <path d={`M84 ${haut - 26}h6a7 7 0 0 1 0 14h-6`} fill="none" stroke="#f2eadc" strokeWidth="4" />
      <rect x="52" y={haut - 34} width="34" height="34" rx="4" fill="#f2eadc" />
      <text x="69" y={haut - 13} textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#1a1a1a">
        {"</>"}
      </text>
    </Tremble>
  );
}
