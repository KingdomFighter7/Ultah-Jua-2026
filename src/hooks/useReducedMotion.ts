import { useState, useEffect } from "react";

/**
 * Hook untuk mendeteksi apakah pengguna lebih menyukai gerakan yang dikurangi (prefers-reduced-motion).
 */
export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState<boolean>(false);

  useEffect(() => {
    // Jalankan hanya di lingkungan browser
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setIsReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return isReduced;
}
