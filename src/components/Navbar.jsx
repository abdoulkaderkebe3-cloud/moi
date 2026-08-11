import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, LineChartIcon, Languages } from "lucide-react";
import logo from "../assets/images/svg/noun-mind-5663275.svg";
import { useLang } from "../context/LanguageContext";

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
    href: "https://linktr.ee/kvder",
    label: "Linktree",
    Icon: LineChartIcon,
  },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { name: t.nav.home, href: "#accueil" },
    { name: t.nav.about, href: "#a-propos" },
    { name: t.nav.skills, href: "#compétences" },
    { name: t.nav.projects, href: "#projets" },
    { name: t.nav.certifications, href: "#certifications" },
    { name: t.nav.contact, href: "#contact" },
    { name: t.nav.cv, href: "#cv" },
    { name: t.nav.footer, href: "#footer" },
  ];

  return (
    <>
      <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-violet-100/50 dark:border-white/5 py-2.5 sm:py-3"
          : "bg-transparent border-b border-transparent shadow-none backdrop-blur-none py-4 sm:py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 md:px-8 text-slate-800 dark:text-white">
        {/* Logo */}
        <a
          href="#accueil"
          className="group flex items-center rounded-2xl py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
          aria-label="Accueil — Kader Dev"
        >
          <span className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-violet-50 dark:bg-white/10 ring-1 ring-violet-200 dark:ring-white/20 shadow-md shadow-violet-100 dark:shadow-indigo-500/20 transition-all duration-300 group-hover:bg-violet-100 dark:group-hover:bg-white/20 group-hover:ring-violet-400 dark:group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-100 group-hover:scale-105 ${scrolled ? "h-10 w-10 sm:h-11 sm:w-11" : "h-12 w-12 sm:h-14 sm:w-14"
            }`}>
            <img
              src={logo}
              alt="Logo Kader Dev"
              className={`object-contain dark:invert drop-shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${scrolled ? "h-6 w-6 sm:h-7 sm:w-7" : "h-8 w-8 sm:h-9 sm:w-9"
                }`}
            />
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 text-sm xl:text-base">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-violet-600 dark:hover:text-indigo-400 transition relative group font-medium"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-violet-500 dark:bg-indigo-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right section: socials + theme toggle + lang toggle + burger */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Social icons */}
          <div className="hidden lg:flex items-center gap-1.5 sm:gap-2 mr-1">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-200/60 dark:border-white/10 text-slate-500 dark:text-slate-300 transition duration-300 hover:bg-violet-50 dark:hover:bg-white/10 hover:text-violet-600 dark:hover:text-indigo-400 hover:border-violet-400 dark:hover:border-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Language toggle button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 rounded-full bg-violet-600 dark:bg-[#1e1f22] px-3.5 py-2 ring-1 ring-violet-500 dark:ring-white/10 hover:bg-violet-700 dark:hover:bg-[#2a2b2f] transition duration-200 focus:outline-none select-none cursor-pointer shadow-md shadow-violet-200 dark:shadow-none"
          >
            <Languages className="h-4 w-4 text-white dark:text-slate-300" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
              {lang.toUpperCase()}
            </span>
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-violet-100 dark:hover:bg-white/5 text-slate-700 dark:text-white transition"
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
      </motion.nav>

      {/* Mobile off-canvas menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 dark:bg-black/70 backdrop-blur-[2px]"
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[78%] max-w-xs bg-white dark:bg-slate-950 shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-violet-100 dark:border-white/10">
                <span className="flex items-center justify-center h-10 w-10 rounded-2xl bg-violet-50 dark:bg-white/10 ring-1 ring-violet-200 dark:ring-white/20 overflow-hidden">
                  <img src={logo} alt="Logo Kader Dev" className="h-6 w-6 object-contain dark:invert" />
                </span>
                <span className="font-bold text-slate-800 dark:text-white">Kader Dev</span>
              </div>

              {/* Links */}
              <div className="flex flex-col overflow-y-auto">
                {links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-5 py-4 border-b border-violet-50 dark:border-white/5 text-slate-700 dark:text-white text-base font-medium hover:bg-violet-50 dark:hover:bg-indigo-500/10 hover:text-violet-700 dark:hover:text-indigo-300 transition"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Socials footer */}
              <div className="mt-auto px-5 py-6 border-t border-violet-100 dark:border-white/10">
                <p className="text-xs font-medium uppercase tracking-widest text-violet-400 dark:text-slate-500 mb-3 text-center">
                  {t.nav.follow}
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
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 dark:bg-white/6 text-slate-600 dark:text-slate-300 ring-1 ring-violet-200 dark:ring-white/10 transition hover:bg-violet-100 dark:hover:bg-indigo-500/15 hover:text-violet-700 dark:hover:text-indigo-200 hover:ring-violet-400 dark:hover:ring-indigo-400/25"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
