import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, LineChartIcon, Languages } from "lucide-react";
import logo from "../assets/images/svg/noun-mind-5663275.svg";
import { useLang } from "../context/LanguageContext";
import { documentTop } from "../utils/documentTop";

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

// Dans l'ordre de la page. Sert à détecter l'arrivée d'une nouvelle section.
const SECTION_IDS = ["accueil", "a-propos", "compétences", "projets", "certifications", "services", "contact", "footer"];
// Le haut d'une section doit passer au-dessus de cette ligne pour devenir la
// section courante, un peu sous la hauteur du header.
const TOP_BAND = 120;
// Durée d'affichage du header à l'arrivée d'une section.
const SHOW_MS = 2500;

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Le header se retire dès qu'on descend pour laisser la place au contenu, et
  // revient seul quelques secondes à l'arrivée de chaque nouvelle section, pour
  // rappeler où l'on est. La section courante est celle dont le haut a franchi
  // le haut de l'écran. Les positions des sections sont mises en cache et
  // relues seulement quand la page change de taille : lire huit
  // `getBoundingClientRect` à chaque image forçait une mise en page complète
  // pendant que les animations écrivaient leurs styles.
  useEffect(() => {
    const ids = SECTION_IDS;
    let current = null;
    let timer = null;
    let frame = 0;
    let tops = [];

    const measure = () => {
      // Les sections chargées en différé n'existent pas encore au montage, le
      // ResizeObserver ci-dessous relance la mesure quand elles arrivent.
      tops = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .map((el) => [el.id, documentTop(el)]);
    };

    const showBriefly = () => {
      setHidden(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        setHidden(true);
      }, SHOW_MS);
    };

    const update = () => {
      frame = 0;
      let active = null;
      const line = window.scrollY + TOP_BAND;
      for (const [id, top] of tops) {
        if (top <= line) active = id;
      }

      if (window.scrollY < 80) {
        current = active;
        clearTimeout(timer);
        timer = null;
        setHidden(false);
        return;
      }
      if (active !== current) {
        current = active;
        showBriefly();
      } else if (timer === null) {
        setHidden(true);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Sur ordinateur, approcher la souris du haut de l'écran le fait revenir :
    // la navigation ne doit jamais dépendre d'un défilement.
    const onMouseMove = (e) => {
      if (e.clientY < 24) showBriefly();
    };

    // Relevé initial : sans lui, la section de départ reste inconnue et le
    // premier défilement dans le hero passerait pour une arrivée de section.
    measure();
    update();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  // Jamais caché pendant que le menu est ouvert ou qu'on navigue au clavier
  // dedans : un lien qui a le focus doit rester visible.
  const visible = !hidden || menuOpen || focusInside;

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
    { name: t.nav.services, href: "#services" },
    { name: t.nav.contact, href: "#contact" },
    { name: t.nav.footer, href: "#footer" },
  ];

  return (
    <>
      <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onFocus={() => setFocusInside(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusInside(false);
      }}
      // Transition CSS limitée au fond, à la bordure et aux marges : un
      // `transition-all` animerait aussi le transform écrit par framer-motion
      // et ferait traîner l'entrée et la sortie du header.
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding,backdrop-filter] duration-300 ${scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-line py-2.5 sm:py-3"
          : "bg-transparent border-b border-transparent shadow-none backdrop-blur-none py-4 sm:py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 md:px-8 text-white">
        {/* Logo */}
        <a
          href="#accueil"
          className="group flex items-center rounded-2xl py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          aria-label="Accueil — Kader Dev"
        >
          <span className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-all duration-300 group-hover:bg-white/10 group-hover:ring-accent/60 group-hover:shadow-[0_0_20px_rgb(var(--accent-rgb)/0.35)] scale-100 group-hover:scale-105 ${scrolled ? "h-10 w-10 sm:h-11 sm:w-11" : "h-12 w-12 sm:h-14 sm:w-14"
            }`}>
            <img
              src={logo}
              alt="Logo Kader Dev"
              className={`object-contain invert drop-shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${scrolled ? "h-6 w-6 sm:h-7 sm:w-7" : "h-8 w-8 sm:h-9 sm:w-9"
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
              className="hover:text-accent transition relative group font-medium"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-accent transition-all group-hover:w-full" />
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white/60 transition duration-300 hover:bg-white/10 hover:text-accent hover:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Language toggle button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 ring-1 ring-line hover:bg-white/10 hover:ring-accent/50 transition duration-200 focus:outline-none select-none cursor-pointer"
          >
            <Languages className="h-4 w-4 text-accent" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
              {lang.toUpperCase()}
            </span>
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-white/10 text-white transition"
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
              className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[78%] max-w-xs bg-black border-r border-line shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
                <span className="flex items-center justify-center h-10 w-10 rounded-2xl bg-surface ring-1 ring-line overflow-hidden">
                  <img src={logo} alt="Logo Kader Dev" className="h-6 w-6 object-contain invert" />
                </span>
                <span className="font-bold text-white">Kader Dev</span>
              </div>

              {/* Links */}
              <div className="flex flex-col overflow-y-auto">
                {links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-5 py-4 border-b border-line text-white text-base font-medium hover:bg-white/5 hover:text-accent transition"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Socials footer */}
              <div className="mt-auto px-5 py-6 border-t border-line">
                <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-3 text-center">
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
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-white/70 ring-1 ring-line transition hover:bg-white/10 hover:text-accent hover:ring-accent/40"
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
