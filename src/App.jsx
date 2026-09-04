import { lazy, Suspense } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

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
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Suspense fallback={null}>
        <Certifications />
        <Services />
        <NewContact />
      </Suspense>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
