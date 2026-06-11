import { createContext, useContext, useState } from "react";

const translations = {
  fr: {
    // Navbar
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      certifications: "Certifications",
      video: "Vidéo",
      contact: "Contact",
      footer: "Footer",
      follow: "Suivez-moi",
    },
    // Hero
    hero: {
      role: "Développeur Full Stack",
    },
    // About
    about: {
      title: "À propos",
      titleSuffix: "de moi",
      text: "Étudiant en MIAGE et développeur chez Viso-Studio, je conçois des applications web modernes, performantes et utiles. Mon apprentissage va bien au-delà des cours : je perfectionne ma technique à travers des projets concrets, une pratique quotidienne et l'expérimentation de nouveaux outils.\n\nPassionné par le partage de connaissances, je suis également Président du Club des Développeurs de mon université, où je m’engage à promouvoir la technologie et à animer des ateliers d'échange autour du développement.",
    },
    // Skills
    skills: {
      title: "Ma",
      titleHighlight: "Stack",
      subtitle: "Mes Outils Tech les plus Utilisés",
    },
    // Projects
    projects: {
      title: "Mes",
      titleHighlight: "Projets",
      description1: "Découvrez mes",
      description1Highlight: "projets réalisés",
      description1End: "avec passion et rigueur.",
      description2: "Chaque application reflète mon expertise en",
      description2Highlight: "Full Stack Development",
      description3: "combinant performance, design et innovation.",
      hint: "Cliquez sur les images pour en savoir plus.",
      p1: "Site de burger",
      p2: "Site d'apprentissage d'algorithme",
      p3: "Générateur de citation",
      p4: "application web de question reponse",
      p5: "Système de gestion d'engrais",
    },
    // Certifications
    certifications: {
      title: "Mes",
      titleHighlight: "Certifications",
    },
    // Contact
    contact: {
      question: "Avez-vous un",
      questionHighlight: "projet\u00a0?",
      cta: "Discutons-en",
    },
    // Video
    video: {
      title: "ma",
      titleHighlight: "Présentation",
    },
    // Footer
    footer: {
      rights: "Tous droits réservés.",
    },
  },
  en: {
    // Navbar
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certifications",
      video: "Video",
      contact: "Contact",
      footer: "Footer",
      follow: "Follow me",
    },
    // Hero
    hero: {
      role: "Full Stack Developer",
    },
    // About
    about: {
      title: "About",
      titleSuffix: "me",
      text: "A MIAGE student and developer at Viso-Studio, I design modern, performant, and useful web applications. My learning goes far beyond coursework: I hone my skills through concrete projects, daily practice, and experimenting with new tools.\n\nPassionate about sharing knowledge, I am also President of the Developers Club at my university, where I am committed to promoting technology and hosting workshops around software development.",
    },
    // Skills
    skills: {
      title: "My",
      titleHighlight: "Stack",
      subtitle: "My Most Used Tech Tools",
    },
    // Projects
    projects: {
      title: "My",
      titleHighlight: "Projects",
      description1: "Discover my",
      description1Highlight: "completed projects",
      description1End: "built with passion and rigor.",
      description2: "Each application reflects my expertise in",
      description2Highlight: "Full Stack Development",
      description3: "combining performance, design and innovation.",
      hint: "Click on the images to learn more.",
      p1: "Burger website",
      p2: "Algorithm learning website",
      p3: "Quote generator",
      p4: "Web Q&A application",
      p5: "Fertilizer management system",
    },
    // Certifications
    certifications: {
      title: "My",
      titleHighlight: "Certifications",
    },
    // Contact
    contact: {
      question: "Do you have a",
      questionHighlight: "project\u00a0?",
      cta: "Let's talk",
    },
    // Video
    video: {
      title: "Get to Know",
      titleHighlight: "Me",
    },
    // Footer
    footer: {
      rights: "All rights reserved.",
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");

  const t = translations[lang];
  const toggleLang = () => setLang((l) => (l === "fr" ? "en" : "fr"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
