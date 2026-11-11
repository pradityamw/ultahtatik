import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, KeyRound, Sparkles, CheckCircle2, ArrowRight, Play, Gamepad2 } from 'lucide-react';
import type { QuizQuestion, MemoryCard, PuzzleConfig, GameType } from '../types';
import { Button } from '../components/shared/Button';
import { LoveQuiz } from './games/LoveQuiz';
import { MemoryMatch } from './games/MemoryMatch';
import { SecretPuzzle } from './games/SecretPuzzle';

interface GamesHubProps {
  quizQuestions: QuizQuestion[];
  memoryCards: MemoryCard[];
  puzzle: PuzzleConfig;
  onContinue: () => void;
  playClick?: () => void;
  playFlip?: () => void;
  playSuccess?: () => void;
  playError?: () => void;
  playSparkle?: () => void;
  playFanfare?: () => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({
  quizQuestions,
  memoryCards,
  puzzle,
  onContinue,
  playClick,
  playFlip,
  playSuccess,
  playError,
  playSparkle,
  playFanfare,
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('none');
  const [completedGames, setCompletedGames] = useState<Record<string, boolean>>({
    quiz: false,
    memory: false,
    puzzle: false,
  });

  const completedCount = Object.values(completedGames).filter(Boolean).length;
  const allCompleted = completedCount === 3;

  const handleGameSelect = (game: GameType) => {
    playClick?.();
    setActiveGame(game);
  };

  const handleGameFinish = (gameKey: 'quiz' | 'memory' | 'puzzle') => {
    setCompletedGames((prev) => ({ ...prev, [gameKey]: true }));
    setActiveGame('none');
  };

  // If a specific game is active, render that sub-scene
  if (activeGame === 'quiz') {
    return (
      <LoveQuiz
        questions={quizQuestions}
        onComplete={() => handleGameFinish('quiz')}
        onBack={() => setActiveGame('none')}
        playClick={playClick}
        playSuccess={playSuccess}
        playError={playError}
        playFanfare={playFanfare}
      />
    );
  }

  if (activeGame === 'memory') {
    return (
      <MemoryMatch
        cardPairs={memoryCards}
        onComplete={() => handleGameFinish('memory')}
        onBack={() => setActiveGame('none')}
        playClick={playClick}
        playFlip={playFlip}
        playSuccess={playSuccess}
        playError={playError}
        playFanfare={playFanfare}
      />
    );
  }

  if (activeGame === 'puzzle') {
    return (
      <SecretPuzzle
        puzzle={puzzle}
        onComplete={() => handleGameFinish('puzzle')}
        onBack={() => setActiveGame('none')}
        playClick={playClick}
        playSuccess={playSuccess}
        playError={playError}
        playSparkle={playSparkle}
      />
    );
  }

  const gameItems = [
    {
      type: 'quiz' as GameType,
      title: 'Kuis Cinta Kita 💖',
      desc: '5 Pertanyaan manis tentang momen berkesan yang pernah kita lewati berdua.',
      difficulty: 'Mudah',
      diffColor: 'bg-emerald-100 text-emerald-700',
      icon: <Heart className="w-6 h-6 text-rose-500 fill-rose-100" />,
      completed: completedGames.quiz,
    },
    {
      type: 'memory' as GameType,
      title: 'Cocokkan Kenangan 🧩',
      desc: 'Temukan 8 pasangan simbol cinta dan kencan manis kita dalam papan 4x4.',
      difficulty: 'Sedang',
      diffColor: 'bg-amber-100 text-amber-700',
      icon: <Gamepad2 className="w-6 h-6 text-amber-500" />,
      completed: completedGames.memory,
    },
    {
      type: 'puzzle' as GameType,
      title: 'Teka-Teki Rahasia 🔐',
      desc: 'Pecahkan satu teka-teki manis untuk membuka sepucuk pesan rahasia yang tersembunyi.',
      difficulty: 'Spesial',
      diffColor: 'bg-purple-100 text-purple-700',
      icon: <KeyRound className="w-6 h-6 text-purple-500" />,
      completed: completedGames.puzzle,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-lg"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-light text-dreamy-700 text-xs font-semibold mb-3 border border-blush">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Mini Games Spesial Ulang Tahun</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Arena Games Cinta 🎮
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-serif italic">
          Selesaikan 3 tantangan kecil ini untuk menguji kekompakan dan membuka bab berikutnya!
        </p>

        {/* Overall Progress Bar */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-blush shadow-xs">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-2">
            <span>PROGRES TANTANGAN</span>
            <span className="text-dreamy-600 font-bold">{completedCount} / 3 Selesai</span>
          </div>
          <div className="w-full h-2.5 bg-pink-100/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-dreamy-500 to-rose-400"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* 3 Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-10">
        {gameItems.map((game, idx) => (
          <motion.div
            key={game.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between bg-white/90 backdrop-blur-md shadow-sm ${
              game.completed
                ? 'border-emerald-200 bg-emerald-50/20'
                : 'border-blush hover:shadow-soft-glow'
            }`}
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-cream-100 border border-gray-100">
                  {game.icon}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${game.diffColor}`}>
                    {game.difficulty}
                  </span>
                  {game.completed && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Selesai
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">
                {game.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans mb-6">
                {game.desc}
              </p>
            </div>

            {/* Action Button */}
            <Button
              variant={game.completed ? 'secondary' : 'primary'}
              size="sm"
              fullWidth
              onClick={() => handleGameSelect(game.type)}
              rightIcon={game.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            >
              {game.completed ? 'Main Ulang ✨' : 'Mainkan Sekarang'}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Continue or Skip Button */}
      <div className="flex flex-col items-center gap-3">
        <AnimatePresence>
          {allCompleted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  playClick?.();
                  onContinue();
                }}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="animate-pulse-glow"
              >
                Claim Hadiahku! 🎁
              </Button>
              <p className="text-xs text-emerald-600 font-semibold mt-2">
                🎉 Luar biasa! Semua game berhasil kamu taklukkan!
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  playClick?.();
                  onContinue();
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="text-gray-400 hover:text-dreamy-600 text-xs"
              >
                Lewati Games & Langsung Claim Hadiah →
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
