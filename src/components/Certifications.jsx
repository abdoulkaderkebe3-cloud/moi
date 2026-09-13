import { useEffect, useRef } from "react";
import { documentTop } from "../utils/documentTop";
import cert4 from "../assets/images/png/photo_2026-05-25_17-16-15.webp";
import cert5 from "../assets/images/png/photo_2026-05-25_17-16-53.webp";
import cert6 from "../assets/images/png/photo_2026-05-25_17-12-56.webp";
import vibeathon from "../assets/images/png/certificat-vibeathon-2026.webp";
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
                <div className="flex items-center justify-center bg-surface p-3 md:p-5">
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    width={cert.width}
                    height={cert.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-(--card-h) w-full object-contain rounded-lg"
                  />
                </div>

                <div className="flex flex-col justify-center gap-3 border-t border-line p-6 md:border-t-0 md:border-l md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {cert.title}
                  </h3>
                  {cert.issuer && (
                    <p className="text-sm leading-relaxed text-white/50">
                      {cert.issuer}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    {cert.award && (
                      <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent ring-1 ring-accent/30">
                        {cert.award}
                      </span>
                    )}
                    {cert.year && (
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-white/60 ring-1 ring-line">
                        {cert.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
