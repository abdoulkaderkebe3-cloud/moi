import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

export default function Services() {
  const { t } = useLang();
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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-black px-6 py-24 scroll-mt-24 md:px-20"
    >
      {/* Décor pur : `pointer-events-none` pour que le canvas ne vole ni les
          clics ni la sélection de texte des cartes posées au-dessus. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {near && (
          <Suspense fallback={null}>
            <Ferrofluid
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

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            {t.services.title}{" "}
            <span className="text-accent">{t.services.titleHighlight}</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70">
            {t.services.intro}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map(({ key, Icon, tags }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
              className="group flex flex-col gap-4 rounded-2xl border border-line bg-black/60 p-6 shadow-xl shadow-black/60 backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 md:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30 transition-transform duration-200 group-hover:scale-105">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>

              <h3 className="text-xl font-semibold text-white md:text-2xl">
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
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 text-center"
        >
          {/* Cible tactile d'au moins 44 px, et anneau de focus repris du même
              accent que le reste de la navigation. */}
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-black transition hover:bg-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {t.services.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
