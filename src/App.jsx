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
import ProjetPhare from "./components/ProjetPhare";

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
      {/* Le hero n'a ni entrée ni sortie : il est déjà à l'écran à l'ouverture
          et son zoom au défilement tient lieu de sortie. Le
          footer n'a ni entrée ni sortie : en bas de page, son haut ne monte
          jamais jusqu'au point où l'entrée se termine, il restait figé à
          mi-animation (à moitié transparent) et tremblait à chaque rebond de
          fin de défilement. */}
      <SectionTransition enter={false} exit={false}><Hero /></SectionTransition>
      <Marquee />
      <SectionTransition><About /></SectionTransition>
      <SectionTransition><Skills /></SectionTransition>
      <ProjetPhare />
      <SectionTransition><Projects /></SectionTransition>
      <Suspense fallback={null}>
        <SectionTransition motion="fade"><Certifications /></SectionTransition>
        <SectionTransition><Services /></SectionTransition>
        <SectionTransition><NewContact /></SectionTransition>
      </Suspense>
      <SectionTransition enter={false} exit={false}><Footer /></SectionTransition>
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;
