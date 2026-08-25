import { motion } from "framer-motion";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
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

// Lazy-load BlobCursor: keeps gsap's cursor-trail logic out of the
// critical bundle since it's a purely decorative, desktop-only effect.
const BlobCursor = lazy(() => import("./BlobCursor"));

// Géométrie d'une keycap. Le volume est construit en tranches horizontales
// empilées : chaque tranche monte en Z, rétrécit et s'arrondit un peu plus que
// la précédente. C'est ce qui donne les flancs galbés et les coins ronds d'une
// vraie touche, là où 4 faces planes ne produisent qu'une boîte carrée.
const KEY_SIZE = 150; // côté d'une touche, en px
const KEY_HEIGHT = 45; // hauteur totale du volume, en px
const KEY_TAPER = 16; // rétrécissement du sommet par rapport à la base, en px
const KEY_SLICES = 12; // plus il y en a, plus les flancs sont lisses, mais 16
// touches x N tranches font autant d'éléments 3D à composer à chaque frame
const KEY_RADIUS_BOTTOM = 41;
const KEY_RADIUS_TOP = 30;

// Empreinte visuelle du clavier incliné à l'échelle 1 : mesurée dans le
// navigateur pour une touche de 132px, puis rapportée à KEY_SIZE. HEADROOM est
// la place occupée au-dessus de lui par le titre et le bloc de description.
const KB_W = Math.round(855 * (KEY_SIZE / 132));
const KB_H = Math.round(420 * (KEY_SIZE / 132));
const HEADROOM = 450;

// Le clavier est contraint par la hauteur restante, pas seulement par la
// largeur : des breakpoints Tailwind ne suffiraient donc pas.
function computeKeyboardScale() {
  const byWidth = (window.innerWidth - 120) / KB_W;
  const byHeight = (window.innerHeight - HEADROOM) / KB_H;
  return Math.max(0.3, Math.min(0.9, byWidth, byHeight));
}

// Accroche décorative en arrière-plan du clavier.
const BACKDROP_TEXT = "du back Java au front React, je construis des produits qui durent";

// `hotkey` : lettre du clavier physique qui enfonce la touche. Toutes distinctes,
// choisies proches du nom de la techno pour rester devinables.
const TECHS = [
  // Rangée 1
  { name: "Figma", key: "figma", hotkey: "F", level: "advanced", color: "#FF6B6B", icon: figmaIcon, textColor: "text-white" },
  { name: "Java", key: "java", hotkey: "J", level: "advanced", color: "#FF9500", icon: javaIcon, textColor: "text-white" },
  { name: "Tailwind CSS", key: "tailwind", hotkey: "W", level: "expert", color: "#0F172A", icon: tailwindIcon, textColor: "text-white" },
  { name: "React", key: "react", hotkey: "R", level: "expert", color: "#20232A", icon: reactIcon, textColor: "text-white" },
  // Rangée 2
  { name: "TypeScript", key: "typescript", hotkey: "T", level: "advanced", color: "#3178C6", icon: tsIcon, textColor: "text-white" },
  { name: "GitHub", key: "github", hotkey: "B", level: "expert", color: "#21759B", icon: githubIcon, textColor: "text-white" },
  { name: "Git", key: "git", hotkey: "G", level: "expert", color: "#F34F29", icon: gitIcon, textColor: "text-white" },
  { name: "HTML5", key: "html", hotkey: "H", level: "expert", color: "#E34C26", icon: htmlIcon, textColor: "text-white" },
  // Rangée 3
  { name: "CSS3", key: "css", hotkey: "C", level: "expert", color: "#264BDD", icon: cssIcon, textColor: "text-white" },
  { name: "JavaScript", key: "javascript", hotkey: "S", level: "expert", color: "#F7DF1E", icon: jsIcon, textColor: "text-slate-900" },
  { name: "Spring Boot", key: "springboot", hotkey: "O", level: "advanced", color: "#77B900", icon: springBootIcon, textColor: "text-white" },
  { name: "Angular", key: "angular", hotkey: "A", level: "intermediate", color: "#DD0031", icon: angularIcon, textColor: "text-white" },
  // Rangée 4
  { name: "Framer Motion", key: "framer", hotkey: "M", level: "advanced", color: "#8B5CF6", icon: framerIcon, textColor: "text-white" },
  { name: "PostgreSQL", key: "postgres", hotkey: "P", level: "advanced", color: "#336791", icon: postegre, textColor: "text-white" },
  { name: "UML", key: "uml", hotkey: "U", level: "advanced", color: "#FFB81C", icon: uml, textColor: "text-slate-900" },
  { name: "DBeaver", key: "dbeaver", hotkey: "D", level: "advanced", color: "#1E90FF", icon: dbeaver, textColor: "text-white" },
];

