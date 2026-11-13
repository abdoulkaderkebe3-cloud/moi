import Tremble from "../../Tremble";

// Lampe sur pied, avec son halo chaud projeté sur le mur noir.
export default function Lampe({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div className="absolute -top-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-[radial-gradient(rgb(var(--accent-rgb)/0.22),transparent_65%)]" />
      <Tremble viewBox="0 0 80 200" className="relative h-full w-full">
        <path d="M40 50V192" stroke="#8a6243" strokeWidth="4" />
        <ellipse cx="40" cy="194" rx="18" ry="5" fill="#5c3f29" />
        <path d="M16 50L28 8H52L64 50Z" fill="var(--color-accent)" />
        {/* Le dessous de l'abat-jour, là où la lumière sort. */}
        <ellipse cx="40" cy="50" rx="24" ry="4" fill="#fff6e0" />
      </Tremble>
    </div>
  );
}
