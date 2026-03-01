import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import About from "./components/About";
import Certifications from "./components/Certifications";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import VideoSection from "./components/VideoSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollProgress/>
      <Navbar/>
      <Hero/>
      <About/>
      <Certifications/>
      <Skills/>
      <Projects/>
      <Contact/>
      <VideoSection/>
      <Footer/>
    </>
  );
}

export default App;