import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export const MusicControls: React.FC<MusicControlsProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blush shadow-md text-xs font-medium text-dreamy-800 pointer-events-none"
          >
            <span>{isMuted ? 'Musik Dibisukan 🔇' : isPlaying ? 'Memutar Melodi Cinta 🎶' : 'Putar Musik 🎵'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-blush/80 shadow-soft-glow"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className={`p-2.5 rounded-full transition-all duration-300 ${
            isPlaying && !isMuted
              ? 'bg-gradient-to-r from-dreamy-500 to-rose-400 text-white shadow-sm'
              : 'bg-blush-light text-dreamy-700 hover:bg-blush'
          }`}
          title={isPlaying ? 'Jeda Musik' : 'Mulai Musik'}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <Music className={`w-4 h-4 ${isPlaying && !isMuted ? 'animate-spin-slow' : ''}`} />
        </button>

        {/* Animated Equalizer Wave (Active when music is playing) */}
        {isPlaying && !isMuted && (
          <div className="flex items-end gap-0.5 px-2 h-4 overflow-hidden" aria-hidden="true">
            <span className="w-1 bg-dreamy-500 rounded-full animate-bounce [animation-duration:600ms] h-3.5" />
            <span className="w-1 bg-rose-400 rounded-full animate-bounce [animation-duration:800ms] h-2" />
            <span className="w-1 bg-dreamy-600 rounded-full animate-bounce [animation-duration:700ms] h-4" />
          </div>
        )}

        {/* Mute/Unmute Button */}
        <button
          onClick={onToggleMute}
          className="p-2 rounded-full text-dreamy-700 hover:text-dreamy-900 hover:bg-blush-light transition-colors ml-0.5"
          title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-dreamy-600" />
          )}
        </button>
      </motion.div>
    </div>
  );
};
