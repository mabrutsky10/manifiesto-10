import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-500 rounded-full flex items-start justify-center p-2"
          animate={prefersReducedMotion ? {} : {
            y: [0, 8, 0],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            animate={prefersReducedMotion ? {} : {
              y: [0, 12, 0],
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <motion.span
          className="text-xs text-gray-500 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.8 }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </div>
  );
}
