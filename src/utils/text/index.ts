
// Re-export utilities individually with explicit names to avoid conflicts
// Basic text manipulation
import { toUpperCase, toLowerCase, toTitleCase, generateSlug } from './caseTransform';
import { 
  removeEmojis, 
  normalizeSpaces, 
  removeSpecialChars, 
  removeChars 
} from './textCleaner';
import { 
  countCharacters as countChars, 
  countWords, 
  countParagraphs, 
  calculateReadingTime 
} from './textStats';
import { finglishToPersian } from './finglishConverter';
import { generateRandomText } from './randomText';
import { 
  calculateWordCount,
  calculateCharacterCount,
  convertToUppercase,
  convertToLowercase,
  capitalizeText,
  reverseText,
  removeExtraSpaces,
  replaceText,
  extractEmails,
  extractUrls,
  removeHtmlTags,
  slugifyText,
  censorText,
  wordWrap,
  textToBinary,
  binaryToText,
  removeAccents,
  htmlEncode,
  htmlDecode,
  findAndReplace,
  persianNumberToEnglish,
  englishNumberToPersian,
  removeNonPersianCharacters,
  normalizePersianText,
  generateLoremIpsum
} from './textUtils';

// We rename the imported functions to avoid conflicts
export { 
  // Case transformations
  toUpperCase, 
  toLowerCase, 
  toTitleCase, 
  generateSlug,
  
  // Text cleaning
  removeEmojis, 
  normalizeSpaces,
  removeSpecialChars, 
  removeChars,
  
  // Text statistics
  countChars,
  countWords,
  countParagraphs, 
  calculateReadingTime,
  
  // Special utilities
  finglishToPersian,
  generateRandomText,
  
  // Export from textUtils.ts
  calculateWordCount,
  calculateCharacterCount,
  convertToUppercase,
  convertToLowercase,
  capitalizeText,
  reverseText,
  removeExtraSpaces,
  replaceText,
  extractEmails,
  extractUrls,
  // Use only one implementation of these functions
  removeHtmlTags,
  slugifyText,
  censorText,
  wordWrap,
  textToBinary,
  binaryToText,
  removeAccents, 
  htmlEncode,
  htmlDecode,
  findAndReplace,
  persianNumberToEnglish,
  englishNumberToPersian,
  removeNonPersianCharacters,
  normalizePersianText,
  generateLoremIpsum
};

// Export countSentences only from textUtils to avoid conflicts
export { countSentences } from './textUtils';
