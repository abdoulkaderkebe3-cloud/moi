import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import RetourEnHaut from "./components/RetourEnHaut";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjetPhare from "./components/ProjetPhare";
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
      <RetourEnHaut />
      {/* Tout le contenu de la page glisse par-dessus le footer, qui est collé
          au bas de la fenêtre et se découvre sur les derniers pixels de
          défilement. Ce bloc porte le fond opaque qui masque le footer pendant
          tout le reste du parcours, et le calque qui le garde devant lui.
          Les éléments fixes (barre de progression, navbar, retour en haut)
          restent en dehors : ils ont leurs propres calques, plus hauts. */}
      <div className="page-contenu">
        {/* Le hero n'a ni entrée ni sortie : il est déjà à l'écran à
            l'ouverture et son zoom au défilement tient lieu de sortie. */}
        <SectionTransition enter={false} exit={false}><Hero /></SectionTransition>
        <Marquee />
        <SectionTransition><About /></SectionTransition>
        <SectionTransition><Skills /></SectionTransition>
        {/* Hors de `SectionTransition` : un transform sur l'ancetre ferait
            grossir la scene collee en meme temps qu'elle s'ouvre. */}
        <ProjetPhare />
        <SectionTransition><Projects /></SectionTransition>
        <Suspense fallback={null}>
          <SectionTransition motion="fade"><Certifications /></SectionTransition>
          <SectionTransition><Services /></SectionTransition>
          <SectionTransition><NewContact /></SectionTransition>
        </Suspense>
      </div>
      {/* Frère direct de `.page-contenu`, et non enveloppé : glissé dans un
          conteneur à sa propre hauteur, son `sticky` n'aurait aucune course et
          ne ferait rien. C'est aussi ce qui remplace son ancienne entrée en
          fondu, qui restait figée à mi-chemin et tremblait à chaque rebond de
          fin de défilement : son haut ne montait jamais jusqu'au point où
          l'animation se terminait. */}
      <Footer />
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;
