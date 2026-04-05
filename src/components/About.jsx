import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import imga from "../assets/images/png/photo_2026-03-01_12-30-58.jpg";

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

  // Scroll-driven values (utilisés uniquement sur desktop)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end center"],
  });

  const springConfig = { stiffness: 40, damping: 18, mass: 0.8 };
  const imageX      = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 0]), springConfig);
  const imageOp     = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), springConfig);
  const textX       = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), springConfig);
  const textOp      = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), springConfig);

  return (
    <section
      ref={sectionRef}
      id="a-propos"
      className="min-h-screen bg-slate-900 text-white px-6 md:px-20 py-20 flex items-center scroll-mt-24"
    >
      <div className="overflow-hidden w-full">
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* ── IMAGE ── */}
          {isMobile ? (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
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
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
              className="max-w-xl"
            >
              <TextContent />
            </motion.div>
          ) : (
            <motion.div
              style={{ x: textX, opacity: textOp, willChange: "transform" }}
              className="max-w-xl"
            >
              <TextContent />
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}

function ImageContent() {
  return (
    <div className="relative group">
      <img
        src={imga}
        alt="Kebe Abdoul Kader"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-2xl"
      />
      <div className="absolute inset-0 rounded-2xl bg-white opacity-10 blur-2xl group-hover:opacity-20 transition duration-500" />
    </div>
  );
}

function TextContent() {
  return (
    <>
      <h2 className="text-xl md:text-2xl text-center font-semibold mb-6">
        <span className="text-violet-400">À propos</span> de moi
      </h2>
      <ScrollReveal
        baseOpacity={0.1}
        enableBlur
        baseRotation={0}
        blurStrength={4}
        className="text-base md:text-lg text-gray-300 leading-relaxed"
      >
        Étudiant en MIAGE, mais surtout développeur par passion. Je ne me limite pas aux cours :
        je code, je pratique et je construis des projets concrets pour progresser chaque jour. J'aime
        comprendre en profondeur ce que je fais et créer des solutions qui répondent à de vrais besoins.
        Pour moi, les compétences ne viennent pas d'un diplôme, mais de l'expérience et du travail régulier.
        Je suis constamment en train d'apprendre, d'expérimenter et de m'améliorer, avec l'objectif de devenir
        un développeur complet capable de concevoir des applications utiles, propres et performantes.
      </ScrollReveal>
    </>
  );
}