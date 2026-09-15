import { RevealGroup, RevealItem } from "./Reveal";
import { Github, Linkedin, LineChartIcon } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import logo from "../assets/images/svg/noun-mind-5663275.svg";

// Tout est centré sur une seule colonne, du téléphone au desktop : le footer
// ferme la page, il n'a pas de hiérarchie gauche/droite à porter. Le logo le
// rattache visuellement à la navbar, qui utilise le même fichier.
const liens = [
  { href: "https://github.com/abdoulkaderkebe3-cloud", label: "GitHub", Icone: Github },
  { href: "https://www.linkedin.com/in/abdoul-kader-kebe-047b1b383/", label: "LinkedIn", Icone: Linkedin },
  { href: "https://linktr.ee/kvder", label: "Linktree", Icone: LineChartIcon },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer id="footer" className="scroll-mt-24 border-t border-line bg-black py-12 text-white/50">
      <RevealGroup className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 text-center">
        <RevealItem>
          {/* Le SVG est noir à la source : `invert` le rend blanc sur le fond
              noir, comme dans le menu mobile de la navbar. */}
          <img src={logo} alt="" aria-hidden="true" className="h-11 w-11 object-contain invert" />
        </RevealItem>

        <RevealItem>
          <h3 className="text-xl font-semibold text-white">Kebe Abdoul kader</h3>
          <p className="mt-2 text-sm">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </RevealItem>

        <RevealItem className="flex items-center justify-center gap-2">
          {liens.map(({ href, label, Icone }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              /* 44 px de cible tactile, et un nom accessible : l'icône seule
                 n'en donnait aucun au lecteur d'écran. */
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors duration-200 ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icone aria-hidden="true" />
            </a>
          ))}
        </RevealItem>
      </RevealGroup>
    </footer>
  );
}
