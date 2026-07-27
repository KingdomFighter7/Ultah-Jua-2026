import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudio } from "../../context/AudioContext";
import { siteContent } from "../../data/siteContent";
import styles from "./OpeningGate.module.css";
import { Heart } from "lucide-react";

export const OpeningGate: React.FC = () => {
  const { hasInteractionStarted, startInteraction } = useAudio();
  const [isOpening, setIsOpening] = useState(false);

  // Reset status isOpening ketika hasInteractionStarted diset kembali ke false (saat putar ulang)
  useEffect(() => {
    if (!hasInteractionStarted) {
      setIsOpening(false);
    }
  }, [hasInteractionStarted]);

  const handleEnter = async () => {
    setIsOpening(true);

    // 1. Mainkan lagu lokal via Context
    await startInteraction();

    // 2. Scroll dipastikan berada di bagian atas
    window.scrollTo({ top: 0, behavior: "instant" });

    // 3. Pindahkan fokus ke heading utama setelah overlay hilang
    setTimeout(() => {
      const mainHeading = document.getElementById("main-hero-heading");
      if (mainHeading) {
        mainHeading.focus();
      }
    }, 800);
  };

  const data = siteContent.openingGate;

  return (
    <AnimatePresence>
      {!hasInteractionStarted && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Grain texture */}
          <div className="grain-overlay" />

          {/* Glowing background shapes */}
          <div className={styles.glowBg} />

          <motion.div
            className={styles.content}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            <p className={styles.eyebrow}>{data.eyebrow}</p>
            
            <h1 className={styles.heading}>
              {data.heading}
            </h1>
            
            <p className={styles.description}>
              {data.description}
            </p>

            <button
              onClick={handleEnter}
              disabled={isOpening}
              className={styles.button}
              aria-label="Buka kejutan ulang tahun Jua"
            >
              <span className={styles.btnText}>
                {data.buttonText}
              </span>
              <Heart className={styles.heartIcon} size={16} fill="currentColor" />
            </button>

            <p className={styles.footerText}>
              {data.footerText}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningGate;
