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
  // Section courante, pour marquer le lien correspondant. Elle etait deja
  // calculee pour decider quand ramener le header, elle n'etait simplement
  // pas exposee.
  const [activeId, setActiveId] = useState(null);

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

      setActiveId(active);

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
      if (window.innerWidth >= 768) setMenuOpen(false);
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

  // Barre du haut : « Accueil » doublonnait le logo, qui pointe deja sur
  // #accueil ; « Footer » ne veut rien dire pour un visiteur ; « Contact » est
  // desormais porte par le bouton d'action, a droite.
  const links = [
    { name: t.nav.about, href: "#a-propos", id: "a-propos" },
    { name: t.nav.skills, href: "#compétences", id: "compétences" },
    { name: t.nav.projects, href: "#projets", id: "projets" },
    { name: t.nav.certifications, href: "#certifications", id: "certifications" },
    { name: t.nav.services, href: "#services", id: "services" },
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
          /* Masque pendant l'ouverture du tiroir : depuis qu'il sort par la
             droite, il ne recouvre plus ce logo, et les deux se voyaient cote
             a cote. `invisible` plutot que `hidden` pour ne pas decaler la
             barre. Le logo du tiroir prend le relais. */
          className={`group flex items-center rounded-2xl py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
            menuOpen ? "invisible" : ""
          }`}
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

        {/* Desktop nav links. Seuil descendu a md : entre 768 et 1024 px il y
            avait la place, et la barre n'affichait pourtant que le burger. */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-8 text-sm xl:text-base">
          {links.map((link) => {
            const actif = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={actif ? "true" : undefined}
                className={`relative group font-medium transition-colors duration-200 ${
                  actif ? "text-accent" : "hover:text-accent"
                }`}
              >
                {link.name}
                {/* Le trait plein marque la section ou l'on se trouve, le trait
                    qui se deploie repond au survol. Les deux partagent la meme
                    ligne, donc l'actif ne bouge pas quand on le survole. */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-accent transition-all duration-300 ease-out ${
                    actif ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
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

          {/* Bouton d'action. En lecture en Z, le coin haut-droit est la place
              de l'action forte ; c'est le selecteur de langue qui l'occupait.
              Masque sous md, ou le tiroir porte deja un lien Contact. */}
          <a
            href="#contact"
            className="hidden md:inline-flex min-h-11 items-center rounded-full bg-accent px-4 lg:px-5 py-2 text-sm font-semibold text-black transition-[background-color,transform] duration-200 ease-out hover:bg-white active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t.nav.cta}
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            /* 44 px de cible : `p-2` autour d'une icone de 24 px n'en faisait
               que 40. */
            className="md:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
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
              className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              /* Sort par la droite, du cote du burger : le panneau suivait le
                 sens inverse du doigt. Elargi a 88 % car a 78 % la bande de
                 page restante, noire elle aussi, ne se distinguait pas du
                 tiroir. */
              className="md:hidden fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col border-l border-line bg-black shadow-2xl"
            >
              {/* Drawer header */}
              {/* Le logo porte le retour a l'accueil, comme dans la barre :
                  c'est ce qui permet de retirer le lien « Accueil » de la
                  liste sans perdre l'acces. */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
                <a
                  href="#accueil"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t.nav.home}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface ring-1 ring-line overflow-hidden transition hover:bg-white/10 hover:ring-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <img src={logo} alt="" aria-hidden="true" className="h-6 w-6 object-contain invert" />
                </a>

                {/* Le panneau couvre le burger, qui servait de bouton de
                    fermeture quand il sortait par la gauche. */}
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={t.nav.closeMenu}
                  className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col overflow-y-auto">
                {links.map((link, i) => {
                  const actif = activeId === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={actif ? "true" : undefined}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      // Cascade : les entrees arrivaient toutes en bloc. Le
                      // retard initial laisse le panneau finir sa course.
                      // `MotionConfig reducedMotion="user"` (App.jsx) retire le
                      // deplacement et garde le fondu pour qui le demande.
                      transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 + i * 0.05 }}
                      className={`relative border-b border-line px-5 py-4 text-base font-medium transition hover:bg-white/5 hover:text-accent ${
                        actif ? "text-accent" : "text-white"
                      }`}
                    >
                      {/* Meme repere que sur desktop, tourne a la verticale :
                          la liste est en colonne, un soulignement ne s'y
                          lirait pas comme un marqueur de position. */}
                      {actif && (
                        <span className="absolute inset-y-0 left-0 w-[3px] bg-accent" aria-hidden="true" />
                      )}
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>

              {/* Bouton d'action. Sans lui, retirer « Contact » de la liste
                  couperait tout acces a la section sur telephone, ou le
                  bouton de la barre est masque. */}
              <div className="px-5 pt-5">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-5 py-3 font-semibold text-black transition-[background-color,transform] duration-200 ease-out hover:bg-white active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t.nav.cta}
                </a>
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
