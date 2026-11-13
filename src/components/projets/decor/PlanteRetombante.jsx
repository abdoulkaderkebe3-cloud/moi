import Tremble from "../../Tremble";
import Liane from "./Liane";

// Plante en pot dont les lianes débordent et tombent devant l'étagère.
// La base du pot est à y = 100 sur 220 : c'est ce point qui se pose sur la
// planche (voir Etagere.jsx).
export default function PlanteRetombante({ className }) {
  return (
    <Tremble viewBox="0 0 120 220" className={className}>
      {/* Feuillage dressé, derrière le pot. */}
      <Liane p={[58, 62, 50, 40, 40, 30, 30, 12]} feuilles={4} taille={0.9} />
      <Liane p={[62, 62, 70, 40, 80, 28, 94, 16]} feuilles={4} taille={0.9} decalage={1} />
      <Liane p={[60, 62, 60, 40, 62, 20, 60, 2]} feuilles={3} taille={0.8} decalage={2} />

      {/* Pot en terre cuite. */}
      <path d="M36 62H84L79 100H41Z" fill="#9a5432" />
      <path d="M33 56H87V66H33Z" fill="#b5653d" />

      {/* Lianes qui passent par-dessus le bord et pendent. */}
      {/* Pas plus bas que y = 170 : en dessous, elles couvriraient les livres
          de l'étagère suivante. */}
      <Liane p={[80, 60, 105, 58, 112, 100, 104, 170]} feuilles={9} taille={0.95} decalage={2} />
      <Liane p={[70, 60, 94, 70, 88, 110, 94, 150]} feuilles={7} taille={0.9} />
      <Liane p={[42, 60, 18, 62, 16, 100, 24, 145]} feuilles={6} taille={0.9} decalage={1} />
    </Tremble>
  );
}
