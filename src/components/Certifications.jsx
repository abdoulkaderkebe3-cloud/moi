import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { documentTop } from "../utils/documentTop";
import cert4 from "../assets/images/png/photo_2026-05-25_17-16-15.webp";
import cert5 from "../assets/images/png/photo_2026-05-25_17-16-53.webp";
import cert6 from "../assets/images/png/photo_2026-05-25_17-12-56.webp";
import vibeathon from "../assets/images/png/certificat-vibeathon-2026.webp";
import claude101 from "../assets/images/png/badge-claude-101.webp";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { RevealTitle } from "./Reveal";

// Position collante de la première carte, sous la navbar.
const STICKY_TOP = 96;
// Décalage vertical entre deux cartes collées : sans lui, une carte recouverte
// rétrécit derrière la suivante et devient totalement invisible.
const STACK_STEP = 16;
// Réduction d'échelle par carte recouverte : donne la profondeur de la pile.
const SCALE_STEP = 0.04;
// Chevauchement des cartes dans le flux : raccourcit d'autant la distance de
// scroll, mais au-delà de ~0.15 les cartes se coupent entre elles au repos.
const OVERLAP = 0.1;

gsap.registerPlugin(DrawSVGPlugin, SplitText);

// Traits de feutre dessinés à main levée, même écriture que les gribouillis
// des disques de la section Projets : un soulignement sous le titre, une
// boucle qui dépasse son point de départ autour de la distinction.
const TRAIT_SOULIGNE = "M3 8 C 45 3, 95 11, 150 6 S 235 10, 297 4";
const TRAIT_BOUCLE =
  "M64 5 C 102 3, 118 15, 116 27 C 114 41, 88 48, 56 47 C 22 46, 4 37, 5 24 C 6 11, 32 3, 70 6 C 84 7, 95 10, 102 14";

// Animation d'arrivée de chaque carte, jouée une seule fois quand elle entre
// à l'écran. Rien ne suit le défilement en continu : c'est précisément ce que
// la pile a quitté (ScrollTrigger recalculait à chaque défilement).
// Sans mouvement demandé, rien n'est masqué : tout s'affiche dans son état
// final, traits compris.
function useArrivees(containerRef) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {});
    const io = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          ctx.add(() => jouer(e.target));
        });
      },
      { threshold: 0.45 }
    );

    ctx.add(() => {
      // Sur tout le conteneur d'un coup : par carte, GSAP avertissait pour
      // chaque carte sans tampon.
      gsap.set(el.querySelectorAll(".trait-feutre"), { drawSVG: "0%" });
      gsap.set(el.querySelectorAll(".tampon"), { autoAlpha: 0 });
      el.querySelectorAll(".stack-card").forEach((carte) => io.observe(carte));
    });

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, [containerRef]);
}

function jouer(carte) {
  const titre = carte.querySelector("h3");
  const split = SplitText.create(titre, { type: "chars" });
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(split.chars, { yPercent: 60, autoAlpha: 0, duration: 0.45, stagger: 0.025 })
    .to(carte.querySelector(".trait-souligne"), { drawSVG: "100%", duration: 0.5, ease: "power2.inOut" }, "-=0.15")
    .to(carte.querySelector(".trait-boucle"), { drawSVG: "100%", duration: 0.75, ease: "power2.inOut" }, "-=0.2");

  // Le tampon s'écrase : il arrive grand et incliné, frappe, l'image
  // tressaille et l'encre s'étale. Réservé à la distinction classée.
  const tampon = carte.querySelector(".tampon");
  if (tampon) {
    tl.fromTo(
      tampon,
      { autoAlpha: 0, scale: 2.6, rotation: -32 },
      { autoAlpha: 1, scale: 1, rotation: -12, duration: 0.32, ease: "power4.in" },
      "-=0.35"
    )
      .fromTo(
        carte.querySelector(".tampon-encre"),
        { scale: 0.5, autoAlpha: 0.5 },
        { scale: 1.35, autoAlpha: 0, duration: 0.6, ease: "power2.out" },
        "<0.3"
      )
      .fromTo(
        carte.querySelector(".cadre-image"),
        { x: 0 },
        { x: 3, duration: 0.05, repeat: 3, yoyo: true, ease: "none", clearProps: "x" },
        "<"
      );
  }
  return tl;
}

// width/height : réservent le ratio avant chargement, donc pas de saut de
// layout qui décalerait les plages de l'empilement.
const CERTIFICATIONS = [
  {
    src: vibeathon,
    width: 841,
    height: 595,
    title: "Vibeathon",
    issuer: "Première édition, catégorie compétiteur",
    award: "2e place",
    year: "2026",
    alt: "Certificat de participation au Vibeathon 2026",
  },
  {
    src: claude101,
    width: 1280,
    height: 876,
    title: "Claude 101",
    issuer: "Claude Academy, badge de fin de cours",
    year: "2026",
    alt: "Badge Claude 101 de Claude Academy délivré à Kebe Abdoul Kader le 25 octobre 2026",
    verify: "https://academy.claude.com/verify/e4c3ffc0140d269bbff3747880022688",
  },
  {
    src: cert4,
    width: 1280,
    height: 960,
    title: "Incub'Ivoir",
    issuer: "CDC-CI Capital, Agence Emploi Jeunes, Startups",
    year: "2026",
    alt: "Certificat de participation Incub'Ivoir, CDC-CI Capital et Agence Emploi Jeunes",
  },
  {
    src: cert5,
    width: 1280,
    height: 960,
    title: "Concours Génie UPB",
    issuer: "Université Polytechnique de Bingerville",
    year: "2026",
    alt: "Certificat du concours Génie UPB, Université Polytechnique de Bingerville",
  },
  {
    src: cert6,
    width: 1280,
    height: 960,
    title: "Concours épite",
    issuer: "épite, première édition",
    year: "2024",
    alt: "Diplôme de participation au concours épite 2024, meilleur pitch de projet éducatif",
  },
];

