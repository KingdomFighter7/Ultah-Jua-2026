import React, { useEffect, useRef, useState } from "react";
import { siteContent } from "../../data/siteContent";
import { useAudio } from "../../context/AudioContext";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { getYouTubeEmbedUrl, isValidYouTubeId } from "../../utils/youtube";
import { Play, AlertCircle } from "lucide-react";
import styles from "./YouTubeSongSection.module.css";

export const YouTubeSongSection: React.FC = () => {
  const { youtubeVideoId, youtubeSong } = siteContent;
  const { isPlaying, play, pause, hasInteractionStarted } = useAudio();
  const [showContinueBtn, setShowContinueBtn] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  
  const playerRef = useRef<any>(null);
  const iframeId = "youtube-iframe-player";

  const isVideoValid = isValidYouTubeId(youtubeVideoId);

  // Load YouTube IFrame API secara dinamis
  useEffect(() => {
    if (!isVideoValid) return;

    // Callback global yang dipanggil YouTube API saat script siap
    const onYouTubeIframeAPIReady = () => {
      setApiReady(true);
    };

    if (!(window as any).YT) {
      // Pasang callback global
      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    } else {
      setApiReady(true);
    }
  }, [isVideoValid]);

  // Inisialisasi Player saat API siap
  useEffect(() => {
    if (!apiReady || !isVideoValid) return;

    const setupPlayer = () => {
      playerRef.current = new (window as any).YT.Player(iframeId, {
        events: {
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING adalah 1
            if (event.data === 1) {
              // Jika YouTube mulai diputar, pause lagu lokal Fari
              pause();
              setShowContinueBtn(true);
            }
          },
        },
      });
    };

    // Jika YT sudah ada dan bisa diinstansiasi
    if ((window as any).YT && (window as any).YT.Player) {
      setupPlayer();
    } else {
      // Fallback jika API delay sedikit
      const checkInterval = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) {
          setupPlayer();
          clearInterval(checkInterval);
        }
      }, 200);
      return () => clearInterval(checkInterval);
    }

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }
    };
  }, [apiReady, isVideoValid, pause]);

  // Sembunyikan tombol "Lanjutkan lagu lokal" jika lagu lokal diputar kembali
  useEffect(() => {
    if (isPlaying) {
      setShowContinueBtn(false);
    }
  }, [isPlaying]);

  const handleResumeLocalSong = () => {
    // Jeda video YouTube jika sedang berputar
    if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
      playerRef.current.pauseVideo();
    }
    // Mainkan lagu lokal
    play();
    setShowContinueBtn(false);
  };

  return (
    <section className={styles.section} aria-label="Lagu Pilihan YouTube">
      <div className="container">
        <SectionHeading
          title={youtubeSong.heading}
          subtitle={youtubeSong.subheading}
        />

        <div className={styles.wrapper}>
          {isVideoValid ? (
            <div className={styles.playerWrapper}>
              <div className={styles.iframeContainer}>
                <iframe
                  id={iframeId}
                  title="Lagu YouTube Pilihan dari Fari untuk Jua"
                  src={getYouTubeEmbedUrl(youtubeVideoId) || ""}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className={styles.iframe}
                />
              </div>

              {/* Banner / Tombol Lanjutkan Lagu Lokal (Floating/Overlay) */}
              {showContinueBtn && hasInteractionStarted && !isPlaying && (
                <div className={styles.continuePanel}>
                  <p className={styles.continueText}>
                    Lagu YouTube sedang aktif. Ingin kembali mendengarkan lagu lokal dari Fari?
                  </p>
                  <button
                    onClick={handleResumeLocalSong}
                    className={styles.continueBtn}
                  >
                    <Play size={14} fill="currentColor" />
                    <span>Lanjutkan Lagu dari Fari</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Tampilan Placeholder elegan jika ID masih bawaan
            <div className={styles.placeholderCard}>
              <AlertCircle size={32} className={styles.placeholderIcon} />
              <h3 className={styles.placeholderTitle}>YouTube Song Player</h3>
              <p className={styles.placeholderDescription}>
                {youtubeSong.placeholderText}
              </p>
              <div className={styles.codeSnippet}>
                <code>youtubeVideoId: "YOUR_11_CHAR_ID"</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default YouTubeSongSection;
