import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { documentTop } from "../utils/documentTop";
import { RevealGroup, RevealItem, RevealTitle } from "./Reveal";
import { ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import {
  IconTraining,
  IconStack,
  IconLayout,
  IconOrchestration,
} from "./ServiceIcons";

// Le fond WebGL est chargé à part : ogl sert déjà au hero, mais le shader du
// ferrofluide n'a rien à faire dans le bundle critique d'une section de
// milieu de page.
const Ferrofluid = lazy(() => import("./Ferrofluid"));

// Les libellés vivent dans LanguageContext, seuls la clé, l'icône et les
// technos restent ici : ce sont des noms propres, ils ne se traduisent pas.
const SERVICES = [
  { key: "training", Icon: IconTraining, tags: ["HTML/CSS", "JavaScript", "React", "Spring Boot"] },
  { key: "apps", Icon: IconStack, tags: ["Java", "Spring Boot", "PostgreSQL", "Angular"] },
  { key: "interfaces", Icon: IconLayout, tags: ["React", "Tailwind", "Figma", "Vercel"] },
  { key: "ai", Icon: IconOrchestration, tags: ["Claude Code", "Prompting", "Revue de code"] },
];

// L'accent n'est jamais écrit en dur, pas même dans une prop de composant :
// il est lu sur les tokens de `index.css`, donc changer la couleur du site
// reste une seule ligne à modifier.
const readToken = (name, fallback) => {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
};

// Lu une seule fois au premier rendu. Les valeurs de repli ne servent qu'au
// cas où la feuille de style n'est pas encore appliquée.
const readAccentColors = () => [
  readToken("--color-accent", "#e3d5c0"),
  readToken("--color-accent-strong", "#c9b79c"),
  "#ffffff",
];

// Géométrie de l'anneau, sur le modèle de jesperlandberg.com : les cartes sont
// posées à l'intérieur d'un cylindre dont la caméra occupe le centre. Le rayon
// est égal à la perspective, donc la carte de face est à l'échelle 1 et ses
// voisines fuient sur les côtés. L'écart angulaire se déduit de la largeur
// d'une carte, pour qu'elles se suivent sans se chevaucher quel que soit
// l'écran.
const readGeometry = () => {
  const w = typeof window === "undefined" ? 1280 : window.innerWidth;
  const mobile = w < 768;
  const cardW = Math.min(w * 0.78, 420);
  const radius = mobile ? 700 : 1100;
  const gap = mobile ? 20 : 48;
  const step = ((cardW + gap) / radius) * (180 / Math.PI);
  return { cardW, radius, step };
};

function ServiceCard({ service, t, className = "" }) {
  const { key, Icon, tags } = service;
  return (
    <>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>

      <h3 className={`text-xl font-semibold text-white md:text-2xl ${className}`}>
        {t.services.items[key].title}
      </h3>

      <p className="text-sm leading-relaxed text-white/70">
        {t.services.items[key].text}
      </p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-white/60 ring-1 ring-line"
          >
            {tag}
          </li>
        ))}
      </ul>
    </>
  );
}

// Une carte sur l'anneau. Son opacité dépend de sa distance angulaire à la
// face : pleine au centre, estompée chez les voisines, nulle au-delà, ce qui
// évite aussi de peindre une carte passée derrière la caméra.
function RingCard({ service, index, angle, geometry, t }) {
  const { cardW, radius, step } = geometry;
  const opacity = useTransform(angle, (a) => {
    const distance = Math.abs(index * step - a) / step;
    return Math.max(0, 1 - distance * 0.45);
  });

  return (
    <motion.article
      className="absolute top-0 flex flex-col gap-4 rounded-2xl border border-line bg-black/80 p-6 shadow-2xl shadow-black/60 md:p-8"
      style={{
        width: cardW,
        left: -cardW / 2,
        opacity,
        backfaceVisibility: "hidden",
        // Lu de droite à gauche : centrée sur sa propre hauteur, repoussée au
        // rayon, puis tournée à sa place sur le cylindre.
        transform: `rotateY(${-index * step}deg) translateZ(${-radius}px) translateY(-50%)`,
      }}
    >
      <ServiceCard service={service} t={t} />
    </motion.article>
  );
}

