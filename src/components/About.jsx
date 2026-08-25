import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import portraitImg from "../assets/images/png/kader-portrait-2026.webp";

import { useLang } from "../context/LanguageContext";

// Seul composant du premier écran à dépendre de GSAP. Importé statiquement, il
// tirait gsap et ScrollTrigger (116 Ko) dans le bundle d'entrée pour un effet
// purement décoratif, situé sous la ligne de flottaison. Le texte reste affiché
// pendant le chargement, l'effet ne fait que s'y substituer.
const ScrollReveal = lazy(() => import("./ScrollReveal"));

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function About() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const { t } = useLang();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end center"],
  });

  // Desktop spring config
  const desktopSpring = { stiffness: 40, damping: 18, mass: 0.8 };
  const imageX = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 0]), desktopSpring);
  const imageOp = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), desktopSpring);
  const textX = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), desktopSpring);
  const textOp = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), desktopSpring);

  // Mobile spring config — stiffer pour coller au scroll sans lag
  const mobileSpring = { stiffness: 80, damping: 24, mass: 0.5 };
  const imageY = useSpring(useTransform(scrollYProgress, [0, 0.6], [40, 0]), mobileSpring);
  const imageOpM = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), mobileSpring);
  const textY = useSpring(useTransform(scrollYProgress, [0.1, 0.7], [40, 0]), mobileSpring);
  const textOpM = useSpring(useTransform(scrollYProgress, [0.1, 0.6], [0, 1]), mobileSpring);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      ref={sectionRef}
      id="a-propos"
      // `relative` est requis par le useScroll ci-dessus : sur un conteneur en
      // position statique, framer-motion ne peut pas calculer l'offset de
      // défilement et avertit en console.
      className="relative min-h-screen bg-black text-white px-6 md:px-20 py-20 flex items-center scroll-mt-24"
    >
      <div className="overflow-hidden w-full">
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* ── IMAGE ── */}
          {isMobile ? (
            <motion.div
              style={{ y: imageY, opacity: imageOpM, willChange: "transform" }}
              className="flex justify-center"
            >
              <ImageContent />
            </motion.div>
          ) : (
            <motion.div
              style={{ x: imageX, opacity: imageOp, willChange: "transform" }}
              className="flex justify-center"
            >
              <ImageContent />
            </motion.div>
          )}

          {/* ── TEXTE ── */}
          {isMobile ? (
            <motion.div
              style={{ y: textY, opacity: textOpM, willChange: "transform" }}
              className="max-w-xl"
            >
              <TextContent t={t} />
            </motion.div>
          ) : (
            <motion.div
              style={{ x: textX, opacity: textOp, willChange: "transform" }}
              className="max-w-xl"
            >
              <TextContent t={t} />
            </motion.div>
          )}

        </div>
      </div>
    </motion.section>
  );
}

function ImageContent() {
  return (
    <div className="relative group">
      <img
        src={portraitImg}
        alt="Kebe Abdoul Kader"
        width={576}
        height={576}
        decoding="async"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-2xl"
      />
      <div className="absolute inset-0 rounded-2xl bg-accent opacity-10 blur-2xl group-hover:opacity-20 transition duration-500" />
    </div>
  );
}

function TextContent({ t }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
        <span className="text-accent">{t.about.title}</span> {t.about.titleSuffix}
      </h2>
      {/* Le fallback porte le même texte et les mêmes classes que l'effet :
          le paragraphe est lisible immédiatement et ne bouge pas quand
          ScrollReveal prend le relais. */}
      <Suspense
        fallback={
          <p className="text-base sm:text-lg text-white/70 leading-relaxed whitespace-pre-wrap">
            {t.about.text}
          </p>
        }
      >
        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={0}
          blurStrength={4}
          className="text-base sm:text-lg text-white/70 leading-relaxed whitespace-pre-wrap"
        >
          {t.about.text}
        </ScrollReveal>
      </Suspense>
    </div>
  );
}