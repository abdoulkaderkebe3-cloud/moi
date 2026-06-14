import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { Download } from "lucide-react";

export default function CVSection() {
  const { t } = useLang();

  return (
    <section id="cv" className="min-h-[60vh] bg-violet-50 dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
          {t.cv?.title || "Mon"}{" "}
          <span className="text-violet-600 dark:text-violet-400">
            {t.cv?.titleHighlight || "CV"}
          </span>
        </h2>
        
        <p className="text-lg text-slate-600 dark:text-gray-300 mb-10 leading-relaxed">
          {t.cv?.description || "Consultez mon parcours détaillé, mes compétences et mes expériences en téléchargeant mon CV."}
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/Abdoul_Kader_KEBE.docx"
          download="CV_Abdoul_Kader_KEBE.docx"
          className="inline-flex items-center gap-3 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full font-medium text-lg transition-colors shadow-lg shadow-violet-500/30"
        >
          <Download className="w-6 h-6" />
          <span>{t.cv?.button || "Télécharger mon CV"}</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
