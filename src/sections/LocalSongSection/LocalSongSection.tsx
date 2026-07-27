import React from "react";
import { useAudio } from "../../context/AudioContext";
import { siteContent } from "../../data/siteContent";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { formatAudioTime } from "../../utils/formatTime";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import styles from "./LocalSongSection.module.css";

export const LocalSongSection: React.FC = () => {
  const { localSongDetails } = siteContent;
  const {
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
    restart,
  } = useAudio();

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <section className={styles.songSection} aria-label="Lagu Lokal">
      <div className="container">
        <SectionHeading
          title={localSongDetails.heading}
          subtitle={localSongDetails.subheading}
        />

        <div className={styles.playerContainer}>
          {/* Bagian Kiri: Cover Art & Waveform */}
          <div className={styles.coverWrapper}>
            <div className={styles.coverFallback} />
            <img
              src={localSongDetails.coverImage}
              alt="Cover art lagu untuk Jua"
              className={`${styles.coverArt} ${isPlaying ? styles.rotateArt : ""}`}
            />
            {/* Waveform dekoratif */}
            <div className={`${styles.waveform} ${isPlaying ? "" : styles.paused}`}>
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className={styles.waveBar} />
              ))}
            </div>
          </div>

          {/* Bagian Kanan: Informasi & Kontrol Player */}
          <div className={styles.playerDetails}>
            <div className={styles.songMeta}>
              <span className={styles.label}>Lagu Spesial</span>
              <h3 className={styles.songTitle}>{localSongDetails.title}</h3>
              <p className={styles.songArtist}>{localSongDetails.artist}</p>
            </div>

            {/* Progress Slider */}
            <div className={styles.progressArea}>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className={styles.progressBar}
                aria-label="Progress lagu"
              />
              <div className={styles.timeInfo}>
                <span>{formatAudioTime(currentTime)}</span>
                <span>{formatAudioTime(duration)}</span>
              </div>
            </div>

            {/* Panel Kontrol Utama */}
            <div className={styles.controlsArea}>
              {/* Restart */}
              <button
                onClick={restart}
                className={styles.controlBtn}
                aria-label="Putar ulang dari awal"
                title="Restart"
              >
                <RotateCcw size={20} />
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className={styles.playPauseBtn}
                aria-label={isPlaying ? "Jeda lagu" : "Putar lagu"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className={styles.playIconOffset} />}
              </button>

              {/* Mute Toggle */}
              <button
                onClick={toggleMute}
                className={styles.controlBtn}
                aria-label={isMuted ? "Aktifkan suara" : "Bisukan suara"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            {/* Volume Control */}
            <div className={styles.volumeArea}>
              <span className={styles.volumeIcon} aria-hidden="true">
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.volumeBar}
                aria-label="Kontrol Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSongSection;
