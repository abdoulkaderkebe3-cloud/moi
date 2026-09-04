// Icônes dessinées pour la section Services. Une bibliothèque générique
// donnait quatre pictogrammes déjà vus partout ailleurs ; ceux-ci disent
// chacun quelque chose du service qu'ils accompagnent.
//
// Même grille 24x24, même trait fin, mêmes extrémités arrondies : de loin les
// quatre se lisent comme une famille. Le trait est en `currentColor`, donc la
// couleur vient de la classe du parent et l'accent n'est écrit nulle part ici.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// Formation : un escalier qui monte, et la marche du haut porte le but.
// La progression, pas le diplôme.
export function IconTraining(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20h4v-4h4v-4h4V8h3" />
      <circle cx="18" cy="5.4" r="1.8" />
    </svg>
  );
}

// Applications sur mesure : trois étages de largeur décroissante, reliés par
// une colonne. Les données portent l'API, qui porte l'interface. Des barres
// identiques auraient donné une pile de serveurs, ce qui n'est pas le propos.
export function IconStack(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="16" width="18" height="4" rx="1.5" />
      <rect x="5.5" y="10" width="13" height="4" rx="1.5" />
      <rect x="8" y="4" width="8" height="4" rx="1.5" />
      <path d="M12 8v2M12 14v2" />
    </svg>
  );
}

// Interfaces : un gabarit de page, un bloc et ses lignes de texte. La mise en
// page avant le décor.
export function IconLayout(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18" />
      <path d="M6 6.5h0" />
      <rect x="6" y="12" width="6" height="5" rx="1.2" />
      <path d="M14.8 12.6h4M14.8 15h4M14.8 17.4h2.6" />
    </svg>
  );
}

// Développement assisté par IA : un nœud central et ses satellites. C'est de
// l'orchestration, pas une machine qui code toute seule.
export function IconOrchestration(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M6.4 6.4 9.9 9.9M17.6 6.4 14.1 9.9M6.4 17.6 9.9 14.1M17.6 17.6 14.1 14.1" />
    </svg>
  );
}
