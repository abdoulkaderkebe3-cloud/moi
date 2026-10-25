import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Inspiré du catalogue A24 de Ravi Klaassens : un disque par projet, posés sur
// une diagonale qui monte vers la droite, le disque actif au centre. Le
// défilement de la page pilote `positionRef` (index continu), la scène ne fait
// que le suivre en douceur.

const RAYON = 1;
// Écart entre deux disques le long de la diagonale. Le z fait grossir les
// disques de droite, comme sur la référence.
const PAS = new THREE.Vector3(2.15, 0.95, 0.7);

// Une capture 16:10 recadrée au carré, centrée : le disque la découpe en rond.
function recadrerCarre(texture) {
  const img = texture.image;
  const ratio = img.width / img.height;
  if (ratio > 1) {
    texture.repeat.set(1 / ratio, 1);
    texture.offset.set((1 - 1 / ratio) / 2, 0);
  } else {
    texture.repeat.set(1, ratio);
    texture.offset.set(0, (1 - ratio) / 2);
  }
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

// Étiquette dessinée pour un projet sans capture (ex. une API sans interface).
function etiquette({ titre, sousTitre }) {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const g = c.getContext("2d");
  // Fond beige (l'accent du site) : un disque sombre disparaissait sur la
  // page noire.
  const fond = g.createRadialGradient(512, 512, 120, 512, 512, 560);
  fond.addColorStop(0, "#efe6d3");
  fond.addColorStop(1, "#cfc2a6");
  g.fillStyle = fond;
  g.fillRect(0, 0, 1024, 1024);
  g.fillStyle = "#14120f";
  g.textAlign = "center";
  g.font = "700 92px ui-sans-serif, system-ui, sans-serif";
  titre.split("\n").forEach((ligne, i) => g.fillText(ligne, 512, 250 + i * 100));
  g.fillStyle = "rgba(20, 18, 15, 0.65)";
  g.font = "500 44px system-ui, sans-serif";
  g.fillText(sousTitre, 512, 800);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Gribouillis repris de la référence : deux boucles de marqueur autour du
// disque actif, redessinées à 10 images par seconde avec un léger
// tremblement, comme une animation image par image. Elles se tracent en trois
// étapes, restent, puis s'effacent dans l'ordre inverse.
const POINTS = 64;
const BOUCLES = 2;
const ETAPES = [0.35, 0.7, 1.06];
const LARGEUR = 0.035;

function creerRuban() {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array((POINTS + 1) * 6), 3));
  const index = [];
  for (let i = 0; i < POINTS; i++) {
    const a = i * 2;
    index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  g.setIndex(index);
  return g;
}

// Un tour partiel de rayon légèrement irrégulier, plus fin aux deux bouts
// comme un trait de feutre. Les phases changent à chaque image : c'est ce qui
// fait « bouillir » le trait.
function tracer(geo, rayon, tour, debut) {
  const pos = geo.attributes.position.array;
  const p1 = Math.random() * 6.28;
  const p2 = Math.random() * 6.28;
  for (let i = 0; i <= POINTS; i++) {
    const u = i / POINTS;
    const ang = debut + u * tour * Math.PI * 2;
    const r = rayon * (1 + 0.022 * Math.sin(3 * ang + p1) + 0.012 * Math.sin(7 * ang + p2));
    const demi = (LARGEUR * (0.3 + 0.7 * Math.sin(Math.PI * u))) / 2;
    const c = Math.cos(ang);
    const s = Math.sin(ang);
    pos.set([c * (r - demi), s * (r - demi), 0, c * (r + demi), s * (r + demi), 0], i * 6);
  }
  geo.attributes.position.needsUpdate = true;
  geo.computeBoundingSphere();
}

function Gribouillis({ index, positionRef }) {
  const groupe = useRef();
  const rubans = useMemo(() => Array.from({ length: BOUCLES }, creerRuban), []);
  const etat = useRef({ etape: -1, dernier: 0, debuts: [0, 0] });

  useFrame(({ clock }) => {
    const e = etat.current;
    const t = clock.elapsedTime;
    if (t - e.dernier < 0.1) return;
    e.dernier = t;
    // Dès que le disque est posé au centre, sans attendre un survol : sur
    // téléphone il n'y en a pas, les cercles n'apparaissaient jamais.
    const veut = Math.abs(positionRef.current - index) < 0.08;
    if (veut && e.etape < 0) e.debuts = e.debuts.map(() => Math.random() * Math.PI * 2);
    e.etape = veut ? Math.min(e.etape + 1, ETAPES.length - 1) : Math.max(e.etape - 1, -1);
    groupe.current.visible = e.etape >= 0;
    if (e.etape < 0) return;
    rubans.forEach((geo, k) =>
      tracer(geo, RAYON * (1.07 + k * 0.05), ETAPES[e.etape] * (1 + (Math.random() - 0.5) * 0.12), e.debuts[k])
    );
  });

  return (
    <group ref={groupe} visible={false} position={[0, 0, 0.02]}>
      {rubans.map((geo, k) => (
        <mesh key={k} geometry={geo} renderOrder={10}>
          <meshBasicMaterial color="#e8dcc4" side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Disque({ texture, index, href, positionRef, onChoisir }) {
  const groupe = useRef();

  // Le disque actif ouvre son projet, un disque voisin fait défiler jusqu'à
  // lui : on ne quitte jamais la page pour un projet qu'on ne voit pas en
  // détail à gauche.
  const cliquer = (e) => {
    e.stopPropagation();
    if (Math.round(positionRef.current) === index) window.open(href, "_blank", "noopener");
    else onChoisir(index);
  };

  useFrame(() => {
    const d = index - positionRef.current;
    groupe.current.position.set(d * PAS.x, d * PAS.y, d * PAS.z);
    // Les disques loin du centre s'effacent au lieu de sortir brutalement.
    const loin = Math.min(Math.abs(d) / 3, 1);
    groupe.current.scale.setScalar(1 - loin * 0.15);
  });

  return (
    <group ref={groupe}>
      {/* Inclinaison fixe : c'est elle qui donne l'ellipse de la référence. */}
      <group rotation={[-0.62, 0.42, 0.18]}>
        <mesh
          onClick={cliquer}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        >
          <circleGeometry args={[RAYON, 96]} />
          <meshStandardMaterial map={texture} roughness={0.42} metalness={0.08} />
        </mesh>
        <Gribouillis index={index} positionRef={positionRef} />
        {/* Bord argenté, vu de biais il donne l'épaisseur du disque. */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.015]}>
          <cylinderGeometry args={[RAYON, RAYON, 0.03, 96, 1, true]} />
          <meshStandardMaterial color="#b9b9b9" metalness={0.9} roughness={0.25} side={THREE.DoubleSide} />
        </mesh>
        {/* Moyeu en plastique translucide, puis le trou. */}
        <mesh position={[0, 0, 0.002]}>
          <ringGeometry args={[0.15, 0.31, 64]} />
          <meshStandardMaterial color="#d8d8d8" transparent opacity={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.003]}>
          <circleGeometry args={[0.15, 48]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  );
}

function Disques({ projets, positionRef, onChoisir }) {
  const urls = useMemo(() => projets.filter((p) => p.img).map((p) => p.img), [projets]);
  const chargees = useTexture(urls);
  const textures = useMemo(() => {
    const liste = Array.isArray(chargees) ? chargees : [chargees];
    let k = 0;
    return projets.map((p) => (p.img ? recadrerCarre(liste[k++]) : etiquette(p.etiquette)));
  }, [chargees, projets]);

  // Le disque fait environ 60 % de la largeur visible sur téléphone, et ne
  // grossit plus au-delà d'un écran moyen.
  const { viewport } = useThree();
  const echelle = Math.min(viewport.width / 3.3, 1.25);
  const large = viewport.width > 7;

  const ancre = useRef();
  useFrame((state, dt) => {
    // Léger suivi du pointeur, amorti, pour que la scène respire.
    const g = ancre.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.08, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.06, 3, dt);
  });

  return (
    // Sur grand écran, la diagonale passe à droite pour laisser le bloc
    // d'infos lisible à gauche (lecture en F).
    <group ref={ancre} position={[large ? 1.3 : 0, large ? -0.2 : -0.45, 0]} scale={echelle}>
      {projets.map((p, i) => (
        <Disque
          key={p.key}
          texture={textures[i]}
          index={i}
          href={p.href}
          positionRef={positionRef}
          onChoisir={onChoisir}
        />
      ))}
    </group>
  );
}

// `cibleRef` est écrit par le défilement, `positionRef` le suit avec un
// amortissement : c'est lui que lisent les disques.
function Suivi({ cibleRef, positionRef }) {
  useFrame((_, dt) => {
    // Effet aimant : entre deux projets, la part fractionnaire est écrasée
    // par un cube. Le disque reste centré sur l'essentiel du défilement, puis
    // glisse vite vers le suivant, au lieu de s'arrêter à mi-chemin.
    const c = cibleRef.current;
    const base = Math.round(c);
    const f = (c - base) * 2;
    const cible = base + (Math.sign(f) * Math.abs(f) ** 3) / 2;
    // Première image : on part de la cible, sinon les disques défileraient
    // depuis le premier projet à chaque montage de la scène.
    if (positionRef.current === null) positionRef.current = cible;
    positionRef.current = THREE.MathUtils.damp(positionRef.current, cible, 6, dt);
  });
  return null;
}

export default function DiscScene({ projets, cibleRef, actif, onChoisir }) {
  const positionRef = useRef(null);
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={actif ? "always" : "never"}
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} />
      <Suivi cibleRef={cibleRef} positionRef={positionRef} />
      <Disques projets={projets} positionRef={positionRef} onChoisir={onChoisir} />
    </Canvas>
  );
}
