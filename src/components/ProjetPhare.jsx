import visoDesktop from "../assets/images/png/viso-desktop.webp";
import visoMobile from "../assets/images/png/viso-mobile.webp";
import { useLang } from "../context/LanguageContext";

// Projet phare en « scroll expand » (d'après reactbits.dev/animations/scroll-expand) :
// la capture de Viso Studio part en carte arrondie au centre de l'écran et
// s'agrandit jusqu'au plein écran pendant le défilement, le titre s'efface,
// puis le texte apparaît par-dessus.
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
            <source media="(min-width: 768px)" srcSet={visoDesktop} width="1920" height="1080" />
            <img
              src={visoMobile}
              width="1290"
              height="2796"
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="pp-media h-full w-full object-cover object-top"
            />
          </picture>
          {/* Assombrissement constant : le site de Viso est sur fond blanc et
              violet clair, le titre blanc ne s'y lirait pas. */}
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div
            className="pp-voile absolute inset-0 bg-linear-to-t from-black from-20% via-black/92 via-55% to-black/15"
            aria-hidden="true"
          />
        </div>

        <p
          className="pp-titre pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgb(0_0_0/0.5)] sm:text-7xl md:text-8xl"
          aria-hidden="true"
        >
          {p.name}
        </p>

        <p
          className="pp-indice pointer-events-none absolute bottom-8 inset-x-0 text-center text-sm uppercase tracking-widest text-white/50"
          aria-hidden="true"
        >
          {p.hint}
        </p>

        <div className="pp-texte absolute inset-x-0 bottom-0 px-6 pb-16 md:px-20 md:pb-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">{p.label}</p>
            <h2 id="projet-phare-titre" className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              {p.name}
            </h2>
            <p className="mt-3 text-lg font-semibold text-white md:text-2xl">{p.subtitle}</p>
            <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">{p.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {p.facts.map((fait) => (
                <li
                  key={fait}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 md:text-sm"
                >
                  {fait}
                </li>
              ))}
            </ul>

            <a
              href="https://viso-studio.com"
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
