/**
 * Menambahkan angka nol di depan angka satu digit.
 * @param num Angka yang akan di-pad
 */
export function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}

/**
 * Memformat detik menjadi format mm:ss.
 * @param seconds Jumlah detik
 */
export function formatAudioTime(seconds: number): string {
  if (isNaN(seconds) || seconds === Infinity) return "00:00";
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${padZero(mins)}:${padZero(secs)}`;
}
