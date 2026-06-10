import { motion, useScroll, useTransform } from "framer-motion";
import LightRays from './LightRays';
import ShinyText from './ShinyText';
import { useLang } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

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
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-gray-400 tracking-widest flex flex-wrap justify-center gap-x-[0.25em]"
          >
            {t.hero.role.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.p>
        </div>
      )}
    </section>
  );
}

  

