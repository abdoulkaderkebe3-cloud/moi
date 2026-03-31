import { motion } from "framer-motion";
import presentationVid from "../assets/images/png/IMG_4212.mp4";

export default function VideoSection() {
  return (
    <section id="vidéo" className="min-h-screen bg-slate-900 text-white flex items-center justify-center ">
      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        transition={{ duration:1 }}
        className="text-center"
      >
        <h2 className="text-4xl mb-8">Ma Présentation</h2>
        <video controls className="rounded-xl shadow-2xl h-85 w-96">
          <source src={presentationVid} type="video/mp4"/>
        </video>
      </motion.div>
    </section>
  );
}