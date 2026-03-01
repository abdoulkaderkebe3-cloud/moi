import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Accueil", href: "#accueil" },
    { name: "À propos", href: "#à propos" },
    { name: "Certifications", href: "#certifications" },
    { name: "Compétences", href: "#compétences" },
    { name: "Projets", href: "#projets" },
    { name: "Vidéo", href: "#vidéo" },
    { name: "Footer", href: "#footer" }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 text-white">
        
     
        <a
          href="#accueil"
          className="text-xl font-bold tracking-wider hover:text-indigo-400 transition"
        >
          KADER-DEV
        </a>

        
        <div className="hidden md:flex gap-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-indigo-400 transition relative group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        
        <a
          href="#contact"
          className="bg-indigo-500 px-5 py-2 rounded-lg hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/30"
        >
          Contact
        </a>

      </div>
    </motion.nav>
  );
}