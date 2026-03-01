import { motion, useScroll, useTransform } from "framer-motion";
export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="accueil" className="h-screen bg-cover bg-center  flex items-center justify-center text-white"style={{backgroundImage:"url('public/kader.jpg')"}} >
      <motion.div style={{ y }} className="text-center">
        <h1 className="text-7xl font-bold mb-6 text-black">Kebe Abdoul Kader</h1>
        <p className="text-black">Développeur Full Stack</p>
      </motion.div>
    </section>
  );
}