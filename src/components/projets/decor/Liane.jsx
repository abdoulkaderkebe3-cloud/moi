const VERTS = ["#4f7d3a", "#3d6b2e", "#6a9a45"];
const TIGE = "#2f4a22";
// Feuille de lierre, attachée à l'origine, pointe vers le bas.
const FEUILLE = "M0 0C-7 1-11 7-9 13C-7 18-3 19 0 24C3 19 7 18 9 13C11 7 7 1 0 0Z";

// Point d'une courbe de Bézier cubique p = [x0,y0, x1,y1, x2,y2, x3,y3] à t.
function point(p, t) {
  const u = 1 - t;
  const [a, b, c, d] = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [a * p[0] + b * p[2] + c * p[4] + d * p[6], a * p[1] + b * p[3] + c * p[5] + d * p[7]];
}

// Une tige et ses feuilles réparties le long de la courbe, alternées d'un
// côté et de l'autre, plus petites vers le bout. `decalage` varie les
// couleurs et les angles d'une liane à l'autre, sans hasard : le dessin est
// le même à chaque rendu.
export default function Liane({ p, feuilles, taille = 1, decalage = 0 }) {
  return (
    <g>
      <path d={`M${p[0]} ${p[1]}C${p.slice(2).join(" ")}`} fill="none" stroke={TIGE} strokeWidth="1.5" strokeLinecap="round" />
      {Array.from({ length: feuilles }, (_, k) => {
        const t = (k + 1) / feuilles;
        const [x, y] = point(p, t);
        const bout = k === feuilles - 1;
        const angle = bout ? 0 : (k % 2 ? 1 : -1) * (35 + ((k * 29 + decalage * 13) % 35));
        const echelle = taille * (1.1 - 0.5 * t);
        return (
          <g key={k} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle}) scale(${echelle.toFixed(2)})`}>
            <path d={FEUILLE} fill={VERTS[(k + decalage) % VERTS.length]} />
            <path d="M0 3V20" stroke={TIGE} strokeWidth="0.8" opacity="0.6" />
          </g>
        );
      })}
    </g>
  );
}
