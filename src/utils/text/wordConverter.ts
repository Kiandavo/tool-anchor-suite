
import { characterMappings } from './finglishMappings';
import { noDuplicationChars } from './persianCharacterRules';
import { finglishWordDatabase } from './finglishWordDatabase';

export function convertWord(word: string): string {
  // First check in the word database
  if (finglishWordDatabase[word]) {
    return finglishWordDatabase[word];
  }
  
  // If not found in database, convert character by character
  let converted = '';
  let i = 0;
  let lastChar = '';
  
  while (i < word.length) {
    // Try two-char combinations first
    if (i < word.length - 1) {
      const twoChars = word.substring(i, i + 2);
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
    const char = word[i];
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
  
  return converted;
}
