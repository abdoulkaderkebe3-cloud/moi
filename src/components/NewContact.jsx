import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, Environment } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

// Pre-load the massive 3D model en local pour des performances monstres (CDN Vercel)
useGLTF.preload("/ToyCar.glb");

// ✅ Eviter les re-render inutiles (React.memo)
const CarModel = React.memo(() => {
  const { scene } = useGLTF("/ToyCar.glb");
  const meshRef = useRef();

  // Cloner la scène pour éviter des conflits si réutilisée
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Centrage automatique et calcul de la taille
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    // On déplace le modèle pour que son centre soit à 0,0,0
    clonedScene.position.set(-center.x, -center.y, -center.z);
  }, [clonedScene]);

  // ✅ Animation cinématique ultra-fluide (lent et majestueux pour masquer toute perception de lag)
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group position={[0, -0.5, 0]}> {/* Décalé un peu pour compenser la taille colossale */}
      <primitive
        ref={meshRef}
        object={clonedScene}
        // ✅ SCALE COLOSSAL: passage au maximum recommandé (30).
        scale={[40, 40, 40]}
        rotation={[0, -Math.PI / 4, 0]}
      />
    </group>
  );
});

// ✅ Loader pendant le chargement du modèle
const CanvasLoader = () => (
  <Html center>
    <div style={{ color: '#7c3aed', fontSize: '14px', fontWeight: 400, letterSpacing: '1px' }}>
      Loading 3D...
    </div>
  </Html>
);

export default function NewContact() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  // ✅ Permet de détecter si la section Contact est visible à l'écran
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  const sectionBg = isDark ? '#020617' : '#f5f3ff';
  const sectionColor = isDark ? '#fff' : '#1e1b4b';
  const questionHighlightColor = isDark ? '#94a3b8' : '#a78bfa';

  return (
    <section
      id="contact"
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        background: sectionBg,
        color: sectionColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap', // ✅ Responsive: sur mobile, la voiture passe en dessous
          alignItems: 'center', // ✅ Alignement vertical parfait (align-items: center)
          justifyContent: 'space-between',
          gap: 'clamp(40px, 5vw, 80px)',
        }}
      >
        {/* ── LEFT: Text ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            flex: '1 1 40%', // ✅ Texte à gauche
            minWidth: '280px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            zIndex: 2,
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', fontWeight: 600, margin: 0, color: isDark ? '#94a3b8' : '#4f46e5' }}>
            {t.contact.question}{' '}{t.contact.questionHighlight}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <motion.span
              style={{
                display: 'block',
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                fontWeight: 900,
                lineHeight: 1,
                background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
              }}
              animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(30deg)', 'hue-rotate(0deg)'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t.contact.cta}
            </motion.span>

            <motion.a
              href="mailto:abdoulkaderkebe3@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                textDecoration: 'none', 
                cursor: 'pointer',
                color: isDark ? '#a78bfa' : '#6366f1',
                alignSelf: 'flex-end',
                marginTop: '1.5rem'
              }}
            >
              <span style={{ 
                fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)', 
                fontWeight: 600, 
                letterSpacing: '0.5px' 
              }}>
                abdoulkaderkebe3@gmail.com
              </span>
              
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'clamp(2rem, 3.5vw, 3rem)',
                  height: 'clamp(2rem, 3.5vw, 3rem)',
                  borderRadius: '50%',
                  border: `2px solid ${isDark ? '#a78bfa' : '#6366f1'}`,
                  color: isDark ? '#a78bfa' : '#6366f1',
                }}
                animate={{ 
                  y: [0, -3, 0],
                  x: [0, 3, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              >
                <ArrowUpRight style={{ width: '60%', height: '60%', strokeWidth: 2.5 }} />
              </motion.div>
            </motion.a>
          </div>

        </motion.div>

        {/* ── RIGHT: 3D Car ── */}
        <div
          style={{
            // ✅ La voiture doit prendre environ 40 à 50% de la largeur
            flex: '1 1 45%',
            minWidth: '300px',
            height: 'clamp(350px, 50vw, 650px)',
            position: 'relative',
            touchAction: 'pan-y', // ✅ site fluide au scroll sur mobile
            // ✅ Canvas ne doit pas dépasser son conteneur
            overflow: 'hidden',
            borderRadius: '24px', // optionnel pour éviter que la 3D ne déborde sous l'écran
          }}
        >
          {/* THREE.JS Scene Directe */}
          <Canvas
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
            dpr={1}
            // ✅ STOCKEZ LA PERF: Si on scrolle plus haut, on coupe complètement l'animation 3D ("demand" = pause).
            frameloop={isInView ? "always" : "demand"}
            camera={{ position: [0, 0, 4.5], fov: 40 }}
            gl={{ preserveDrawingBuffer: false, alpha: true, antialias: true, powerPreference: 'high-performance' }}
          >
            {/* ✅ Désactiver les options coûteuses (ombres très simples ou désactivées) */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, -5]} intensity={1.5} />
            <directionalLight position={[-5, 5, 5]} intensity={0.7} />

            {/* ✅ Suspense pour charger le modèle */}
            <Suspense fallback={<CanvasLoader />}>
              <CarModel />
              {/* Environment allégé avec résolution très faible pour économiser la mémoire vidéo (VRAM) */}
              <Environment preset="forest" background={false} resolution={256} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}