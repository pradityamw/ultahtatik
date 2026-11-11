import { useState, useEffect, useRef, useCallback } from 'react';

export interface SoundControls {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  startMusic: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playError: () => void;
  playFlip: () => void;
  playSparkle: () => void;
  playFanfare: () => void;
}

export function useSound(audioSrc: string = '/audio/bg-music.mp3'): SoundControls {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const useSynthRef = useRef<boolean>(false);
  const isStartedRef = useRef<boolean>(false);

  // Lazy initialize AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Web Audio Synthesized Romantic Music Box (Plays when MP3 isn't available)
  const startSynthMelody = useCallback(() => {
    if (synthTimerRef.current !== null) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    // Romantic music box notes (frequencies in Hz)
    const melody = [
      523.25, 659.25, 783.99, 1046.5, 880.0, 783.99, 659.25,
      587.33, 659.25, 698.46, 880.0, 783.99, 659.25, 523.25,
      440.0, 523.25, 659.25, 783.99, 698.46, 659.25, 587.33,
      523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25,
    ];
    let noteIndex = 0;

    const playNextNote = () => {
      if (isMuted || !isStartedRef.current) return;
      const freq = melody[noteIndex % melody.length];
      noteIndex++;

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft music box chime envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.2);
      } catch {
        // Ignore audio playback context errors
      }
    };

    // Play a gentle note every 450ms
    playNextNote();
    synthTimerRef.current = window.setInterval(playNextNote, 480);
  }, [getAudioContext, isMuted]);

  const stopSynthMelody = useCallback(() => {
    if (synthTimerRef.current !== null) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  }, []);

  // Initialize HTML Audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const handleError = () => {
      // If MP3 file not found or failed, fallback to synth melody
      useSynthRef.current = true;
      if (isPlaying && !isMuted) {
        startSynthMelody();
      }
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      stopSynthMelody();
    };
  }, [audioSrc, isMuted, isPlaying, startSynthMelody, stopSynthMelody]);

  // Handle Mute state change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    if (isMuted) {
      stopSynthMelody();
    } else if (isPlaying && useSynthRef.current) {
      startSynthMelody();
    }
  }, [isMuted, isPlaying, startSynthMelody, stopSynthMelody]);

  // Start music after user interaction
  const startMusic = useCallback(() => {
    isStartedRef.current = true;
    getAudioContext();

    if (audioRef.current && !useSynthRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          useSynthRef.current = true;
          setIsPlaying(true);
          startSynthMelody();
        });
    } else {
      setIsPlaying(true);
      startSynthMelody();
    }
  }, [getAudioContext, startSynthMelody]);

  const togglePlay = useCallback(() => {
    if (!isPlaying) {
      startMusic();
    } else {
      setIsPlaying(false);
      isStartedRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthMelody();
    }
  }, [isPlaying, startMusic, stopSynthMelody]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Web Audio SFX Helpers
  const playClick = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext policy
    }
  }, [getAudioContext, isMuted]);

  const playSuccess = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    } catch {
      // AudioContext policy
    }
  }, [getAudioContext, isMuted]);

  const playError = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // AudioContext policy
    }
  }, [getAudioContext, isMuted]);

  const playFlip = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // AudioContext policy
    }
  }, [getAudioContext, isMuted]);

  const playSparkle = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const freqs = [1046.5, 1318.5, 1567.98, 2093.0];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.3);
      });
    } catch {
      // AudioContext policy
    }
  }, [getAudioContext, isMuted]);

  const playFanfare = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const notes = [
        { f: 523.25, t: 0, d: 0.15 },
        { f: 659.25, t: 0.15, d: 0.15 },
        { f: 783.99, t: 0.3, d: 0.2 },
        { f: 1046.5, t: 0.5, d: 0.4 },
      ];
      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);

        gain.gain.setValueAtTime(0.07, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + d);
      });
    } catch {
      // AudioContext policy
    }
  }, [getAudioContext, isMuted]);

  return {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    startMusic,
    playClick,
    playSuccess,
    playError,
    playFlip,
    playSparkle,
    playFanfare,
  };
}
