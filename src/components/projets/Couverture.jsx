import { numero } from "./donnees";

// La couverture se dimensionne en unités de conteneur (cqw) : la même sert
// sur l'étagère et en grand dans la lecture.
export default function Couverture({ p, i, t }) {
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
