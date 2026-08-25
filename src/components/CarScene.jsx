import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, Environment, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Toute la 3D vit dans ce module à part : importé en lazy par NewContact, il
// garde three, fiber et drei (1,1 Mo de JS) hors du chargement initial du site.
// Le preload ne se déclenche donc qu'une fois ce chunk demandé, à l'approche
// de la section, et non plus dès l'ouverture de la page d'accueil.
useGLTF.preload('/ToyCar.glb');

const CarModel = React.memo(function CarModel() {
  const { scene } = useGLTF('/ToyCar.glb');
  const meshRef = useRef();

  // Cloner la scène pour éviter des conflits si réutilisée
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Centrage automatique : on ramène le centre du modèle à l'origine
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.position.set(-center.x, -center.y, -center.z);
  }, [clonedScene]);

  // Rotation lente et continue du modèle lui-même. L'utilisateur, lui, fait
  // pivoter la caméra via OrbitControls : les deux se composent sans conflit.
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      <primitive ref={meshRef} object={clonedScene} scale={[40, 40, 40]} rotation={[0, -Math.PI / 4, 0]} />
    </group>
  );
});

// Carte d'environnement servie en local. `Environment preset="forest"` allait
// chercher 1,9 Mo de HDR sur un CDN tiers (raw.githack) à chaque visite : c'est
// le même panorama, tone-mappé en WebP de 206 Ko et hébergé avec le site.
function LocalEnvironment() {
  const texture = useTexture('/env-forest.webp');
  // Copie configurée dans un useMemo : la texture rendue par useTexture est
  // partagée via le cache de drei, la muter pendant le rendu est interdit.
  const envMap = useMemo(() => {
    const map = texture.clone();
    map.mapping = THREE.EquirectangularReflectionMapping;
    map.colorSpace = THREE.SRGBColorSpace;
    map.needsUpdate = true;
    return map;
  }, [texture]);

  return <Environment map={envMap} background={false} />;
}

const CanvasLoader = () => (
  <Html center>
    <div style={{ color: 'var(--color-accent)', fontSize: '14px', fontWeight: 400, letterSpacing: '1px' }}>
      Loading 3D...
    </div>
  </Html>
);

export default function CarScene({ active = true }) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      dpr={1}
      // Hors champ, on coupe la boucle de rendu au lieu de tourner dans le vide.
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      gl={{ preserveDrawingBuffer: false, alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, -5]} intensity={1.5} />
      <directionalLight position={[-5, 5, 5]} intensity={0.7} />

      <Suspense fallback={<CanvasLoader />}>
        <CarModel />
        <LocalEnvironment />
      </Suspense>

      {/* Prise en main à la souris et au doigt. Le zoom et le panoramique
          restent désactivés pour ne pas voler le scroll de la page. */}
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}
