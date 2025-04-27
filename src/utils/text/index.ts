
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
import { generateRandomString, generateRandomText, pickRandomFromList } from './randomText';
import {
  persianToEnglishNumbers,
  englishToPersianNumbers,
  correctHalfSpaces,
  persianKeyboardConverter,
  standardizePersianText,
  arabicToPersian,
  removePersianDiacritics
} from './persianTextUtils';
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
  generateLoremIpsum,
  countSentences as textUtilsCountSentences
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
  generateRandomString,
  generateRandomText,
  pickRandomFromList,
  
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
  generateLoremIpsum,
  
  // Persian utilities
  persianToEnglishNumbers,
  englishToPersianNumbers,
  correctHalfSpaces,
  persianKeyboardConverter,
  standardizePersianText,
  arabicToPersian,
  removePersianDiacritics
};

// Export countSentences only from textUtils to avoid conflicts
export { textUtilsCountSentences as countSentences };
