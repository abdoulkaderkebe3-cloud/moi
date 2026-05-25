import { useEffect, useRef } from "react";
import GradualBlur from "./GradualBlur";
// import cert1 from "../../public/Screenshot 2026-03-01 164744.png"
// import cert2 from "../../public/Screenshot 2026-03-01 164822.png"
// import cert3 from "../../public/Screenshot 2026-03-01 164843.png"
import cert4 from "../assets/images/png/photo_2026-03-02_18-55-22-removebg-preview.png"
import cert5 from "../assets/images/png/pepite.png"
import cert6 from "../assets/images/png/photo_2026-05-03_22-00-27.jpg"
import { useLang } from "../context/LanguageContext";

export default function Certifications() {
  const { t } = useLang();
  const ref = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleNativeWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const delta = e.deltaY;

      // Seuils tolérants de 6px pour éviter tout blocage de pixel-rounding
      const isAtTop = scrollTop <= 6;
      const isAtBottom = scrollHeight - clientHeight - scrollTop <= 6;

      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;

      // Si on dépasse la limite haute ou basse, on redirige le scroll instantanément vers la page
      if ((isScrollingDown && isAtBottom) || (isScrollingUp && isAtTop)) {
        e.preventDefault(); // Empêche le verrouillage du scroll par le navigateur sur la div
        window.scrollBy({
          top: delta,
          behavior: "instant" // Force un scroll immédiat sans accumuler d'animations fluides
        });
      }
    };

    // { passive: false } est obligatoire pour pouvoir appeler e.preventDefault()
    el.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleNativeWheel);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="certifications"
      className="text-center bg-slate-950 py-24 scroll-mt-24 relative"
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-white mb-16 relative z-10">
        {t.certifications.title} <span className="text-violet-500">{t.certifications.titleHighlight}</span>
      </h2>

      {/* Gradual Blur overlays at top and bottom to create a smooth fade effect */}
      <div className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
        <GradualBlur
          target="parent"
          position="top"
          height="5rem"
          strength={1.5}
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
          strength={1.5}
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
            scrollbarColor: 'rgba(139, 92, 246, 0.3) transparent'
          }}
        >
          <img
            src={cert6}
            alt="Certification"
            className="w-full mb-12 rounded-xl shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:scale-[1.01]"
          />

          <img
            src={cert5}
            alt="Certification"
            className="w-full mb-12 rounded-xl shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:scale-[1.01]"
          />

          <img
            src={cert4}
            alt="Certification"
            className="w-full rounded-xl shadow-lg hover:shadow-violet-500/10 transition-all duration-300 hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}