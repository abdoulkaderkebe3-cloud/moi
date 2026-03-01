import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0,1], [150,-150]);

  return (
    <section ref={ref} id="projets" className="min-h-screen bg-slate-950 text-white p-20">
      <h2 className="text-4xl text-center mb-16">Projets</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {["p1.jpg","p2.jpg","p3.jpg"].map((img,i)=>(
          <motion.div
            key={i}
            style={{ y }}
            whileHover={{ scale:1.05 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <img src={`/projects/${img}`} className="w-full h-[400px] object-cover"/>
            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition flex items-center justify-center">
              <button className="bg-indigo-500 px-4 py-2 rounded-lg">
                Voir projet
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}