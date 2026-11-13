import Tremble from "./Tremble";

// Petite note « écrite à la main » avec une flèche au trait qui tremble,
// pointée vers la photo (inspirée de codeofsagar.in). Sous la photo sur
// téléphone, à sa droite à partir de 768 px.
export default function NoteManuscrite({ texte }) {
  return (
    // Largeur bornée à celle de la photo sur téléphone : sinon la note
    // élargit le bloc et la photo n'est plus centrée.
    <p className="mt-4 flex max-w-40 items-start justify-center gap-1 sm:max-w-56 md:max-w-none text-base italic leading-snug text-white/75 md:absolute md:left-full md:top-[58%] md:ml-2 md:mt-0 md:w-44 md:justify-start">
      <Tremble viewBox="0 0 40 40" intensite={2} className="h-10 w-10 shrink-0">
        <g fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M34 36C30 20 22 10 8 6" />
          <path d="M8 6L17 4M8 6L12 14" />
        </g>
      </Tremble>
      <span className="pt-4">{texte}</span>
    </p>
  );
}
