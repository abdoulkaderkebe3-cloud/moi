import { motion } from "framer-motion";

import ScrollReveal from './ScrollReveal';


export default function About() {
  return (
    <section id="à propos" className="min-h-screen bg-slate-900   text-white p-20">
      <h1 className="text-3xl text-center ">À propos</h1>
    <ScrollReveal
        baseOpacity={0.1}
        enableBlur
        baseRotation={3}
       blurStrength={4}
    >
        Bonjour, je suis Kader, développeur Full Stack passionné par le web et les nouvelles technologies.
Avec une expertise en React, Angular et Spring Boot, je crée des applications modernes, performantes et esthétiques.
J’aime transformer des idées en projets concrets, en alliant design, ergonomie et performance.
Ce portfolio présente mes projets, certifications et compétences, et reflète ma volonté d’apprendre et d’innover chaque jour.
Si vous souhaitez collaborer ou simplement échanger sur la tech, n’hésitez pas à me contacter !
    </ScrollReveal>
    </section>
  );
}