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
      text: "Étudiant en MIAGE, mais surtout développeur par passion. Je ne me limite pas aux cours : je code, je pratique et je construis des projets concrets pour progresser chaque jour. J'aime comprendre en profondeur ce que je fais et créer des solutions qui répondent à de vrais besoins. Pour moi, les compétences ne viennent pas d'un diplôme, mais de l'expérience et du travail régulier. Je suis constamment en train d'apprendre, d'expérimenter et de m'améliorer, avec l'objectif de devenir un développeur complet capable de concevoir des applications utiles, propres et performantes.",
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
      title: "Ma",
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
      text: "A MIAGE student, but above all a developer by passion. I don't limit myself to coursework: I code, I practice, and I build concrete projects to grow every day. I love deeply understanding what I do and creating solutions that address real needs. For me, skills come not from a diploma, but from experience and consistent work. I'm constantly learning, experimenting, and improving, with the goal of becoming a well-rounded developer capable of building useful, clean, and performant applications.",
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
      title: "My",
      titleHighlight: "Presentation",
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
