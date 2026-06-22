import CardSwap, { Card } from "./CardSwap";
import burgerImg from "../assets/images/png/burger-house.png";
import algoImg from "../assets/images/png/site-algo.png";
import generatorImg from "../assets/images/png/generateur.png";
import { useLang } from "../context/LanguageContext";
import { motion } from "framer-motion";

const dailymuse = "/dailymuse-preview.png";

export default function Projects() {
  const { t } = useLang();
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="projets"
      className="min-h-screen bg-violet-50 dark:bg-slate-950 text-slate-900 dark:text-white px-6 md:px-20 py-24"
    >
      <h2 className="text-4xl md:text-5xl text-center  mb-16 font-semibold">
        <span className="text-slate-900 dark:text-white">{t.projects.title}</span>{" "}
        <span className="text-violet-600 dark:text-violet-500">{t.projects.titleHighlight}</span>
      </h2>

      <div
        className="flex flex-col lg:flex-row justify-between items-center gap-16 w-full"
        style={{ height: "auto", position: "relative", minHeight: "600px" }}
      >

        <div className="max-w-xl text-center lg:text-left z-10">
          <h1 className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-800 dark:text-white">
            {t.projects.description1}{" "}
            <span className="text-violet-600 dark:text-violet-400">{t.projects.description1Highlight}</span>{" "}
            {t.projects.description1End}
            <span className="block mt-4 text-xl font-medium text-slate-700 dark:text-white">
              {t.projects.description2}{" "}
              <span className="text-violet-600 dark:text-violet-500">{t.projects.description2Highlight}</span>,
            </span>
            <span className="block text-xl font-medium text-slate-700 dark:text-white">
              {t.projects.description3}
            </span>
            <span className="block text-slate-400 dark:text-gray-400 mt-6 text-lg font-normal">
              {t.projects.hint}
            </span>
          </h1>
        </div>

        <CardSwap
          cardDistance={80}
          verticalDistance={110}
          delay={3000}
          pauseOnHover={true}
        >
          <Card className="bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-500/20 rounded-xl shadow-md hover:shadow-lg hover:shadow-violet-200/60 dark:hover:shadow-indigo-950/40 hover:border-violet-300 dark:hover:border-violet-500/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-violet-600 dark:text-violet-400">
              {t.projects.p1}
            </h3>
            <p className="text-center text-slate-500 dark:text-gray-400">
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

          <Card className="bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-500/20 rounded-xl shadow-md hover:shadow-lg hover:shadow-violet-200/60 dark:hover:shadow-indigo-950/40 hover:border-violet-300 dark:hover:border-violet-500/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-violet-600 dark:text-violet-400">
              {t.projects.p2}
            </h3>
            <p className="text-center text-slate-500 dark:text-gray-400">
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

          <Card className="bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-500/20 rounded-xl shadow-md hover:shadow-lg hover:shadow-violet-200/60 dark:hover:shadow-indigo-950/40 hover:border-violet-300 dark:hover:border-violet-500/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-violet-600 dark:text-violet-400">
              {t.projects.p3}
            </h3>
            <p className="text-center text-slate-500 dark:text-gray-400">
              HTML, CSS, JS
            </p>
            <a
              href="https://abdoulkaderkebe3-cloud.github.io/generateur-de-citation/"
              target="_blank"
            >
              <img
                src={generatorImg}
                alt="Aperçu du générateur de citations"
                className="h-full rounded-lg mt-4"
                loading="lazy"
              />
            </a>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-500/20 rounded-xl shadow-md hover:shadow-lg hover:shadow-violet-200/60 dark:hover:shadow-indigo-950/40 hover:border-violet-300 dark:hover:border-violet-500/40 transition-colors transition-shadow duration-300">
            <h3 className="text-center text-xl font-bold text-violet-600 dark:text-violet-400">
              {t.projects.p4}
            </h3>
            <p className="text-center text-slate-500 dark:text-gray-400">
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
      </div>
    </motion.section>
  );
}