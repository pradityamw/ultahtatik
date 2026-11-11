import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Milestone } from 'lucide-react';
import type { TimelineEvent } from '../types';
import { Button } from '../components/shared/Button';

interface TimelineProps {
  timeline: TimelineEvent[];
  onContinue: () => void;
  playClick?: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  timeline,
  onContinue,
  playClick,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-lg"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-light text-dreamy-700 text-xs font-semibold mb-3 border border-blush">
          <Milestone className="w-3.5 h-3.5 text-dreamy-500" />
          <span>Jejak Langkah Kita</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Perjalanan Cinta Kita 🛤️
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-serif italic">
          Dari detik pertama kita berjumpa hingga hari ini, setiap tahunnya adalah anugerah terindah.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative w-full mb-14">
        {/* Central Vertical Gradient Bar (Left on mobile, Center on desktop) */}
        <div
          className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-dreamy-300 via-rose-400 to-gold rounded-full"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8 md:gap-12 w-full">
          {timeline.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center w-full ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row pl-12 md:pl-0`}
              >
                {/* Center Node / Circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-dreamy-400 shadow-md flex items-center justify-center z-20">
                  <Heart className="w-3.5 h-3.5 text-dreamy-500 fill-dreamy-400" />
                </div>

                {/* Event Content Card (Takes half width on desktop) */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-blush shadow-soft-glow transition-all duration-300"
                  >
                    {/* Header badge & Emoji */}
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      } justify-start`}
                    >
                      <span className="text-2xl">{event.emoji}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-dreamy-100 text-dreamy-800 border border-dreamy-200">
                        {event.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Empty spacer for the other half on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-2"
      >
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            playClick?.();
            onContinue();
          }}
          rightIcon={<ArrowRight className="w-5 h-5" />}
          className="shadow-soft-glow"
        >
          Buka Surat Cinta Untukmu 💌
        </Button>
        <span className="text-xs text-gray-400 font-medium">
          Ada sepucuk surat tulus yang menunggumu...
        </span>
      </motion.div>
    </div>
  );
};
