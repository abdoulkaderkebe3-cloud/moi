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
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      backToTop: "Revenir en haut de la page",
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
        docker: "Conteneurs pour lancer une base ou une application à l'identique partout. Utilisé pour déployer Oracle 21c.",
        css: "Langage de style permettant de concevoir la mise en page, l'esthétique et les animations d'un site.",
        javascript: "Le langage de programmation incontournable du web pour rendre les pages dynamiques et interactives.",
        springboot: "Framework Java de référence pour bâtir des APIs REST et microservices robustes rapidement.",
        angular: "Framework complet de Google pour créer des applications d'entreprise structurées et évolutives.",
        framer: "Bibliothèque d'animation puissante pour créer des transitions fluides et des micro-interactions sur React.",
        postgres: "Base de données relationnelle open-source réputée pour sa robustesse et sa gestion de données complexes.",
        uml: "Langage de modélisation graphique pour concevoir la structure et le comportement des applications.",
        oracle: "Administration d'une base Oracle 21c sous SQL Developer : tablespaces, utilisateurs, rôles, privilèges et quotas."
      }
    },
    // Projects
    projects: {
      title: "Mes",
      titleHighlight: "Projets",
      hint: "Cliquez sur un livre pour lire son résumé.",
      p1: "Site de burger",
      p2: "Site d'apprentissage d'algorithme",
      p4: "Application web de questions-réponses",
      // Projet phare (ProjetPhare.jsx) : capture de viso-studio.com.
      featured: {
        label: "Projet phare",
        name: "Viso Studio",
        subtitle: "Responsable du développement front-end",
        description:
          "Le site de l'agence Viso Studio, en production sur son propre " +
          "domaine. Identité dessinée à la main, thème clair et sombre, " +
          "animations au défilement, et un rendu pensé pour le téléphone " +
          "avant l'écran large.",
        cta: "Voir le site",
        hint: "Faites défiler",
        alt: "Page d'accueil du site de Viso Studio, titre « L'Impact par le design » et boutons d'appel à l'action.",
        facts: ["Responsable front-end", "Site en production", "Thème clair et sombre"],
      },
      p6: "Site de billetterie",
      p7: "Site vitrine Viso Studio",
      p8: "Invitation de mariage en ligne",
      p9: "API bancaire",
      p10: "Plateforme de ma formation",
      stackLabel: "Stack",
      linkLabel: "Lien",
      cta: "Voir le projet",
      prev: "Projet précédent",
      next: "Projet suivant",
      open: "Ouvrir le résumé de",
      close: "Fermer",
      // Résumés au dos des livres de la bibliothèque (Projects.jsx).
      summaries: {
        p1: "Site vitrine d'un restaurant de burgers, en ligne. Il sert aussi de projet fil rouge à ma formation Vibe Coding Académie.",
        p6: "La billetterie en ligne de TransCampus, en production sur son propre domaine, avec un tableau de bord d'administration.",
        p9: "Le backend d'une application bancaire façon mobile money : Spring Boot, JPA et PostgreSQL, sécurité par jeton JWT, découpé en couches.",
        p7: "Le site de l'agence Viso Studio, en production. J'y suis responsable du développement front-end.",
        p10: "Le site de ma formation en développement web, en production : présentation, réservation d'une place et paiement en ligne par GeniusPay, avec Supabase derrière.",
        p8: "Une invitation de mariage en ligne : programme, lieux et horaires de la journée. Démo anonymisée du site livré au client.",
        p4: "Une application web de questions-réponses, avec un front React et une API NestJS.",
        p2: "Un site pour apprendre les algorithmes, écrit en HTML, CSS et JavaScript avec Bootstrap.",
      },
    },
    // Certifications
    certifications: {
      title: "Mes",
      titleHighlight: "Certifications",
      verify: "Vérifier le badge",
    },
    // Services
    services: {
      title: "Mes",
      titleHighlight: "Services",
      intro:
        "Un site, une application ou une équipe à faire monter en compétence : je prends le projet de l'idée à la mise en ligne, seul ou avec vos équipes.",
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
      openMenu: "Open menu",
      closeMenu: "Close menu",
      backToTop: "Back to top of page",
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
        docker: "Containers to run a database or an app identically anywhere. Used to deploy Oracle 21c.",
        css: "Style sheet language used to format, design, and animate web interfaces.",
        javascript: "Core programming language of the web for making interactive and dynamic pages.",
        springboot: "Reference Java framework to quickly build robust REST APIs and microservices.",
        angular: "Comprehensive Google framework for building structured, scalable web apps.",
        framer: "Powerful animation library for clean transitions and micro-interactions in React.",
        postgres: "Open-source relational database known for robustness and complex data handling.",
        uml: "Graphical modeling language to plan application structure and behaviors.",
        oracle: "Oracle 21c administration with SQL Developer: tablespaces, users, roles, privileges and quotas."
      }
    },
    // Projects
    projects: {
      title: "My",
      titleHighlight: "Projects",
      hint: "Click a book to read its summary.",
      p1: "Burger website",
      p2: "Algorithm learning website",
      p4: "Web Q&A application",
      // Featured project (ProjetPhare.jsx): screenshot of viso-studio.com.
      featured: {
        label: "Featured project",
        name: "Viso Studio",
        subtitle: "Front-end development lead",
        description:
          "The website of the Viso Studio agency, live on its own domain. " +
          "Hand-drawn identity, light and dark themes, scroll-driven " +
          "animations, and a layout designed for the phone before the wide " +
          "screen.",
        cta: "Visit the site",
        hint: "Scroll",
        alt: "Home page of the Viso Studio website, with the headline \"L'Impact par le design\" and its call-to-action buttons.",
        facts: ["Front-end lead", "Live in production", "Light and dark themes"],
      },
      p6: "Ticketing website",
      p7: "Viso Studio showcase website",
      p8: "Online wedding invitation",
      p9: "Banking API",
      p10: "My training platform",
      stackLabel: "Stack",
      linkLabel: "Link",
      cta: "View project",
      prev: "Previous project",
      next: "Next project",
      open: "Open the summary of",
      close: "Close",
      summaries: {
        p1: "A showcase website for a burger restaurant, live. It is also the running project of my Vibe Coding Académie course.",
        p6: "The online ticketing of TransCampus, live on its own domain, with an admin dashboard.",
        p9: "The backend of a mobile-money style banking app: Spring Boot, JPA and PostgreSQL, JWT security, layered architecture.",
        p7: "The website of the Viso Studio agency, live. I lead its front-end development.",
        p10: "The website of my web development course, live: course page, seat booking and online payment with GeniusPay, backed by Supabase.",
        p8: "An online wedding invitation: schedule, venues and times of the day. Anonymized demo of the site delivered to the client.",
        p4: "A web Q&A application, with a React front end and a NestJS API.",
        p2: "A website to learn algorithms, written in HTML, CSS and JavaScript with Bootstrap.",
      },
    },
    // Certifications
    certifications: {
      title: "My",
      titleHighlight: "Certifications",
      verify: "Verify the badge",
    },
    // Services
    services: {
      title: "My",
      titleHighlight: "Services",
      intro:
        "A website, an app, or a team to upskill: I take the project from idea to launch, on my own or alongside your team.",
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
