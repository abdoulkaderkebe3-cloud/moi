import Couverture from "./Couverture";

// Un livre debout, couverture de face, dos visible à gauche. Le survol et le
// focus clavier le sortent à moitié de l'étagère, le clic l'ouvre.
export default function Livre({ p, i, t, onOuvrir }) {
  return (
    <button
      type="button"
      onClick={() => onOuvrir(i)}
      aria-label={`${t.projects.open} ${t.projects[p.key]}`}
      aria-haspopup="dialog"
      className="livre group block w-23 cursor-pointer rounded-sm outline-none perspective-[700px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-8 focus-visible:ring-offset-black sm:w-27 md:w-32"
    >
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
    </button>
  );
}
