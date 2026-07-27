/**
 * Memvalidasi apakah string merupakan YouTube Video ID 11 karakter yang valid.
 * @param id Video ID
 */
export function isValidYouTubeId(id: string): boolean {
  if (!id || id === "REPLACE_WITH_YOUTUBE_VIDEO_ID" || id.trim() === "") {
    return false;
  }
  // YouTube video IDs are 11 characters long and contain alphanumeric characters, underscores, and dashes
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

/**
 * Membuat URL YouTube Embed yang aman dan privacy-enhanced.
 * @param id Video ID
 */
export function getYouTubeEmbedUrl(id: string): string | null {
  if (!isValidYouTubeId(id)) {
    return null;
  }
  
  // Menggunakan youtube.com standar tanpa parameter origin agar terhindar dari konflik port lokal
  return `https://www.youtube.com/embed/${id}?enablejsapi=1&rel=0`;
}
