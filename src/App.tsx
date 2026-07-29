import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AudioProvider, useAudio } from "./context/AudioContext";
import { useCountdown } from "./hooks/useCountdown";
import { siteContent } from "./data/siteContent";
import HeartCursor from "./components/HeartCursor/HeartCursor";
import BackgroundDecoration from "./components/BackgroundDecoration/BackgroundDecoration";
import OpeningGate from "./components/OpeningGate/OpeningGate";
import FloatingMusicButton from "./components/FloatingMusicButton/FloatingMusicButton";

// Import all sections in chronological order
import HeroSection from "./sections/HeroSection/HeroSection";
import CountdownSection from "./sections/CountdownSection/CountdownSection";
import MainLetterSection from "./sections/MainLetterSection/MainLetterSection";
import ReasonsSection from "./sections/ReasonsSection/ReasonsSection";
import LocalSongSection from "./sections/LocalSongSection/LocalSongSection";
import YouTubeSongSection from "./sections/YouTubeSongSection/YouTubeSongSection";
import MemoriesSection from "./sections/MemoriesSection/MemoriesSection";
import OpenWhenSection from "./sections/OpenWhenSection/OpenWhenSection";
import WishesSection from "./sections/WishesSection/WishesSection";
import CakeSection from "./sections/CakeSection/CakeSection";
import FinalSection from "./sections/FinalSection/FinalSection";

// Sub-komponen utama agar dapat menggunakan useAudio context
const MainAppContent: React.FC = () => {
  const { hasInteractionStarted, play } = useAudio();
  const { birthdayTarget } = siteContent;
  const { isCompleted } = useCountdown(birthdayTarget);
  const [finalUnlocked, setFinalUnlocked] = useState(false);

  const isSurpriseUnlocked = isCompleted;

  // Reset status locked section akhir saat restart kejutan
  React.useEffect(() => {
    const handleResetCake = () => {
      setFinalUnlocked(false);
    };
    window.addEventListener("reset-birthday-cake", handleResetCake);
    return () => window.removeEventListener("reset-birthday-cake", handleResetCake);
  }, []);

  // Musik latar belakang hanya akan diputar setelah countdown selesai & surprise unlocked
  React.useEffect(() => {
    if (hasInteractionStarted && isSurpriseUnlocked) {
      play();
    }
  }, [hasInteractionStarted, isSurpriseUnlocked, play]);

  return (
    <>
      {/* Skip Link untuk Aksesibilitas Keyboard */}
      <a href="#main-content" className="skip-link">
        Lompat ke konten utama
      </a>

      {/* Custom Cursor Hati (Desktop only) */}
      <HeartCursor />

      {/* Background Dekoratif Premium (Aura, Orbit, Bintang Kerlip) */}
      <BackgroundDecoration />

      {/* Opening Gate Fullscreen Overlay */}
      <OpeningGate />

      {/* Render konten utama hanya setelah opening gate dibuka oleh user */}
      {hasInteractionStarted && (
        <div id="main-content">
          {/* Overlay Noise Grain Global */}
          <div className="grain-overlay" />
          
          <CountdownSection />
          
          {/* Section Kejutan (termasuk Hero ucapan ultah) hanya terbuka jika hitung mundur selesai atau di-unlock */}
          <AnimatePresence>
            {isSurpriseUnlocked && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <HeroSection />
                
                <MainLetterSection />
                
                <ReasonsSection />
                
                <LocalSongSection />
                
                <YouTubeSongSection />
                
                <MemoriesSection />
                
                <OpenWhenSection />
                
                <WishesSection />
                
                <CakeSection 
                  isFinalUnlocked={finalUnlocked}
                  onUnlockFinal={() => setFinalUnlocked(true)}
                />
                
                {/* Section Pesan Terakhir hanya terbuka setelah semua lilin ditiup & tombol diklik */}
                <AnimatePresence>
                  {finalUnlocked && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <FinalSection />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Music Control di kanan bawah */}
          <FloatingMusicButton />
        </div>
      )}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AudioProvider>
      <MainAppContent />
    </AudioProvider>
  );
};

export default App;
