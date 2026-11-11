import { useState, useCallback } from 'react';
import type { SceneType } from '../types';

const SCENE_ORDER: SceneType[] = [
  'loading',
  'pin',
  'welcome',
  'gallery',
  'games',
  'letter',
  'finale',
];

export function useScene(initialScene: SceneType = 'loading') {
  const [currentScene, setCurrentScene] = useState<SceneType>(initialScene);
  const [history, setHistory] = useState<SceneType[]>([initialScene]);

  const goToScene = useCallback((scene: SceneType) => {
    setCurrentScene(scene);
    setHistory((prev) => [...prev, scene]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const nextScene = useCallback(() => {
    setCurrentScene((current) => {
      const currentIndex = SCENE_ORDER.indexOf(current);
      if (currentIndex < SCENE_ORDER.length - 1) {
        const next = SCENE_ORDER[currentIndex + 1];
        setHistory((prev) => [...prev, next]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return next;
      }
      return current;
    });
  }, []);

  const prevScene = useCallback(() => {
    setCurrentScene((current) => {
      const currentIndex = SCENE_ORDER.indexOf(current);
      if (currentIndex > 0) {
        const prev = SCENE_ORDER[currentIndex - 1];
        setHistory((h) => [...h, prev]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return prev;
      }
      return current;
    });
  }, []);

  const resetAdventure = useCallback(() => {
    setCurrentScene('welcome');
    setHistory(['welcome']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentIndex = SCENE_ORDER.indexOf(currentScene);
  const totalScenes = SCENE_ORDER.length;
  const progress = Math.round((currentIndex / (totalScenes - 1)) * 100);

  return {
    currentScene,
    history,
    goToScene,
    nextScene,
    prevScene,
    resetAdventure,
    currentIndex,
    totalScenes,
    progress,
  };
}
