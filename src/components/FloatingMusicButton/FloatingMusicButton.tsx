import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudio } from "../../context/AudioContext";
import { Play, VolumeX, Volume2 } from "lucide-react";
import styles from "./FloatingMusicButton.module.css";

export const FloatingMusicButton: React.FC = () => {
  const { isPlaying, togglePlay, isMuted, toggleMute, hasInteractionStarted } = useAudio();
  const [showControls, setShowControls] = useState(false);

  // Jangan tampilkan jika user belum menekan "Buka Kejutannya"
  if (!hasInteractionStarted) return null;

  return (
    <div 
      className={styles.floatingWrapper}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <AnimatePresence>
        {showControls && (
          <motion.div
            className={styles.subButtons}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Tombol Mute */}
            <button
              onClick={toggleMute}
              className={styles.miniBtn}
              aria-label={isMuted ? "Aktifkan suara lagu" : "Bisukan lagu"}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Utama (Play/Pause) */}
      <button
        onClick={togglePlay}
        className={`${styles.mainBtn} ${isPlaying ? styles.isPlaying : ""}`}
        aria-label={isPlaying ? "Jeda lagu lokal dari Fari" : "Putar lagu lokal dari Fari"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <div className={styles.playingIndicator}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        ) : (
          <Play size={20} fill="currentColor" className={styles.playIcon} />
        )}
      </button>
    </div>
  );
};

export default FloatingMusicButton;
