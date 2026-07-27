import React, { useState } from "react";
import { motion } from "motion/react";
import { siteContent } from "../../data/siteContent";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { Lightbox } from "../../components/Lightbox/Lightbox";
import styles from "./MemoriesSection.module.css";
import { Eye } from "lucide-react";

export const MemoriesSection: React.FC = () => {
  const { memories } = siteContent;
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setActivePhotoIndex(null);
  };

  const handleNextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! + 1) % memories.items.length);
    }
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! - 1 + memories.items.length) % memories.items.length);
    }
  };

  const activePhoto = activePhotoIndex !== null ? memories.items[activePhotoIndex] : null;

  // Sedikit rotasi asimetris untuk foto polaroid
  const rotationStyles = [
    styles.rotateRight1,
    styles.rotateLeft1,
    styles.rotateRight2,
    styles.rotateLeft2,
    styles.rotateRight1,
    styles.rotateLeft1,
    styles.rotateRight2,
    styles.rotateLeft2,
    styles.rotateRight1,
  ];

  // Variasi aspect-ratio untuk grid editorial asimetris
  const aspectStyles = [
    styles.aspectLandscape, // 1
    styles.aspectPortrait,  // 2
    styles.aspectSquare,    // 3
    styles.aspectLandscape, // 4
    styles.aspectPortrait,  // 5
    styles.aspectSquare,    // 6
    styles.aspectPortrait,  // 7
    styles.aspectLandscape, // 8
    styles.aspectSquare,    // 9
  ];

  return (
    <section className={styles.section} aria-label="Galeri Kenangan">
      <div className="container">
        <SectionHeading
          title={memories.heading}
          subtitle={memories.subheading}
        />

        {/* Editorial Photo Grid */}
        <div className={styles.gridContainer}>
          {memories.items.map((item, index) => {
            const rotClass = rotationStyles[index % rotationStyles.length];
            const aspectClass = aspectStyles[index % aspectStyles.length];
            
            return (
              <motion.div
                key={item.id}
                className={`${styles.photoFrame} ${rotClass} ${aspectClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <button
                  className={styles.cardButton}
                  onClick={() => handleOpenLightbox(index)}
                  aria-label={`Lihat foto ${item.title}: ${item.note}`}
                >
                  {/* Elegant Gradient Background Fallback */}
                  <div className={styles.imageFallback} />
                  
                  <img
                    src={item.image}
                    alt={item.alt}
                    className={styles.image}
                    loading="lazy"
                  />

                  {/* Caption & Hover Info */}
                  <div className={styles.overlayInfo}>
                    <Eye size={20} className={styles.eyeIcon} />
                    <span className={styles.photoDate}>{item.date}</span>
                    <h3 className={styles.photoTitle}>{item.title}</h3>
                  </div>

                  {/* Polaroid-style bottom note */}
                  <div className={styles.polaroidLabel}>
                    <span className={styles.polaroidTitle}>{item.title}</span>
                    <span className={styles.polaroidDate}>{item.date}</span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox Overlay */}
        {activePhoto && (
          <Lightbox
            isOpen={activePhotoIndex !== null}
            onClose={handleCloseLightbox}
            imageSrc={activePhoto.image}
            imageAlt={activePhoto.alt}
            imageDate={activePhoto.date}
            imageTitle={activePhoto.title}
            imageNote={activePhoto.note}
            onNext={handleNextPhoto}
            onPrev={handlePrevPhoto}
          />
        )}
      </div>
    </section>
  );
};

export default MemoriesSection;
