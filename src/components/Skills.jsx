import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
import BlobCursor from "./BlobCursor";

export default function Skills() {
  const { t } = useLang();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const techs = [
    // Row 1
    { name: "Figma", key: "figma", level: "advanced", color: "#FF6B6B", icon: figmaIcon, textColor: "text-white" },
    { name: "Java", key: "java", level: "advanced", color: "#FF9500", icon: javaIcon, textColor: "text-white" },
    { name: "Tailwind CSS", key: "tailwind", level: "expert", color: "#0F172A", icon: tailwindIcon, textColor: "text-white" },
    { name: "React", key: "react", level: "expert", color: "#20232A", icon: reactIcon, textColor: "text-white" },
    { name: "TypeScript", key: "typescript", level: "advanced", color: "#3178C6", icon: tsIcon, textColor: "text-white" },
    { name: "GitHub", key: "github", level: "expert", color: "#21759B", icon: githubIcon, textColor: "text-white" },
    // Row 2
    { name: "Git", key: "git", level: "expert", color: "#F34F29", icon: gitIcon, textColor: "text-white" },
    { name: "HTML5", key: "html", level: "expert", color: "#E34C26", icon: htmlIcon, textColor: "text-white" },
    { name: "CSS3", key: "css", level: "expert", color: "#264BDD", icon: cssIcon, textColor: "text-white" },
    { name: "JavaScript", key: "javascript", level: "expert", color: "#F7DF1E", icon: jsIcon, textColor: "text-slate-900" },
    { name: "Spring Boot", key: "springboot", level: "advanced", color: "#77B900", icon: springBootIcon, textColor: "text-white" },
    { name: "Angular", key: "angular", level: "intermediate", color: "#DD0031", icon: angularIcon, textColor: "text-white" },
    // Row 3
    { name: "Framer Motion", key: "framer", level: "advanced", color: "#8B5CF6", icon: framerIcon, textColor: "text-white" },
    { name: "PostgreSQL", key: "postgres", level: "advanced", color: "#336791", icon: postegre, textColor: "text-white" },
    { name: "UML", key: "uml", level: "advanced", color: "#FFB81C", icon: uml, textColor: "text-slate-900" },
    { name: "DBeaver", key: "dbeaver", level: "advanced", color: "#1E90FF", icon: dbeaver, textColor: "text-white" }
  ];

  const row1 = techs.slice(0, 6);
  const row2 = techs.slice(6, 12);
  const row3 = techs.slice(12, 16);

  return (
    <motion.section
      id="compétences"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-white dark:bg-slate-900 py-24 px-6 overflow-hidden relative flex flex-col items-center justify-center select-none scroll-mt-24"
    >
      {/* Background Subtle Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.04)_0%,rgba(0,0,0,0)_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      {/* Blob Cursor Background Effect - Desktop only */}
      {!isMobile && (
        <BlobCursor
          blobType="circle"
          fillColor="#8b5cf6"
          trailCount={1}
          sizes={[40]}
          innerSizes={[0]}
          opacities={[0.5]}
          shadowColor="rgba(139, 92, 246, 0.8)"
          shadowOffsetX={0}
          shadowOffsetY={0}
          shadowBlur={20}
          useFilter={false}
          zIndex={0}
        />
      )}

      {/* Title */}
      <div className="text-center mb-16 relative z-10 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          {t.skills.title} <span className="text-violet-600 dark:text-violet-500">{t.skills.titleHighlight}</span>
        </h2>
        <p className="text-xl font-normal text-slate-500 dark:text-gray-400">
          {t.skills.subtitle}
        </p>
      </div>

      {/* Selected Skill Display */}
      <div className="w-full max-w-2xl mx-auto mb-12 relative min-h-[110px] flex items-center justify-center z-10 text-center px-4">
        <AnimatePresence mode="wait">
          {!selectedSkill ? (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="text-lg font-medium text-slate-400 dark:text-gray-500"
            >
              ⌨️ {t.skills.placeholder}
            </motion.p>
          ) : (
            <motion.div
              key={selectedSkill.key}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {selectedSkill.name}
                </h3>
              </div>
              <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                {t.skills.descriptions[selectedSkill.key]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Isometric Keyboard Wrapper (Desktop/Tablet only) */}
      <div
        className="hidden md:flex w-full overflow-visible justify-center py-10"
        style={{
          perspective: "1200px",
        }}
        onMouseLeave={() => setSelectedSkill(null)}
      >
        <div
          className="scale-[0.33] min-[420px]:scale-[0.4] min-[520px]:scale-[0.5] sm:scale-[0.62] md:scale-[0.78] lg:scale-[0.95] xl:scale-100 origin-center transition-all duration-300 relative flex flex-col gap-0 items-center"
          style={{
            transform: "rotateX(55deg) rotateY(0deg) rotateZ(-30deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Row 1 */}
          <div className="flex gap-0 justify-center pl-0" style={{ transformStyle: "preserve-3d" }}>
            {row1.map(tech => (
              <KeyCap
                key={tech.name}
                tech={tech}
                active={selectedSkill?.name === tech.name}
                onHover={() => setSelectedSkill(tech)}
                onClick={() => setSelectedSkill(tech)}
              />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-0 justify-center pl-8" style={{ transformStyle: "preserve-3d" }}>
            {row2.map(tech => (
              <KeyCap
                key={tech.name}
                tech={tech}
                active={selectedSkill?.name === tech.name}
                onHover={() => setSelectedSkill(tech)}
                onClick={() => setSelectedSkill(tech)}
              />
            ))}
          </div>

          {/* Row 3 */}
          <div className="flex gap-0 justify-center pl-16" style={{ transformStyle: "preserve-3d" }}>
            {row3.map(tech => (
              <KeyCap
                key={tech.name}
                tech={tech}
                active={selectedSkill?.name === tech.name}
                onHover={() => setSelectedSkill(tech)}
                onClick={() => setSelectedSkill(tech)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Classic Grid (Old Design - Mobile only) */}
      <div className="md:hidden w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 z-10">
        {techs.map((tech, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSkill(tech)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-sm border transition-all duration-300 cursor-pointer ${selectedSkill?.name === tech.name
              ? "bg-violet-100 dark:bg-violet-900/40 border-violet-400 dark:border-violet-500 shadow-md shadow-violet-200/50 dark:shadow-indigo-900/30"
              : "bg-violet-50 dark:bg-slate-800 border-violet-100 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-500/50"
              }`}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-12 h-12 mb-3 object-contain"
            />
            <span className="text-slate-700 dark:text-white text-sm font-semibold text-center">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function KeyCap({ tech, active, onHover, onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick();
  };

  return (
    <div
      role="button"
      aria-label={tech.name}
      onMouseEnter={onHover}
      onClick={handleClick}
      className="relative cursor-pointer select-none"
      style={{
        width: "110px",
        height: "110px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          z: -18,
          transition: { duration: 0.12, ease: "easeOut" }
        }}
        animate={isClicked ? {
          x: [0, -1, 1, -1, 1, 0],
          z: -28,
          transition: { duration: 0.15 }
        } : {
          x: 0,
          z: active ? -18 : 0
        }}
      >


        {/* 3D Depth Sides (Extrusion) */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backgroundColor: tech.color,
            transform: "translateZ(-24px)",
            boxShadow: `
              0 2px 0 ${tech.color}ee,
              0 4px 0 ${tech.color}dd,
              0 6px 0 ${tech.color}cc,
              0 8px 0 ${tech.color}bb,
              0 10px 0 ${tech.color}aa,
              0 12px 0 ${tech.color}99,
              0 14px 0 ${tech.color}88,
              0 16px 0 ${tech.color}77,
              0 18px 0 ${tech.color}66,
              0 20px 0 ${tech.color}55,
              0 22px 0 ${tech.color}44,
              0 24px 0 ${tech.color}33
            `,
            filter: "brightness(0.72)",
          }}
        />

        {/* Top Face */}
        <div
          className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center p-3 border border-black/5 dark:border-white/20 shadow-inner ${tech.textColor}`}
          style={{
            backgroundColor: tech.color,
            backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.18) 100%)",
            transform: "translateZ(0px)",
          }}
        >
          <div className="absolute inset-2.5 rounded-lg border border-black/5 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Icon & Label */}
          <img
            src={tech.icon}
            alt=""
            className={`w-10 h-10 object-contain mb-2 ${tech.name === "Spring Boot" ? "invert brightness-[1.25]" : ""}`}
          />
          <span className="text-[11px] font-extrabold uppercase tracking-wide opacity-85 truncate max-w-full">
            {tech.name === "Tailwind CSS" ? "Tailwind" : tech.name === "Framer Motion" ? "Framer" : tech.name}
          </span>
        </div>
      </motion.div>
    </div>
  );
}