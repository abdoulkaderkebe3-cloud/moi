// Transition d'une section à l'autre, pilotée par le défilement : la section
// qui arrive grossit, monte et s'éclaircit, celle qui part recule et
// s'assombrit.
//
// Les animations vivent dans `index.css` (`.st-entree`, `.st-sortie`) et
// sont jouées par le navigateur via `animation-timeline: view()`. La première
// version passait par deux `useScroll` de framer-motion par section, soit
// seize mesures de position à chaque image : c'était le premier poste de
// saccade au défilement sur mobile.
//
// Deux conteneurs imbriqués : l'entrée et la sortie animent toutes deux
// l'opacité et l'échelle, elles ne peuvent pas partager un élément.
//
// `motion="fade"` retire le déplacement et l'échelle. Réservé aux sections
// mesurées par GSAP ScrollTrigger (Certifications) : un transform pendant sa
// mesure décalerait ses points de déclenchement.
export default function SectionTransition({ children, enter = true, exit = true, motion: mode = "full" }) {
  const fade = mode === "fade";
  const enterClass = enter ? (fade ? "st-entree-fondu" : "st-entree") : "";
  const exitClass = exit ? (fade ? "st-sortie-fondu" : "st-sortie") : "";

  return (
    <div className={`relative ${enterClass}`}>
      <div className={`relative ${exitClass}`}>{children}</div>
    </div>
  );
}
