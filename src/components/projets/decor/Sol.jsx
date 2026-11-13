// Sol en damier vu en perspective : un plan incliné vers le mur, assombri
// au fond pour se fondre dans le noir de la pièce.
export default function Sol() {
  return (
    <div aria-hidden="true" className="relative h-16 overflow-hidden perspective-[320px] md:h-24">
      <div className="absolute inset-x-[-40%] bottom-0 h-[300%] origin-bottom transform-[rotateX(68deg)] bg-[repeating-conic-gradient(var(--color-accent)_0_25%,#111_0_50%)] bg-size-[110px_110px]" />
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-transparent" />
    </div>
  );
}
