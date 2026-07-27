import React from "react";
import { motion } from "motion/react";
import { siteContent } from "../../data/siteContent";
import styles from "./HeroSection.module.css";
import { ChevronDown, Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  const data = siteContent.hero;

  return (
    <section
      id="hero-section"
      className={styles.heroContainer}
      aria-label="Ucapan Pembuka"
    >
      {/* Background Image with Zoom Animation */}
      <motion.div
        className={styles.bgImage}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      >
        <img
          src="/images/hero.webp"
          alt=""
          className={styles.heroBackdropImg}
        />
      </motion.div>

      {/* Dark Plum Overlay */}
      <div className={styles.overlay} />

      {/* Subtle floating particles inside section */}
      <div className={styles.sparkleDecoration} aria-hidden="true">
        <Sparkles className={styles.sparkleIcon1} size={20} />
        <Sparkles className={styles.sparkleIcon2} size={14} />
      </div>

      <div className="container">
        <div className={styles.contentWrapper}>
          {/* Portrait Photo Frame (Asymmetric/Organic Oval shape) */}
          <motion.div
            className={styles.portraitFrame}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2, type: "spring" }}
          >
            {/* Fallback elegant gradient if image fails to load */}
            <div className={styles.imageFallback} />
            <img
              src="/images/portrait.webp"
              alt={`Foto potret ${siteContent.recipient.nickname}`}
              className={styles.portraitImg}
              loading="eager"
            />
          </motion.div>

          <div className={styles.textContent}>
            {/* Birthday Date Label */}
            <motion.span
              className={styles.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {data.label}
            </motion.span>

            {/* Main Greeting */}
            <h1
              className={styles.mainTitle}
              id="main-hero-heading"
              tabIndex={-1}
            >
              <motion.span
                className={styles.titlePrefix}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              >
                {data.titlePrefix}
              </motion.span>

              {/* Mask reveal name Jua */}
              <div className={styles.maskContainer}>
                <motion.span
                  className={styles.recipientName}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
                >
                  {data.recipientName}
                </motion.span>
              </div>
            </h1>

            {/* Subheading */}
            <motion.p
              className={styles.subheading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              {data.subheading}
            </motion.p>

            {/* Fari Signature */}
            <motion.span
              className={styles.signature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              {data.signature}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className={styles.scrollText}>
          Scroll ke bawah, pelan - pelan ya Sayang
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
