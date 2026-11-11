import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Delete, ArrowRight } from 'lucide-react';
import { Button } from '../components/shared/Button';

interface PINScreenProps {
  correctPin: string;
  girlfriendName: string;
  onUnlock: () => void;
  playClick?: () => void;
  playSuccess?: () => void;
  playError?: () => void;
}

export const PINScreen: React.FC<PINScreenProps> = ({
  correctPin,
  girlfriendName,
  onUnlock,
  playClick,
  playSuccess,
  playError,
}) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Auto-bypass if PIN is "0000" or empty
  useEffect(() => {
    if (!correctPin || correctPin === '0000') {
      onUnlock();
    }
  }, [correctPin, onUnlock]);

  const verifyPin = useCallback(
    (codeToVerify: string) => {
      if (codeToVerify === correctPin || correctPin === '0000') {
        setIsSuccess(true);
        setIsError(false);
        playSuccess?.();
        setTimeout(() => {
          onUnlock();
        }, 600);
      } else {
        setIsError(true);
        setErrorMessage('Kode kurang tepat sayang, coba lagi yuk! 🥰');
        playError?.();
        setTimeout(() => {
          setPin('');
          setIsError(false);
        }, 900);
      }
    },
    [correctPin, onUnlock, playError, playSuccess]
  );

  const handleKeyPress = (num: string) => {
    if (isSuccess || pin.length >= 4) return;
    playClick?.();
    const newPin = pin + num;
    setPin(newPin);
    if (newPin.length === 4) {
      verifyPin(newPin);
    }
  };

  const handleBackspace = () => {
    playClick?.();
    setPin((prev) => prev.slice(0, -1));
    setIsError(false);
  };

  const handleClear = () => {
    playClick?.();
    setPin('');
    setIsError(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blush/90 shadow-soft-glow flex flex-col items-center text-center relative z-10"
      >
        {/* Header Icon */}
        <motion.div
          animate={
            isSuccess
              ? { scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }
              : isError
              ? { x: [-10, 10, -10, 10, 0] }
              : {}
          }
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${
            isSuccess
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-gradient-to-tr from-dreamy-500 to-rose-400 text-white shadow-md'
          }`}
        >
          {isSuccess ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
        </motion.div>

        {/* Title */}
        <h2 className="font-serif text-2xl font-bold text-gray-800 mb-1">
          Hai {girlfriendName}! ✨
        </h2>
        <p className="text-sm text-gray-500 mb-6 font-sans">
          Masukkan 4 angka kode rahasia kita untuk membuka petualangan ini ❤️
        </p>

        {/* 4-Dot Indicator */}
        <motion.div
          animate={isError ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex justify-center items-center gap-4 mb-6"
        >
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <motion.div
                key={index}
                animate={isFilled ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                className={`w-4 h-4 rounded-full transition-all duration-200 border-2 ${
                  isFilled
                    ? isSuccess
                      ? 'bg-emerald-500 border-emerald-500 shadow-sm'
                      : 'bg-dreamy-500 border-dreamy-500 shadow-soft-glow'
                    : isError
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-blush-dark/40 bg-white'
                }`}
              />
            );
          })}
        </motion.div>

        {/* Error Feedback Message */}
        <div className="h-6 mb-3">
          <AnimatePresence>
            {isError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-medium text-rose-500"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Keypad Grid (3x4) */}
        <div className="grid grid-cols-3 gap-3 w-full mb-6 max-w-[260px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <motion.button
              key={digit}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleKeyPress(digit)}
              className="w-full aspect-square rounded-2xl bg-cream-50 hover:bg-dreamy-50 active:bg-dreamy-100 text-gray-700 text-xl font-semibold border border-blush/60 shadow-sm transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              {digit}
            </motion.button>
          ))}

          {/* Clear button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleClear}
            className="w-full aspect-square rounded-2xl bg-cream-100 hover:bg-red-50 text-gray-500 text-xs font-medium border border-blush/60 transition-all flex items-center justify-center cursor-pointer"
            title="Hapus Semua"
          >
            Hapus
          </motion.button>

          {/* Digit 0 */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => handleKeyPress('0')}
            className="w-full aspect-square rounded-2xl bg-cream-50 hover:bg-dreamy-50 active:bg-dreamy-100 text-gray-700 text-xl font-semibold border border-blush/60 shadow-sm transition-all flex items-center justify-center cursor-pointer"
          >
            0
          </motion.button>

          {/* Backspace button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleBackspace}
            className="w-full aspect-square rounded-2xl bg-cream-100 hover:bg-blush-light text-gray-600 border border-blush/60 transition-all flex items-center justify-center cursor-pointer"
            title="Hapus Satu"
          >
            <Delete className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>

        {/* Skip / Bypass Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onUnlock}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="text-xs text-gray-400 hover:text-dreamy-600 mb-2"
        >
          Lewati & Langsung Masuk
        </Button>

        {/* Disclaimer Note */}
        <p className="text-[11px] text-gray-400 leading-tight">
          Catatan: Kunci PIN ini hanyalah seru-seruan manis untuk menyambutmu, bukan proteksi data sesungguhnya.
        </p>
      </motion.div>
    </div>
  );
};
