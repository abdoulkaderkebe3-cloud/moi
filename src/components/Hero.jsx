import { motion, useScroll, useTransform } from "framer-motion";

import LightRays from './LightRays';

import ShinyText from './ShinyText';

export default function Hero() {

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 200]);

      return (

        <section

        id="accueil"

        className="relative h-screen w-full bg-black text-white overflow-hidden  "

      >

    

        <LightRays

          raysOrigin="top-center"

          raysColor="#ffffff"

          raysSpeed={1}

          lightSpread={0.7}

          rayLength={2}

          followMouse={true}

          mouseInfluence={0.10}

          className="absolute inset-0 w-full h-full"

        />

  

        

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">

          

          <ShinyText

            text="Kebe Abdoul Kader"

            speed={3}

            delay={2}

            color="#b5b5b5"

            shineColor="#ffffff"

            spread={120}

            direction="left"

            yoyo={true}

            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"

          />

  

          <motion.p

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 1.5, duration: 1 }}

            className="mt-4 text-base sm:text-lg md:text-xl text-gray-400 tracking-widest"

          >

            Développeur Full Stack

          </motion.p>

  

        </div>

      </section>

    );

  }

  

