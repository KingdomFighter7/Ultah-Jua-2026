import React, { useState } from "react";
import { motion } from "motion/react";
import { siteContent } from "../../data/siteContent";
import { useAudio } from "../../context/AudioContext";
import { Heart, RefreshCw, ArrowUp } from "lucide-react";
import confetti from "canvas-confetti";
import styles from "./FinalSection.module.css";

export const FinalSection: React.FC = () => {
  const { finalMessage } = siteContent;
  const { resetAudio } = useAudio();
  const [hasFiredConfetti, setHasFiredConfetti] = useState(false);

  // Memicu letusan confetti kecil satu kali saat section ini terlihat di layar
  const handleViewportEnter = () => {
    if (!hasFiredConfetti) {
      setHasFiredConfetti(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#ff7eb6", "#ffc1d9", "#d9a0ae", "#fff7fa"]
      });
    }
  };

  const handleReplaySurprise = () => {
    // 1. Reset musik lokal & set status interaksi ke false
    resetAudio();

    // 2. Kirim event untuk mereset status lilin kue
    window.dispatchEvent(new Event("reset-birthday-cake"));

    // 3. Reset letusan confetti section akhir agar bisa terpicu lagi
    setHasFiredConfetti(false);

    // 4. Scroll langsung ke atas (instant) agar Opening Gate tampil penuh kembali
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section 
      id="final-message-section"
      className={styles.section} 
      aria-label="Pesan Penutup"
    >
      {/* Background Gradient overlay */}
      <div className={styles.bgGradient} />

      <div className="container">
        <motion.div
          className={styles.messageCard}
          onViewportEnter={handleViewportEnter}
          viewport={{ once: false, amount: 0.4 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Greeting */}
          <h2 className={styles.heading}>
            {finalMessage.heading}
          </h2>

          {/* Letter closing paragraphs */}
          <div className={styles.bodyText}>
            {finalMessage.paragraphs.map((p, idx) => (
              <p key={idx} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>

          {/* Signing signature */}
          <div className={styles.signatureArea}>
            <span className={styles.closingText}>{finalMessage.closing}</span>
            <span className={styles.senderName}>{finalMessage.senderName}</span>
            <Heart className={styles.heartIcon} size={18} fill="currentColor" />
          </div>

          {/* Action Button Deck */}
          <div className={styles.btnDeck}>
            {/* Putar Ulang Kejutan */}
            <button
              onClick={handleReplaySurprise}
              className={styles.replayBtn}
              aria-label="Putar ulang kejutan dari awal"
            >
              <RefreshCw size={16} />
              <span>{finalMessage.replayButtonText}</span>
            </button>

            {/* Kembali ke Atas */}
            <button
              onClick={handleScrollToTop}
              className={styles.backToTopBtn}
              aria-label="Kembali ke bagian paling atas halaman"
            >
              <ArrowUp size={16} />
              <span>{finalMessage.backToTopButtonText}</span>
            </button>
          </div>
        </motion.div>

        {/* Footer Sederhana */}
        <footer className={styles.footer} role="contentinfo">
          <p>© 2026 {siteContent.recipient.fullName}. Created with ♡ by {siteContent.sender.name}.</p>
        </footer>
      </div>
    </section>
  );
};

export default FinalSection;
