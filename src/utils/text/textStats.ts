
/**
 * Count characters in a text
 * @param text The text to count characters in
 * @returns The number of characters in the text
 */
export function countChars(text: string): number {
  return text ? text.length : 0;
}

/**
 * Count words in a text
 * @param text The text to count words in
 * @returns The number of words in the text
 */
export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Count sentences in a text
 * @param text The text to count sentences in
 * @returns The number of sentences in the text
 */
export function countSentences(text: string): number {
  if (!text) return 0;
  // Split by period, exclamation mark, or question mark followed by a space or end of string
  return text.split(/[.!?](?:\s|$)/).filter(Boolean).length;
}

/**
 * Count paragraphs in a text
 * @param text The text to count paragraphs in
 * @returns The number of paragraphs in the text
 */
export function countParagraphs(text: string): number {
  if (!text) return 0;
  return text.split(/\n+/).filter(Boolean).length;
}

/**
 * Calculate approximate reading time in minutes
 * @param text The text to calculate reading time for
 * @param wordsPerMinute Words per minute reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200): number {
  const words = countWords(text);
  const minutes = words / wordsPerMinute;
  return Math.max(1, Math.round(minutes));
}