export default function Certifications() {
  const { t } = useLang();
  const containerRef = useRef(null);
  useArrivees(containerRef);

  // Chaque carte recouverte rétrécit entre le moment où elle se colle et celui
  // où la dernière se colle. L'animation est en CSS (`.pile-carte` dans
  // index.css), jouée sur la position de défilement de la page ; ce code ne
  // fait que calculer ses deux bornes, une fois, puis à chaque changement de
  // taille. Avant, GSAP ScrollTrigger recalculait à chaque défilement, partout
  // sur la page, même à l'autre bout du site.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const cards = [...el.querySelectorAll(".stack-card")];
      // Position de repos de chaque carte, avant tout collage : on cumule les
      // hauteurs dans le flux, le chevauchement négatif compris. Un
      // `offsetTop` sur un élément collé renverrait sa position collée.
      let y = documentTop(el);
      const restTops = cards.map((card) => {
        const top = y;
        y += card.offsetHeight + parseFloat(getComputedStyle(card).marginBottom || "0");
        return top;
      });
      const last = cards.length - 1;
      const end = restTops[last] - (STICKY_TOP + last * STACK_STEP);

      cards.forEach((card, i) => {
        const inner = card.querySelector(".stack-card-inner");
        if (i === last) return;
        const start = restTops[i] - (STICKY_TOP + i * STACK_STEP);
        inner.style.setProperty("--pile-debut", `${Math.round(start)}px`);
        inner.style.setProperty("--pile-fin", `${Math.round(end)}px`);
        inner.style.setProperty("--pile-echelle", String(1 - (last - i) * SCALE_STEP));
      });
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      className="bg-black py-24 scroll-mt-24"
    >
      <RevealTitle
        text={t.certifications.title}
        highlight={t.certifications.titleHighlight}
        className="text-center text-4xl md:text-5xl font-semibold text-white mb-16"
      />

      {/* --card-h pilote la hauteur de l'image ET le chevauchement, pour que
          les deux restent cohérents à toutes les tailles d'écran. */}
      <div
        ref={containerRef}
        className="px-4 md:px-6 [--card-h:62vw] sm:[--card-h:min(52vh,400px)]"
      >
        {CERTIFICATIONS.map((cert, i) => (
          <div
            key={cert.src}
            className="stack-card sticky"
            style={{
              zIndex: i + 1,
              top: STICKY_TOP + i * STACK_STEP,
              marginBottom:
                i === CERTIFICATIONS.length - 1
                  ? 0
                  : `calc(var(--card-h) * -${OVERLAP})`,
            }}
          >
            <div className={`stack-card-inner origin-top mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-black shadow-xl shadow-black/60 ${i < CERTIFICATIONS.length - 1 ? "pile-carte" : ""}`}>
              {/* Deux colonnes en desktop : l'image seule laissait de grandes
                  bandes vides de chaque côté sur les grands écrans. */}
              <div className="grid md:grid-cols-[1.5fr_1fr]">
                <div className="cadre-image relative flex items-center justify-center bg-surface p-3 md:p-5">
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    width={cert.width}
                    height={cert.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-(--card-h) w-full object-contain rounded-lg"
                  />
                  {cert.award && (
                    <div aria-hidden="true" className="tampon absolute right-4 top-4 md:right-7 md:top-7">
                      <span className="tampon-encre absolute inset-0 rounded-full bg-accent/40 blur-md opacity-0" />
                      <span className="relative grid h-20 w-20 rotate-[-12deg] place-items-center rounded-full border-[3px] border-double border-accent bg-black/75 text-center font-mono text-[0.65rem] font-bold uppercase leading-tight tracking-widest text-accent md:h-24 md:w-24 md:text-xs">
                        {cert.award}
                        <br />
                        {cert.year}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center gap-3 border-t border-line p-6 md:border-t-0 md:border-l md:p-8">
                  <div className="relative self-start">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      {cert.title}
                    </h3>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 12"
                      preserveAspectRatio="none"
                      className="absolute -bottom-2 left-0 h-2.5 w-full overflow-visible"
                    >
                      <path className="trait-feutre trait-souligne" d={TRAIT_SOULIGNE} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </div>
                  {cert.issuer && (
                    <p className="text-sm leading-relaxed text-white/50">
                      {cert.issuer}
                    </p>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    {/* La boucle entoure la distinction, ou l'année à défaut. */}
                    <span className="relative inline-flex">
                      <span
                        className={
                          cert.award
                            ? "rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-accent/30"
                            : "rounded-full bg-surface px-3 py-1 text-xs font-medium text-white/60 ring-1 ring-line"
                        }
                      >
                        {cert.award ?? cert.year}
                      </span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 120 52"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute -inset-x-3 -inset-y-2.5 h-[calc(100%+1.25rem)] w-[calc(100%+1.5rem)] overflow-visible"
                      >
                        <path className="trait-feutre trait-boucle" d={TRAIT_BOUCLE} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                      </svg>
                    </span>
                    {cert.award && cert.year && (
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-white/60 ring-1 ring-line">
                        {cert.year}
                      </span>
                    )}
                  </div>
                  {cert.verify && (
                    <a
                      href={cert.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 self-start items-center gap-2 rounded-full px-4 text-sm font-semibold text-accent ring-1 ring-accent/40 transition-[transform,background-color] duration-(--duration-base) ease-out-expo hover:-translate-y-0.5 hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {t.certifications.verify}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
