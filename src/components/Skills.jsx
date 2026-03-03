import { motion } from "framer-motion";
import figmaIcon from "../assets/images/svg/devicon_figma.svg";
import javaIcon from "../assets/images/svg/devicon_java.svg";
import tailwindIcon from "../assets/images/svg/devicon_tailwindcss.svg";
import gitIcon from "../assets/images/svg/icomoon-free_git.svg";
import reactIcon from "../assets/images/svg/Group.svg";
import htmlIcon from "../assets/images/svg/logos_html-5.svg";
import githubIcon from "../assets/images/svg/mdi_github.svg";
import springBootIcon from "../assets/images/svg/Vector.svg";
import jsIcon from "../assets/images/svg/vscode-icons_file-type-js-official.svg";
import cssIcon from "../assets/images/svg/logos_css-3.svg";
import framerIcon from "../assets/images/svg/Vector (1).svg";
import angularIcon from "../assets/images/svg/skill-icons_angular-light.svg";
import tsIcon from "../assets/images/svg/akar-icons_typescript-fill.svg";

export default function Stack() {
  const techs = [
    { name: "figma", icon: figmaIcon },
    { name: "java", icon: javaIcon },
    { name: "Tailwind CSS", icon: tailwindIcon },
    { name: "git", icon: gitIcon },
    { name: "react", icon: reactIcon },
    { name: "html", icon: htmlIcon },
    { name: "github", icon: githubIcon },
    { name: "Spring Boot", icon: springBootIcon },
    { name: "JavaScript", icon: jsIcon },
    { name: "css", icon: cssIcon },
    { name: "Framer-motion", icon: framerIcon },
    { name: "Angular", icon: angularIcon },
    { name: "TypeScript", icon: tsIcon },
  ];

  return (
    <section id="compétences" className="min-h-screen bg-slate-900 py-24 px-6 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
        Ma Stack
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {techs.map((tech, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer"
          >
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-16 h-16 mb-4 object-contain"
            />
            <span className="text-white text-sm md:text-base">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}