function ServicesRing({ sectionRef, t }) {
  const [geometry, setGeometry] = useState(readGeometry);
  const [active, setActive] = useState(0);
  const { radius, step } = geometry;
  const total = (SERVICES.length - 1) * step;

  useEffect(() => {
    const onResize = () => setGeometry(readGeometry());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // La section fait plusieurs écrans de haut et son contenu reste collé : le
  // défilement parcouru pendant ce temps fait tourner l'anneau. Un petit
  // palier à chaque bout laisse la première et la dernière carte se poser.
  // Progression calculée à la main sur des positions mises en cache :
  // `useScroll` avec une cible remesure la section à chaque image.
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let top = 0;
    let run = 1;
    const update = () => {
      const p = (window.scrollY - top) / run;
      scrollYProgress.set(Math.min(1, Math.max(0, p)));
    };
    const measure = () => {
      top = documentTop(el);
      run = Math.max(1, el.offsetHeight - window.innerHeight);
      update();
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
    };
  }, [sectionRef, scrollYProgress]);
  const rawAngle = useTransform(scrollYProgress, [0.06, 0.94], [0, total], { clamp: true });
  // Le ressort donne l'inertie de l'original : l'anneau rattrape la molette au
  // lieu de la suivre au pixel près.
  const angle = useSpring(rawAngle, { stiffness: 140, damping: 28, mass: 0.6 });

  // Les cartes de jesper se tordent avec la vitesse. Sans WebGL on ne plie pas
  // une carte, on incline donc l'anneau entier, borné à quelques degrés.
  const velocity = useVelocity(angle);
  const tilt = useSpring(
    useTransform(velocity, (v) => Math.max(-6, Math.min(6, v * -0.05))),
    { stiffness: 200, damping: 30 }
  );

  const ringTransform = useTransform(
    angle,
    (a) => `translateZ(${radius}px) rotateY(${a}deg)`
  );

  useMotionValueEvent(angle, "change", (a) => {
    const next = Math.round(a / step);
    if (next !== active) setActive(Math.max(0, Math.min(SERVICES.length - 1, next)));
  });

  return (
    <>
      <div
        className="relative w-full flex-1"
        style={{ perspective: radius }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ rotateZ: tilt, transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute left-0 top-0 h-0 w-0"
            style={{ transform: ringTransform, transformStyle: "preserve-3d" }}
          >
            {SERVICES.map((service, index) => (
              <RingCard
                key={service.key}
                service={service}
                index={index}
                angle={angle}
                geometry={geometry}
                t={t}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Repère de progression : sans lui, rien n'indique qu'il reste des
          cartes à voir en continuant de défiler. */}
      <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
        <span className="w-8 text-right font-mono text-xs text-white/60">
          {String(active + 1).padStart(2, "0")}
        </span>
        {SERVICES.map(({ key }, i) => (
          <span
            key={key}
            className={`h-0.5 rounded-full transition-all duration-200 ease-out ${
              i === active ? "w-8 bg-accent" : "w-4 bg-white/20"
            }`}
          />
        ))}
        <span className="w-8 font-mono text-xs text-white/40">
          {String(SERVICES.length).padStart(2, "0")}
        </span>
      </div>
    </>
  );
}

export default function Services() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  // `near` monte le fond quand la section approche, `visible` met son rendu en
  // pause dès qu'elle sort de l'écran : sans ça le shader tourne sur toute la
  // page et vide la batterie en arrière-plan.
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [colors] = useState(readAccentColors);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          preload.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    preload.observe(el);

    const onScreen = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    onScreen.observe(el);

    return () => {
      preload.disconnect();
      onScreen.disconnect();
    };
  }, []);

  const background = (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {near && (
        <Suspense fallback={null}>
          {/* Densité 1 : un fond flou et lumineux ne perd rien en finesse, et
              sur un téléphone en 3x le shader calculait neuf fois plus de
              pixels. */}
          <Ferrofluid
            dpr={1}
            colors={colors}
            paused={!visible}
            speed={0.35}
            scale={1.9}
            turbulence={0.9}
            glow={1.4}
            opacity={0.4}
            mouseInteraction={false}
            flowDirection="down"
          />
        </Suspense>
      )}
      {/* Le shader monte jusqu'aux bords : ces voiles fondent le fond en haut
          et en bas pour que la section se raccorde au noir des voisines
          sans couture visible. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />
    </div>
  );

  const header = (
    <div className="text-center">
      <RevealTitle
        text={t.services.title}
        highlight={t.services.titleHighlight}
        className="text-4xl font-semibold text-white md:text-5xl"
      />
      <RevealGroup>
        <RevealItem
          as="p"
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:mt-6"
        >
          {t.services.intro}
        </RevealItem>
      </RevealGroup>
    </div>
  );

  // Cible tactile d'au moins 44 px, et anneau de focus repris du même accent
  // que le reste de la navigation.
  const cta = (
    <a
      href="#contact"
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-black transition hover:bg-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      {t.services.cta}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );

  // Moins d'animations demandé : pas d'anneau piloté par le défilement, on
  // garde la grille statique d'origine.
  if (reduce) {
    return (
      <section
        ref={sectionRef}
        id="services"
        className="relative overflow-hidden bg-black px-6 py-24 scroll-mt-24 md:px-20"
      >
        {background}
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-16">{header}</div>
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <article
                key={service.key}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-black/60 p-6 md:p-8"
              >
                <ServiceCard service={service} t={t} />
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">{cta}</div>
        </div>
      </section>
    );
  }

  // Pas d'`overflow-hidden` sur la section : il en ferait un conteneur de
  // défilement et casserait le `sticky` de son contenu. C'est le bloc collé
  // qui rogne.
  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-black scroll-mt-24"
      style={{ height: `${100 + (SERVICES.length - 1) * 70}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-6 pb-8 pt-24 md:px-20 md:pb-12">
        {background}
        <div className="relative flex flex-1 flex-col">
          {header}
          <ServicesRing sectionRef={sectionRef} t={t} />
          <div className="mt-6 text-center">{cta}</div>
        </div>
      </div>
    </section>
  );
}
