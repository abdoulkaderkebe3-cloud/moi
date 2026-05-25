import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Certifications from "./components/Certifications";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";
import NewContact from "./components/NewContact";

function App() {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <NewContact />
      <VideoSection />
      <Footer />
    </LanguageProvider>
  );
}

export default App;