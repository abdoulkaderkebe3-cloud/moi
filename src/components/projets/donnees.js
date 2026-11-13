import burgerImg from "../../assets/images/png/burger-house.webp";
import algoImg from "../../assets/images/png/site-algo.webp";
import billetterieImg from "../../assets/images/png/billetterie-preview.webp";
import visoImg from "../../assets/images/png/viso-studio.webp";
import mariageImg from "../../assets/images/png/mariage-demo.webp";
import formationImg from "../../assets/images/png/formation-kvder.webp";

// Chaque projet est un livre. Les noms et résumés vivent dans LanguageContext
// (`t.projects[key]` et `t.projects.summaries[key]`). `couleur` est la
// couverture, relevée sur le site en ligne de chaque projet (12/11) ; l'API,
// sans site, prend un bleu bancaire. `encre` est la couleur du texte posé
// dessus (contraste AA vérifié pour chaque paire, 4,7:1 minimum).
export const PROJETS = [
  { key: "p1", tech: "React, TailwindCSS", href: "https://burger-kader.vercel.app/", img: burgerImg, couleur: "#FFC045", encre: "#3D2514" },
  { key: "p6", tech: "React, TypeScript", href: "https://trans-campus.com/onboarding", img: billetterieImg, couleur: "#F23842", encre: "#0A1430" },
  { key: "p9", tech: "Spring Boot, Java, PostgreSQL", href: "https://github.com/abdoulkaderkebe3-cloud/app-bancaire", img: null, couleur: "#23395B", encre: "#fff" },
  { key: "p7", tech: "React, TypeScript, TailwindCSS", href: "https://viso-studio.com", img: visoImg, couleur: "#E4DCFB", encre: "#1a1a1a" },
  { key: "p10", tech: "React, TypeScript, GSAP, Supabase", href: "https://formation.kvder.com", img: formationImg, couleur: "#C2410C", encre: "#fff" },
  { key: "p8", tech: "React, TypeScript, TailwindCSS", href: "https://landry-stephanie.vercel.app", img: mariageImg, couleur: "#4A0000", encre: "#CFC2B1" },
  { key: "p4", tech: "React, NestJS", href: "https://daily-hazel.vercel.app/", img: "/dailymuse-preview.webp", couleur: "#18181B", encre: "#fff" },
  { key: "p2", tech: "HTML, CSS, JS, Bootstrap", href: "https://abdoulkaderkebe3-cloud.github.io/site-complet-algo/", img: algoImg, couleur: "#3F6F52", encre: "#FAF7F2" },
];

// Une étagère en haut, deux en dessous côte à côte en desktop (comme une
// bibliothèque murale), empilées en une colonne sur téléphone.
export const ETAGERES = [[0, 1, 2], [3, 4], [5, 6, 7]];

export const domaine = (href) => href.replace(/^https?:\/\//, "").replace(/\/$/, "");
export const numero = (i) => String(i + 1).padStart(2, "0");
