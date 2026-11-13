// Post-it épinglé au mur, un peu de travers.
export default function PostIt({ texte, className = "" }) {
  return (
    <p
      aria-hidden="true"
      className={`pointer-events-none absolute w-32 rotate-[-5deg] bg-[#c9b4f0] px-4 pb-5 pt-7 text-center text-sm font-semibold uppercase leading-snug tracking-wide text-black shadow-[4px_8px_14px_rgba(0,0,0,0.6)] ${className}`}
    >
      <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#d4423b] shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />
      {texte}
    </p>
  );
}
