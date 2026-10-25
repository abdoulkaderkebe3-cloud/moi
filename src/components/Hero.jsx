import { lazy, Suspense, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import ShinyText from './ShinyText';
import { useLang } from "../context/LanguageContext";
import { EASE, DUREE } from "../utils/motion";

// Lazy-load LightRays: keeps the WebGL engine (ogl) out of the critical
// bundle so the hero text paints before the background effect streams in.
const LightRays = lazy(() => import('./LightRays'));

// L'intro d'index.html (le rideau poussé) couvre le hero pendant ~3 s. Tant
// qu'elle joue, l'entrée du hero attend : jouée dessous, personne ne la voyait.
// Sans intro (moins d'animations demandé, ou déjà terminée), l'entrée part
// tout de suite.
function introEnCours() {
  return document.documentElement.classList.contains("intro-joue");
}

// La classe `intro-joue` est l'état externe, l'événement `intro-fin` son
// signal de changement : c'est le cas d'usage de useSyncExternalStore.
function abonnerIntro(rappel) {
  window.addEventListener("intro-fin", rappel);
  return () => window.removeEventListener("intro-fin", rappel);
}

function useIntroFinie() {
  return useSyncExternalStore(abonnerIntro, () => !introEnCours());
}

export default function Hero() {
  const { t } = useLang();
  const introFinie = useIntroFinie();

  return (
    // Zoom au défilement (façon motion.dev « scroll zoom hero ») : la section
    // fait 160vh là où les timelines de défilement sont prises en charge, son
    // contenu reste collé en haut pendant que les rayons grossissent et
    // s'estompent, et que le nom monte en s'effaçant. Tout est joué en CSS
    // (`.hero-zoom*` dans index.css), sans JS par image. Sans prise en charge,
    // avec `prefers-reduced-motion` ou sur écran tactile, le hero garde sa
    // hauteur d'écran.
    <section
      id="accueil"
      className="hero-zoom relative w-full bg-black text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-clip">
      <div className="hero-zoom-fond absolute inset-0">
      {/* Les rayons s'allument quand le rideau se lève, au lieu d'être déjà là. */}
      <div
        className={`absolute inset-0 transition-opacity ease-out-expo duration-[1200ms] ${introFinie ? "opacity-100" : "opacity-0"}`}
      >
      <Suspense fallback={null}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.7}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.10}
          className="absolute inset-0 w-full h-full"
        />
      </Suspense>
      </div>
      </div>

      {/* Ce bloc prend la place du squelette statique d'index.html, au même
          endroit et à la même taille : la bascule ne doit pas se voir. */}
      <div className="hero-zoom-contenu absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          {/* Seul h1 du site : c'est le nom que les moteurs doivent associer à la page. */}
          <ShinyText
            as="h1"
            text="Kebe Abdoul Kader"
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={introFinie ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: DUREE.lente, ease: EASE, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/50 tracking-widest text-center px-4"
          >
            {t.hero.role}
          </motion.p>
      </div>
      </div>
    </section>
  );
}

  

