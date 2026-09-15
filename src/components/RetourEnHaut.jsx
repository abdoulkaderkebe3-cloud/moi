import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLang } from "../context/LanguageContext";

// Seuil d'apparition : un écran complet. Plus bas, le bouton s'afficherait
// alors que le haut de page est encore à portée de pouce et ne servirait à
// rien ; plus haut, il arriverait trop tard sur une page aussi longue.
const SEUIL_ECRANS = 1;

// Bouton de retour en haut, en bas à droite.
//
// z-30 et non z-40 : le voile du tiroir mobile est à z-40, le bouton doit
// passer dessous quand le menu est ouvert, sinon il flotte par-dessus.
//
// Il n'est ni rendu ni atteignable au clavier tant qu'il est masqué
// (`hidden`), pour ne pas ajouter une tabulation dans le vide en haut de page.
export default function RetourEnHaut() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * SEUIL_ECRANS);
    };
    // Lecture groupée dans une image d'animation : le reste de la page suit
    // déjà cette règle, un `setState` par événement de défilement ferait
    // rendre le composant des dizaines de fois par seconde.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const remonter = () => {
    // `scroll-behavior: smooth` est posé sur <html> et s'appliquerait même à
    // qui demande moins de mouvement : on tranche ici, explicitement.
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduit ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={remonter}
      hidden={!visible}
      aria-label={t.nav.backToTop}
      className={`fixed bottom-5 right-5 z-30 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-black/70 text-white shadow-lg backdrop-blur-md transition-[opacity,transform,background-color,color] duration-200 ease-out hover:bg-accent hover:text-black active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:bottom-8 md:right-8 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
