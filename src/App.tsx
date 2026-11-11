import React, { useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { birthdayConfig } from './data/birthdayConfig';
import { useSound } from './hooks/useSound';
import { useScene } from './hooks/useScene';
import { FloatingElements } from './components/shared/FloatingElements';
import { SceneTransition } from './components/shared/SceneTransition';
import { MusicControls } from './components/shared/MusicControls';
import { LoadingScreen } from './scenes/LoadingScreen';
import { PINScreen } from './scenes/PINScreen';
import { WelcomeScene } from './scenes/WelcomeScene';
import { MemoryGallery } from './scenes/MemoryGallery';
import { GamesHub } from './scenes/GamesHub';
import { LoveLetter } from './scenes/LoveLetter';
import { GrandFinale } from './scenes/GrandFinale';

export const App: React.FC = () => {
  const sound = useSound('/audio/bg-music.mp3');
  const { currentScene, goToScene, nextScene, resetAdventure } = useScene('loading');

  // Handle Loading completion: skip PIN if "0000" or empty
  const handleLoadingComplete = useCallback(() => {
    const hasPin = birthdayConfig.pin && birthdayConfig.pin !== '0000';
    if (hasPin) {
      goToScene('pin');
    } else {
      goToScene('welcome');
    }
  }, [goToScene]);

  // Handle PIN unlock
  const handleUnlock = useCallback(() => {
    sound.startMusic();
    goToScene('welcome');
  }, [goToScene, sound]);

  // Start adventure from welcome scene
  const handleBeginAdventure = useCallback(() => {
    sound.startMusic();
    goToScene('gallery');
  }, [goToScene, sound]);

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-cream-100 via-blush-light to-dreamy-100 text-gray-800 overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      {/* Decorative Floating Hearts & Stars in Background */}
      <FloatingElements />

      {/* Floating Music Controls (Visible after loading) */}
      {currentScene !== 'loading' && (
        <MusicControls
          isPlaying={sound.isPlaying}
          isMuted={sound.isMuted}
          onTogglePlay={sound.togglePlay}
          onToggleMute={sound.toggleMute}
        />
      )}

      {/* Animated Scene Orchestrator */}
      <AnimatePresence mode="wait">
        {currentScene === 'loading' && (
          <SceneTransition sceneKey="loading">
            <LoadingScreen onComplete={handleLoadingComplete} />
          </SceneTransition>
        )}

        {currentScene === 'pin' && (
          <SceneTransition sceneKey="pin">
            <PINScreen
              correctPin={birthdayConfig.pin}
              girlfriendName={birthdayConfig.girlfriendName}
              onUnlock={handleUnlock}
              playClick={sound.playClick}
              playSuccess={sound.playSuccess}
              playError={sound.playError}
            />
          </SceneTransition>
        )}

        {currentScene === 'welcome' && (
          <SceneTransition sceneKey="welcome">
            <WelcomeScene
              girlfriendName={birthdayConfig.girlfriendName}
              birthdayDate={birthdayConfig.birthdayDate}
              greetingText={birthdayConfig.greetingText}
              onBegin={handleBeginAdventure}
              playClick={sound.playClick}
            />
          </SceneTransition>
        )}

        {currentScene === 'gallery' && (
          <SceneTransition sceneKey="gallery">
            <MemoryGallery
              photos={birthdayConfig.photos}
              onContinue={nextScene}
              playClick={sound.playClick}
              playFlip={sound.playFlip}
            />
          </SceneTransition>
        )}

        {currentScene === 'games' && (
          <SceneTransition sceneKey="games">
            <GamesHub
              quizQuestions={birthdayConfig.quizQuestions}
              memoryCards={birthdayConfig.memoryCards}
              puzzle={birthdayConfig.puzzle}
              onContinue={nextScene}
              playClick={sound.playClick}
              playFlip={sound.playFlip}
              playSuccess={sound.playSuccess}
              playError={sound.playError}
              playSparkle={sound.playSparkle}
              playFanfare={sound.playFanfare}
            />
          </SceneTransition>
        )}

        {currentScene === 'letter' && (
          <SceneTransition sceneKey="letter">
            <LoveLetter
              paragraphs={birthdayConfig.letterParagraphs}
              girlfriendName={birthdayConfig.girlfriendName}
              myName={birthdayConfig.myName}
              onContinue={nextScene}
              playClick={sound.playClick}
              playSuccess={sound.playSuccess}
              playSparkle={sound.playSparkle}
            />
          </SceneTransition>
        )}

        {currentScene === 'finale' && (
          <SceneTransition sceneKey="finale">
            <GrandFinale
              vouchers={birthdayConfig.vouchers}
              dinnerDetails={birthdayConfig.dinnerDetails}
              girlfriendName={birthdayConfig.girlfriendName}
              onReplay={resetAdventure}
              playClick={sound.playClick}
              playSuccess={sound.playSuccess}
              playFanfare={sound.playFanfare}
              playSparkle={sound.playSparkle}
            />
          </SceneTransition>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;
