import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 3000; // 3 seconds
    const intervalTime = 30; // update every 30ms
    const step = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-cream-100 via-blush-light to-dreamy-100 overflow-hidden px-6">
      {/* Background ambient sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-dreamy-300"
            style={{
              top: `${(i * 23) % 90}%`,
              left: `${(i * 37) % 90}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.7, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          >
            <Sparkles className="w-5 h-5 opacity-60" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-md w-full"
      >
        {/* Animated Heart Logo with Pulsing Rings */}
        <div className="relative mb-8 flex items-center justify-center">
          <motion.div
            className="absolute w-28 h-28 rounded-full bg-dreamy-200/50"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-dreamy-300/40"
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0.1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-dreamy-500 via-rose-400 to-pink-300 flex items-center justify-center shadow-soft-glow"
          >
            <Heart className="w-10 h-10 text-white fill-white" />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-cursive text-4xl sm:text-5xl text-dreamy-700 font-bold mb-3 tracking-wide"
        >
          The Little Birthday Adventure
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm sm:text-base text-gray-600 font-serif italic mb-8"
        >
          Mempersiapkan petualangan manis penuh kejutan...
        </motion.p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs bg-white/70 backdrop-blur-sm rounded-full p-1 border border-blush shadow-inner mb-3">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-dreamy-400 via-rose-400 to-gold"
            style={{ width: `${Math.min(100, Math.round(progress))}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        {/* Progress Percent Text */}
        <div className="flex items-center gap-1 text-xs font-semibold text-dreamy-600">
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
      </motion.div>
    </div>
  );
};
