// Bandeau qui défile au pied de la pièce. Le texte est répété un nombre pair
// de fois : `animate-marquee` le décale de moitié, la boucle tombe donc juste.
export default function Bandeau({ texte }) {
  const ligne = `${Array(6).fill(texte).join(" ✦ ")} ✦ `;
  return (
    <div aria-hidden="true" className="select-none overflow-hidden bg-accent py-3 text-black">
      <p className="w-max animate-marquee whitespace-nowrap text-lg italic motion-reduce:animate-none">
        {ligne}
      </p>
    </div>
  );
}
