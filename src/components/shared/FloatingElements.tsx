import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingItem {
  id: number;
  symbol: string;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  driftX: number; // px
  opacity: number;
}

const SYMBOLS = ['❤️', '💖', '💕', '🌸', '✨', '⭐', '🌷', '🌺', '💫', '🤍'];

// Deterministic pseudo-random values to maintain pure render
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

export const FloatingElements: React.FC = () => {
  const items = useMemo<FloatingItem[]>(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 5 + 2);
      const r3 = pseudoRandom(i * 7 + 3);
      const r4 = pseudoRandom(i * 11 + 4);
      const r5 = pseudoRandom(i * 13 + 5);

      return {
        id: i,
        symbol: SYMBOLS[i % SYMBOLS.length],
        left: r1 * 94 + 3, // 3% to 97%
        size: Math.floor(r2 * 16) + 14, // 14px to 30px
        duration: r3 * 10 + 12, // 12s to 22s
        delay: r4 * 8, // 0s to 8s
        driftX: (r5 - 0.5) * 80, // -40px to +40px
        opacity: r2 * 0.4 + 0.35, // 0.35 to 0.75
      };
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${item.left}%`,
            bottom: '-40px',
            fontSize: `${item.size}px`,
          }}
          initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '-110vh',
            x: [0, item.driftX, -item.driftX, 0],
            opacity: [0, item.opacity, item.opacity, 0],
            rotate: [0, 15, -15, 25],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
};
