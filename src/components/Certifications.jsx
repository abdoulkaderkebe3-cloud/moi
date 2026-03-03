import { useRef } from "react";
import GradualBlur from "./GradualBlur";

export default function Certifications() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="certifications"
      className="text-center bg-slate-950 py-24 scroll-mt-24 relative"
    >
      <h2 className="text-4xl md:text-5xl font-semibold text-white mb-16 relative z-10">
        Certifications
      </h2>
        <GradualBlur
          target="parent"
          position="bottom"
          height="8rem"
          strength={0.9}
          divCount={6}
          curve="bezier"
          exponential={false}
          opacity={0.6}
          zIndex={-10}
          style={{ pointerEvents: 'none' }}
        />
        <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto md:max-h-[650px] max-h-[520px] overflow-y-auto px-6 md:px-36 py-16 scroll-smooth">
          <img
            src="public/Screenshot 2026-03-01 164744.png"
            alt="Certification"
            className="w-full mb-16 rounded-2xl shadow-2xl transition-transform duration-300"
          />

          <img
            src="public/Screenshot 2026-03-01 164822.png"
            alt="Certification"
            className="w-full mb-16 rounded-2xl shadow-2xl transition-transform duration-300"
          />

          <img
            src="public/Screenshot 2026-03-01 164843.png"
            alt="Certification"
            className="w-full mb-16 rounded-2xl shadow-2xl transition-transform duration-300"
          />

          <img
            src="src/assets/images/png/photo_2026-03-02_18-55-22-removebg-preview.png"
            alt="Certification"
            className="w-full mb-16 rounded-2xl shadow-2xl transition-transform duration-300"
          />

          <img
            src="src/assets/images/png/photo_2026-03-02_18-55-26-removebg-preview.png"
            alt="Certification"
            className="w-full mb-16 rounded-2xl shadow-2xl transition-transform duration-300"
          />
        </div>
        </section>
      </section>
  
  );
}