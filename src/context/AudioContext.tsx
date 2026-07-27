import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { siteContent } from "../data/siteContent";

interface AudioContextType {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  hasInteractionStarted: boolean;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
  restart: () => void;
  startInteraction: () => Promise<void>;
  resetAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteractionStarted, setHasInteractionStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inisialisasi Audio Element
  useEffect(() => {
    const audio = new Audio();
    audio.src = siteContent.localSong;
    audio.preload = "none"; // Mencegah browser/IDM mendownload otomatis saat web pertama kali dibuka
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Sinkronisasi status audio ke React state
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration || 0);
    const handleVolumeChange = () => {
      setVolumeState(audio.volume);
      setIsMuted(audio.muted);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("volumechange", handleVolumeChange);
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
    } catch (error) {
      console.warn("Audio autoplay blocked or failed:", error);
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((vol: number) => {
    if (!audioRef.current) return;
    const cleanVol = Math.max(0, Math.min(1, vol));
    audioRef.current.volume = cleanVol;
    if (cleanVol > 0 && audioRef.current.muted) {
      audioRef.current.muted = false;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const restart = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    play();
  }, [play]);

  const startInteraction = useCallback(async () => {
    setHasInteractionStarted(true);
  }, []);

  // Dipanggil saat "Putar Ulang Kejutan" ditekan untuk mereset overlay opening gate
  const resetAudio = useCallback(() => {
    pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setHasInteractionStarted(false);
  }, [pause]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        duration,
        currentTime,
        volume,
        isMuted,
        hasInteractionStarted,
        play,
        pause,
        togglePlay,
        setVolume,
        toggleMute,
        seek,
        restart,
        startInteraction,
        resetAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
