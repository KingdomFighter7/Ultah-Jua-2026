import React from "react";
import { motion } from "motion/react";
import { siteContent } from "../../data/siteContent";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { Sparkles, Heart } from "lucide-react";
import styles from "./WishesSection.module.css";

export const WishesSection: React.FC = () => {
  const { wishes } = siteContent;

  return (
    <section className={styles.section} aria-label="Harapan Fari">
      <div className="container">
        <SectionHeading
          title={wishes.heading}
          subtitle="Beberapa doa tulus untuk mengiringi langkah barumu."
        />

        <div className={styles.cardContainer}>
          <motion.div
            className={styles.prayerCard}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* SVG Border Drawing Animation */}
            <svg className={styles.cardBorderSvg} width="100%" height="100%">
              <motion.rect
                x="4"
                y="4"
                width="calc(100% - 8px)"
                height="calc(100% - 8px)"
                rx="16"
                fill="none"
                stroke="var(--color-primary-soft)"
                strokeWidth="1"
                strokeDasharray="10 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Glowing Ornaments */}
            <div className={styles.topSparkle}>
              <Sparkles size={20} className={styles.sparkleIcon} />
            </div>

            {/* Text Paragraphs */}
            <div className={styles.cardContent}>
              {wishes.textParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className={styles.paragraph}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 0.95, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Bottom Heart Seal */}
            <div className={styles.bottomSeal}>
              <span className={styles.sealLine} />
              <Heart size={16} className={styles.heartIcon} fill="currentColor" />
              <span className={styles.sealLine} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
