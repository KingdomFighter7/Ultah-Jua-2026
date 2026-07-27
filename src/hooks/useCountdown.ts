import { useState, useEffect } from "react";
import { getMillisecondsRemaining } from "../utils/date";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

/**
 * Hook untuk menghitung waktu mundur ke tanggal tertentu.
 * @param targetDateStr Tanggal target ISO dengan offset (misal: '2026-07-30T00:00:00+07:00')
 */
export function useCountdown(targetDateStr: string): CountdownTime {
  const calculateTimeRemaining = (): CountdownTime => {
    const totalMs = getMillisecondsRemaining(targetDateStr);
    
    if (totalMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    const seconds = Math.floor((totalMs / 1000) % 60);
    const minutes = Math.floor((totalMs / 1000 / 60) % 60);
    const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, isCompleted: false };
  };

  const [timeRemaining, setTimeRemaining] = useState<CountdownTime>(calculateTimeRemaining);

  useEffect(() => {
    // Jalankan segera saat mount untuk menghindari keterlambatan 1 detik
    setTimeRemaining(calculateTimeRemaining());

    const intervalId = setInterval(() => {
      const current = calculateTimeRemaining();
      setTimeRemaining(current);

      if (current.isCompleted) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDateStr]);

  return timeRemaining;
}