export default function Skills() {
  const { t } = useLang();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [keyboardScale, setKeyboardScale] = useState(computeKeyboardScale);
  const [pressedKey, setPressedKey] = useState(null);
  // Le clavier construit 16 touches de 13 éléments chacune, tous en
  // `preserve-3d`, soit plus de 200 calques que le navigateur compose. Payé au
  // premier rendu alors que la section est au troisième écran, ce coût retarde
  // l'affichage du hero. Une fois monté on le garde : le démonter et le
  // reconstruire à chaque aller-retour de scroll coûterait plus cher encore.
  const [keyboardMounted, setKeyboardMounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setKeyboardMounted(true);
          observer.disconnect();
        }
      },
      // Assez tôt pour que les touches et leurs seize icônes soient prêtes
      // avant que la section n'entre dans le champ.
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setKeyboardScale(computeKeyboardScale());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // "press a key" : une lettre du clavier physique enfonce la touche associée.
  // L'écoute n'est active que quand la section est à l'écran, sinon on
  // capterait les frappes de l'utilisateur partout ailleurs sur le site.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let visible = false;
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.4 }
    );
    observer.observe(section);

    const handleKeyDown = (event) => {
      if (!visible || event.metaKey || event.ctrlKey || event.altKey) return;
      const el = event.target;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;

      const letter = event.key.toUpperCase();
      const tech = TECHS.find((item) => item.hotkey === letter);
      if (!tech) return;

      setSelectedSkill(tech);
      setPressedKey(letter);
      clearTimeout(timer);
      timer = setTimeout(() => setPressedKey(null), 220);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  const techs = TECHS;

  // Pavé 4x4 décalé, plus proche de la référence que 6/6/4.
  const rows = [techs.slice(0, 4), techs.slice(4, 8), techs.slice(8, 12), techs.slice(12, 16)];

  return (
    <motion.section
      id="compétences"
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-black py-16 px-6 overflow-hidden relative flex flex-col items-center justify-center select-none scroll-mt-24"
    >
      {/* Background Subtle Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(var(--accent-rgb)/0.07)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      {/* Blob Cursor Background Effect - Desktop only */}
      {!isMobile && (
        <Suspense fallback={null}>
          <BlobCursor
            blobType="circle"
            fillColor="var(--color-accent)"
            trailCount={1}
            sizes={[40]}
            innerSizes={[0]}
            opacities={[0.5]}
            shadowColor="rgb(var(--accent-rgb) / 0.8)"
            shadowOffsetX={0}
            shadowOffsetY={0}
            shadowBlur={20}
            useFilter={false}
            zIndex={0}
          />
        </Suspense>
      )}

      {/* Accroche décorative, inclinée pour suivre la perspective du clavier.
          Sous la grille (z-0) et non sélectionnable. */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute -left-8 xl:left-4 top-1/2 -translate-y-1/2 z-0 pointer-events-none max-w-88"
        style={{ transform: "translateY(-50%) rotate(-58deg)" }}
      >
        <p className="text-3xl xl:text-4xl font-light leading-[1.6] tracking-tight text-white/15">
          {BACKDROP_TEXT}
        </p>
      </div>

      {/* Title */}
      <div className="text-center mb-6 relative z-10 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
          {t.skills.title} <span className="text-accent">{t.skills.titleHighlight}</span>
        </h2>
        <p className="text-xl font-normal text-white/50">
          {t.skills.subtitle}
        </p>
      </div>

      {/* Selected Skill Display */}
      {/* Hauteur figée en desktop : sans ça, une description de 1 ou 2 lignes
          change la hauteur du bloc et fait sauter le clavier au survol. */}
      <div className="w-full max-w-2xl mx-auto mb-2 relative min-h-40 sm:min-h-32 md:min-h-0 md:h-28 flex items-center justify-center z-10 text-center px-4">
        {/* Un seul bloc monté à la fois, animé par une keyframe CSS relancée au
            changement de `key`. Avec AnimatePresence, un survol plus rapide que
            la transition laissait coexister plusieurs textes superposés, ce qui
            donnait l'impression que l'affichage se bloquait. */}
        {!selectedSkill ? (
          <p className="animate-skill-in text-lg font-medium text-white/40">
            ⌨️ {t.skills.placeholder}
          </p>
        ) : (
          <div
            key={selectedSkill.key}
            className="animate-skill-in flex flex-col items-center justify-center w-full"
          >
            <h3 className="text-3xl font-bold text-white mb-2">
              {selectedSkill.name}
            </h3>
            <p className="text-lg text-white/70 leading-relaxed">
              {t.skills.descriptions[selectedSkill.key]}
            </p>
          </div>
        )}
      </div>

      {/* Isometric Keyboard Wrapper (Desktop/Tablet only) */}
      {/* La hauteur réservée suit l'empreinte réelle du clavier incliné. Laissé
          au flux normal, il occuperait 420px de layout pour 230px à l'écran et
          repousserait tout hors de vue sur les écrans peu hauts. */}
      <div
        className="hidden md:block relative w-full overflow-visible"
        style={{
          perspective: "1200px",
          height: `${Math.round(KB_H * keyboardScale)}px`,
        }}
        onMouseLeave={() => setSelectedSkill(null)}
      >
        {keyboardMounted && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center transition-all duration-300 flex flex-col gap-3 items-center"
          style={{
            transform: "rotateX(55deg) rotateY(0deg) rotateZ(-30deg)",
            transformStyle: "preserve-3d",
            scale: String(keyboardScale),
          }}
        >
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-3 justify-center"
              style={{
                transformStyle: "preserve-3d",
                // Décalage d'une demi-touche par rangée : c'est ce qui donne
                // la diagonale de la référence.
                paddingLeft: `${(rowIndex * (KEY_SIZE + 12)) / 2}px`,
              }}
            >
              {row.map(tech => (
                <KeyCap
                  key={tech.name}
                  tech={tech}
                  active={selectedSkill?.name === tech.name}
                  pressed={pressedKey === tech.hotkey}
                  onHover={() => setSelectedSkill(tech)}
                  onClick={() => setSelectedSkill(tech)}
                />
              ))}
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Circular Badge Grid (Mobile only) */}
      <div className="md:hidden w-full max-w-md mx-auto grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-7 px-4 z-10">
        {techs.map((tech, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSkill(tech)}
            className="flex flex-col items-center justify-center gap-2.5 cursor-pointer"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center bg-surface border border-line"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                loading="lazy"
                decoding="async"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-white text-xs font-semibold text-center leading-tight">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function KeyCap({ tech, active, pressed, onHover, onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={tech.name}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="relative cursor-pointer select-none outline-none"
      style={{
        width: `${KEY_SIZE}px`,
        height: `${KEY_SIZE}px`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Enfoncement en CSS pur plutôt qu'en JS : framer-motion réécrivait le
          transform de ce conteneur à chaque frame, ce qui forçait le navigateur
          à recalculer la scène 3D et ses tranches sur toutes les touches
          survolées. La profondeur passe par --key-z, que le survol pilote seul
          quand aucune valeur n'est posée en inline. */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-150 ease-out hover:[--key-z:-18px]"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(var(--key-z, 0px))",
          ...(isClicked || pressed
            ? { "--key-z": "-28px" }
            : active
              ? { "--key-z": "-18px" }
              : {}),
        }}
      >
        {/* Corps galbé : tranches empilées de la base vers le sommet. */}
        {Array.from({ length: KEY_SLICES }).map((_, i) => {
          const t = i / (KEY_SLICES - 1); // 0 = base, 1 = sommet
          // Progression non linéaire : les flancs rentrent surtout près du haut,
          // comme le galbe d'une keycap moulée.
          const curve = Math.pow(t, 1.45);
          return (
            <div
              key={i}
              className="absolute"
              style={{
                inset: `${curve * KEY_TAPER}px`,
                borderRadius: `${KEY_RADIUS_BOTTOM - t * (KEY_RADIUS_BOTTOM - KEY_RADIUS_TOP)}px`,
                backgroundColor: tech.color,
                transform: `translateZ(${t * KEY_HEIGHT}px)`,
                // Voile noir dégressif plutôt qu'un filter : même assombrissement
                // progressif, sans créer 200 contextes de filtrage.
                boxShadow: `inset 0 0 0 200px rgba(0,0,0,${(0.5 - t * 0.42).toFixed(3)})`,
              }}
            />
          );
        })}

        {/* Face supérieure, posée au sommet du galbe. */}
        <div
          className={`absolute flex items-center justify-center ${tech.textColor}`}
          style={{
            inset: `${KEY_TAPER}px`,
            borderRadius: `${KEY_RADIUS_TOP}px`,
            backgroundColor: tech.color,
            backgroundImage:
              "linear-gradient(155deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 38%, rgba(0,0,0,0.06) 62%, rgba(0,0,0,0.20) 100%)",
            transform: `translateZ(${KEY_HEIGHT}px)`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -5px 12px rgba(0,0,0,0.22)",
          }}
        >
          {/* Cuvette centrale : creux de la touche, plus marqué vers le bas. */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.22)_0%,transparent_58%),radial-gradient(ellipse_at_50%_112%,rgba(0,0,0,0.20)_0%,transparent_55%)]"
            style={{ borderRadius: `${KEY_RADIUS_TOP}px` }}
          />

          {/* Lettre du raccourci, discrète, comme la légende d'une vraie touche. */}
          <span className="absolute top-2 left-3 text-[11px] font-bold tracking-wider opacity-40">
            {tech.hotkey}
          </span>

          <img
            src={tech.icon}
            alt=""
            className={`w-18 h-18 object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] ${tech.name === "Spring Boot" ? "invert brightness-[1.25]" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}