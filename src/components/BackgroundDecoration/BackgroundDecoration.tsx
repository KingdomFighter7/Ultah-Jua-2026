import React from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./BackgroundDecoration.module.css";

export const BackgroundDecoration: React.FC = () => {
  const isReducedMotion = useReducedMotion();

  // Koordinat deterministik bintang untuk menghindari isu hidrasi
  const stars = [
    { top: "12%", left: "8%", delay: "0.5s", size: "2px" },
    { top: "8%", left: "42%", delay: "1.8s", size: "3px" },
    { top: "25%", left: "82%", delay: "0.9s", size: "1.5px" },
    { top: "42%", left: "18%", delay: "2.4s", size: "2px" },
    { top: "34%", left: "68%", delay: "1.2s", size: "2.5px" },
    { top: "58%", left: "88%", delay: "0.6s", size: "2px" },
    { top: "72%", left: "11%", delay: "2.0s", size: "1.5px" },
    { top: "64%", left: "38%", delay: "2.8s", size: "3px" },
    { top: "82%", left: "72%", delay: "1.4s", size: "2px" },
    { top: "91%", left: "28%", delay: "1.0s", size: "1.5px" },
    { top: "50%", left: "52%", delay: "1.6s", size: "2.5px" },
    { top: "18%", left: "94%", delay: "2.2s", size: "2px" },
    { top: "76%", left: "92%", delay: "0.3s", size: "1.5px" },
    { top: "86%", left: "6%", delay: "1.5s", size: "2.5px" },
    { top: "4%", left: "74%", delay: "0.7s", size: "2px" },
  ];

  return (
    <div className={styles.bgContainer} aria-hidden="true">
      {/* 1. Large Soft Floating Ambient Orbs (Aura Cahaya) */}
      {!isReducedMotion && (
        <>
          <div className={`${styles.orb} ${styles.orb1}`} />
          <div className={`${styles.orb} ${styles.orb2}`} />
          <div className={`${styles.orb} ${styles.orb3}`} />
        </>
      )}

      {/* 2. Thin Orbiting Concentric Circles (Garis Orbit Estetis) */}
      <div className={`${styles.orbit} ${styles.orbit1}`} />
      <div className={`${styles.orbit} ${styles.orbit2}`} />

      {/* 3. Twinkling Star Field (Kerlip Bintang) */}
      <div className={styles.starField}>
        {stars.map((star, idx) => (
          <div
            key={idx}
            className={`${styles.star} ${!isReducedMotion ? styles.twinkle : ""}`}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundDecoration;
