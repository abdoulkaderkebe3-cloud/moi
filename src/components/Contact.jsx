import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white flex items-center justify-center p-6 sm:p-8 md:p-10 scroll-mt-24 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl grid md:grid-cols-2 gap-10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10"
      >
        {/* LEFT SIDE INFO */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold mb-4">
            Travaillons ensemble 
          </h2>
          <p className="text-gray-400">
            Vous avez un projet ou une idée ? Contactez-moi et créons quelque chose d'incroyable.
          </p>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-4">
              <Mail className="text-indigo-400" />
              <span><a href="mailto:abdoulkaderkebe3@gmail.com">abdoulkaderkebe3@gmail.com</a></span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-indigo-400" />
              <span><a href="tel:+225075023392">+2250575023392</a></span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-indigo-400" />
              <span>Abidjan, Côte d'Ivoire</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Votre nom"
            className="w-full p-4 bg-slate-800/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            type="email"
            placeholder="Votre email"
            className="w-full p-4 bg-slate-800/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <textarea
            rows="5"
            placeholder="Votre message"
            className="w-full p-4 bg-slate-800/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-500 py-4 rounded-xl font-semibold hover:bg-indigo-600 transition shadow-lg shadow-indigo-500/30"
          >
            Envoyer le message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}