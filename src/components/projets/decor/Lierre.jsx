import Tremble from "../../Tremble";
import Liane from "./Liane";

// Brins qui tombent du haut du mur, de longueurs inégales.
const BRINS = [
  { p: [5, 0, 0, 90, 15, 200, 0, 300], feuilles: 14 },
  { p: [20, 0, 10, 60, 40, 110, 25, 190], feuilles: 10 },
  { p: [35, 0, 50, 70, 20, 150, 35, 230], feuilles: 11 },
  { p: [50, 0, 70, 50, 40, 130, 60, 250], feuilles: 12 },
  { p: [70, 0, 90, 30, 60, 80, 80, 130], feuilles: 7 },
  { p: [90, 0, 110, 40, 90, 90, 110, 160], feuilles: 8 },
  { p: [115, 0, 125, 25, 110, 55, 125, 85], feuilles: 5 },
  { p: [130, 0, 150, 30, 140, 70, 160, 110], feuilles: 6 },
  { p: [170, 0, 190, 15, 185, 40, 205, 60], feuilles: 4 },
];

// Lierre accroché en haut d'un coin du mur. Pour l'autre coin, le retourner
// avec `-scale-x-100`.
export default function Lierre({ className }) {
  return (
    <Tremble viewBox="0 0 220 320" intensite={3} className={className}>
      {BRINS.map((brin, i) => (
        <Liane key={i} {...brin} taille={1.5} decalage={i} />
      ))}
    </Tremble>
  );
}
