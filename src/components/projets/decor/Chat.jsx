import Tremble from "../../Tremble";

const PELAGE = "#c97b3a";
const OMBRE = "#a35c25";

// Les pattes balancent deux par deux en diagonale, comme un vrai pas :
// avant gauche avec arrière droite, puis l'inverse. Pattes du fond plus sombres.
const PATTES = [
  { x: 34, couleur: OMBRE, retard: "0s" },
  { x: 44, couleur: PELAGE, retard: "-0.45s" },
  { x: 72, couleur: OMBRE, retard: "-0.45s" },
  { x: 82, couleur: PELAGE, retard: "0s" },
];

// Un chat roux qui traverse la pièce en boucle, au ras du sol. Si le
// téléphone demande moins d'animations, il reste assis là, immobile.
export default function Chat() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[55%] w-24 animate-chat-marche md:w-28">
      <Tremble viewBox="0 0 120 70" intensite={2.5} className="w-full">
        <path d="M24 32C10 28 6 12 14 4" fill="none" stroke={PELAGE} strokeWidth="5" strokeLinecap="round" />
        {PATTES.map(({ x, couleur, retard }) => (
          <path
            key={x}
            d={`M${x} 42V66`}
            stroke={couleur}
            strokeWidth="5"
            strokeLinecap="round"
            className="animate-patte"
            style={{ transformBox: "fill-box", transformOrigin: "50% 0", animationDelay: retard }}
          />
        ))}
        <ellipse cx="58" cy="36" rx="34" ry="13" fill={PELAGE} />
        <path d="M46 25q4 8 0 16M56 23q4 9 0 18M66 24q4 8 0 16" fill="none" stroke={OMBRE} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="94" cy="26" r="12" fill={PELAGE} />
        <path d="M85 19L87 6L95 15ZM96 15L103 5L105 20Z" fill={PELAGE} />
        <circle cx="99" cy="24" r="1.8" fill="#1a1a1a" />
        <path d="M105 29l1.5 1.5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      </Tremble>
    </div>
  );
}
