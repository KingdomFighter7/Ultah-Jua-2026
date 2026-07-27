import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { siteContent } from "../../data/siteContent";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { Heart } from "lucide-react";
import styles from "./CakeSection.module.css";

interface CakeSectionProps {
  onUnlockFinal?: () => void;
  isFinalUnlocked?: boolean;
}

export const CakeSection: React.FC<CakeSectionProps> = ({
  onUnlockFinal,
}) => {
  const { cake } = siteContent;
  const [candles, setCandles] = useState([true, true, true]);
  const [showMessage, setShowMessage] = useState(false);
  const confettiTriggered = useRef(false);

  const blowCandle = (index: number) => {
    if (candles[index]) {
      const nextCandles = [...candles];
      nextCandles[index] = false;
      setCandles(nextCandles);
    }
  };

  const allBlownOut = candles.every((c) => !c);

  // Memicu selebrasi confetti saat semua lilin padam
  useEffect(() => {
    if (allBlownOut && !confettiTriggered.current) {
      confettiTriggered.current = true;
      
      // Letusan Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.65 },
        colors: ["#ff7eb6", "#ffc1d9", "#d9a0ae", "#fff7fa"]
      });

      // Tampilkan tulisan berkah setelah lilin padam
      setTimeout(() => {
        setShowMessage(true);
      }, 600);
    }
  }, [allBlownOut]);

  // Reset lilin ke kondisi menyala kembali (dipanggil saat restart kejutan)
  useEffect(() => {
    const handleResetCake = () => {
      setCandles([true, true, true]);
      setShowMessage(false);
      confettiTriggered.current = false;
    };
    
    // Dengarkan event reset kustom jika dipicu dari FinalSection
    window.addEventListener("reset-birthday-cake", handleResetCake);
    return () => {
      window.removeEventListener("reset-birthday-cake", handleResetCake);
    };
  }, []);

  const handleScrollToFinal = () => {
    onUnlockFinal?.();

    setTimeout(() => {
      const finalSection = document.getElementById("final-message-section");
      if (finalSection) {
        finalSection.scrollIntoView({ behavior: "smooth" });
        
        // Confetti kecil saat masuk ke section penutup
        setTimeout(() => {
          confetti({
            particleCount: 60,
            spread: 50,
            origin: { y: 0.7 },
            colors: ["#ff7eb6", "#ffc1d9"]
          });
        }, 600);
      }
    }, 400);
  };

  return (
    <section className={styles.section} aria-label="Kue Ulang Tahun Interaktif">
      <div className="container">
        <SectionHeading
          title={cake.heading}
          subtitle={cake.instruction}
        />

        <div className={styles.cakeContainer}>
          {/* Visual Kue Ulang Tahun CSS */}
          <div className={styles.cakeWrapper}>
            
            {/* Lilin-lilin di atas kue */}
            <div className={styles.candlesWrapper}>
              {candles.map((isLit, idx) => (
                <button
                  key={idx}
                  onClick={() => blowCandle(idx)}
                  className={`${styles.candleBtn} ${styles[`candle${idx + 1}`]}`}
                  disabled={!isLit}
                  aria-label={isLit ? `Tiup lilin nomor ${idx + 1}` : `Lilin nomor ${idx + 1} sudah padam`}
                >
                  {/* Nyala Api */}
                  <AnimatePresence>
                    {isLit ? (
                      <motion.div
                        className={styles.flame}
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.15, 0.95, 1] }}
                        transition={{ 
                          scale: { repeat: Infinity, duration: 1.2 }
                        }}
                        exit={{ opacity: 0, scale: 0, y: -10, transition: { duration: 0.3 } }}
                      />
                    ) : (
                      // Efek Asap Kecil
                      <motion.div
                        className={styles.smoke}
                        initial={{ opacity: 0.8, scale: 0.6, y: -5 }}
                        animate={{ opacity: 0, scale: 1.4, y: -25, x: [0, 4, -4, 0] }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Batang Lilin */}
                  <div className={styles.candleStick} />
                </button>
              ))}
            </div>

            {/* Badan Kue (3 Tingkat) */}
            <div className={styles.cakeTierTop}>
              <div className={styles.frostingDrip} />
            </div>
            <div className={styles.cakeTierMiddle}>
              <div className={styles.frostingLines} />
            </div>
            <div className={styles.cakeTierBase} />
            
            {/* Piring/Tatakan Kue */}
            <div className={styles.cakePlate} />
          </div>

          {/* Pesan & Tombol setelah lilin ditiup */}
          <div className={styles.messageBox}>
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.5 }}
                  className={styles.successWrapper}
                >
                  <p className={styles.blessingText}>
                    {cake.wishesGrantedText}
                  </p>
                  
                  <button
                    onClick={handleScrollToFinal}
                    className={styles.finalMsgBtn}
                  >
                    <span>{cake.buttonText}</span>
                    <Heart size={14} fill="currentColor" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakeSection;
