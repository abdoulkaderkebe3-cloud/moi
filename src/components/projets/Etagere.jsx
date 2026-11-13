import { PROJETS } from "./donnees";
import Livre from "./Livre";
import PlanteRetombante from "./decor/PlanteRetombante";

// Côté de la plante : la planche s'allonge de ce côté pour poser le pot, et
// la plante est retournée à gauche pour que ses lianes tombent vers l'extérieur.
const MARGES = { gauche: "md:pl-28 md:pr-8", droite: "md:pl-8 md:pr-28" };
const PLANTE = { gauche: "left-0 -scale-x-100", droite: "right-0" };

export default function Etagere({ indices, t, onOuvrir, plante }) {
  return (
    <div className="relative">
      <ul className={`relative z-10 flex items-end justify-center gap-4 px-4 sm:gap-6 ${MARGES[plante] ?? "md:px-8"}`}>
        {indices.map((i) => (
          <li key={PROJETS[i].key}>
            <Livre p={PROJETS[i]} i={i} t={t} onOuvrir={onOuvrir} />
          </li>
        ))}
      </ul>

      {/* Desktop seulement : sur téléphone, l'étagère est déjà pleine. Le pot
          se pose sur la planche (sa base est à 100/220 de la hauteur du
          dessin), les lianes tombent devant elle. */}
      {plante && (
        <PlanteRetombante
          className={`absolute -bottom-26 z-20 hidden h-55 w-30 md:block ${PLANTE[plante]}`}
        />
      )}

      {/* La planche : un dessus éclairé et une ombre portée sur le mur. */}
      <div
        aria-hidden="true"
        className="relative h-3.5 rounded-[3px] bg-[linear-gradient(#8a6243,#5c3f29)] shadow-[0_18px_24px_-8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.25)] md:h-4"
      />
    </div>
  );
}
