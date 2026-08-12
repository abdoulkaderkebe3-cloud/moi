import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cert4 from "../assets/images/png/photo_2026-05-25_17-16-15.webp";
import cert5 from "../assets/images/png/photo_2026-05-25_17-16-53.webp";
import cert6 from "../assets/images/png/photo_2026-05-25_17-12-56.webp";
import vibeathon from "../assets/images/png/certificat-vibeathon-2026.webp";
import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

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
// layout qui décalerait les mesures de ScrollTrigger.
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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    // Sans l'empilement animé, les cartes restent simplement collantes.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray(".stack-card", el);
      const last = cards[cards.length - 1];

      cards.slice(0, -1).forEach((card, i) => {
        const depth = cards.length - 1 - i;

        gsap.to(card.querySelector(".stack-card-inner"), {
          scale: 1 - depth * SCALE_STEP,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: `top ${STICKY_TOP + i * STACK_STEP}px`,
            endTrigger: last,
            end: `top ${STICKY_TOP + (cards.length - 1) * STACK_STEP}px`,
            scrub: true,
          },
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="certifications"
      className="bg-white dark:bg-slate-950 py-24 scroll-mt-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-16"
      >
        {t.certifications.title}{" "}
        <span className="text-violet-600 dark:text-violet-500">
          {t.certifications.titleHighlight}
        </span>
      </motion.h2>

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
            <div className="stack-card-inner origin-top mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-violet-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm will-change-transform">
              {/* Deux colonnes en desktop : l'image seule laissait de grandes
                  bandes vides de chaque côté sur les grands écrans. */}
              <div className="grid md:grid-cols-[1.5fr_1fr]">
                <div className="flex items-center justify-center bg-violet-50/70 dark:bg-slate-950/40 p-3 md:p-5">
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

                <div className="flex flex-col justify-center gap-3 border-t border-violet-100 p-6 md:border-t-0 md:border-l md:p-8 dark:border-white/10">
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white">
                    {cert.title}
                  </h3>
                  {cert.issuer && (
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {cert.issuer}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    {cert.award && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-300/70 dark:bg-amber-400/15 dark:text-amber-300 dark:ring-amber-400/30">
                        {cert.award}
                      </span>
                    )}
                    {cert.year && (
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
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
