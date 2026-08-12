import { Suspense, lazy, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import SceneErrorBoundary from './SceneErrorBoundary';

// La scène 3D est chargée à la demande : elle entraîne three, fiber et drei,
// soit 1,1 Mo de JS, plus le modèle. Rien de tout ça ne doit partir tant que le
// visiteur n'approche pas de cette section, tout en bas de la page.
const CarScene = lazy(() => import('./CarScene'));

const SceneFallback = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#7c3aed',
      fontSize: '14px',
      letterSpacing: '1px',
    }}
  >
    Loading 3D...
  </div>
);

export default function NewContact() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef(null);
  // `isNear` déclenche le chargement de la 3D et pilote sa boucle de rendu.
  // `sceneMounted` ne redescend jamais : une fois la scène montée on la garde,
  // la démonter détruirait le contexte WebGL à chaque aller-retour de scroll.
  const [isNear, setIsNear] = useState(false);
  const [sceneMounted, setSceneMounted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNear(entry.isIntersecting);
        if (entry.isIntersecting) setSceneMounted(true);
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sectionBg = isDark ? '#020617' : '#f5f3ff';
  const sectionColor = isDark ? '#fff' : '#1e1b4b';

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
          {/* Montée seulement à l'approche de la section, jamais au chargement,
              et isolée : si le WebGL échoue, la section reste debout. */}
          {sceneMounted && (
            <SceneErrorBoundary fallback={null}>
              <Suspense fallback={<SceneFallback />}>
                <CarScene active={isNear} />
              </Suspense>
            </SceneErrorBoundary>
          )}
        </div>
      </div>
    </motion.section>
  );
}