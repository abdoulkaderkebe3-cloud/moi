import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { RevealGroup, RevealItem, RevealTitle } from "./Reveal";
import { ETAGERES, PROJETS } from "./projets/donnees";
import Etagere from "./projets/Etagere";
import Lecture from "./projets/Lecture";
import Lierre from "./projets/decor/Lierre";
import PostIt from "./projets/decor/PostIt";
import Affiche from "./projets/decor/Affiche";
import BasDeLaPiece from "./projets/decor/BasDeLaPiece";

// Bibliothèque de projets, sur le modèle de pixidimworldstories.vercel.app :
// une pièce au mur noir, des livres sur des étagères, du lierre, des plantes
// et quelques objets. Tout est en CSS 3D et en SVG, sans WebGL. Le décor vit
// dans `projets/decor/`, un fichier par objet.
export default function Projects() {
  const { t } = useLang();
  const [ouvert, setOuvert] = useState(null);
  const decor = t.projects.decor;

  return (
    <section
      id="projets"
      className="relative overflow-hidden bg-black px-4 pt-24 text-white scroll-mt-24 md:px-12"
    >
      {/* Mur carrelé, effacé vers les bords pour ne pas encadrer la section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[96px_96px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      {/* Décor du mur. Post-it et affiche à partir de 1280 px seulement : en
          dessous, ils recouvriraient les étagères. */}
      {/* Petit sur téléphone, sinon il passe sous la phrase d'aide. */}
      <Lierre className="absolute left-0 top-0 h-32 w-24 md:h-96 md:w-64" />
      <Lierre className="absolute right-0 top-0 hidden h-72 w-48 -scale-x-100 md:block" />
      <PostIt texte={decor.postit} className="left-[3%] top-[36%] hidden xl:block" />
      <Affiche
        lignes={decor.affiche}
        legende={`${PROJETS.length} ${decor.projets}`}
        className="right-[3%] top-[24%] hidden xl:block"
      />

      <div className="relative">
        <RevealTitle
          text={t.projects.title}
          highlight={t.projects.titleHighlight}
          className="mb-4 text-center text-4xl font-semibold text-white md:text-5xl"
        />
        <RevealGroup>
          <RevealItem as="p" className="mx-auto mb-16 max-w-xl text-center text-lg text-white/60">
            {t.projects.hint}
          </RevealItem>
        </RevealGroup>

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-14 md:gap-20">
          <Etagere indices={ETAGERES[0]} t={t} onOuvrir={setOuvert} plante="droite" />
          <div className="flex w-full flex-col items-center gap-14 md:flex-row md:items-end md:justify-between md:gap-10">
            <Etagere indices={ETAGERES[1]} t={t} onOuvrir={setOuvert} plante="gauche" />
            <Etagere indices={ETAGERES[2]} t={t} onOuvrir={setOuvert} />
          </div>
        </div>

        <BasDeLaPiece texteBandeau={decor.bandeau} />
      </div>

      <Lecture index={ouvert} setIndex={setOuvert} t={t} />
    </section>
  );
}
