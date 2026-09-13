// Position d'un élément depuis le haut du document, calculée sur la mise en
// page et non sur le rendu : contrairement à `getBoundingClientRect`, elle
// ignore les transforms des animations de défilement. Destinée à être lue une
// fois puis mise en cache, jamais à chaque image.
export function documentTop(el) {
  let y = 0;
  for (let node = el; node; node = node.offsetParent) y += node.offsetTop;
  return y;
}
