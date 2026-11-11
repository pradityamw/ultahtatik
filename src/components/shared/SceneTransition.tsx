import React from 'react';
import { motion } from 'framer-motion';

interface SceneTransitionProps {
  children: React.ReactNode;
  sceneKey: string;
  className?: string;
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  children,
  sceneKey,
  className = '',
}) => {
  return (
    <motion.div
      key={sceneKey}
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.02, y: -16 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`w-full min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-8 md:py-12 ${className}`}
    >
      {children}
    </motion.div>
  );
};
