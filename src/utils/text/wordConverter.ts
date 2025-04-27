
import { characterMappings } from './finglishMappings';
import { noDuplicationChars } from './persianCharacterRules';
import { finglishWordDatabase } from './finglishWordDatabase';

export function convertWord(word: string): string {
  // First check in the word database
  if (finglishWordDatabase[word.toLowerCase()]) {
    return finglishWordDatabase[word.toLowerCase()];
  }
  
  // If not found in database, convert character by character
  let converted = '';
  let i = 0;
  let lastChar = '';
  const lowerWord = word.toLowerCase();
  
  while (i < lowerWord.length) {
    // Try special ending patterns like -am, -at, -ash
    if (i >= lowerWord.length - 3) {
      const ending = lowerWord.substring(i);
      if (characterMappings[`-${ending}`]) {
        converted += characterMappings[`-${ending}`];
        break;
      }
    }
    
    // Try three-char combinations
    if (i < lowerWord.length - 2) {
      const threeChars = lowerWord.substring(i, i + 3);
      if (characterMappings[threeChars]) {
        const persianChar = characterMappings[threeChars];
        if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
          converted += persianChar;
          lastChar = persianChar;
        }
        i += 3;
        continue;
      }
    }
    
    // Try two-char combinations
    if (i < lowerWord.length - 1) {
      const twoChars = lowerWord.substring(i, i + 2);
      if (characterMappings[twoChars]) {
        const persianChar = characterMappings[twoChars];
        if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
          converted += persianChar;
          lastChar = persianChar;
        }
        i += 2;
        continue;
      }
    }
    
    // Single character conversion
    const char = lowerWord[i];
    if (characterMappings[char]) {
      const persianChar = characterMappings[char];
      if (!noDuplicationChars.has(persianChar) || persianChar !== lastChar) {
        converted += persianChar;
        lastChar = persianChar;
      }
    } else {
      converted += char;
      lastChar = char;
    }
    i++;
  }
  
  // Handle special cases for Persian vowel harmony
  converted = postProcessWord(converted);
  
  return converted;
}

function postProcessWord(word: string): string {
  // Add proper ZWNJ (Zero-Width Non-Joiner) between certain characters
  let processed = word;
  
  // Add ZWNJ after می at the beginning of verbs
  processed = processed.replace(/^می([^ ])/g, 'می‌$1');
  
  // Add ZWNJ after نمی at the beginning of verbs
  processed = processed.replace(/^نمی([^ ])/g, 'نمی‌$1');
  
  // Add ZWNJ between ها and the word it's attached to
  processed = processed.replace(/([^ ])ها([^ ]|$)/g, '$1‌ها$2');
  
  // Add proper spacing for possessive endings
  processed = processed.replace(/([^ ])ام([^ ]|$)/g, '$1‌ام$2');
  processed = processed.replace(/([^ ])ات([^ ]|$)/g, '$1‌ات$2');
  processed = processed.replace(/([^ ])اش([^ ]|$)/g, '$1‌اش$2');
  
  // Fix common mistake of placing ی alone after words with ه ending
  processed = processed.replace(/ه ی /g, 'ه‌ی ');
  
  return processed;
}
