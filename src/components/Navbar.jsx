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

  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg"
          : "bg-slate-950/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 md:px-8 py-3 md:py-4 text-white ">
        <a
          href="#accueil"
          className="text-lg sm:text-xl font-bold tracking-wider hover:text-indigo-400 transition"
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

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-block bg-indigo-500 px-3 sm:px-5 py-2 rounded-lg hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/30 text-xs sm:text-base"
          >
            Contact
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-2 rounded-md hover:bg-white/5 transition"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/5 overflow-y-auto overflow-x-hidden max-h-screen w-full">
          <div className="px-4 sm:px-6 py-6 flex flex-col gap-3">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-4 rounded-md hover:bg-indigo-500/20 hover:text-indigo-300 transition text-white text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block w-full bg-indigo-500 px-4 py-3 rounded-lg hover:bg-indigo-600 transition text-center text-base font-semibold"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}