import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, RefreshCw, Trophy, Clock, Zap, Heart, Sparkles } from 'lucide-react';
import type { MemoryCard as MemoryCardType } from '../../types';
import { Button } from '../../components/shared/Button';

interface MemoryCardItem {
  uniqueId: string;
  pairId: number;
  emoji: string;
  label: string;
}

interface MemoryMatchProps {
  cardPairs: MemoryCardType[];
  onComplete: () => void;
  onBack: () => void;
  playClick?: () => void;
  playFlip?: () => void;
  playSuccess?: () => void;
  playError?: () => void;
  playFanfare?: () => void;
}

function createShuffledDeck(cardPairs: MemoryCardType[]): MemoryCardItem[] {
  const deck: MemoryCardItem[] = [];
  cardPairs.forEach((item) => {
    deck.push({
      uniqueId: `${item.id}-a`,
      pairId: item.id,
      emoji: item.emoji,
      label: item.label,
    });
    deck.push({
      uniqueId: `${item.id}-b`,
      pairId: item.id,
      emoji: item.emoji,
      label: item.label,
    });
  });

  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export const MemoryMatch: React.FC<MemoryMatchProps> = ({
  cardPairs,
  onComplete,
  onBack,
  playClick,
  playFlip,
  playSuccess,
  playError,
  playFanfare,
}) => {
  const [cards, setCards] = useState<MemoryCardItem[]>(() => createShuffledDeck(cardPairs));
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const isEvaluatingRef = useRef(false);

  // Restart and shuffle cards
  const handleRestart = useCallback(() => {
    setCards(createShuffledDeck(cardPairs));
    setFlippedIds([]);
    setMatchedPairIds([]);
    setMoves(0);
    setSeconds(0);
    setTimerActive(false);
    setIsVictory(false);
    isEvaluatingRef.current = false;
  }, [cardPairs]);

  // Timer counter
  useEffect(() => {
    let interval: number | null = null;
    if (timerActive && !isVictory) {
      interval = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [timerActive, isVictory]);

  const handleCardClick = (card: MemoryCardItem) => {
    if (isEvaluatingRef.current) return;
    if (flippedIds.includes(card.uniqueId)) return;
    if (matchedPairIds.includes(card.pairId)) return;

    if (!timerActive) {
      setTimerActive(true);
    }

    playFlip?.();

    if (flippedIds.length === 0) {
      setFlippedIds([card.uniqueId]);
    } else if (flippedIds.length === 1) {
      const firstId = flippedIds[0];
      const firstCard = cards.find((c) => c.uniqueId === firstId);

      setFlippedIds([firstId, card.uniqueId]);
      setMoves((m) => m + 1);
      isEvaluatingRef.current = true;

      if (firstCard && firstCard.pairId === card.pairId) {
        // MATCH!
        setTimeout(() => {
          playSuccess?.();
          setMatchedPairIds((prev) => {
            const next = [...prev, card.pairId];
            if (next.length === cardPairs.length) {
              // VICTORY!
              setIsVictory(true);
              setTimerActive(false);
              playFanfare?.();
              confetti({
                particleCount: 100,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ff4f80', '#ffd1dc', '#d4af37', '#c084fc'],
              });
            }
            return next;
          });
          setFlippedIds([]);
          isEvaluatingRef.current = false;
        }, 500);
      } else {
        // NO MATCH
        setTimeout(() => {
          playError?.();
          setFlippedIds([]);
          isEvaluatingRef.current = false;
        }, 1000);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            playClick?.();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-dreamy-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full border border-blush shadow-xs text-xs font-semibold text-gray-700">
            <Clock className="w-3.5 h-3.5 text-dreamy-500" />
            <span>{formatTime(seconds)}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full border border-blush shadow-xs text-xs font-semibold text-gray-700">
            <Zap className="w-3.5 h-3.5 text-gold" />
            <span>Langkah: {moves}</span>
          </div>
        </div>
      </div>

      {!isVictory ? (
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-blush shadow-soft-glow">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-4 text-xs font-semibold text-gray-500 px-1">
            <span>PASANGAN TERDAPAT: {matchedPairIds.length} / {cardPairs.length}</span>
            <span className="text-dreamy-600">
              {Math.round((matchedPairIds.length / cardPairs.length) * 100)}%
            </span>
          </div>

          {/* 4x4 Grid */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 perspective-1000">
            {cards.map((card) => {
              const isFlipped =
                flippedIds.includes(card.uniqueId) || matchedPairIds.includes(card.pairId);
              const isMatched = matchedPairIds.includes(card.pairId);

              return (
                <div
                  key={card.uniqueId}
                  onClick={() => handleCardClick(card)}
                  className="w-full aspect-square cursor-pointer select-none relative"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="w-full h-full transform-style-3d relative rounded-xl sm:rounded-2xl shadow-sm"
                  >
                    {/* Card Back (Cute romantic pattern) */}
                    <div className="absolute inset-0 backface-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-400 via-rose-400 to-dreamy-500 border border-white/40 flex items-center justify-center p-2 text-white shadow-sm hover:scale-[1.02] transition-transform">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white/80 opacity-90 animate-pulse" />
                    </div>

                    {/* Card Front (Emoji & Label) */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl sm:rounded-2xl bg-white border-2 flex flex-col items-center justify-center p-1 text-center transition-all duration-300 ${
                        isMatched
                          ? 'border-emerald-400 bg-emerald-50/70 shadow-sm'
                          : 'border-pink-300 bg-pink-50/50'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl mb-0.5">{card.emoji}</span>
                      <span className="text-[10px] sm:text-xs font-medium text-gray-700 leading-tight line-clamp-1 px-1">
                        {card.label}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Victory Modal / View */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blush shadow-soft-glow text-center"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-white mb-4 shadow-md">
            <Trophy className="w-10 h-10 text-emerald-950" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-gray-800 mb-1">
            Hebat Banget! Cocok Semua! 🎉
          </h3>
          <p className="text-sm font-semibold text-dreamy-600 mb-4">
            Semua pasangan kenangan berhasil kamu temukan! ✨
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-6">
            <div className="bg-cream-100 p-3 rounded-2xl border border-blush/60">
              <span className="text-xs text-gray-400 block font-medium">Waktu Selesai</span>
              <span className="text-xl font-bold text-gray-800">{formatTime(seconds)}</span>
            </div>
            <div className="bg-cream-100 p-3 rounded-2xl border border-blush/60">
              <span className="text-xs text-gray-400 block font-medium">Total Langkah</span>
              <span className="text-xl font-bold text-gray-800">{moves} kali</span>
            </div>
          </div>

          <p className="font-serif italic text-sm text-gray-600 mb-6 leading-relaxed max-w-sm mx-auto">
            Sama seperti kartu-kartu ini yang saling menemukan pasangannya, hatiku juga begitu bahagia menemukan kamu. ❤️
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                playClick?.();
                handleRestart();
              }}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Main Lagi
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                playClick?.();
                onComplete();
              }}
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
