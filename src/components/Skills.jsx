import { motion } from "framer-motion";
import { useState } from "react";
import figmaIcon from "../assets/images/svg/devicon_figma.svg";
import javaIcon from "../assets/images/svg/devicon_java.svg";
import tailwindIcon from "../assets/images/svg/devicon_tailwindcss.svg";
import gitIcon from "../assets/images/svg/icomoon-free_git.svg";
import reactIcon from "../assets/images/svg/Group.svg";
import htmlIcon from "../assets/images/svg/logos_html-5.svg";
import githubIcon from "../assets/images/svg/mdi_github.svg";
import springBootIcon from "../assets/images/svg/Vector.svg";
import jsIcon from "../assets/images/svg/vscode-icons_file-type-js-official.svg";
import cssIcon from "../assets/images/svg/logos_css-3.svg";
import framerIcon from "../assets/images/svg/Vector (1).svg";
import angularIcon from "../assets/images/svg/skill-icons_angular-light.svg";
import tsIcon from "../assets/images/svg/akar-icons_typescript-fill.svg";
import postegre from "../assets/images/svg/devicon_postgresql-wordmark.svg";
import uml from "../assets/images/svg/material-icon-theme_uml.svg";
import dbeaver from "../assets/images/svg/Vector (2).svg";
import { useLang } from "../context/LanguageContext";

