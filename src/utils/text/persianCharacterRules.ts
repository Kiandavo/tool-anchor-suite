
// Characters that should not be duplicated in Persian
export const noDuplicationChars = new Set(['ا', 'و', 'ی', 'د', 'ذ', 'ر', 'ز', 'ژ']);

export const postProcessingRules = [
  // Basic character replacements
  { pattern: /اا/g, replacement: 'آ' },
  { pattern: /یی/g, replacement: 'ی' },
  { pattern: /وو/g, replacement: 'و' },
  { pattern: /\u200C{2,}/g, replacement: '\u200C' },
  
  // Common letter combinations that need special handling
  { pattern: /می([^\s\u200C])/g, replacement: 'می‌$1' },
  { pattern: /نمی([^\s\u200C])/g, replacement: 'نمی‌$1' },
  { pattern: /([^\s])ها([^\s]|$)/g, replacement: '$1‌ها$2' },
  
  // Handle Ezafe construction
  { pattern: /([^\s])ی([^\s]|$)/g, replacement: '$1‌ی$2' },
  { pattern: /ه ی /g, replacement: 'ه‌ی ' },
  
  // Handle specific suffixes
  { pattern: /([^\s])های([^\s]|$)/g, replacement: '$1‌های$2' },
  { pattern: /([^\s])هایی([^\s]|$)/g, replacement: '$1‌هایی$2' },
  { pattern: /([^\s])ان([^\s]|$)/g, replacement: '$1‌ان$2' },
  
  // Fix common word compounds
  { pattern: /دل([^\s])/g, replacement: 'دل‌$1' },
  { pattern: /هم([^\s])/g, replacement: 'هم‌$1' },
  
  // Handle verbs and prepositions
  { pattern: /می توان/g, replacement: 'می‌توان' },
  { pattern: /می شود/g, replacement: 'می‌شود' },
  { pattern: /می کند/g, replacement: 'می‌کند' },
  { pattern: /می دهد/g, replacement: 'می‌دهد' },
];
