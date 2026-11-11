import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { KeyRound, Lightbulb, ArrowLeft, Heart, Sparkles, Send, RefreshCw } from 'lucide-react';
import type { PuzzleConfig } from '../../types';
import { Button } from '../../components/shared/Button';

interface SecretPuzzleProps {
  puzzle: PuzzleConfig;
  onComplete: () => void;
  onBack: () => void;
  playClick?: () => void;
  playSuccess?: () => void;
  playError?: () => void;
  playSparkle?: () => void;
}

export const SecretPuzzle: React.FC<SecretPuzzleProps> = ({
  puzzle,
  onComplete,
  onBack,
  playClick,
  playSuccess,
  playError,
  playSparkle,
}) => {
  const [answerInput, setAnswerInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');

  // Validate answer (case-insensitive & accepts "buku", "novel", "buku cerita", etc.)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim() || isSuccess) return;

    playClick?.();
    const cleanAnswer = answerInput.trim().toLowerCase();
    const target = puzzle.answer.toLowerCase();

    const isMatch =
      cleanAnswer === target ||
      cleanAnswer.includes(target) ||
      (target === 'buku' && cleanAnswer.includes('novel')) ||
      (target === 'novel' && cleanAnswer.includes('buku'));

    if (isMatch) {
      setTypedMessage('');
      setIsSuccess(true);
      setIsError(false);
      playSuccess?.();
      playSparkle?.();
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#ff4f80', '#d4af37', '#ffd6df', '#f472b6'],
      });
    } else {
      setIsError(true);
      playError?.();
      setTimeout(() => setIsError(false), 900);
    }
  };

  // Typewriter effect for secret message
  useEffect(() => {
    if (isSuccess) {
      let charIndex = 0;
      const fullText = puzzle.secretMessage;

      const timer = setInterval(() => {
        if (charIndex < fullText.length) {
          setTypedMessage(fullText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(timer);
        }
      }, 35);

      return () => clearInterval(timer);
    }
  }, [isSuccess, puzzle.secretMessage]);

  const handleReset = () => {
    playClick?.();
    setAnswerInput('');
    setIsSuccess(false);
    setIsError(false);
    setShowHint(false);
    setTypedMessage('');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-dreamy-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Game</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blush shadow-soft-glow relative"
      >
        {/* Header Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-dreamy-500 to-rose-400 text-white flex items-center justify-center shadow-md mb-4">
          <KeyRound className="w-8 h-8" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-gray-800 text-center mb-2">
          Teka-Teki Rahasia 🔐
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 font-sans">
          Pecahkan teka-teki manis ini untuk membaca pesan cinta rahasia!
        </p>

        {/* Clue Card */}
        <div className="bg-cream-100/90 rounded-2xl p-5 border border-blush/70 mb-6 text-gray-700 font-serif italic text-sm sm:text-base leading-relaxed text-center relative">
          <span className="text-2xl text-dreamy-400 font-serif block -mb-2">“</span>
          {puzzle.clue}
          <span className="text-2xl text-dreamy-400 font-serif block -mt-2">”</span>
        </div>

        {/* Hint Accordion */}
        <div className="mb-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              playClick?.();
              setShowHint((prev) => !prev);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100/70 px-3.5 py-1.5 rounded-full border border-amber-200 transition-colors cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Tutup Petunjuk' : 'Buka Petunjuk 💡'}</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden w-full"
              >
                <div className="mt-3 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 text-center">
                  {puzzle.hint}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isSuccess ? (
          /* Form Input */
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <motion.div
              animate={isError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="w-full mb-3"
            >
              <input
                type="text"
                value={answerInput}
                onChange={(e) => {
                  setAnswerInput(e.target.value);
                  setIsError(false);
                }}
                placeholder="Ketik jawabanmu di sini..."
                className={`w-full px-5 py-3.5 rounded-2xl border text-center text-base sm:text-lg focus:outline-none transition-all ${
                  isError
                    ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/50'
                    : 'border-blush focus:border-dreamy-500 focus:ring-2 focus:ring-dreamy-200 bg-white'
                }`}
              />
            </motion.div>

            {/* Error Message */}
            <div className="h-6 mb-2">
              <AnimatePresence>
                {isError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-medium text-rose-500 text-center"
                  >
                    Jawaban belum tepat, coba perhatikan petunjuknya ya sayang! 💕
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              rightIcon={<Send className="w-4 h-4" />}
            >
              Buka Kunci Rahasia
            </Button>
          </form>
        ) : (
          /* Secret Message Revealed Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-full bg-gradient-to-br from-pink-50 via-rose-50 to-cream-50 p-6 rounded-2xl border border-pink-200 shadow-inner mb-6 relative overflow-hidden">
              <div className="flex justify-center text-dreamy-500 mb-2">
                <Heart className="w-6 h-6 fill-current animate-pulse" />
              </div>
              <h4 className="font-serif text-lg font-bold text-gray-800 mb-2">
                Pesan Rahasia Terbuka! ✨
              </h4>
              <p className="font-serif italic text-dreamy-900 text-base sm:text-lg leading-relaxed min-h-[70px]">
                {typedMessage}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <Button
                variant="secondary"
                size="md"
                onClick={handleReset}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Coba Lagi
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={onComplete}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Selesaikan Game
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
