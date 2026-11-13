import { RevealGroup, RevealItem } from "./Reveal";

// « Comment on travaille » : les 4 étapes d'un projet, posées sous les
// cartes de Services. Volontairement sans ancre ni entrée dans la navbar,
// c'est une suite de la section, pas une section de plus.
export default function Processus({ process }) {
  return (
    <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-8 md:px-20">
      <h3 className="mb-10 text-center text-2xl font-semibold text-white md:text-3xl">{process.title}</h3>
      <RevealGroup as="ol" className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {process.steps.map((etape, i) => (
          <RevealItem as="li" key={etape.title} className="border-t border-line pt-5">
            <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 text-lg font-semibold text-white">{etape.title}</p>
            <p className="mt-2 text-base leading-relaxed text-white/70">{etape.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
