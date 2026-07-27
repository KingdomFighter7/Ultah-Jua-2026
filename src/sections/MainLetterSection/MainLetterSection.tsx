import React from "react";
import { motion } from "motion/react";
import { siteContent } from "../../data/siteContent";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import styles from "./MainLetterSection.module.css";

export const MainLetterSection: React.FC = () => {
  const { mainLetter } = siteContent;

  return (
    <section
      id="main-letter"
      className={styles.letterSection}
      aria-label="Surat Utama"
    >
      <div className="container">
        <SectionHeading
          title={mainLetter.heading}
          subtitle={mainLetter.subheading}
        />

        {/* 3D Perspective Container for Letter Reveal */}
        <div className={styles.perspectiveContainer}>
          <motion.div
            className={styles.paper}
            initial={{ opacity: 0, y: 80, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 25, stiffness: 80 }}
          >
            {/* Elegant inner gold/rose border */}
            <div className={styles.innerBorder}>
              {/* Header ornament */}
              <div className={styles.letterHeader}>
                <span className={styles.vintageStamp}>Nazwa & Fari</span>
              </div>

              {/* Letter content paragraphs */}
              <div className={styles.letterBody}>
                {mainLetter.paragraphs.map((paragraph, index) => {
                  // Jika paragraf terakhir ("Dengan penuh doa dan sayang,"), set layout miring/penutup
                  const isClosing = index === mainLetter.paragraphs.length - 1;
                  return (
                    <p
                      key={index}
                      className={`${styles.paragraph} ${isClosing ? styles.closingText : ""}`}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Signature */}
              <div className={styles.letterFooter}>
                <span className={styles.signatureName}>
                  {mainLetter.signature}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainLetterSection;
