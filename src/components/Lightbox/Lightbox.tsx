import React, { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  imageDate?: string;
  imageTitle?: string;
  imageNote?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  imageDate,
  imageTitle,
  imageNote,
  onNext,
  onPrev,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Mengunci body scroll dan memasang event listener keyboard
  useEffect(() => {
    if (!isOpen) return;

    // Kunci body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Set fokus awal pada tombol tutup
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "Tab" && containerRef.current) {
        // Focus trap
        const focusableElements = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Galeri Kenangan Foto"
        >
          {/* Tombol Tutup */}
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Tutup galeri foto"
          >
            <X size={24} />
          </button>

          {/* Tombol Sebelumnya */}
          {onPrev && (
            <button
              onClick={onPrev}
              className={`${styles.navBtn} ${styles.prevBtn}`}
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Konten Lightbox */}
          <div className={styles.content}>
            <motion.div
              className={styles.mediaContainer}
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className={styles.image}
                draggable="false"
              />
              
              {/* Keterangan Foto */}
              {(imageTitle || imageNote || imageDate) && (
                <div className={styles.caption}>
                  <div className={styles.captionHeader}>
                    {imageTitle && <h3 className={styles.title}>{imageTitle}</h3>}
                    {imageDate && <span className={styles.date}>{imageDate}</span>}
                  </div>
                  {imageNote && <p className={styles.note}>{imageNote}</p>}
                </div>
              )}
            </motion.div>
          </div>

          {/* Tombol Selanjutnya */}
          {onNext && (
            <button
              onClick={onNext}
              className={`${styles.navBtn} ${styles.nextBtn}`}
              aria-label="Foto berikutnya"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
