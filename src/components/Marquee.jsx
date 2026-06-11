import { useLang } from "../context/LanguageContext";

export default function Marquee() {
  const { lang } = useLang();
  
  const text = lang === "fr"
    ? "DÉVELOPPEUR FULL STACK ✦ CONCEPTION & DESIGN ✦ PERFORMANCE ✦ INNOVATION ✦ ACCESSIBILITÉ ✦ "
    : "FULL STACK DEVELOPER ✦ DESIGN & CREATIVE ✦ PERFORMANCE ✦ INNOVATION ✦ ACCESSIBILITY ✦ ";

  // Repeat text to ensure it covers screen width twice for seamless scrolling
  const repeatedText = Array(4).fill(text).join("");

  return (
    <div className="w-full overflow-hidden bg-violet-50/70 dark:bg-slate-900/50 border-y border-violet-100 dark:border-violet-800/50 py-6 sm:py-8 select-none relative z-10">
      <div className="flex whitespace-nowrap w-max">
        {/* First marquee slide */}
        <div className="flex animate-marquee gap-4 pr-4 text-violet-800 dark:text-white font-extrabold uppercase tracking-widest text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          <span>{repeatedText}</span>
        </div>
        {/* Second marquee slide (duplicate for infinite loop) */}
        <div className="flex animate-marquee gap-4 pr-4 text-violet-800 dark:text-white font-extrabold uppercase tracking-widest text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" aria-hidden="true">
          <span>{repeatedText}</span>
        </div>
      </div>
    </div>
  );
}
