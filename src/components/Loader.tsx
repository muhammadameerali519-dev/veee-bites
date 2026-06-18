import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Utensils, Star } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600); // Wait for transition out
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loader-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Shimmering Golden Background Radial Glow */}
          <div className="absolute inset-x-0 top-1/4 h-[350px] w-[350px] mx-auto rounded-full bg-[#FFC107] opacity-5 blur-[120px]" />

          <div className="relative flex flex-col items-center">
            {/* Animated Golden Plate Outline */}
            <motion.div
              className="relative flex items-center justify-center w-32 h-32 rounded-full border-2 border-[#FFC107] border-dashed"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            >
              {/* Inner Circle Glow */}
              <div className="absolute inset-1.5 rounded-full border border-yellow-500/30 bg-black/60" />
            </motion.div>

            {/* Glowing Center Logo Indicator */}
            <motion.div
              className="absolute top-8 flex items-center justify-center w-16 h-16 rounded-full bg-[#FFC107] text-black shadow-[0_0_30px_rgba(255,193,7,0.4)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Utensils className="w-8 h-8 stroke-[1.8]" />
            </motion.div>

            {/* Glowing Dots */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#FFC107]"
                style={{
                  top: "40%",
                  left: "50%",
                }}
                animate={{
                  y: [-20, -120],
                  x: [0, (i - 1) * 30],
                  scale: [1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Luxury Text Greeting */}
          <motion.div
            className="mt-8 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="font-display text-4xl tracking-[0.25em] text-white font-bold">
              VEE <span className="text-[#FFC107]">BITE</span>
            </h1>
            <div className="flex items-center justify-center mt-2.5 space-x-2">
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#FFC107]" />
              <Star className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
              <span className="font-serif text-sm italic text-gray-400 tracking-wider">
                Eat Good, Feel Good
              </span>
              <Star className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#FFC107]" />
            </div>
          </motion.div>

          {/* Simulating Load percentage */}
          <motion.div
            className="w-48 h-[2px] mt-12 bg-zinc-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#FFC107] to-amber-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>

          <p className="mt-3 text-xs tracking-widest text-zinc-500 font-mono uppercase">
            Crafting Culinary Perfection...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
