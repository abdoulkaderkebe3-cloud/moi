import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/images/svg/noun-mind-5663275.svg";
import { useTheme } from "../context/ThemeContext";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Organic progress curve — fast at start, slows down, then finishes
    const start = Date.now();
    const duration = 2400;
    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = Math.min(elapsed / duration, 1);
      // Ease-out cubic for a natural feel
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));
      if (raw < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const name = "Kader.";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: isDark ? "#000" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo with soft glow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(139, 92, 246, 0.08)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(139, 92, 246, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
          boxShadow: isDark
            ? "0 0 60px rgba(99, 102, 241, 0.12), 0 0 120px rgba(99, 102, 241, 0.06)"
            : "0 0 60px rgba(139, 92, 246, 0.15), 0 0 120px rgba(139, 92, 246, 0.08)",
        }}
      >
        <motion.img
          src={logo}
          alt=""
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            filter: isDark ? "invert(1)" : "none",
          }}
          animate={{ rotate: [0, 4, -4, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Name — letter by letter reveal */}
      <div
        style={{
          display: "flex",
          gap: 2,
          marginBottom: 48,
          overflow: "hidden",
        }}
      >
        {name.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 700,
              color: isDark ? "#fff" : "#4c1d95",
              letterSpacing: "-0.02em",
              display: "inline-block",
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "min(200px, 50vw)",
          height: 2,
          background: "rgba(139, 92, 246, 0.12)",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            borderRadius: 2,
            background: "linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(139, 92, 246, 1))",
            width: `${progress}%`,
            boxShadow: "0 0 12px rgba(139, 92, 246, 0.5)",
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Percentage */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: 16,
          fontSize: 12,
          color: isDark ? "#fff" : "#7c3aed",
          fontWeight: isDark ? 500 : 600,
          letterSpacing: "0.15em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {progress}%
      </motion.span>
    </motion.div>
  );
}
