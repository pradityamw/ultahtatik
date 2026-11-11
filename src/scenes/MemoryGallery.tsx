import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Heart, ArrowRight } from 'lucide-react';
import type { PhotoItem } from '../types';
import { Button } from '../components/shared/Button';

interface MemoryGalleryProps {
  photos: PhotoItem[];
  onContinue: () => void;
  playClick?: () => void;
  playFlip?: () => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  photos,
  onContinue,
  playClick,
  playFlip,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => {
    playFlip?.();
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    playClick?.();
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick?.();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => ((prev! + 1) % photos.length));
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick?.();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => ((prev! - 1 + photos.length) % photos.length));
    }
  };

  const currentPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 max-w-xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush-light text-dreamy-700 text-xs font-semibold mb-3 border border-blush">
          <Camera className="w-3.5 h-3.5" />
          <span>Album Kenangan Indah</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          Our Memories 📸
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-serif italic">
          Setiap jepretan menyimpan cerita manis yang tak pernah pudar di hatiku...
        </p>
      </motion.div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full mb-12">
        {photos.map((photo, index) => {
          const hasError = imageErrors[photo.id];
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 20,
              }}
              style={{
                rotate: `${photo.rotation}deg`,
              }}
              onClick={() => openLightbox(index)}
              className="bg-white p-3 sm:p-4 pb-5 sm:pb-6 rounded-md shadow-polaroid cursor-pointer transition-all duration-300 flex flex-col items-center group relative border border-gray-100"
            >
              {/* Photo Area */}
              <div className="w-full aspect-[4/5] rounded overflow-hidden bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-50 relative mb-3 flex items-center justify-center border border-gray-100/80">
                {!hasError ? (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    onError={() => handleImageError(photo.id)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Romantic Pastel Placeholder when no image exists */
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-dreamy-100 via-blush-light to-amber-50">
                    <Heart className="w-8 h-8 text-dreamy-400 fill-dreamy-300 mb-2 animate-pulse" />
                    <span className="text-xs font-serif italic text-dreamy-700 leading-snug">
                      {photo.caption}
                    </span>
                  </div>
                )}
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Caption (Polaroid handwritten style) */}
              <p className="font-cursive text-base sm:text-lg text-gray-800 text-center line-clamp-1 group-hover:text-dreamy-600 transition-colors">
                {photo.caption}
              </p>

            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            playClick?.();
            onContinue();
          }}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Lanjut ke Arena Games 🎮
        </Button>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer z-50"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Photo button */}
            <button
              onClick={prevPhoto}
              className="absolute left-3 sm:left-6 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer z-50"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Next Photo button */}
            <button
              onClick={nextPhoto}
              className="absolute right-3 sm:right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer z-50"
              aria-label="Foto Selanjutnya"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Lightbox Content Polaroid */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 sm:p-6 pb-6 sm:pb-8 rounded-lg shadow-2xl max-w-lg w-full flex flex-col items-center"
            >
              <div className="w-full aspect-[4/5] rounded overflow-hidden bg-gray-100 relative mb-4 flex items-center justify-center">
                {!imageErrors[currentPhoto.id] ? (
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.caption}
                    onError={() => handleImageError(currentPhoto.id)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-dreamy-100 via-blush-light to-amber-50">
                    <Heart className="w-12 h-12 text-dreamy-500 fill-dreamy-400 mb-3 animate-pulse" />
                    <p className="font-serif italic text-dreamy-800 text-lg">
                      {currentPhoto.caption}
                    </p>
                  </div>
                )}
              </div>

              <h3 className="font-cursive text-2xl sm:text-3xl text-gray-800 text-center mb-1">
                {currentPhoto.caption}
              </h3>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
