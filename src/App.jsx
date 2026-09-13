import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import SectionTransition from "./components/SectionTransition";

// Lazy-load heavy components (3D model, video, large images)
const NewContact = lazy(() => import("./components/NewContact"));
const Certifications = lazy(() => import("./components/Certifications"));
const Services = lazy(() => import("./components/Services"));

// L'écran de chargement a été retiré : il masquait la page au moins 500 ms
// après un écran noir d'environ 1,5 s, et repoussait donc le LCP à 2,4 s.
// Le titre du hero est maintenant peint en HTML statique depuis index.html,
// avant même le démarrage de React, et ce composant le remplace en place.
function App() {
  return (
    <LanguageProvider>
      {/* `reducedMotion="user"` coupe les déplacements de toutes les animations
          framer-motion quand le visiteur a demandé moins de mouvement dans son
          système, en gardant les fondus. GSAP et WebGL le gèrent déjà de leur
          côté. */}
      <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar />
      {/* Le hero n'a pas d'entrée, il est déjà à l'écran à l'ouverture. Le
          footer n'a pas de sortie, rien ne vient après lui. */}
      <SectionTransition enter={false}><Hero /></SectionTransition>
      <Marquee />
      <SectionTransition><About /></SectionTransition>
      <SectionTransition><Skills /></SectionTransition>
      <SectionTransition><Projects /></SectionTransition>
      <Suspense fallback={null}>
        <SectionTransition motion="fade"><Certifications /></SectionTransition>
        <SectionTransition><Services /></SectionTransition>
        <SectionTransition><NewContact /></SectionTransition>
      </Suspense>
      <SectionTransition exit={false}><Footer /></SectionTransition>
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;
