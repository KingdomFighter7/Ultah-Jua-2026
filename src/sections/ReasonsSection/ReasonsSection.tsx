import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { siteContent } from "../../data/siteContent";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import styles from "./ReasonsSection.module.css";

export const ReasonsSection: React.FC = () => {
  const { reasons } = siteContent;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hitung jumlah kartu yang terlihat berdasarkan ukuran layar
  let visibleCards = 3;
  if (isMobile) {
    visibleCards = 1;
  } else if (isTablet) {
    visibleCards = 2;
  }

  const totalCards = reasons.items.length;
  const maxIndex = Math.max(0, totalCards - visibleCards);

  // Jaga index tetap dalam batas saat ukuran layar berubah
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, maxIndex, currentIndex]);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop kembali ke awal
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Loop ke ujung
      setCurrentIndex(maxIndex);
    }
  };

  // Handler navigasi keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      handleNext();
      e.preventDefault();
    }
  };

  // Integrasi swipe/drag handler
  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  // Autoplay lambat: berpindah setiap 8 detik jika halaman sedang aktif
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex, maxIndex]);

  return (
    <section className={styles.section} aria-label="Alasan Istimewa">
      <div className="container">
        <SectionHeading
          title={reasons.heading}
          subtitle={reasons.subheading}
        />

        {/* Carousel Wrapper */}
        <div 
          className={styles.carouselContainer}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Carousel alasan Jua istimewa. Gunakan tombol panah kiri kanan untuk bernavigasi."
        >
          {/* Track Panel */}
          <div className={styles.trackWrapper} ref={containerRef}>
            <motion.div
              className={styles.track}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={{ 
                x: `-${currentIndex * (100 / totalCards)}%` 
              }}
              transition={{ type: "spring", damping: 26, stiffness: 170 }}
              style={{
                width: `${(totalCards / visibleCards) * 100}%`
              }}
            >
              {reasons.items.map((item) => (
                <div 
                  key={item.id} 
                  className={styles.cardFrame}
                  style={{ width: `${100 / totalCards}%` }}
                >
                  <div className={styles.card}>
                    <div className={styles.cardIndex}>
                      {String(item.id).padStart(2, "0")}
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.text}</p>
                    <div className={styles.cardGlow} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Tombol Kontrol Kiri */}
          <button
            onClick={handlePrev}
            className={`${styles.navBtn} ${styles.prevBtn}`}
            aria-label="Alasan sebelumnya"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Tombol Kontrol Kanan */}
          <button
            onClick={handleNext}
            className={`${styles.navBtn} ${styles.nextBtn}`}
            aria-label="Alasan berikutnya"
          >
            <ChevronRight size={20} />
          </button>

          {/* Positional Dots */}
          <div className={styles.dotsIndicator}>
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ""}`}
                aria-label={`Tampilkan halaman alasan nomor ${idx + 1}`}
                aria-current={currentIndex === idx ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
