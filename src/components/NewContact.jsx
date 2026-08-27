import { Suspense, lazy, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from "../context/LanguageContext";
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
      color: 'var(--color-accent)',
      fontSize: '14px',
      letterSpacing: '1px',
    }}
  >
    Loading 3D...
  </div>
);

// La scène coûte 2,25 Mo à l'arrivée dans la section : 1 Mo de moteur three,
// 1 Mo de modèle et 205 Ko d'environnement. C'est tenable en wifi, beaucoup
// moins sur un forfait mobile lent, où le téléchargement bloque le défilement
// au moment précis où le visiteur atteint le formulaire de contact. On la
// remplace alors par rien du tout, la section restant lisible sans elle.
// `navigator.connection` n'existe pas sur Safari : dans le doute, on charge.
//
// `3g` a été retiré du seuil le 27/08. `effectiveType` ne décrit pas la
// technologie réseau mais la latence et le débit mesurés : une connexion
// correcte avec de la latence, ce qui est la norme ici, est classée `3g`. La
// voiture disparaissait donc pour une grande partie des visiteurs, alors que
// l'accroche de la section la désigne explicitement. Restent écartés les cas
// où le coût est réellement prohibitif : 2g, et l'économie de données, qui est
// un choix délibéré du visiteur.
function connexionTropLente() {
  const c = navigator.connection;
  if (!c) return false;
  if (c.saveData) return true;
  return ["slow-2g", "2g"].includes(c.effectiveType);
}

export default function NewContact() {
  const { t } = useLang();
  const containerRef = useRef(null);
  // `isNear` déclenche le chargement de la 3D et pilote sa boucle de rendu.
  // `sceneMounted` ne redescend jamais : une fois la scène montée on la garde,
  // la démonter détruirait le contexte WebGL à chaque aller-retour de scroll.
  const [isNear, setIsNear] = useState(false);
  const [sceneMounted, setSceneMounted] = useState(false);
  // Évalué une seule fois, à la création de l'état : la qualité de la connexion
  // ne change quasiment jamais en cours de visite, et un effet qui poserait cet
  // état déclencherait un second rendu pour rien.
  const [scene3dAutorisee] = useState(() => !connexionTropLente());

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !scene3dAutorisee) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNear(entry.isIntersecting);
        if (entry.isIntersecting) setSceneMounted(true);
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [scene3dAutorisee]);

  const sectionBg = '#000000';
  const sectionColor = '#ffffff';

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
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', fontWeight: 600, margin: 0, color: 'rgba(255,255,255,0.55)' }}>
            {t.contact.question}{' '}
            <span style={{ color: 'var(--color-accent)' }}>{t.contact.questionHighlight}</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <motion.span
              style={{
                display: 'block',
                fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                fontWeight: 900,
                lineHeight: 1,
                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-strong) 100%)',
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
                color: 'var(--color-accent)',
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
                  border: '2px solid var(--color-accent)',
                  color: 'var(--color-accent)',
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
        {/* Sur connexion lente le conteneur n'est pas rendu du tout : réservé et
            vide, il laisserait un trou de 650 px au milieu de la section. Sans
            lui, le texte occupe simplement toute la largeur. */}
        {scene3dAutorisee && (
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
        )}
      </div>
    </motion.section>
  );
}