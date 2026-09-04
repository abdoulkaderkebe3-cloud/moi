import { lazy, Suspense } from "react";
import { Card } from "./Card";
import burgerImg from "../assets/images/png/burger-house.webp";
import algoImg from "../assets/images/png/site-algo.webp";
import billetterieImg from "../assets/images/png/billetterie-preview.webp";
import visoImg from "../assets/images/png/viso-studio.webp";
import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";

// Lazy-load CardSwap: keeps gsap's swap animation out of the critical
// bundle for this purely decorative card carousel.
const CardSwap = lazy(() => import("./CardSwap"));

const dailymuse = "/dailymuse-preview.webp";

export default function Projects() {
  const { t } = useLang();
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="projets"
      className="min-h-screen bg-black text-white px-6 md:px-20 py-24 scroll-mt-24"
    >
      <h2 className="text-4xl md:text-5xl text-center  mb-16 font-semibold">
        <span className="text-white">{t.projects.title}</span>{" "}
        <span className="text-accent">{t.projects.titleHighlight}</span>
      </h2>

      <div
        className="flex flex-col lg:flex-row justify-between items-center gap-16 w-full"
        style={{ height: "auto", position: "relative", minHeight: "600px" }}
      >

        <div className="max-w-xl text-center lg:text-left z-10">
          <h1 className="text-2xl md:text-3xl font-bold leading-relaxed text-white">
            {t.projects.description1}{" "}
            <span className="text-accent">{t.projects.description1Highlight}</span>{" "}
            {t.projects.description1End}
            <span className="block mt-4 text-xl font-medium text-white">
              {t.projects.description2}{" "}
              <span className="text-accent">{t.projects.description2Highlight}</span>,
            </span>
            <span className="block text-xl font-medium text-white">
              {t.projects.description3}
            </span>
            <span className="block text-white/40 mt-6 text-lg font-normal">
              {t.projects.hint}
            </span>
          </h1>
        </div>

        <Suspense fallback={null}>
        <CardSwap
          cardDistance={80}
          verticalDistance={110}
          delay={3000}
          pauseOnHover={true}
        >
          <Card className="bg-black border border-line rounded-xl shadow-xl shadow-black/60 hover:border-accent/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-accent">
              {t.projects.p1}
            </h3>
            <p className="text-center text-white/50">
              React, TailwindCSS
            </p>
            <a
              href="https://burger-kader.vercel.app/"
              target="_blank"
            >
              <img
                src={burgerImg}
                alt="Aperçu du projet Burger House"
                className="h-full rounded-lg mt-4"
                loading="lazy"
              />
            </a>
          </Card>

          <Card className="bg-black border border-line rounded-xl shadow-xl shadow-black/60 hover:border-accent/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-accent">
              {t.projects.p6}
            </h3>
            <p className="text-center text-white/50">
              React, TypeScript
            </p>
            <a
              href="https://trans-campus.com/onboarding"
              target="_blank"
            >
              <img
                src={billetterieImg}
                alt="Aperçu du site de billetterie"
                className="h-full rounded-lg mt-4"
                loading="lazy"
              />
            </a>
          </Card>

          <Card className="bg-black border border-line rounded-xl shadow-xl shadow-black/60 hover:border-accent/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-accent">
              {t.projects.p2}
            </h3>
            <p className="text-center text-white/50">
              HTML, CSS, JS, Bootstrap
            </p>
            <a
              href="https://abdoulkaderkebe3-cloud.github.io/site-complet-algo/"
              target="_blank"
            >
              <img
                src={algoImg}
                alt="Interface du site complet Algo"
                className="h-full rounded-lg mt-4"
                loading="lazy"
              />
            </a>
          </Card>

          <Card className="bg-black border border-line rounded-xl shadow-xl shadow-black/60 hover:border-accent/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-accent">
              {t.projects.p7}
            </h3>
            <p className="text-center text-white/50">
              React, TypeScript, TailwindCSS
            </p>
            <a
              href="https://viso-studio.com"
              target="_blank"
            >
              <img
                src={visoImg}
                alt="Aperçu du site Viso Studio"
                className="h-full rounded-lg mt-4"
                loading="lazy"
              />
            </a>
          </Card>
          <Card className="bg-black border border-line rounded-xl shadow-xl shadow-black/60 hover:border-accent/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-accent">
              {t.projects.p4}
            </h3>
            <p className="text-center text-white/50">
              react,nestjs
            </p>
            <a
              href="https://daily-hazel.vercel.app/"
              target="_blank"
            >
              <img
                src={dailymuse}
                alt="Aperçu du projet Daily Muse"
                className="h-full rounded-lg mt-4"
                loading="lazy"
              />
            </a>
          </Card>

        </CardSwap>
        </Suspense>
      </div>
    </motion.section>
  );
}