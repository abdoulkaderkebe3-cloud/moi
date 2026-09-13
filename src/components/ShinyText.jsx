import { useEffect, useRef, useState } from 'react';

// Reflet qui balaie le texte. L'animation est en CSS (`.texte-brillant` dans
// index.css) : la version d'origine (React Bits) recalculait la position du
// dégradé en JavaScript à chaque image, sans jamais s'arrêter, même une fois
// le hero sorti de l'écran. Ici l'animation se met en pause hors champ.
// Le trajet (aller, pause, retour, pause) est fixé dans la feuille de style ;
// le squelette statique d'index.html reprend sa première image.
const ShinyText = ({
  text,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120
}) => {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      data-pause={!onScreen}
      className={`texte-brillant inline-block ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
