import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, LineChartIcon } from "lucide-react";
import logo from "../assets/images/svg/noun-mind-5663275.svg";

const socialLinks = [
  {
    href: "https://github.com/abdoulkaderkebe3-cloud",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/abdoul-kader-kebe-047b1b383/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  {
    href: "https://linktr.ee/la_marasse",
    label: "Linktree",
    Icon: LineChartIcon,
  },
];

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
    { name: "À propos", href: "#a-propos" },
    { name: "Certifications", href: "#certifications" },
    { name: "Compétences", href: "#compétences" },
    { name: "Projets", href: "#projets" },
    { name: "Vidéo", href: "#vidéo" },
    { name: "Footer", href: "#footer" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

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
          className="group flex items-center rounded-2xl py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
          aria-label="Accueil — Kader Dev"
        >
          <span className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center overflow-hidden rounded-xl bg-white/[0.06] ring-1 ring-white/10 shadow-sm shadow-black/20 transition group-hover:bg-white/[0.12] group-hover:ring-indigo-400/35 group-hover:shadow-indigo-500/10">
            <img
              src={logo}
              alt="Logo Kader Dev"
              className="h-6 w-6 sm:h-7 sm:w-7 object-contain opacity-95 group-hover:opacity-100 transition duration-300"
            />
          </span>
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

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-0.5 sm:gap-1.5 rounded-xl sm:rounded-2xl bg-white/[0.04] p-0.5 sm:p-1 ring-1 ring-white/[0.08] backdrop-blur-sm">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl text-slate-300/90 transition duration-300 hover:bg-indigo-500/15 hover:text-indigo-200 hover:shadow-[0_0_20px_-4px_rgba(129,140,248,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-md hover:bg-white/5 transition"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

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
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-3 text-center">
                Suivez-moi
              </p>
              <div className="flex justify-center gap-2">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-slate-300 ring-1 ring-white/10 transition hover:bg-indigo-500/15 hover:text-indigo-200 hover:ring-indigo-400/25"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
