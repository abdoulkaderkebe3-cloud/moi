import { motion } from "framer-motion";

export default function Stack() {
  const techs = [
    { name: "figma", icon: "src/assets/images/svg/devicon_figma.svg" },
    { name: "java", icon: "src/assets/images/svg/devicon_java.svg" },
    { name: "Tailwind CSS", icon: "src/assets/images/svg/devicon_tailwindcss.svg" },
    { name: "git", icon: "src/assets/images/svg/icomoon-free_git.svg" },
    { name: "react", icon: "src/assets/images/svg/Group.svg" },
    { name: "html", icon: "src/assets/images/svg/logos_html-5.svg" },
    { name: "github", icon: "src/assets/images/svg/mdi_github.svg" },
    { name: "Spring Boot", icon: "src/assets/images/svg/Vector.svg" },
    { name: "JavaScript", icon: "src/assets/images/svg/vscode-icons_file-type-js-official.svg" },
    { name: "css", icon: "src/assets/images/svg/logos_css-3.svg" },
    { name: "Framer-motion", icon: "src/assets/images/svg/Vector (1).svg" },
    { name: "Angular", icon: "src/assets/images/svg/skill-icons_angular-light.svg" },
    { name: "TypeScript", icon: "src/assets/images/svg/akar-icons_typescript-fill.svg" },
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