import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import ShinyText from './ShinyText';
import { useLang } from "../context/LanguageContext";

// Lazy-load LightRays: keeps the WebGL engine (ogl) out of the critical
// bundle so the hero text paints before the background effect streams in.
const LightRays = lazy(() => import('./LightRays'));

export default function Hero() {
  const { t } = useLang();

  return (
    // Zoom au défilement (façon motion.dev « scroll zoom hero ») : la section
    // fait 160vh là où les timelines de défilement sont prises en charge, son
    // contenu reste collé en haut pendant que les rayons grossissent, se
    // floutent et s'estompent, et que le nom recule. Tout est joué en CSS
    // (`.hero-zoom*` dans index.css), sans JS par image. Sans prise en charge
    // ou avec `prefers-reduced-motion`, le hero garde sa hauteur d'écran.
    <section
      id="accueil"
      className="hero-zoom relative w-full bg-black text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-clip">
      <div className="hero-zoom-fond absolute inset-0">
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

      {/* Ce bloc prend la place du squelette statique d'index.html, au même
          endroit et à la même taille : la bascule ne doit pas se voir. */}
      <div className="hero-zoom-contenu absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <ShinyText
            text="Kebe Abdoul Kader"
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              damping: 15,
              stiffness: 90,
              delay: 0.6
            }}
            className="text-base sm:text-lg md:text-xl text-white/50 tracking-widest text-center px-4"
          >
            {t.hero.role}
          </motion.p>
      </div>
      </div>
    </section>
  );
}

  

