import { useEffect, useId, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PROJETS, domaine, numero } from "./donnees";
import Couverture from "./Couverture";

const BOUTON_ROND =
  "grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line transition-colors duration-(--duration-rapide) hover:border-white/60 focus-visible:outline-2 focus-visible:outline-accent";

// Lecture d'un livre : un <dialog> natif, qui gère seul le piège du focus,
// la touche Échap et le retour du focus sur le livre cliqué.
export default function Lecture({ index, setIndex, t }) {
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
              <button type="button" onClick={() => aller(-1)} aria-label={t.projects.prev} className={BOUTON_ROND}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => aller(1)} aria-label={t.projects.next} className={BOUTON_ROND}>
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
