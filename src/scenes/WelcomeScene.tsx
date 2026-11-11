import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../components/shared/Button';

interface WelcomeSceneProps {
  girlfriendName: string;
  birthdayDate: string;
  greetingText: string;
  onBegin: () => void;
  playClick?: () => void;
}

export const WelcomeScene: React.FC<WelcomeSceneProps> = ({
  girlfriendName,
  birthdayDate,
  greetingText,
  onBegin,
  playClick,
}) => {
  const handleStart = () => {
    playClick?.();
    onBegin();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-12 relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full flex flex-col items-center z-10"
      >
        {/* Date badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blush shadow-sm text-xs sm:text-sm font-medium text-dreamy-700 mb-6"
        >
          <Calendar className="w-4 h-4 text-dreamy-500" />
          <span>{birthdayDate}</span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </motion.div>

        {/* Animated Birthday Cake SVG */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 sm:w-36 sm:h-36 relative flex items-center justify-center"
          >
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Plate */}
              <ellipse cx="100" cy="170" rx="85" ry="16" fill="#fce7f3" stroke="#f472b6" strokeWidth="3" />

              {/* Bottom tier */}
              <rect x="35" y="115" width="130" height="45" rx="10" fill="#fbcfe8" />
              <rect x="35" y="115" width="130" height="15" rx="5" fill="#f472b6" />
              {/* Frosting drips */}
              <path
                d="M35 125 C45 135, 55 135, 65 125 C75 135, 85 135, 95 125 C105 135, 115 135, 125 125 C135 135, 145 135, 165 125"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Top tier */}
              <rect x="55" y="70" width="90" height="45" rx="8" fill="#fdf2f8" />
              <rect x="55" y="70" width="90" height="12" rx="4" fill="#fda4af" />
              {/* Frosting decorations */}
              <circle cx="75" cy="95" r="4" fill="#ff4f80" />
              <circle cx="100" cy="95" r="4" fill="#fbbf24" />
              <circle cx="125" cy="95" r="4" fill="#ff4f80" />

              {/* Candles */}
              <rect x="96" y="42" width="8" height="28" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              <line x1="100" y1="42" x2="100" y2="34" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" />

              {/* Animated Candle Flame */}
              <g className="animate-pulse">
                <path
                  d="M100 16 C105 24, 107 28, 100 34 C93 28, 95 24, 100 16 Z"
                  fill="#f59e0b"
                />
                <path
                  d="M100 22 C103 26, 104 29, 100 32 C96 29, 97 26, 100 22 Z"
                  fill="#fef08a"
                />
              </g>

              {/* Tiny hearts decoration */}
              <path
                d="M48 90 C45 87, 40 89, 40 93 C40 98, 48 103, 48 103 C48 103, 56 98, 56 93 C56 89, 51 87, 48 90 Z"
                fill="#f43f5e"
              />
              <path
                d="M152 90 C149 87, 144 89, 144 93 C144 98, 152 103, 152 103 C152 103, 160 98, 160 93 C160 89, 155 87, 152 90 Z"
                fill="#f43f5e"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="mb-4">
          <p className="font-cursive text-3xl sm:text-4xl text-dreamy-500 font-semibold tracking-wide">
            Selamat Ulang Tahun Sayang,
          </p>
          <h1 className="font-cursive text-5xl sm:text-7xl md:text-8xl text-gold-dark drop-shadow-sm font-bold tracking-wide mt-1">
            {girlfriendName} ❤️
          </h1>
        </motion.div>

        {/* Romantic Greeting Description */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-blush/80 shadow-soft-glow mb-8 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg max-w-xl"
        >
          <div className="flex justify-center mb-3 text-dreamy-400">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <p className="italic font-serif">{greetingText}</p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3"
        >
          <Button
            size="lg"
            variant="primary"
            onClick={handleStart}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="animate-pulse-glow"
          >
            Mulai Petualangan Kita ✨
          </Button>
          <span className="text-xs text-gray-400 font-medium">
            (Pastikan volume suaramu menyala ya!)
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};
