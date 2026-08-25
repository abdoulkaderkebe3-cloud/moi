import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import ShinyText from './ShinyText';
import { useLang } from "../context/LanguageContext";

// Lazy-load LightRays: keeps the WebGL engine (ogl) out of the critical
// bundle so the hero text paints before the background effect streams in.
const LightRays = lazy(() => import('./LightRays'));

export default function Hero({ loading }) {
  const { t } = useLang();

  return (
    <section
      id="accueil"
      className="relative h-screen w-full bg-black text-white overflow-hidden"
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

      {!loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <ShinyText
            text="Kebe Abdoul Kader"
            speed={3}
            delay={0.5}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={true}
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
      )}
    </section>
  );
}

  

