/**
 * Menghitung umur penerima pada tanggal target ulang tahun.
 * @param birthYear Tahun lahir (bisa null)
 * @param targetDateStr String tanggal target ulang tahun (ISO 8601 dengan offset)
 */
export function calculateAge(birthYear: number | null, targetDateStr: string): number | null {
  if (birthYear === null) return null;
  
  const targetDate = new Date(targetDateStr);
  const targetYear = targetDate.getFullYear();
  
  // Karena hari H perayaan adalah hari ulang tahunnya, maka umurnya adalah selisih tahun target dengan tahun lahir
  const age = targetYear - birthYear;
  
  return age >= 0 ? age : null;
}

/**
 * Mendapatkan sisa milidetik menuju waktu target
 * @param targetDateStr String tanggal target ulang tahun
 */
export function getMillisecondsRemaining(targetDateStr: string): number {
  const targetTime = new Date(targetDateStr).getTime();
  const currentTime = Date.now();
  return Math.max(0, targetTime - currentTime);
}
