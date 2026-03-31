import { motion } from "framer-motion";
import { Github, Linkedin, LineChartIcon} from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 text-gray-400 py-10 border-t border-white/10 ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div className="text-center md:text-left">
          <h3 className="text-white text-xl font-semibold">
            Kebe Abdoul kader
          </h3>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} Tous droits réservés.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/abdoulkaderkebe3-cloud" className="hover:text-indigo-400 transition" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
          <a href="https://www.linkedin.com/in/abdoul-kader-kebe-047b1b383/" className="hover:text-indigo-400 transition" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="https://linktr.ee/la_marasse" className="hover:text-indigo-400 transition" target="_blank" rel="noopener noreferrer">
            <LineChartIcon/>
          </a>
        </div>
      </motion.div>
    </footer>
  );
}