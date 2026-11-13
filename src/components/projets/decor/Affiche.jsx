// Affiche encadrée au mur : le panneau d'accueil de la bibliothèque.
export default function Affiche({ lignes, legende, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute w-48 rotate-2 border-10 border-[#5c3f29] bg-accent px-3 py-5 text-center text-black shadow-[6px_10px_20px_rgba(0,0,0,0.7)] ${className}`}
    >
      <p className="text-lg font-extrabold uppercase leading-tight">
        {lignes.map((ligne) => (
          <span key={ligne} className="block">{ligne}</span>
        ))}
      </p>
      <p className="mt-3 font-mono text-xs text-black/70">{legende}</p>
    </div>
  );
}