export default function Stack() {
  const { t } = useLang();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const techs = [
    { name: "Figma", icon: figmaIcon, color: "#FF6B6B", position: [0, 0], description: "Outil de design collaboratif pour créer des interfaces modernes" },
    { name: "Java", icon: javaIcon, color: "#FF9500", position: [1, 0], description: "Langage pour construire des backends robustes et scalables" },
    { name: "Tailwind CSS", icon: tailwindIcon, color: "#06B6D4", position: [2, 0], description: "Framework CSS utility-first pour un design rapide et efficace" },
    { name: "React", icon: reactIcon, color: "#61DAFB", position: [3, 0], description: "Librairie pour construire des interfaces utilisateur réactives" },
    { name: "TypeScript", icon: tsIcon, color: "#3178C6", position: [4, 0], description: "Langage typé pour un code robuste et maintenable" },
    { name: "Github", icon: githubIcon, color: "#21759B", position: [5, 0], description: "Plateforme pour héberger et collaborer sur les projets" },
    { name: "Git", icon: gitIcon, color: "#F34F29", position: [0, 1], description: "Système de versioning pour gérer le code efficacement" },
    { name: "HTML5", icon: htmlIcon, color: "#E34C26", position: [1, 1], description: "Structure sémantique et accessible des pages web" },
    { name: "CSS3", icon: cssIcon, color: "#264BDD", position: [2, 1], description: "Langage pour styliser et animer les interfaces web" },
    { name: "JavaScript", icon: jsIcon, color: "#F7DF1E", position: [3, 1], description: "Le langage du web pour des interactions dynamiques" },
    { name: "Spring Boot", icon: springBootIcon, color: "#77B900", position: [4, 1], description: "Framework Java pour les APIs REST et microservices" },
    { name: "Angular", icon: angularIcon, color: "#DD0031", position: [5, 1], description: "Framework complet pour les applications web d'entreprise" },
    { name: "Framer Motion", icon: framerIcon, color: "#8B5CF6", position: [0, 2], description: "Librairie pour créer des animations fluides et élégantes" },
    { name: "PostgreSQL", icon: postegre, color: "#336791", position: [1, 2], description: "Base de données relationnelle puissante et fiable" },
    { name: "UML", icon: uml, color: "#FFB81C", position: [2, 2], description: "Notation pour modéliser l'architecture du système" },
    { name: "DBEaver", icon: dbeaver, color: "#1E90FF", position: [3, 2], description: "Client SQL complet pour gérer les bases de données" },
  ];

  const handleSkillHover = (tech) => {
    setSelectedSkill(tech);
  };

  const handleSkillLeave = () => {
    setSelectedSkill(null);
  };

  return (
    <section id="compétences" className="min-h-screen bg-white dark:bg-slate-900 py-24 px-6 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 dark:text-white mb-4">
        {t.skills.title} <span className="text-violet-600 dark:text-violet-500">{t.skills.titleHighlight}</span>
      </h2>
      <p className="text-xl text-center font-normal text-slate-500 dark:text-gray-400 mb-16">{t.skills.subtitle}</p>

      <div className="max-w-6xl mx-auto">
        {/* Selected Skill Display */}
        <div className="flex justify-center mb-8 relative" style={{ minHeight: "100px" }}>
          {/* Default text - disappears on hover */}
          <motion.p 
            className="text-base font-medium text-slate-400 dark:text-gray-500"
            animate={{ opacity: selectedSkill ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            ⌨️ Survolez une touche
          </motion.p>
          
          {/* Skill details - overlay on top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedSkill ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute text-center max-w-2xl"
            style={{ pointerEvents: selectedSkill ? "auto" : "none" }}
          >
            {selectedSkill && (
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  {selectedSkill.name}
                </h3>
                <p className="text-lg text-slate-700 dark:text-gray-300 mb-4">
                  {selectedSkill.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Isometric Keyboard Grid */}
        <div 
          className="flex justify-center items-center mb-8"
          style={{
            transform: "rotateX(18deg) rotateZ(-2deg)",
            perspective: "1000px",
          }}
        >
          <div 
            className="relative"
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
            >
              {/* Background */}
              <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(30, 27, 60, 0.3)" />
                  <stop offset="100%" stopColor="rgba(0, 0, 0, 0.1)" />
                </linearGradient>
                {techs.map((tech) => (
                  <linearGradient key={`grad-${tech.name}`} id={`grad-${tech.name}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={tech.color} stopOpacity="1" />
                    <stop offset="100%" stopColor={tech.color} stopOpacity="0.7" />
                  </linearGradient>
                ))}
                {/* Filter pour rendre le logo Spring Boot visible */}
                <filter id="brightness-filter">
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="1"/>
                  </feComponentTransfer>
                  <feColorMatrix type="saturate" values="1.2"/>
                  <feGaussianBlur in="SourceGraphic" stdDeviation="0"/>
                </filter>
              </defs>

              {techs.map((tech, index) => {
                const row = tech.position[1];
                const col = tech.position[0];
                
                // Effet perspectif - décalage progressif vers la droite et vers le haut
                const perspectiveOffsetX = col * 25 + row * 15; // Décalage droite augmente avec col
                const perspectiveOffsetY = -col * 12 - row * 8; // Décalage haut augmente avec col et row
                
                const x = 100 + col * 130 + perspectiveOffsetX;
                const y = 80 + row * 140 + perspectiveOffsetY;

                return (
                  <motion.g
                    key={index}
                    whileHover={{ y: -18, scale: 1.02 }}
                    onMouseEnter={() => handleSkillHover(tech)}
                    onMouseLeave={() => handleSkillLeave()}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    {/* Isometric Cube */}
                    <g
                      style={{
                        filter: selectedSkill?.name === tech.name 
                          ? `drop-shadow(0 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 0 20px ${tech.color}80)`
                          : "drop-shadow(0 16px 32px rgba(0,0,0,0.5))",
                        transition: "filter 0.25s ease-out",
                      }}
                    >
                      {/* Top face - Main (visible) */}
                      <polygon
                        points={`${x},${y} ${x + 70},${y - 40} ${x + 140},${y} ${x + 70},${y + 40}`}
                        fill={`url(#grad-${tech.name})`}
                        opacity="1"
                        style={{
                          transition: "all 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                      />
                      
                      {/* Top face - Highlight */}
                      <polygon
                        points={`${x + 15},${y - 5} ${x + 50},${y - 28} ${x + 75},${y - 5} ${x + 50},${y + 8}`}
                        fill="white"
                        opacity="0.25"
                      />

                      {/* Left face - Dark */}
                      <polygon
                        points={`${x},${y} ${x - 35},${y + 60} ${x + 35},${y + 100} ${x + 70},${y + 40}`}
                        fill={tech.color}
                        opacity="0.7"
                        style={{
                          transition: "all 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                      />

                      {/* Right face - Medium Dark */}
                      <polygon
                        points={`${x + 70},${y + 40} ${x + 35},${y + 100} ${x + 105},${y + 140} ${x + 140},${y}`}
                        fill={tech.color}
                        opacity="0.5"
                        style={{
                          transition: "all 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                      />

                      {/* Icon in center */}
                      <g
                        style={{
                          pointerEvents: "none",
                          filter: tech.name === "Spring Boot" ? "invert(1) brightness(1.2)" : "none",
                        }}
                      >
                        <image
                          href={tech.icon}
                          x={x + 25}
                          y={y - 35}
                          width="90"
                          height="90"
                          opacity="1"
                        />
                      </g>
                    </g>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}