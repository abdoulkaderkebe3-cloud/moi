import { useEffect, useRef } from "react";
import GradualBlur from "./GradualBlur";
import cert4 from "../assets/images/png/photo_2026-05-25_17-16-15.webp"
import cert5 from "../assets/images/png/photo_2026-05-25_17-16-53.webp"
import cert6 from "../assets/images/png/photo_2026-05-25_17-12-56.webp"
import vibeathon from "../assets/images/png/certificat-vibeathon-2026.webp"
import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function Certifications() {
  const { t } = useLang();
  const ref = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastTouchY = 0;

    const handleNativeWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const delta = e.deltaY;

      // Seuil tolérant de 1px pour éviter le pixel-rounding strict
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollHeight - clientHeight - scrollTop <= 1;

      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;

      // Redirige seulement si on est vraiment au bout ET qu'on continue dans cette direction
      if ((isScrollingDown && isAtBottom) || (isScrollingUp && isAtTop)) {
        e.preventDefault();
        window.scrollBy({
          top: delta,
          behavior: "instant"
        });
      }
    };

    const handleTouchStart = (e) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const currentTouchY = e.touches[0].clientY;
      const delta = lastTouchY - currentTouchY;

      // Seuil tolérant de 1px
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollHeight - clientHeight - scrollTop <= 1;

      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;

      // Redirige seulement si on est vraiment au bout ET qu'on continue de scroller
      if ((isScrollingDown && isAtBottom && delta > 0) || (isScrollingUp && isAtTop && delta < 0)) {
        e.preventDefault();
        window.scrollBy({
          top: delta,
          behavior: "instant"
        });
      }

      lastTouchY = currentTouchY;
    };

    el.addEventListener("wheel", handleNativeWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleNativeWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      ref={ref}
      id="certifications"
      className="text-center bg-white dark:bg-slate-950 py-24 scroll-mt-24 relative"
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-16 relative z-10">
        {t.certifications.title} <span className="text-violet-600 dark:text-violet-500">{t.certifications.titleHighlight}</span>
      </h2>

      {/* Gradual Blur overlays at top and bottom to create a smooth fade effect */}
      <div className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl border border-violet-100 dark:border-white/5 bg-violet-50/60 dark:bg-slate-900/50 backdrop-blur-sm shadow-xl shadow-violet-100 dark:shadow-2xl">
        <GradualBlur
          target="parent"
          position="top"
          height="5rem"
          strength={1.1}
          divCount={5}
          curve="bezier"
          opacity={0.8}
          zIndex={20}
          style={{ pointerEvents: 'none' }}
        />

        <GradualBlur
          target="parent"
          position="bottom"
          height="5rem"
          strength={1.1}
          divCount={5}
          curve="bezier"
          opacity={0.8}
          zIndex={20}
          style={{ pointerEvents: 'none' }}
        />

        <div
          ref={scrollRef}
          className="max-h-[550px] overflow-y-auto px-6 md:px-24 py-12 scrollbar-thin"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(139, 92, 246, 0.4) rgba(237, 233, 254, 0.5)'
          }}
        >
          <img
            src={vibeathon}
            alt="Certification Vibeathon 2026"
            loading="lazy"
            className="w-full mb-12 rounded-xl shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:scale-[1.01]"
          />

          <img
            src={cert4}
            alt="Certification"
            loading="lazy"
            className="w-full mb-12 rounded-xl shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:scale-[1.01]"
          />

          <img
            src={cert5}
            alt="Certification"
            loading="lazy"
            className="w-full mb-12 rounded-xl shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:scale-[1.01]"
          />

          <img
            src={cert6}
            alt="Certification"
            loading="lazy"
            className="w-full rounded-xl shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:scale-[1.01]"
          />
        </div>
      </div>
    </motion.section>
  );
}