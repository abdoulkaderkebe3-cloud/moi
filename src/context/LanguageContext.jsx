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
      cv: "CV",
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
      placeholder: "⌨️ Survolez ou cliquez sur une touche du clavier...",
      levels: {
        expert: "Expert ★★★★★",
        advanced: "Avancé ★★★★☆",
        intermediate: "Intermédiaire ★★★☆☆",
      },
      descriptions: {
        figma: "Outil de design collaboratif pour concevoir des interfaces modernes et prototypes.",
        java: "Langage orienté objet robuste, utilisé pour le développement backend d'applications d'entreprise.",
        tailwind: "Framework CSS utility-first permettant de concevoir rapidement des interfaces élégantes et responsives.",
        react: "Bibliothèque UI moderne pour concevoir des composants d'interface réactifs et performants.",
        typescript: "Surcouche typée à JavaScript améliorant la fiabilité du code et la productivité en équipe.",
        github: "Plateforme cloud de gestion de code source et de collaboration basée sur Git.",
        git: "Système de contrôle de version décentralisé indispensable pour suivre l'évolution du code.",
        html: "Langage de balisage sémantique de base pour structurer le contenu du web.",
        css: "Langage de style permettant de concevoir la mise en page, l'esthétique et les animations d'un site.",
        javascript: "Le langage de programmation incontournable du web pour rendre les pages dynamiques et interactives.",
        springboot: "Framework Java de référence pour bâtir des APIs REST et microservices robustes rapidement.",
        angular: "Framework complet de Google pour créer des applications d'entreprise structurées et évolutives.",
        framer: "Bibliothèque d'animation puissante pour créer des transitions fluides et des micro-interactions sur React.",
        postgres: "Base de données relationnelle open-source réputée pour sa robustesse et sa gestion de données complexes.",
        uml: "Langage de modélisation graphique pour concevoir la structure et le comportement des applications.",
        dbeaver: "Client de gestion de bases de données universel, idéal pour administrer de nombreuses technologies SQL."
      }
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
    // CV
    cv: {
      title: "Mon",
      titleHighlight: "Curriculum Vitae",
      description: "Consultez mon parcours détaillé, mes compétences et mes expériences en téléchargeant mon CV.",
      button: "Télécharger mon CV",
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
      cv: "CV",
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
      placeholder: "⌨️ Hover or click a key on the keyboard...",
      levels: {
        expert: "Expert ★★★★★",
        advanced: "Advanced ★★★★☆",
        intermediate: "Intermediate ★★★☆☆",
      },
      descriptions: {
        figma: "Collaborative design tool for crafting modern interfaces and prototypes.",
        java: "Robust object-oriented language used for enterprise backend development.",
        tailwind: "Utility-first CSS framework for building fast, responsive, and elegant layouts.",
        react: "Modern UI library for creating reactive and high-performance user interfaces.",
        typescript: "Typed superset of JavaScript enhancing code reliability and team productivity.",
        github: "Cloud platform for source code management and collaborative Git workflows.",
        git: "Decentralized version control system essential for tracking code evolution.",
        html: "Semantic markup language structuring the foundation of web pages.",
        css: "Style sheet language used to format, design, and animate web interfaces.",
        javascript: "Core programming language of the web for making interactive and dynamic pages.",
        springboot: "Reference Java framework to quickly build robust REST APIs and microservices.",
        angular: "Comprehensive Google framework for building structured, scalable web apps.",
        framer: "Powerful animation library for clean transitions and micro-interactions in React.",
        postgres: "Open-source relational database known for robustness and complex data handling.",
        uml: "Graphical modeling language to plan application structure and behaviors.",
        dbeaver: "Universal database administration tool, ideal for managing SQL technologies."
      }
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
    // CV
    cv: {
      title: "My",
      titleHighlight: "Resume",
      description: "Check out my detailed background, skills, and professional experiences by downloading my resume.",
      button: "Download Resume",
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
