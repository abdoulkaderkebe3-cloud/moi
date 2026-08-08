import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ShinyText from './ShinyText';
import { useLang } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

// Lazy-load LightRays: keeps the WebGL engine (ogl) out of the critical
// bundle so the hero text paints before the background effect streams in.
const LightRays = lazy(() => import('./LightRays'));

export default function Hero({ loading }) {
  const { t } = useLang();
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const isDark = theme === "dark";

  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.6,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="accueil"
      className="relative h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white overflow-hidden"
    >
      <Suspense fallback={null}>
        <LightRays
          raysOrigin="top-center"
          raysColor={isDark ? "#ffffff" : "#6366f1"}
          raysSpeed={1}
          lightSpread={0.7}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.10}
          className={`absolute inset-0 w-full h-full ${isDark ? "" : "opacity-30"}`}
        />
      </Suspense>

      {!loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <ShinyText
            text="Kebe Abdoul Kader"
            speed={3}
            delay={0.5}
            color={isDark ? "#b5b5b5" : "#1e293b"}
            shineColor={isDark ? "#ffffff" : "#6366f1"}
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
            className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-gray-400 tracking-widest text-center px-4"
          >
            {t.hero.role}
          </motion.p>
        </div>
      )}
    </section>
  );
}

  

