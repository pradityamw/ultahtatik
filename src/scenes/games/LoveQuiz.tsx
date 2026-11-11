import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Trophy, ArrowLeft, RefreshCw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import type { QuizQuestion } from '../../types';
import { Button } from '../../components/shared/Button';

interface LoveQuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  onBack: () => void;
  playClick?: () => void;
  playSuccess?: () => void;
  playError?: () => void;
  playFanfare?: () => void;
}

export const LoveQuiz: React.FC<LoveQuizProps> = ({
  questions,
  onComplete,
  onBack,
  playClick,
  playSuccess,
  playError,
  playFanfare,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;

    playClick?.();
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setShowHeartAnim(true);
      playSuccess?.();
    } else {
      playError?.();
    }

    setTimeout(() => {
      setShowHeartAnim(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
        if (score + (isCorrect ? 1 : 0) >= 4) {
          playFanfare?.();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4f80', '#ffd1dc', '#d4af37'],
          });
        }
      }
    }, 1400);
  };

  const handleRestart = () => {
    playClick?.();
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
  };

  const getScoreMessage = (finalScore: number) => {
    if (finalScore === 5) {
      return {
        badge: 'Sempurna 100%! 🌟',
        desc: 'Wah, Tatik mengingat setiap detail manis kisah kita dengan sempurna! Hatiku meleleh rasanya ❤️',
      };
    }
    if (finalScore >= 3) {
      return {
        badge: 'Luar Biasa Manis! 🥰',
        desc: 'Hebat sekali! Hubungan kita memang selalu dipenuhi kenangan hangat yang terus hidup.',
      };
    }
    return {
      badge: 'Cinta Tetap Abadi! 💕',
      desc: 'Skor hanyalah angka, tapi cintaku padamu selalu 1000% setiap hari!',
    };
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

        {!isFinished && (
          <div className="flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full border border-blush shadow-xs text-xs font-semibold text-dreamy-600">
            <Trophy className="w-3.5 h-3.5 text-gold" />
            <span>Skor: {score}</span>
          </div>
        )}
      </div>

      {!isFinished ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blush shadow-soft-glow relative overflow-hidden"
        >
          {/* Question Progress Header */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold mb-2">
            <span>PERTANYAAN {currentIndex + 1} DARI {questions.length}</span>
            <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-dreamy-400 to-rose-400"
              initial={{ width: `${(currentIndex / questions.length) * 100}%` }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Text */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-800 text-center mb-6 min-h-[56px] flex items-center justify-center">
            {currentQ.question}
          </h3>

          {/* Answer Options */}
          <div className="flex flex-col gap-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrectOption = optIdx === currentQ.correctIndex;

              let buttonStyle = 'bg-cream-50 hover:bg-dreamy-50 border-gray-200 text-gray-700';

              if (isAnswered) {
                if (isCorrectOption) {
                  buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrectOption) {
                  buttonStyle = 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200';
                } else {
                  buttonStyle = 'bg-gray-50/50 border-gray-200 text-gray-400 opacity-60';
                }
              }

              return (
                <motion.button
                  key={optIdx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  whileHover={!isAnswered ? { scale: 1.015, x: 2 } : {}}
                  whileTap={!isAnswered ? { scale: 0.985 } : {}}
                  className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${buttonStyle}`}
                >
                  <span className="flex-1 pr-2">{option}</span>
                  {isAnswered && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 animate-scale-in" />
                  )}
                  {isAnswered && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 animate-scale-in" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {isAnswered && currentQ.explanation && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xs sm:text-sm text-center text-gray-500 italic font-serif"
            >
              💡 {currentQ.explanation}
            </motion.p>
          )}

          {/* Floating Heart Burst on Correct */}
          <AnimatePresence>
            {showHeartAnim && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0], y: -80 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
              >
                <div className="flex items-center gap-1 text-rose-500 bg-white/95 px-4 py-2 rounded-full shadow-lg border border-pink-200">
                  <Heart className="w-6 h-6 fill-current" />
                  <span className="font-bold text-sm text-rose-600">Benar Sekali! ❤️</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Results Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blush shadow-soft-glow text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-white mb-4 shadow-gold-glow">
            <Trophy className="w-10 h-10 text-amber-900" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-gray-800 mb-1">
            Kuis Cinta Selesai! 🎉
          </h3>
          <p className="text-sm font-semibold text-dreamy-600 mb-4">
            {getScoreMessage(score).badge}
          </p>

          <div className="text-4xl font-extrabold text-dreamy-700 mb-4">
            {score} <span className="text-lg text-gray-400 font-normal">/ {questions.length}</span>
          </div>

          <p className="font-serif italic text-sm sm:text-base text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            {getScoreMessage(score).desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="secondary"
              size="md"
              onClick={handleRestart}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Main Lagi
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => onComplete(score)}
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Simpan & Selesai
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
