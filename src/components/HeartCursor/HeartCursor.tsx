import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./HeartCursor.module.css";

interface Point {
  x: number;
  y: number;
}

export const HeartCursor: React.FC = () => {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const isReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnTime = useRef(0);
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  
  // Posisi mouse target
  const mousePos = useRef<Point>({ x: 0, y: 0 });
  
  // Trail partikel (3-5 partikel trail)
  const numTrails = 4;
  const trailPositions = useRef<Point[]>(
    Array(numTrails).fill({ x: 0, y: 0 })
  );

  // Sinkronisasi class body dengan status visibilitas kursor
  useEffect(() => {
    if (!isFinePointer) return;

    if (isVisible) {
      document.body.classList.add("custom-cursor-active");
    } else {
      document.body.classList.remove("custom-cursor-active");
    }

    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isVisible, isFinePointer]);

  useEffect(() => {
    if (!isFinePointer) return;

    // Fungsi membuat dan menggerakkan partikel hati secara acak (GPU-accelerated)
    const spawnParticle = (x: number, y: number) => {
      if (isReducedMotion || !containerRef.current) return;

      const particle = document.createElement("span");
      particle.className = styles.loveParticle;
      particle.innerHTML = "❤";

      // Vektor pergerakan acak melayang ke atas
      const dx = `${(Math.random() - 0.5) * 60}px`;
      const dy = `${-40 - Math.random() * 60}px`;
      const size = `${8 + Math.random() * 12}px`;
      const rot = `${(Math.random() - 0.5) * 90}deg`;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--dx", dx);
      particle.style.setProperty("--dy", dy);
      particle.style.setProperty("--size", size);
      particle.style.setProperty("--rot", rot);

      containerRef.current.appendChild(particle);

      // Bersihkan elemen setelah animasi selesai (1 detik)
      setTimeout(() => {
        particle.remove();
      }, 1000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Batasi pemanggilan spawner agar tidak membebani memori (Throttle)
      const now = Date.now();
      const dist = Math.hypot(
        e.clientX - lastSpawnPos.current.x,
        e.clientY - lastSpawnPos.current.y
      );

      if (now - lastSpawnTime.current > 40 && dist > 10) {
        spawnParticle(e.clientX, e.clientY);
        lastSpawnTime.current = now;
        lastSpawnPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Deteksi hover pada elemen interaktif
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = 
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']");

        setIsHovered(!!isInteractive);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    // Loop Animasi untuk Trail yang halus
    let animationFrameId: number;
    
    const updateCoordinates = () => {
      // 1. Update cursor utama (mengikuti mouse secara instan)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // 2. Update trail partikel jika reduced motion tidak aktif
      if (!isReducedMotion) {
        let prevX = mousePos.current.x;
        let prevY = mousePos.current.y;

        trailPositions.current = trailPositions.current.map((pos) => {
          // Lerp/damping effect agar partikel melambat mengejar partikel di depannya
          const nextX = pos.x + (prevX - pos.x) * 0.35;
          const nextY = pos.y + (prevY - pos.y) * 0.35;
          
          prevX = nextX;
          prevY = nextY;
          
          return { x: nextX, y: nextY };
        });

        // Terapkan posisi ke elemen DOM trail
        const trailElements = document.querySelectorAll(`.${styles.trail}`);
        trailElements.forEach((el, index) => {
          const pos = trailPositions.current[index];
          if (pos && el instanceof HTMLElement) {
            el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
          }
        });
      }

      animationFrameId = requestAnimationFrame(updateCoordinates);
    };

    animationFrameId = requestAnimationFrame(updateCoordinates);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFinePointer, isReducedMotion]);

  // Jika bukan perangkat mouse, jangan render apa pun
  if (!isFinePointer) return null;

  return (
    <div 
      ref={containerRef}
      className={`${styles.cursorContainer} ${isVisible ? styles.visible : styles.hidden} ${isHovered ? styles.hovered : ""}`}
      aria-hidden="true"
    >
      {/* Cursor Utama Hati */}
      <div ref={cursorRef} className={styles.mainCursor}>
        <svg viewBox="0 0 24 24" className={styles.heartSvg}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Partikel Trail (disembunyikan jika prefers-reduced-motion) */}
      {!isReducedMotion && 
        Array.from({ length: numTrails }).map((_, index) => (
          <div
            key={index}
            className={styles.trail}
            style={{
              opacity: (numTrails - index) / (numTrails * 2), // Opacity memudar ke belakang
              transform: `scale(${1 - index * 0.18})`, // Ukuran menyusut ke belakang
              zIndex: 99998 - index
            }}
          >
            <svg viewBox="0 0 24 24" className={styles.trailSvg}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))
      }
    </div>
  );
};
export default HeartCursor;
