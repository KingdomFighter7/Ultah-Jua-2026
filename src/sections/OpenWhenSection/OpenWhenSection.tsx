import React, { useState } from "react";
import { motion } from "motion/react";
import { siteContent } from "../../data/siteContent";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { Modal } from "../../components/Modal/Modal";
import { Heart, Coffee, Frown, ShieldAlert, Sparkles, Flame, Smile } from "lucide-react";
import styles from "./OpenWhenSection.module.css";

export const OpenWhenSection: React.FC = () => {
  const { openWhen } = siteContent;
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleOpenCard = (id: string) => {
    setActiveCardId(id);
  };

  const handleCloseCard = () => {
    setActiveCardId(null);
  };

  // Pencocokan ikon untuk setiap kartu "Buka Saat..."
  const getIcon = (id: string) => {
    switch (id) {
      case "lelah":
        return <Coffee size={24} className={styles.icon} />;
      case "sedih":
        return <Frown size={24} className={styles.icon} />;
      case "ragu":
        return <ShieldAlert size={24} className={styles.icon} />;
      case "rindu":
        return <Heart size={24} className={styles.icon} fill="currentColor" />;
      case "semangat":
        return <Flame size={24} className={styles.icon} />;
      case "tersenyum":
        return <Smile size={24} className={styles.icon} />;
      default:
        return <Sparkles size={24} className={styles.icon} />;
    }
  };

  const activeCard = openWhen.cards.find((c) => c.id === activeCardId);

  return (
    <section className={styles.section} aria-label="Buka Saat...">
      <div className="container">
        <SectionHeading
          title={openWhen.heading}
          subtitle="Sentuh kartu di bawah ini untuk membaca surat kecil dari Fari."
        />

        {/* Grid Kartu Amplop */}
        <div className={styles.grid}>
          {openWhen.cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={styles.cardWrapper}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <button
                className={styles.envelopeBtn}
                onClick={() => handleOpenCard(card.id)}
                aria-label={`Buka surat saat kamu merasa ${card.title}`}
              >
                {/* Envelope fold styling details */}
                <div className={styles.envelopeFlap} />
                
                <div className={styles.envelopeBody}>
                  <div className={styles.iconContainer}>
                    {getIcon(card.id)}
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <span className={styles.triggerText}>{card.trigger}</span>
                </div>

                {/* Wax seal heart icon */}
                <div className={styles.waxSeal}>
                  <Heart size={12} fill="currentColor" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Modal Tampilan Pesan */}
        {activeCard && (
          <Modal
            isOpen={activeCardId !== null}
            onClose={handleCloseCard}
            title={`Buka Saat Kamu Merasa ${activeCard.title}`}
          >
            <div className={styles.messageContent}>
              <Heart className={styles.messageHeart} size={36} fill="currentColor" />
              <p className={styles.messageText}>{activeCard.message}</p>
              <span className={styles.messageSender}>— Cinta, Fari</span>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default OpenWhenSection;
