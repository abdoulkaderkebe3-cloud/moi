import CardSwap, { Card } from "./CardSwap";
import burgerImg from "../assets/images/png/burgeur house.png";
import algoImg from "../assets/images/png/site-algo.png";
//import fruityImg from "../assets/images/png/fruity.jpg.png";
import generatorImg from "../assets/images/png/generateur.png";
import { useLang } from "../context/LanguageContext";

const dailymuse = "/Screenshot 2026-03-31 204441.png";

export default function Projects() {
  const { t } = useLang();
  return (
    <section
      id="projets"
      className="min-h-screen bg-slate-950 text-white px-6 md:px-20 py-24"
    >
      <h2 className="text-4xl md:text-5xl text-center  mb-16 font-semibold">
        <span className="text-white">{t.projects.title}</span>{" "}
        <span className="text-violet-500">{t.projects.titleHighlight}</span>
      </h2>

      <div
        className="flex flex-col lg:flex-row justify-between items-center gap-16 w-full"
        style={{ height: "auto", position: "relative", minHeight: "600px" }}
      >
        
        <div className="max-w-xl text-center lg:text-left z-10">
          <h1 className="text-2xl md:text-3xl font-bold leading-relaxed">
            {t.projects.description1}{" "}
            <span className="text-violet-400">{t.projects.description1Highlight}</span>{" "}
            {t.projects.description1End}
            <span className="block mt-4 text-xl font-medium">
              {t.projects.description2}{" "}
              <span className="text-violet-500">{t.projects.description2Highlight}</span>,
            </span>
            <span className="block text-xl font-medium">
              {t.projects.description3}
            </span>
            <span className="block text-gray-400 mt-6 text-lg font-normal">
              {t.projects.hint}
            </span>
          </h1>
        </div>

        <CardSwap
          cardDistance={80}
          verticalDistance={110}
          delay={2000}
        >
          <Card className="bg-slate-900 border border-violet-500/20 rounded-xl shadow-xl">
            <h3 className="text-center text-xl font-bold text-violet-400">
              {t.projects.p1}
            </h3>
            <p className="text-center text-gray-400">
              React, TailwindCSS
            </p>
            <a
              href="https://abdoulkaderkebe3-cloud.github.io/burger-kader/"
              target="_blank"
            >
              <img
                src={burgerImg}
                alt="burger"
                className="h-full rounded-lg mt-4"
              />
            </a>
          </Card>

          <Card className="bg-slate-900 border border-violet-500/20 rounded-xl shadow-xl">
            <h3 className="text-center text-xl font-bold text-violet-400">
              {t.projects.p2}
            </h3>
            <p className="text-center text-gray-400">
              HTML, CSS, JS, Bootstrap
            </p>
            <a
              href="https://abdoulkaderkebe3-cloud.github.io/site-complet-algo/"
              target="_blank"
            >
              <img
                src={algoImg}
                alt=""
                className="h-full rounded-lg mt-4"
              />
            </a>
          </Card>

          <Card className="bg-slate-900 border border-violet-500/20 rounded-xl shadow-xl">
            <h3 className="text-center text-xl font-bold text-violet-400">
              {t.projects.p3}
            </h3>
            <p className="text-center text-gray-400">
              HTML, CSS, JS
            </p>
            <a
              href="https://abdoulkaderkebe3-cloud.github.io/generateur-de-citation/"
              target="_blank"
            >
              <img
                src={generatorImg}
                alt=""
                className="h-full rounded-lg mt-4"
              />
            </a>
          </Card>
          <Card className="bg-slate-900 border border-violet-500/20 rounded-xl shadow-xl">
            <h3 className="text-center text-xl font-bold text-violet-400">
              {t.projects.p4}
            </h3>
            <p className="text-center text-gray-400">
              react,nestjs
            </p>
            <a
              href="https://daily-hazel.vercel.app/"
              target="_blank"
            >
              <img
                src={dailymuse}
                alt=""
                className="h-full rounded-lg mt-4"
              />
            </a>
          </Card>
        </CardSwap>
      </div>
    </section>
  );
}