import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

// Lazy-load heavy components (3D model, video, large images)
const NewContact = lazy(() => import("./components/NewContact"));
const CVSection = lazy(() => import("./components/CVSection"));
const Certifications = lazy(() => import("./components/Certifications"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for both a minimum time AND the window to fully load
    let ready = false;
    let timerDone = false;

    const finish = () => {
      if (ready && timerDone) setLoading(false);
    };

    const timer = setTimeout(() => {
      timerDone = true;
      finish();
    }, 500);

    const onLoad = () => {
      ready = true;
      finish();
    };

    if (document.readyState === "complete") {
      ready = true;
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnimatePresence>
          {loading && <LoadingScreen key="loading" />}
        </AnimatePresence>
        <ScrollProgress />
        <Navbar />
        <Hero loading={loading} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Suspense fallback={null}>
          <Certifications />
          <NewContact />
          <CVSection />
        </Suspense>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;