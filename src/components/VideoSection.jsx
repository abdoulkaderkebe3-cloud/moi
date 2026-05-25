import { motion } from "framer-motion";
import presentationVid from "../assets/images/png/IMG_4212.mp4";
import { useLang } from "../context/LanguageContext";

export default function VideoSection() {
  const { t } = useLang();
  return (
    <section id="vidéo" className="min-h-screen bg-slate-900 text-white flex items-center justify-center ">
      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        transition={{ duration:1 }}
        className="text-center"
      >
        <h2 className="text-4xl mb-8"> <span className="text-violet-500">{t.video.titleHighlight} </span>{t.video.title}</h2>
        <video controls preload="metadata" playsInline className="rounded-xl shadow-2xl h-85 w-96">
          <source src={`${presentationVid}#t=0.001`} type="video/mp4"/>
        </video>
      </motion.div>
    </section>
  );
}