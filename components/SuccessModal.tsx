"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export default function SuccessModal({ isOpen, onClose, name }: SuccessModalProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);

      // Auto-close after 6 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Confetti Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}%`,
              y: "-10%",
              opacity: 1,
              scale: 0,
            }}
            animate={{
              y: "110%",
              opacity: 0,
              scale: [0, 1, 0.5],
              rotate: [0, 360, 720],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: particle.delay,
              ease: "easeOut",
            }}
            className="absolute w-3 h-3 pointer-events-none"
            style={{
              left: `${particle.x}%`,
            }}
          >
            <div
              className={`w-full h-full rounded-sm ${
                ["bg-indigo-500", "bg-purple-500", "bg-emerald-500", "bg-amber-400", "bg-pink-500"][
                  particle.id % 5
                ]
              }`}
            />
          </motion.div>
        ))}

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            delay: 0.1,
          }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Circuit Board Background Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="currentColor" className="text-indigo-400" />
                  <path
                    d="M20 20 L20 0 M20 20 L40 20 M20 20 L20 40 M20 20 L0 20"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-indigo-400"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>

          {/* Main Card */}
          <div className="relative glass rounded-3xl p-8 soft-border overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-20 animate-pulse" />

            {/* Success Icon with Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 200,
                delay: 0.3,
              }}
              className="relative mx-auto w-24 h-24 mb-6"
            >
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-indigo-500/30"
              />
              {/* Inner Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-4 border-dotted border-purple-500/30"
              />
              {/* Center Checkmark */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                </motion.svg>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center space-y-3"
            >
              <motion.h3
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-2xl md:text-3xl font-bold text-white"
              >
                🎉 Félicitations {name}!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-slate-300"
              >
                Ton rendez-vous est confirmé!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass rounded-xl p-4 mt-4 soft-border"
              >
                <p className="text-sm text-slate-400 mb-2">Prochaines étapes:</p>
                <ul className="text-sm text-slate-300 space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">1</span>
                    Je te contacte sous 24h pour confirmer
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">2</span>
                    On fixe l&apos;heure exacte de l&apos;appel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                    Tu paies 100 TND le jour J via Flouci/D17
                  </li>
                </ul>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-slate-500 mt-4"
              >
                Un email de confirmation t&apos;est envoyé 📧
              </motion.p>
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full mt-6 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
            >
              Parfait, merci! 🚀
            </motion.button>

            {/* Auto-close indicator */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 origin-left"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
