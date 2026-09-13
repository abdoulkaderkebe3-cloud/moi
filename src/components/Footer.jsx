import { RevealGroup, RevealItem } from "./Reveal";
import { Github, Linkedin, LineChartIcon} from "lucide-react";
import { useLang } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer id="footer" className="bg-black text-white/50 py-10 border-t border-line scroll-mt-24">
      <RevealGroup className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <RevealItem className="text-center md:text-left">
          <h3 className="text-white text-xl font-semibold">
            Kebe Abdoul kader
          </h3>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </RevealItem>

        <RevealItem className="flex gap-6">
          <a href="https://github.com/abdoulkaderkebe3-cloud" className="hover:text-accent transition" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
          <a href="https://www.linkedin.com/in/abdoul-kader-kebe-047b1b383/" className="hover:text-accent transition" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="https://linktr.ee/kvder" className="hover:text-accent transition" target="_blank" rel="noopener noreferrer">
            <LineChartIcon/>
          </a>
        </RevealItem>
      </RevealGroup>
    </footer>
  );
}