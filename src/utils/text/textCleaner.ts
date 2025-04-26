
export function removeEmojis(text: string): string {
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
}

/**
 * Removes HTML tags from text
 * @param text Text containing HTML tags
 * @returns Clean text without HTML tags
 */
export function removeHtmlTags(text: string): string {
  return text.replace(/<[^>]*>/g, '');
}

/**
 * Removes extra spaces, including leading/trailing spaces
 * @param text Input text
 * @returns Text with normalized spaces
 */
export function normalizeSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Removes accents/diacritics from Latin characters
 * @param text Text with accented characters
 * @returns Text without accents
 */
export function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Removes all special characters from text
 * @param text Input text
 * @returns Text without special characters
 */
export function removeSpecialChars(text: string): string {
  return text.replace(/[^\w\s]/gi, '');
}

/**
 * Removes specific characters from text
 * @param text Input text
 * @param chars Characters to remove
 * @returns Text without specified characters
 */
export function removeChars(text: string, chars: string): string {
  const escapedChars = chars.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`[${escapedChars}]`, 'g');
  return text.replace(regex, '');
}
