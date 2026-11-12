import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import burgerImg from "../assets/images/png/burger-house.webp";
import algoImg from "../assets/images/png/site-algo.webp";
import billetterieImg from "../assets/images/png/billetterie-preview.webp";
import visoImg from "../assets/images/png/viso-studio.webp";
import mariageImg from "../assets/images/png/mariage-demo.webp";
import formationImg from "../assets/images/png/formation-kvder.webp";
import { useLang } from "../context/LanguageContext";
import { RevealGroup, RevealItem, RevealTitle } from "./Reveal";

// Bibliothèque de projets : chaque projet est un livre posé sur une étagère.
// Tout est en CSS 3D, sans WebGL : l'ancienne scène de disques (three.js)
// pesait plus que tout le reste de la section pour un effet équivalent.
// Les noms et résumés vivent dans LanguageContext (`t.projects[key]` et
// `t.projects.summaries[key]`). `couleur` est la couverture, relevée sur le
// site en ligne de chaque projet (12/11) ; l'API, sans site, prend un bleu
// bancaire. `encre` est la couleur du texte posé dessus, reprise du site
// quand elle existe (contraste AA vérifié pour chaque paire, 4,7:1 minimum).
const PROJETS = [
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
const ETAGERES = [[0, 1, 2], [3, 4], [5, 6, 7]];

const domaine = (href) => href.replace(/^https?:\/\//, "").replace(/\/$/, "");
const numero = (i) => String(i + 1).padStart(2, "0");

export default function Projects() {
  const { t } = useLang();
  const [ouvert, setOuvert] = useState(null);

  return (
    <section
      id="projets"
      className="relative overflow-hidden bg-black px-4 py-24 text-white scroll-mt-24 md:px-12"
    >
      {/* Mur carrelé, effacé vers les bords pour ne pas encadrer la section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[96px_96px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative">
        <RevealTitle
          text={t.projects.title}
          highlight={t.projects.titleHighlight}
          className="mb-4 text-center text-4xl font-semibold text-white md:text-5xl"
        />
        <RevealGroup>
          <RevealItem as="p" className="mx-auto mb-16 max-w-xl text-center text-lg text-white/60">
            {t.projects.hint}
          </RevealItem>
        </RevealGroup>

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-14 md:gap-20">
          <Etagere indices={ETAGERES[0]} t={t} onOuvrir={setOuvert} plante="droite" />
          <div className="flex w-full flex-col items-center gap-14 md:flex-row md:items-end md:justify-between md:gap-10">
            <Etagere indices={ETAGERES[1]} t={t} onOuvrir={setOuvert} plante="gauche" />
            <Etagere indices={ETAGERES[2]} t={t} onOuvrir={setOuvert} />
          </div>
        </div>
      </div>

      <Lecture index={ouvert} setIndex={setOuvert} t={t} />
    </section>
  );
}

function Etagere({ indices, t, onOuvrir, plante }) {
  return (
    <div className="relative">
      <ul className="relative z-10 flex items-end justify-center gap-4 px-4 sm:gap-6 md:px-8">
        {indices.map((i) => (
          <li key={PROJETS[i].key}>
            <button
              type="button"
              onClick={() => onOuvrir(i)}
              aria-label={`${t.projects.open} ${t.projects[PROJETS[i].key]}`}
              aria-haspopup="dialog"
              className="livre group block w-23 cursor-pointer rounded-sm outline-none perspective-[700px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-8 focus-visible:ring-offset-black sm:w-27 md:w-32"
            >
              <Livre p={PROJETS[i]} i={i} t={t} />
            </button>
          </li>
        ))}
      </ul>
      {plante && <Plante cote={plante} />}
      {/* La planche : un dessus éclairé et une ombre portée sur le mur. */}
      <div
        aria-hidden="true"
        className="relative h-3.5 rounded-[3px] bg-[linear-gradient(#8a6243,#5c3f29)] shadow-[0_18px_24px_-8px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.25)] md:h-4"
      />
    </div>
  );
}

// Un livre debout, couverture de face, dos visible à gauche. Le survol et le
// focus clavier le sortent à moitié de l'étagère.
function Livre({ p, i, t }) {
  return (
    <span className="relative block aspect-2/3 transform-3d transition-transform duration-(--duration-base) ease-out-expo transform-[rotateY(24deg)] group-hover:transform-[translateY(-10px)_rotateY(36deg)_translateZ(18px)] group-focus-visible:transform-[translateY(-10px)_rotateY(36deg)_translateZ(18px)] motion-reduce:transition-none">
      {/* Dos du livre, replié vers l'arrière depuis le bord gauche. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-5 w-5 origin-right transform-[rotateY(-90deg)] brightness-[0.6]"
        style={{ backgroundColor: p.couleur }}
      />
      <Couverture p={p} i={i} t={t} />
      {/* Ombre de contact sur la planche. */}
      <span
        aria-hidden="true"
        className="absolute -bottom-1 left-1 right-0 h-2 rounded-full bg-black/70 blur-[3px] transition-opacity duration-(--duration-base) group-hover:opacity-40"
      />
    </span>
  );
}

// La couverture se dimensionne en unités de conteneur (cqw) : la même sert
// sur l'étagère et en grand dans la lecture.
function Couverture({ p, i, t }) {
  return (
    // Le conteneur ne peut pas se mesurer lui-même : les unités cqw servent
    // seulement à ses enfants, d'où le padding posé sur le bloc intérieur.
    <span
      className="@container absolute inset-0 overflow-hidden rounded-r-[4px] rounded-l-[2px] text-left shadow-[6px_8px_18px_rgba(0,0,0,0.55)]"
      style={{ backgroundColor: p.couleur, color: p.encre }}
    >
      {/* Charnière et reflet : ce qui fait lire « couverture rigide ». */}
      <span aria-hidden="true" className="absolute inset-y-0 left-[5cqw] w-[2cqw] bg-black/20" />
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.18),transparent_40%,rgba(0,0,0,0.18))]" />
      <span className="relative flex h-full flex-col p-[9cqw]">

      <span className="relative font-mono text-[8cqw] opacity-70">{numero(i)}</span>
      <span className="relative mt-[3cqw] text-[11cqw] font-bold uppercase leading-[1.05] tracking-tight hyphens-auto">
        {t.projects[p.key]}
      </span>
      {p.img ? (
        <img
          src={p.img}
          alt=""
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
          className="relative mt-auto aspect-16/10 w-full rounded-[2cqw] object-cover object-top ring-1 ring-black/20"
        />
      ) : (
        <span aria-hidden="true" className="relative mt-auto font-mono text-[9cqw] leading-tight opacity-80">
          {"{ }"} API
        </span>
      )}
      <span className="relative mt-[5cqw] truncate text-[7cqw] opacity-75">{p.tech}</span>
      </span>
    </span>
  );
}

