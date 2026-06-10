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
      text: "Étudiant en MIAGE et développeur passionné, je ne me limite pas aux cours : je code, je pratique et je réalise des projets concrets afin de progresser continuellement. J'aime concevoir des solutions utiles, modernes et performantes tout en approfondissant mes compétences techniques à travers l'apprentissage et l'expérimentation.\n\nJe suis également Président du Club des Développeurs de mon université, où je participe à la promotion de la technologie, au partage de connaissances et à l'organisation d'activités autour du développement et de l'innovation.",
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
      text: "Student in MIAGE and passionate developer, I don't limit myself to coursework: I code, I practice, and I build concrete projects to progress continuously. I love designing useful, modern, and performant solutions while deepening my technical skills through learning and experimentation.\n\nI am also President of my university's Developer Club, where I participate in promoting technology, sharing knowledge, and organizing activities around development and innovation.",
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
