
// Export directly from modules without re-exporting
export * from './caseTransform';
export * from './finglishConverter';
export * from './enhancedFinglishConverter';
export * from './finglishMappings';
export * from './finglishWordDatabase';
export * from './persianCharacterRules';

// Handle conflicting exports from persianUtils and persianTextUtils
// by exporting only from persianUtils to avoid ambiguity
export * from './persianUtils';

// Individual exports for the rest
export * from './quotes';

// Import and re-export specific functions from randomText
import { generateRandomString, pickRandomFromList, generateRandomText, generateLorem, generatePlaceholderText } from './randomText';
export { generateRandomString, pickRandomFromList, generateRandomText, generateLorem, generatePlaceholderText };

// Import and re-export specific functions from textCleaner
import { removeEmojis, removeSpecialChars } from './textCleaner';
export { removeEmojis, removeSpecialChars };

// Export specific functions from textStats to avoid duplicates
import { calculateReadingTime, countChars, countWords, countParagraphs } from './textStats';
export { calculateReadingTime, countChars, countWords, countParagraphs };
// Explicitly export countSentences from textStats
import { countSentences } from './textStats';
export { countSentences };

export * from './textUtils';
export * from './wordConverter';
