import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import imga from "../assets/images/png/photo_2026-03-01_12-30-58.jpg";

export default function About() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Image vient de la gauche
  const imageX = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Texte vient de la droite
  const textX = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="a-propos"
      className="min-h-screen bg-slate-900 text-white px-6 md:px-20 py-20 flex items-center overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* ── Image ── */}
        <motion.div
          style={{ x: imageX, opacity: imageOpacity }}
          className="flex justify-center"
        >
          <div className="relative group">
            <img
              src={imga}
              alt="Kebe Abdoul Kader"
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-white opacity-10 blur-2xl group-hover:opacity-20 transition duration-500" />
          </div>
        </motion.div>

        {/* ── Texte ── */}
        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className="max-w-xl"
        >
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
        </motion.div>

      </div>
    </section>
  );
}