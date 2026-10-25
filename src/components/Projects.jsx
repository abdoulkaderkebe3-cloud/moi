import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import burgerImg from "../assets/images/png/burger-house.webp";
import algoImg from "../assets/images/png/site-algo.webp";
import billetterieImg from "../assets/images/png/billetterie-preview.webp";
import visoImg from "../assets/images/png/viso-studio.webp";
import mariageImg from "../assets/images/png/mariage-demo.webp";
import { useLang } from "../context/LanguageContext";
import { RevealGroup, RevealItem, RevealTitle } from "./Reveal";

const DiscScene = lazy(() => import("./DiscScene"));

// Les noms et descriptions vivent dans LanguageContext (clé `t.projects[key]`),
// la pile et l'URL sont des noms propres, ils ne se traduisent pas. Viso
// Studio est 4e : le projet phare juste au-dessus le montre déjà. Ordre
// choisi par Kader le 25/10 : burger, billetterie, API, Viso, puis le reste.
// Un projet sans capture (`img: null`) reçoit une étiquette dessinée sur son
// disque.
const PROJETS = [
  { key: "p1", tech: "React, TailwindCSS", href: "https://burger-kader.vercel.app/", img: burgerImg },
  { key: "p6", tech: "React, TypeScript", href: "https://trans-campus.com/onboarding", img: billetterieImg },
  {
    key: "p9",
    tech: "Spring Boot, Java, PostgreSQL",
    href: "https://github.com/abdoulkaderkebe3-cloud/app-bancaire",
    img: null,
    etiquette: { titre: "API\nbancaire", sousTitre: "Spring Boot · JWT · PostgreSQL" },
  },
  { key: "p7", tech: "React, TypeScript, TailwindCSS", href: "https://viso-studio.com", img: visoImg },
  { key: "p8", tech: "React, TypeScript, TailwindCSS", href: "https://landry-stephanie.vercel.app", img: mariageImg },
  { key: "p4", tech: "React, NestJS", href: "https://daily-hazel.vercel.app/", img: "/dailymuse-preview.webp" },
  { key: "p2", tech: "HTML, CSS, JS, Bootstrap", href: "https://abdoulkaderkebe3-cloud.github.io/site-complet-algo/", img: algoImg },
];

