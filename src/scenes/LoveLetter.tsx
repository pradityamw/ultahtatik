import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles, ArrowRight, FastForward } from 'lucide-react';
import { Button } from '../components/shared/Button';

interface LoveLetterProps {
  paragraphs: string[];
  girlfriendName: string;
  myName: string;
  onContinue: () => void;
  playClick?: () => void;
  playSuccess?: () => void;
  playSparkle?: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  paragraphs,
  girlfriendName,
  myName,
  onContinue,
  playClick,
  playSuccess,
  playSparkle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterPulled, setIsLetterPulled] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  const fullLetterText = useMemo(() => {
    return paragraphs.join('\n\n');
  }, [paragraphs]);

  // Open envelope
  const handleOpenEnvelope = () => {
    if (isOpen) return;
    playClick?.();
    playSparkle?.();
    setIsOpen(true);

    // After flap opens, slide letter up
    setTimeout(() => {
      setIsLetterPulled(true);
    }, 700);
  };

  // Start typing when letter is pulled out
  useEffect(() => {
    if (isLetterPulled && !isTypingDone) {
      timerRef.current = window.setInterval(() => {
        setCharCount((prev) => {
          if (prev >= fullLetterText.length) {
            if (timerRef.current !== null) clearInterval(timerRef.current);
            setIsTypingDone(true);
            playSuccess?.();
            return fullLetterText.length;
          }
          return prev + 1;
        });
      }, 25);
    }

    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [isLetterPulled, isTypingDone, fullLetterText.length, playSuccess]);

  const handleSkipTyping = () => {
    playClick?.();
    if (timerRef.current !== null) clearInterval(timerRef.current);
    setCharCount(fullLetterText.length);
    setIsTypingDone(true);
    playSuccess?.();
  };

  const displayedText = fullLetterText.slice(0, charCount);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-lg"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-light text-dreamy-700 text-xs font-semibold mb-3 border border-blush">
          <Mail className="w-3.5 h-3.5 text-dreamy-500" />
          <span>Surat Dari Lubuk Hati</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Sepucuk Surat Untuk {girlfriendName} 💌
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-serif italic">
          Buka amplop ini dan baca kata-kata tulus yang kutuliskan hanya untukmu...
        </p>
      </motion.div>

      {/* Sealed Envelope Container */}
      {!isLetterPulled ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center my-6"
        >
          {/* Envelope Body */}
          <div
            onClick={handleOpenEnvelope}
            className="w-full h-full bg-gradient-to-tr from-pink-200 via-rose-100 to-amber-50 rounded-2xl border-2 border-pink-300 shadow-soft-glow relative overflow-hidden cursor-pointer flex items-center justify-center group"
          >
            {/* Envelope flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-pink-300 to-rose-200 envelope-flap origin-top border-b border-pink-300 z-20 ${
                isOpen ? 'open' : ''
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Envelope bottom folds */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top right, #fbcfe8 50%, transparent 50%), linear-gradient(to top left, #fbcfe8 50%, transparent 50%)',
                opacity: 0.5,
              }}
            />

            {/* Golden Wax Seal Stamp */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-gold to-amber-600 border-2 border-yellow-200 shadow-gold-glow flex flex-col items-center justify-center text-white z-30 transition-transform ${
                isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <Heart className="w-5 h-5 fill-white" />
              <span className="text-[9px] font-bold tracking-tighter mt-0.5">T & S</span>
            </motion.div>

            {/* Call to action label */}
            <div className="absolute bottom-4 z-20">
              <span className="text-xs font-semibold text-rose-700 bg-white/80 px-3 py-1 rounded-full border border-pink-200 shadow-xs group-hover:bg-white transition-colors">
                Sentuh untuk Membuka 💌
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Unfolded Letter Card */
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#fcfaf7] rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-soft-glow relative overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(#e5e7eb 0.75px, transparent 0.75px), radial-gradient(#e5e7eb 0.75px, #fcfaf7 0.75px)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        >
          {/* Subtle Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-200/25 pointer-events-none select-none">
            <Heart className="w-64 h-64 fill-current" />
          </div>

          {/* Letter Header */}
          <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-6">
            <span className="font-serif italic text-xs sm:text-sm text-gray-400">
              Surat Cinta Teruntuk Tatik
            </span>
            <div className="flex items-center gap-1 text-gold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Letter Body with preserved formatting */}
          <div className="font-serif text-base sm:text-lg text-gray-700 leading-relaxed sm:leading-loose whitespace-pre-wrap min-h-[220px]">
            {displayedText}
            {!isTypingDone && (
              <span className="inline-block w-2 h-5 bg-dreamy-500 ml-1 animate-pulse" />
            )}
          </div>

          {/* Signature */}
          <AnimatePresence>
            {isTypingDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 pt-6 border-t border-pink-100 flex flex-col items-end text-right"
              >
                <p className="font-serif italic text-sm text-gray-500 mb-1">
                  Dengan segenap cintaku,
                </p>
                <p className="font-cursive text-3xl sm:text-4xl text-dreamy-600 font-bold">
                  {myName} ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip button while typing */}
          {!isTypingDone && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSkipTyping}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-semibold text-gray-500 hover:text-dreamy-600 border border-gray-200 shadow-xs transition-colors cursor-pointer"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Lewati Animasi Mengetik</span>
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Continue Button to Grand Finale */}
      <AnimatePresence>
        {isTypingDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                playClick?.();
                onContinue();
              }}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="animate-pulse-glow"
            >
              Lanjut ke Kejutan Terakhir 🎁
            </Button>
            <span className="text-xs text-gray-400 font-medium">
              Ada kado istimewa menantimu di ujung petualangan!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