// Lecture d'un livre : un <dialog> natif, qui gère seul le piège du focus,
// la touche Échap et le retour du focus sur le livre cliqué.
function Lecture({ index, setIndex, t }) {
  const ref = useRef(null);
  const titreId = useId();
  const ouvert = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (ouvert && !d.open) d.showModal();
    if (!ouvert && d.open) d.close();
  }, [ouvert]);

  const aller = (pas) => setIndex((i) => (i + pas + PROJETS.length) % PROJETS.length);
  const p = ouvert ? PROJETS[index] : null;

  return (
    <dialog
      ref={ref}
      aria-labelledby={titreId}
      onClose={() => setIndex(null)}
      // Un clic sur le fond (le dialog lui-même, hors du panneau) ferme.
      onClick={(e) => e.target === ref.current && ref.current.close()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") aller(1);
        if (e.key === "ArrowLeft") aller(-1);
      }}
      className="m-auto max-h-[92svh] w-[min(56rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-[#0b0b0b] p-0 text-white backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {p && (
        <div className="relative grid gap-8 p-6 pt-16 md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:p-12">
          <button
            type="button"
            onClick={() => ref.current.close()}
            aria-label={t.projects.close}
            className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full text-white/70 transition-colors duration-(--duration-rapide) hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* `key` relance l'entrée du livre à chaque changement de projet. */}
          <div key={p.key} className="mx-auto w-40 perspective-[900px] md:w-60">
            <div className="animate-livre-sort relative aspect-2/3">
              <Couverture p={p} i={index} t={t} />
            </div>
          </div>

          <div key={`${p.key}-texte`} className="animate-skill-in">
            <p className="font-mono text-sm tabular-nums text-accent">
              {numero(index)} / {numero(PROJETS.length - 1)}
            </p>
            <h3 id={titreId} className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {t.projects[p.key]}
            </h3>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-white/70">{t.projects.summaries[p.key]}</p>

            <dl className="mt-6 text-sm">
              <div className="flex justify-between gap-6 border-t border-line py-2">
                <dt className="font-mono text-xs uppercase tracking-widest text-white/50">{t.projects.stackLabel}</dt>
                <dd className="text-right">{p.tech}</dd>
              </div>
              <div className="flex justify-between gap-6 border-y border-line py-2">
                <dt className="font-mono text-xs uppercase tracking-widest text-white/50">{t.projects.linkLabel}</dt>
                <dd className="truncate text-right text-white/80">{domaine(p.href)}</dd>
              </div>
            </dl>

            <div className="mt-8 flex items-center gap-2">
              <button
                type="button"
                onClick={() => aller(-1)}
                aria-label={t.projects.prev}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line transition-colors duration-(--duration-rapide) hover:border-white/60 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => aller(1)}
                aria-label={t.projects.next}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line transition-colors duration-(--duration-rapide) hover:border-white/60 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-black transition-transform duration-(--duration-base) ease-out-expo hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {t.projects.cta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

// Plante en pot posée au bout d'une étagère, au trait qui bout (signature
// WigglyPaint). Décorative, desktop seulement : sur téléphone, l'étagère est
// déjà pleine.
function Plante({ cote }) {
  const id = useId();
  const [calme] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 110"
      className={`pointer-events-none absolute bottom-3 hidden h-28 w-20 md:block ${cote === "gauche" ? "-left-16" : "-right-16"}`}
    >
      <filter id={id} filterUnits="userSpaceOnUse" x="-10" y="-10" width="100" height="130">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1">
          {!calme && <animate attributeName="seed" values="1;2;3" dur="0.42s" calcMode="discrete" repeatCount="indefinite" />}
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="3.5" />
      </filter>
      <g filter={`url(#${CSS.escape(id)})`} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Feuilles */}
        <path d="M40 72 C40 55 38 40 30 26" />
        <path d="M30 26 C20 24 14 30 12 38 C22 40 28 34 30 26 Z" />
        <path d="M40 60 C46 48 54 40 64 36" />
        <path d="M64 36 C66 46 60 54 50 54 C52 44 58 38 64 36 Z" />
        <path d="M39 50 C34 44 26 44 20 50 C26 56 34 56 39 50 Z" />
        <path d="M40 72 C42 58 46 46 44 30 C52 22 52 14 46 8 C40 14 38 22 44 30" />
        {/* Pot */}
        <path d="M22 72 H58 L53 104 H27 Z" />
        <path d="M20 72 H60" />
      </g>
    </svg>
  );
}
