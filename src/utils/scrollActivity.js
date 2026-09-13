// Indique si la page est en train de défiler. Les scènes WebGL (rayons du
// hero, ferrofluide, voiture) sautent leur rendu pendant un défilement et
// reprennent dès qu'il s'arrête : sur un téléphone moyen, recalculer un
// shader à chaque image pendant le scroll faisait tomber le site sous les
// 30 images par seconde dans le hero et le contact, alors qu'un décor figé
// une fraction de seconde ne se remarque pas.
//
// Un simple horodatage, lu par les boucles de rendu : aucun minuteur créé ni
// annulé à chaque événement de défilement.
const QUIET_MS = 140;
let lastScroll = -Infinity;

if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      lastScroll = performance.now();
    },
    { passive: true }
  );
}

export function isScrolling(now = performance.now()) {
  return now - lastScroll < QUIET_MS;
}
