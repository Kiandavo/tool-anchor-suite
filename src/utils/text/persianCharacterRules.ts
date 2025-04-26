
// Characters that should not be duplicated in Persian
export const noDuplicationChars = new Set(['ا', 'و', 'ی', 'د', 'ذ', 'ر', 'ز', 'ژ']);

export const postProcessingRules = [
  { pattern: /اا/g, replacement: 'آ' },
  { pattern: /یی/g, replacement: 'ی' },
  { pattern: /وو/g, replacement: 'و' },
  { pattern: /\u200C{2,}/g, replacement: '\u200C' },
];