const domaine = (href) => href.replace(/^https?:\/\//, "").replace(/\/$/, "");

// La scène 3D demande WebGL et du mouvement. Sans l'un ou l'autre, la liste
// classique reste la version complète, pas une version dégradée.
function scenePossible() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export default function Projects() {
  const [scene] = useState(scenePossible);
  return scene ? <ProjetsDisques /> : <ProjetsListe />;
}

// Hauteur de défilement accordée à chaque projet, en vh.
const PAS_VH = 70;

function ProjetsDisques() {
  const { t } = useLang();
  const section = useRef(null);
  const cibleRef = useRef(0);
  const [actif, setActif] = useState(0);
  const [visible, setVisible] = useState(false);

  // La scène n'est montée qu'à l'approche de la section, et ne calcule plus
  // d'image une fois sortie de l'écran.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(section.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const surDefilement = () => {
      const r = section.current.getBoundingClientRect();
      const course = r.height - window.innerHeight;
      const p = Math.min(Math.max(-r.top / course, 0), 1);
      cibleRef.current = p * (PROJETS.length - 1);
      setActif(Math.round(cibleRef.current));
    };
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    window.addEventListener("resize", surDefilement);
    return () => {
      window.removeEventListener("scroll", surDefilement);
      window.removeEventListener("resize", surDefilement);
    };
  }, []);

  // Les boutons précédent / suivant font défiler la page jusqu'au projet :
  // un seul moyen de piloter la scène, le défilement.
  const aller = (i) => {
    const r = section.current.getBoundingClientRect();
    const course = r.height - window.innerHeight;
    const haut = window.scrollY + r.top + (course * i) / (PROJETS.length - 1);
    window.scrollTo({ top: haut, behavior: "smooth" });
  };

  const p = PROJETS[actif];

  return (
    <section
      id="projets"
      ref={section}
      className="relative bg-black text-white scroll-mt-24"
      style={{ height: `calc(100svh + ${(PROJETS.length - 1) * PAS_VH}svh)` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          {visible && (
            <Suspense fallback={null}>
              <DiscScene projets={PROJETS} cibleRef={cibleRef} actif={visible} onChoisir={aller} />
            </Suspense>
          )}
        </div>

        {/* Bloc d'infos : en haut à gauche, il se lit avant les disques. */}
        <div className="pointer-events-none relative z-10 px-6 pt-24 md:px-20 md:pt-28">
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {t.projects.title} {t.projects.titleHighlight}
          </h2>
          <div className="mt-4 max-w-sm" aria-live="polite">
            <p className="text-3xl font-semibold uppercase leading-none tracking-tight md:text-5xl">
              {t.projects[p.key]}
            </p>
            <dl className="mt-5 text-sm">
              <div className="flex justify-between gap-6 border-t border-line py-2">
                <dt className="font-mono text-xs uppercase tracking-widest text-white/50">{t.projects.stackLabel}</dt>
                <dd className="text-right">{p.tech}</dd>
              </div>
              <div className="flex justify-between gap-6 border-y border-line py-2">
                <dt className="font-mono text-xs uppercase tracking-widest text-white/50">{t.projects.linkLabel}</dt>
                <dd className="truncate text-right text-white/80">{domaine(p.href)}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Barre basse, au pouce sur téléphone : position, navigation, lien.
            Posée au-dessus du bouton fixe de retour en haut, qui la
            recouvrait en bas à droite. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 px-6 pb-20 sm:gap-3 md:px-20 md:pb-24 *:pointer-events-auto">
          {/* Fond sombre : un disque clair qui passe derrière rendait le
              compteur et les flèches illisibles. Espacements resserrés en
              dessous de 640 px : à 390 px, le compteur et le bouton passaient
              sur deux lignes. */}
          <div className="flex items-center gap-2 rounded-full bg-black/70 py-1 pl-3 pr-1 backdrop-blur-md sm:gap-3 sm:pl-4">
          <span className="whitespace-nowrap font-mono text-sm tabular-nums text-white/60">
            <span className="text-white">{String(actif + 1).padStart(2, "0")}</span> / {String(PROJETS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => aller(Math.max(actif - 1, 0))}
            disabled={actif === 0}
            aria-label={t.projects.prev}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line text-white transition-colors duration-(--duration-base) ease-out-expo hover:border-white/60 focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => aller(Math.min(actif + 1, PROJETS.length - 1))}
            disabled={actif === PROJETS.length - 1}
            aria-label={t.projects.next}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line text-white transition-colors duration-(--duration-base) ease-out-expo hover:border-white/60 focus-visible:outline-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </button>
          </div>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 text-sm font-semibold text-black transition-transform duration-(--duration-base) ease-out-expo hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-5"
          >
            {t.projects.cta}
            <ArrowUpRight className="hidden h-4 w-4 sm:block" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Liste et aperçu, à la place de l'ancien carrousel de cartes inclinées
// (CardSwap) : l'inclinaison déformait les titres et rendait les captures
// illisibles, et un projet n'était visible que toutes les trois secondes.
// Mobile : une carte par projet, capture au-dessus du titre.
// Desktop : la liste à gauche se scanne d'un coup d'œil (lecture en F), la
// capture du projet survolé ou focalisé s'affiche dans un cadre collé à droite.
function ProjetsListe() {
  const { t } = useLang();
  const [actif, setActif] = useState(0);
  const avecCapture = PROJETS.filter((p) => p.img);

  return (
    <section
      id="projets"
      className="min-h-screen bg-black text-white px-6 md:px-20 py-24 scroll-mt-24"
    >
      <RevealTitle
        text={t.projects.title}
        highlight={t.projects.titleHighlight}
        className="text-4xl md:text-5xl text-center text-white mb-6 font-semibold"
      />
      <RevealGroup>
        <RevealItem as="p" className="mx-auto mb-16 max-w-2xl text-center text-lg text-white/60">
          {t.projects.description1}{" "}
          <span className="text-accent">{t.projects.description1Highlight}</span>{" "}
          {t.projects.description1End} {t.projects.hint}
        </RevealItem>
      </RevealGroup>

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <RevealGroup as="ol" className="flex flex-col gap-10 lg:gap-0">
          {PROJETS.map((p, i) => (
            <RevealItem as="li" key={p.key}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => p.img && setActif(avecCapture.indexOf(p))}
                onFocus={() => p.img && setActif(avecCapture.indexOf(p))}
                className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-black lg:border-b lg:border-line lg:rounded-none lg:py-5"
              >
                {/* Capture visible sur mobile seulement : sur desktop elle
                    passe dans le cadre collé. */}
                {p.img && (
                  <div className="mb-4 aspect-16/10 overflow-hidden rounded-xl border border-line lg:hidden">
                    <img
                      src={p.img}
                      alt=""
                      width="1600"
                      height="1000"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                )}

                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-mono text-sm tabular-nums transition-colors duration-(--duration-base) ease-out-expo ${
                      avecCapture[actif] === p ? "text-accent" : "text-accent lg:text-white/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-xl font-semibold tracking-tight transition-colors duration-(--duration-base) ease-out-expo md:text-2xl lg:group-hover:text-white ${
                        avecCapture[actif] === p ? "text-white" : "text-white lg:text-white/45"
                      }`}
                    >
                      {t.projects[p.key]}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">{p.tech}</p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className={`h-6 w-6 shrink-0 self-center transition duration-(--duration-base) ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent ${
                      avecCapture[actif] === p ? "text-accent" : "text-accent lg:text-white/40"
                    }`}
                  />
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Cadre d'aperçu, desktop seulement. Toutes les captures sont
            empilées et seule l'active est opaque : le changement est un
            fondu sur le compositeur, sans recharger d'image. */}
        <div className="hidden lg:block" aria-hidden="true">
          <div className="sticky top-28 aspect-16/10 overflow-hidden rounded-2xl border border-line bg-surface">
            {avecCapture.map((p, i) => (
              <img
                key={p.key}
                src={p.img}
                alt=""
                width="1600"
                height="1000"
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover object-top transition duration-(--duration-lente) ease-out-expo ${
                  actif === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
