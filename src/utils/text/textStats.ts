
export function countCharacters(text: string): number {
  return text.length;
}

export function countWords(text: string): number {
  const trimmedText = text.trim();
  if (!trimmedText) return 0;
  return trimmedText.split(/[\s\u200C]+/).filter(word => word.length > 0).length;
}

export function countSentences(text: string): number {
  if (!text.trim()) return 0;
  const sentenceEndings = text.match(/[.!?؟\.\n]+/g);
  return sentenceEndings ? sentenceEndings.length : 1;
}

export function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n+/).filter(para => para.trim().length > 0).length;
}

export function calculateReadingTime(text: string): number {
  const words = countWords(text);
  return Math.ceil(words / 200);
}
