import { useEffect, useRef, useState } from "react";
import portraitImg from "../assets/images/png/kader-portrait-2026.webp";

import { useLang } from "../context/LanguageContext";
import { RevealTitle } from "./Reveal";

// Toute l'animation de cette section est en CSS, pilotée par le défilement
// (`.ap-section`, `.ap-image`, `.ap-texte`, `.ap-mot` dans index.css).
// L'ancienne version tenait huit ressorts framer-motion et un ScrollTrigger
// GSAP qui animait l'opacité ET un flou sur chaque mot : la section la plus
// lente du site au défilement. L'effet de texte est conservé à l'œil, voir
// TextContent pour la façon dont il est rendu sans ce coût.
export default function About() {
  const { t } = useLang();

  return (
    <section
      id="a-propos"
      className="ap-section relative min-h-screen bg-black text-white px-6 md:px-20 py-20 flex items-center scroll-mt-24"
    >
      {/* `clip` et non `hidden` : `hidden` ferait de ce bloc un conteneur de
          défilement, et les `view()` des paragraphes se caleraient sur lui,
          qui ne défile jamais, au lieu de la page. Le texte restait figé à
          moitié flou. */}
      <div className="overflow-clip w-full">
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="ap-image flex justify-center">
            <ImageContent />
          </div>

          <div className="ap-texte max-w-xl">
            <TextContent t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageContent() {
  return (
    <div className="relative group">
      <img
        src={portraitImg}
        alt="Kebe Abdoul Kader"
        width={576}
        height={576}
        decoding="async"
        className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-2xl"
      />
      <div className="absolute inset-0 rounded-2xl bg-accent opacity-10 blur-2xl group-hover:opacity-20 transition duration-500" />
    </div>
  );
}

// Durées reprises de l'ancien ScrollReveal (GSAP) : chaque mot met 0,5 et le
// suivant démarre 0,05 plus tard, le tout étalé sur la plage de défilement.
const WORD_DURATION = 0.5;
const WORD_STAGGER = 0.05;
const WORDS_PER_GROUP = 3;

// Regroupe les mots par paquets, espaces et retours à la ligne compris, pour
// que chaque paquet s'anime comme un seul élément.
function groupWords(parts, size) {
  const groups = [];
  let current = "";
  let count = 0;
  for (const part of parts) {
    current += part;
    if (!/^\s+$/.test(part) && part !== "") {
      count += 1;
      if (count === size) {
        groups.push(current);
        current = "";
        count = 0;
      }
    }
  }
  if (current) groups.push(current);
  return groups;
}

// Chaque mot se défloute et s'éclaire à son tour, dans l'ordre de lecture,
// entre le moment où le haut du texte passe à 80 % de l'écran et celui où son
// bas touche le bas de l'écran : le même effet que la version GSAP en ligne.
//
// Ce qui change, c'est le coût. L'animation est en CSS (`.ap-mot`), jouée par
// le compositeur ; ce code ne calcule que la plage de chaque mot, une fois.
// Et elle n'est active que pendant que la section est à l'écran
// (`.ap-actif`) : chaque mot animé devient un calque, et ces ~90 calques
// laissés actifs en permanence coûtaient 20 images par seconde sur toute la
// page (mesuré de 34 à 55 i/s sans eux).
function TextContent({ t }) {
  const boxRef = useRef(null);
  const [active, setActive] = useState(false);
  const parts = t.about.text.split(/(\s+)/);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const measure = () => {
      const words = box.querySelectorAll(".ap-mot");
      const vh = window.innerHeight;
      const start = 0.2 * vh;
      const span = Math.max(vh * 0.2, box.offsetHeight - start);
      // Un paquet de mots démarre là où démarrait son premier mot.
      const stagger = WORD_STAGGER * WORDS_PER_GROUP;
      const total = WORD_DURATION + (words.length - 1) * stagger;
      words.forEach((word, i) => {
        const from = start + (span * (i * stagger)) / total;
        const to = start + (span * (i * stagger + WORD_DURATION)) / total;
        word.style.setProperty("--mot-debut", `${Math.round(from)}px`);
        word.style.setProperty("--mot-fin", `${Math.round(to)}px`);
      });
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(box);
    window.addEventListener("resize", measure);

    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "300px 0px",
    });
    observer.observe(box);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [t.about.text]);

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
      <RevealTitle
        text={t.about.titleSuffix}
        highlight={t.about.title}
        highlightFirst
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
      />
      {/* Mêmes classes que l'ancien ScrollReveal, pour un rendu identique. */}
      {/* Deux couches du même texte. Dessous, une copie floue et estompée,
          figée : un seul calque, jamais repeint. Dessus, les mots nets qui
          apparaissent un par un en fondu. À l'œil chaque mot se défloute, sans
          qu'aucun flou soit recalculé pendant le défilement : le flou animé
          mot par mot faisait tomber le site de 60 à 50 i/s en moyenne. */}
      <div ref={boxRef} className={`ap-texte-mots relative my-5 ${active ? "ap-actif" : ""}`}>
        <p
          aria-hidden="true"
          className="ap-texte-flou pointer-events-none absolute inset-0 select-none text-[clamp(1rem,2vw,1.7rem)] leading-[1.5] font-semibold text-base sm:text-lg text-white/70 leading-relaxed whitespace-pre-wrap"
        >
          {t.about.text}
        </p>
        <p className="relative text-[clamp(1rem,2vw,1.7rem)] leading-[1.5] font-semibold text-base sm:text-lg text-white/70 leading-relaxed whitespace-pre-wrap">
          {groupWords(parts, WORDS_PER_GROUP).map((group, i) => (
            <span key={i} className="ap-mot">
              {group}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
