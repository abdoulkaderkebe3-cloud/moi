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
      services: "Services",
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
      text: "Je code en binôme avec des agents IA. Ils écrivent vite, je garde la main sur l'architecture et sur ce qui part en production. Étudiant en MIAGE et responsable du développement front-end chez Viso-Studio, je construis des applications web en Java/Spring Boot et React.\n\nCette approche m'a valu la 2e place au Vibeathon Côte d'Ivoire 2026 avec EcoWatt, un système de prises intelligentes qui réduit la facture d'électricité, dont j'étais lead technique.\n\nJe suis aussi Président du Club des Développeurs de mon université, où j'anime des ateliers autour du développement.",
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
      p4: "application web de question reponse",
      p5: "Système de gestion d'engrais",
      p6: "Site de billetterie",
      p7: "Site vitrine Viso Studio",
    },
    // Certifications
    certifications: {
      title: "Mes",
      titleHighlight: "Certifications",
    },
    // Services
    services: {
      title: "Mes",
      titleHighlight: "Services",
      intro:
        "Je travaille en freelance et je reste ouvert aux stages. Voici ce sur quoi je peux intervenir, seul ou dans votre équipe.",
      cta: "Parlons de votre projet",
      items: {
        training: {
          title: "Formation en développement web",
          text: "Ateliers en groupe ou accompagnement individuel, des bases HTML, CSS et JavaScript jusqu'à React et Spring Boot. J'anime déjà ces sessions au Club des Développeurs de mon université.",
        },
        apps: {
          title: "Applications web sur mesure",
          text: "De la base de données à l'interface : modèle PostgreSQL, API REST en Java et Spring Boot, front en React ou Angular. Un seul interlocuteur sur toute la chaîne.",
        },
        interfaces: {
          title: "Sites vitrines et interfaces",
          text: "Des interfaces pensées pour le mobile d'abord, sobres et rapides. Maquette, intégration, mise en ligne et suivi. Ce site en est un exemple.",
        },
        ai: {
          title: "Développement assisté par IA",
          text: "J'orchestre des agents IA pour livrer plus vite, en gardant la main sur l'architecture et sur ce qui part en production. C'est cette méthode qui m'a valu la 2e place au Vibeathon 2026.",
        },
      },
    },
    // Contact
    contact: {
      question: "Un bon site ne coûte pas. Il rapporte",
      questionHighlight: "de quoi s'offrir cette voiture.",
      cta: "Discutons-en",
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
      services: "Services",
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
      text: "I code side by side with AI agents. They write fast, I keep control of the architecture and of what ships to production. A MIAGE student and front-end development lead at Viso-Studio, I build web applications with Java/Spring Boot and React.\n\nThis approach earned me 2nd place at Vibeathon Côte d'Ivoire 2026 with EcoWatt, a smart plug system that cuts electricity bills, where I was the technical lead.\n\nI am also President of the Developers Club at my university, where I host workshops around software development.",
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
      p4: "Web Q&A application",
      p5: "Fertilizer management system",
      p6: "Ticketing website",
      p7: "Viso Studio showcase website",
    },
    // Certifications
    certifications: {
      title: "My",
      titleHighlight: "Certifications",
    },
    // Services
    services: {
      title: "My",
      titleHighlight: "Services",
      intro:
        "I work as a freelancer and I am open to internships. Here is what I can take on, on my own or inside your team.",
      cta: "Let's talk about your project",
      items: {
        training: {
          title: "Web development training",
          text: "Group workshops or one-on-one coaching, from HTML, CSS and JavaScript basics up to React and Spring Boot. I already run these sessions at my university Developers Club.",
        },
        apps: {
          title: "Custom web applications",
          text: "From the database to the interface: PostgreSQL data model, REST API in Java and Spring Boot, front end in React or Angular. One person across the whole chain.",
        },
        interfaces: {
          title: "Showcase sites and interfaces",
          text: "Interfaces designed for mobile first, clean and fast. Mockup, integration, deployment and follow-up. This very site is an example.",
        },
        ai: {
          title: "AI-assisted development",
          text: "I orchestrate AI agents to ship faster, while keeping control of the architecture and of what goes to production. This method earned me 2nd place at Vibeathon 2026.",
        },
      },
    },
    // Contact
    contact: {
      question: "A good site is not a cost. It earns you",
      questionHighlight: "enough for that car.",
      cta: "Let's talk",
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
