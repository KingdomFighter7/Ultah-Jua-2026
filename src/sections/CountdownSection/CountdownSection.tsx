import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { siteContent } from "../../data/siteContent";
import { useCountdown } from "../../hooks/useCountdown";
import { calculateAge } from "../../utils/date";
import { padZero } from "../../utils/formatTime";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { Sparkles } from "lucide-react";
import styles from "./CountdownSection.module.css";

interface CountdownSectionProps {
  onUnlock?: () => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  onUnlock,
}) => {
  const { birthdayTarget, recipient, countdown } = siteContent;
  const { days, hours, minutes, seconds, isCompleted } =
    useCountdown(birthdayTarget);
  const confettiTriggered = useRef(false);

  // Jalankan efek confetti satu kali saja saat waktu berakhir & panggil callback unlock
  useEffect(() => {
    if (isCompleted && !confettiTriggered.current) {
      confettiTriggered.current = true;
      onUnlock?.();

      // Letusan confetti tengah layar
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#ff7eb6", "#ffc1d9", "#d9a0ae", "#fff7fa"],
      });

      // Menembakkan confetti kecil ke samping setelahnya
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff7eb6", "#ffc1d9"],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff7eb6", "#ffc1d9"],
        });
      }, 500);
    }
  }, [isCompleted, onUnlock]);

  // Hitung umur dinamis jika birthYear diisi
  const age = calculateAge(recipient.birthYear, birthdayTarget);

  return (
    <section className={styles.countdownSection} aria-label="Waktu Mundur">
      <div className="container">
        <SectionHeading
          title={countdown.heading}
          subtitle={countdown.subheading}
        />

        <div className={styles.cardContainer} aria-live="polite">
          {!isCompleted ? (
            <>
              <div className={styles.timerGrid}>
                {/* Card Hari */}
                <div className={styles.timeCard}>
                  <span className={styles.number} aria-label={`${days} hari`}>
                    {padZero(days)}
                  </span>
                  <span className={styles.label}>Hari</span>
                </div>

                {/* Card Jam */}
                <div className={styles.timeCard}>
                  <span className={styles.number} aria-label={`${hours} jam`}>
                    {padZero(hours)}
                  </span>
                  <span className={styles.label}>Jam</span>
                </div>

                {/* Card Menit */}
                <div className={styles.timeCard}>
                  <span
                    className={styles.number}
                    aria-label={`${minutes} menit`}
                  >
                    {padZero(minutes)}
                  </span>
                  <span className={styles.label}>Menit</span>
                </div>

                {/* Card Detik */}
                <div className={styles.timeCard}>
                  <span
                    className={styles.number}
                    aria-label={`${seconds} detik`}
                  >
                    {padZero(seconds)}
                  </span>
                  <span className={styles.label}>Detik</span>
                </div>
              </div>

              {/* Teaser Banner saat waktu belum tiba */}
              <div className={styles.lockBanner}>
                <p className={styles.teaserText}>
                  Kejutan manis disiapkan khusus untuk {recipient.nickname}{" "}
                  dan akan terbuka otomatis
                  <br />
                  begitu hitungan mundur selesai pada 30 Juli 2026 00:00 WIB.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.celebrationMessage}>
                <h3 className={styles.celebrationText}>
                  {countdown.targetReachedText}
                </h3>
                {age !== null && (
                  <p className={styles.ageText}>
                    Selamat Ulang Tahun yang ke-{age}, {recipient.nickname}!
                  </p>
                )}
              </div>
              <div className={styles.lockBanner}>
                <div className={styles.unlockedBadge}>
                  <Sparkles size={14} />
                  <span>
                    {countdown.scrollHintText || "Scroll ke bawah ya, Sayang!"} 🌸
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
