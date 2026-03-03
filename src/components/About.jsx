import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import imga from "../assets/images/png/photo_2026-03-01_12-30-58.jpg"

export default function About() {
  return (
    <section
      id="à propos"
      className="min-h-screen bg-slate-900 text-white px-6 md:px-20 py-20 flex items-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <img
              src={imga}
              alt="Kebe Abdoul Kader"
              className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-2xl"
            />
            
            
            <div className="absolute inset-0 rounded-2xl bg-white opacity-10 blur-2xl group-hover:opacity-20 transition duration-500"></div>
          </div>
        </motion.div>

       
        <motion.div
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  className="max-w-xl"
>
  
  <h2 className="text-xl md:text-2xl text-center font-semibold mb-6">
    <span className="text-violet-400">À propos</span> de moi
  </h2>

  
  <ScrollReveal
    baseOpacity={0.1}
    enableBlur
    baseRotation={3}
    blurStrength={4}
    className="text-xs md:text-sm text-gray-400 leading-relaxed"
  >
    Bonjour, je suis Kader, développeur Full Stack passionné par le web
    et les nouvelles technologies. Avec une expertise en React,
    Angular et Spring Boot, je crée des applications modernes,
    performantes et esthétiques.

    J’aime transformer des idées en projets concrets, en alliant design,
    ergonomie et performance.

    Ce portfolio reflète ma volonté d’apprendre et d’innover chaque jour.
    Si vous souhaitez collaborer, n’hésitez pas à me contacter !
  </ScrollReveal>
</motion.div>
      </div>
    </section>
  );
}