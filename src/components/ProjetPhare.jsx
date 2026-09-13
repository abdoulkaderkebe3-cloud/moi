import ecowattDesktop from "../assets/images/png/ecowatt-desktop.webp";
import ecowattMobile from "../assets/images/png/ecowatt-mobile.webp";
import { useLang } from "../context/LanguageContext";

// Projet phare en « scroll expand » (d'après reactbits.dev/animations/scroll-expand) :
// la capture d'EcoWatt part en carte arrondie au centre de l'écran et
// s'agrandit jusqu'au plein écran pendant le défilement, le titre s'efface,
// puis la récompense et le lien apparaissent par-dessus.
//
// Le composant d'origine recalcule le clip et les échelles en JS à chaque
// image. Ici tout est joué par le navigateur (`.pp-*` dans index.css, timeline
// `view()` nommée sur la piste). Sans prise en charge ou avec
// `prefers-reduced-motion`, la carte est affichée directement dans son état
// final.
//
// Posé avant Projets et hors de `SectionTransition` : un transform sur
// l'ancêtre pendant l'entrée ferait grossir la scène collée en même temps
// qu'elle s'ouvre.
export default function ProjetPhare() {
  const { t } = useLang();
  const p = t.projects.featured;

  return (
    <section aria-labelledby="projet-phare-titre" className="pp-piste relative bg-black text-white">
      <div className="pp-scene relative w-full overflow-clip">
        <div className="pp-cadre absolute inset-0">
          <picture className="block h-full w-full">
            <source media="(min-width: 768px)" srcSet={ecowattDesktop} width="1920" height="1080" />
            <img
              src={ecowattMobile}
              width="860"
              height="1864"
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="pp-media h-full w-full object-cover object-top"
            />
          </picture>
          {/* Assombrissement constant : la capture est très claire, le titre
              blanc ne s'y lirait pas. */}
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="pp-voile absolute inset-0 bg-linear-to-t from-black from-10% via-black/80 via-45% to-black/10" aria-hidden="true" />
        </div>

        <p
          className="pp-titre pointer-events-none absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgb(0_0_0/0.5)]"
          aria-hidden="true"
        >
          EcoWatt
        </p>

        <p className="pp-indice pointer-events-none absolute bottom-8 inset-x-0 text-center text-sm tracking-widest uppercase text-white/50" aria-hidden="true">
          {p.hint}
        </p>

        <div className="pp-texte absolute inset-x-0 bottom-0 px-6 pb-16 md:px-20 md:pb-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">{p.label}</p>
            <h2 id="projet-phare-titre" className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
              EcoWatt
            </h2>
            <p className="mt-3 text-lg md:text-2xl font-semibold text-white">{p.award}</p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-white/75">{p.description}</p>
            <a
              href="https://ecowatt-rose.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-black transition-[background-color,transform] duration-200 ease-out hover:bg-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {p.cta}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
