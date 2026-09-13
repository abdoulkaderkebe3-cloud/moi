import { motion } from "framer-motion";

// Système d'entrée au défilement partagé par toutes les sections. Avant lui,
// chaque section faisait le même fondu de 50 px en 0,8 s, réglé à la main dans
// chaque fichier : répétitif à l'œil et impossible à retoucher d'un coup.
// Les durées restent dans la fourchette de 150 à 250 ms, c'est l'enchaînement
// en cascade qui donne le relief, pas la lenteur.

// Courbe « expo out » : départ franc, arrivée douce. Un easeOut standard
// paraît mou sur des durées aussi courtes.
const EASE = [0.16, 1, 0.3, 1];

// Déclenchement un peu avant que l'élément soit pleinement à l'écran, une
// seule fois : rejouer l'entrée à chaque passage fatigue vite.
const VIEWPORT = { once: true, margin: "-80px" };

const groupVariants = {
  hidden: {},
  visible: (stagger = 0.06) => ({
    transition: { staggerChildren: stagger },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
};

// Chaque mot monte depuis sous une ligne invisible. Le masque est porté par un
// span à `overflow: hidden` ; le petit padding bas compensé par une marge
// négative évite de rogner les jambages (g, p, q) sans décaler la ligne.
const wordVariants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.25, ease: EASE } },
};

function MaskedWords({ text, className }) {
  const words = text.split(" ").filter(Boolean);
  return words.map((word, i) => (
    <span key={`${word}-${i}`}>
      <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
        <motion.span variants={wordVariants} className={`inline-block ${className ?? ""}`}>
          {word}
        </motion.span>
      </span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}

// Titre de section en deux temps, la partie neutre et la partie en accent, sur
// le modèle déjà utilisé partout (`title` + `titleHighlight`). `highlightFirst`
// couvre À propos, où l'accent ouvre le titre.
export function RevealTitle({ as: Tag = "h2", text, highlight, highlightFirst = false, ...props }) {
  const MotionTag = motion[Tag];
  const plain = text ? <MaskedWords text={text} /> : null;
  const accent = highlight ? <MaskedWords text={highlight} className="text-accent" /> : null;
  const [first, second] = highlightFirst ? [accent, plain] : [plain, accent];
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={groupVariants}
      custom={0.05}
      {...props}
    >
      {first}
      {first && second ? " " : null}
      {second}
    </MotionTag>
  );
}

// Conteneur dont les `RevealItem` directs entrent l'un après l'autre.
export function RevealGroup({ as = "div", stagger = 0.06, children, ...props }) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={groupVariants}
      custom={stagger}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ as = "div", children, ...props }) {
  const MotionTag = motion[as];
  return (
    <MotionTag variants={itemVariants} {...props}>
      {children}
    </MotionTag>
  );
}
