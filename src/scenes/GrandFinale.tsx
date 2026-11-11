import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import {
  Gift,
  BookOpen,
  Utensils,
  Download,
  Sparkles,
  Heart,
  RefreshCw,
  Calendar,
  Clock,
  CheckCircle,
} from 'lucide-react';
import type { VoucherItem, DinnerDetails } from '../types';
import { Button } from '../components/shared/Button';

interface GrandFinaleProps {
  vouchers: VoucherItem[];
  dinnerDetails: DinnerDetails;
  girlfriendName: string;
  onReplay: () => void;
  playClick?: () => void;
  playSuccess?: () => void;
  playFanfare?: () => void;
  playSparkle?: () => void;
}

export const GrandFinale: React.FC<GrandFinaleProps> = ({
  vouchers,
  dinnerDetails,
  girlfriendName,
  onReplay,
  playClick,
  playFanfare,
  playSparkle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const voucher1Ref = useRef<HTMLDivElement>(null);
  const voucher2Ref = useRef<HTMLDivElement>(null);

  const triggerConfettiExplosion = () => {
    // Multi-stage fireworks explosion
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#ff4f80', '#ffd1dc', '#d4af37', '#f43f5e', '#a855f7'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Center big burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: colors,
    });
  };

  const handleOpenGift = () => {
    if (isOpen) return;
    playClick?.();
    setScreenFlash(true);
    setIsOpen(true);
    playSparkle?.();
    playFanfare?.();

    setTimeout(() => {
      setScreenFlash(false);
    }, 400);

    triggerConfettiExplosion();
  };

  const handleDownload = async (ref: React.RefObject<HTMLDivElement | null>, id: string, name: string) => {
    if (!ref.current) return;
    playClick?.();
    setDownloadingId(id);

    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `${name}-${girlfriendName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download voucher error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const bookVoucher = vouchers[0];
  const dinnerVoucher = vouchers[1];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center relative">
      {/* Screen flash effect */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-lg"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-light text-dreamy-700 text-xs font-semibold mb-3 border border-blush">
          <Gift className="w-3.5 h-3.5 text-dreamy-500" />
          <span>Kejutan Puncak Hari Ulang Tahun</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Grand Finale Spesial 🎁
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-serif italic">
          Sebuah kotak kado istimewa telah disiapkan untukmu...
        </p>
      </motion.div>

      {/* Animated Gift Box */}
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center my-8 cursor-pointer select-none group"
          onClick={handleOpenGift}
        >
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Pulsing glow under gift */}
            <div className="absolute inset-4 rounded-full bg-dreamy-400/30 blur-2xl animate-pulse" />

            {/* Gift Box Graphic (Lid + Body) */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex flex-col items-center justify-end">
              {/* Box Lid */}
              <motion.div
                whileHover={{ y: -8 }}
                className="w-[108%] h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-dreamy-600 shadow-lg relative flex items-center justify-center z-10 border-2 border-pink-200"
              >
                {/* Gold ribbon on lid */}
                <div className="w-8 h-full bg-gradient-to-r from-yellow-300 via-gold to-yellow-400 border-x border-yellow-200" />
                {/* Bow on top */}
                <div className="absolute -top-6 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-yellow-300 bg-gold/90 -rotate-45 shadow-sm" />
                  <div className="w-8 h-8 rounded-full border-4 border-yellow-300 bg-gold/90 rotate-45 -ml-3 shadow-sm" />
                </div>
              </motion.div>

              {/* Box Body */}
              <div className="w-full h-32 sm:h-36 rounded-b-2xl bg-gradient-to-br from-pink-400 via-rose-400 to-dreamy-500 shadow-xl relative flex justify-center overflow-hidden border-2 border-t-0 border-pink-200">
                {/* Gold ribbon vertical */}
                <div className="w-8 h-full bg-gradient-to-r from-yellow-300 via-gold to-yellow-400 border-x border-yellow-200" />
                {/* Gold ribbon horizontal */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-8 bg-gradient-to-b from-yellow-300 via-gold to-yellow-400 border-y border-yellow-200" />
              </div>
            </div>
          </div>

          {/* Tap Prompt with Glow */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-6"
          >
            <span className="px-6 py-2.5 rounded-full bg-white/95 text-dreamy-700 font-bold text-sm sm:text-base border border-blush shadow-soft-glow group-hover:bg-white group-hover:shadow-lg transition-all flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold fill-gold" />
              <span>Ketuk Kotak Kado Untuk Membuka! ✨</span>
            </span>
          </motion.div>
        </motion.div>
      ) : (
        /* Vouchers Revealed Container */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex flex-col items-center gap-8 mb-12"
        >
          {/* VOUCHER 01: Book Voucher */}
          {bookVoucher && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="w-full max-w-xl"
            >
              <div
                ref={voucher1Ref}
                className="relative bg-gradient-to-br from-[#fff7f9] via-pink-50 to-[#fff1f5] rounded-3xl p-6 sm:p-8 border-2 border-pink-300 shadow-soft-glow overflow-hidden"
              >
                {/* Side Perforations */}
                <div className="ticket-perforation-left border-r-2 border-pink-300" />
                <div className="ticket-perforation-right border-l-2 border-pink-300" />

                {/* Decorative Corner Ornaments */}
                <div className="absolute top-3 left-3 text-gold/40 text-sm">✦</div>
                <div className="absolute top-3 right-3 text-gold/40 text-sm">✦</div>
                <div className="absolute bottom-3 left-3 text-gold/40 text-sm">✦</div>
                <div className="absolute bottom-3 right-3 text-gold/40 text-sm">✦</div>

                {/* Voucher Content */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {/* Icon Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-md flex-shrink-0">
                    <BookOpen className="w-8 h-8" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-between flex-wrap gap-2 mb-1">
                      <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-semibold border border-pink-200">
                        {bookVoucher.serial}
                      </span>
                      <span className="text-[11px] font-serif italic text-gold-dark font-medium">
                        Untuk: {bookVoucher.recipient}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 tracking-wide mt-1">
                      {bookVoucher.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-pink-600 font-semibold mb-2">
                      {bookVoucher.subtitle}
                    </p>

                    <div className="bg-white/80 rounded-xl p-3 border border-pink-200/80 mb-3 text-left">
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 flex items-center gap-1.5 mb-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Hadiah: {bookVoucher.reward}</span>
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-600 font-sans leading-relaxed">
                        {bookVoucher.instructions}
                      </p>
                    </div>

                    <p className="text-[10px] text-gray-400 italic">
                      *Personal gift promise — bukan kupon resmi toko. Berlaku kapan pun kamu siap belanja!
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Action Button */}
              <div className="mt-3 flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload(voucher1Ref, 'novel', 'Voucher-Novel-Gramedia')}
                  disabled={downloadingId === 'novel'}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  {downloadingId === 'novel' ? 'Menyimpan...' : 'Simpan Voucher Novel (PNG)'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* VOUCHER 02: Dinner Date Voucher */}
          {dinnerVoucher && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="w-full max-w-xl"
            >
              <div
                ref={voucher2Ref}
                className="relative bg-gradient-to-br from-[#2a131b] via-[#3d1a27] to-[#1e0d14] rounded-3xl p-6 sm:p-8 border-2 border-gold/70 shadow-gold-glow overflow-hidden text-white"
              >
                {/* Side Perforations */}
                <div className="ticket-perforation-left border-r-2 border-gold/70" />
                <div className="ticket-perforation-right border-l-2 border-gold/70" />

                {/* Decorative Gold Stars */}
                <div className="absolute top-3 left-3 text-gold/60 text-sm">✦</div>
                <div className="absolute top-3 right-3 text-gold/60 text-sm">✦</div>
                <div className="absolute bottom-3 left-3 text-gold/60 text-sm">✦</div>
                <div className="absolute bottom-3 right-3 text-gold/60 text-sm">✦</div>

                {/* Voucher Content */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {/* Icon Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-600 text-white flex items-center justify-center shadow-md flex-shrink-0 border border-gold/50">
                    <Utensils className="w-8 h-8 text-gold-light" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-between flex-wrap gap-2 mb-1">
                      <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950/80 text-gold-champagne font-semibold border border-gold/40">
                        {dinnerVoucher.serial}
                      </span>
                      <span className="text-[11px] font-serif italic text-gold-champagne font-medium">
                        Untuk: {dinnerVoucher.recipient}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-light tracking-wide mt-1">
                      {dinnerVoucher.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-pink-300 font-semibold mb-2">
                      {dinnerVoucher.subtitle}
                    </p>

                    {/* Dinner Details Pill Container */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-gold/30 mb-3 text-left">
                      <p className="text-xs sm:text-sm font-semibold text-gold-champagne flex items-center gap-1.5 mb-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold" />
                        <span>{dinnerVoucher.reward}</span>
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-200">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold-champagne" />
                          <span>{dinnerDetails.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:col-span-2">
                          <Clock className="w-3.5 h-3.5 text-gold-champagne" />
                          <span>{dinnerDetails.time || '19:00 WIB'}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-pink-200/90 mt-2 italic font-serif">
                        {dinnerVoucher.instructions}
                      </p>
                    </div>

                    <p className="text-[10px] text-gray-400 italic">
                      *Personal gift promise — kamu cukup dandan cantik, biar aku yang jemput dan traktir!
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Action Button */}
              <div className="mt-3 flex justify-end">
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => handleDownload(voucher2Ref, 'dinner', 'Voucher-Dinner-Date')}
                  disabled={downloadingId === 'dinner'}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  {downloadingId === 'dinner' ? 'Menyimpan...' : 'Simpan Voucher Dinner (PNG)'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Final Birthday Celebration Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-xl text-center bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blush shadow-soft-glow mt-4"
          >
            <div className="flex justify-center text-rose-500 mb-3">
              <Heart className="w-8 h-8 fill-current animate-pulse" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Sekali Lagi, Selamat Ulang Tahun Tatik! 🎉
            </h3>
            <p className="font-serif italic text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Semoga petualangan kecil ini membawa senyuman di bibirmu hari ini. Setiap detik bersamamu adalah kado terbaik dalam hidupku. Aku sayang kamu hari ini, besok, dan selamanya! ❤️
            </p>

            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                playClick?.();
                onReplay();
              }}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Ulangi Petualangan Dari Awal 🔄
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
