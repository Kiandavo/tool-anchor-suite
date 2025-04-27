
import { finglishWordDatabase } from './finglishWordDatabase';
import { postProcessingRules } from './persianCharacterRules';
import { convertWord } from './wordConverter';

export function finglishToPersian(finglish: string): string {
  if (!finglish || !finglish.trim()) return '';
  
  // Normalize input
  finglish = finglish.toLowerCase().trim();
  
  // Try to convert phrases first (exact matches from the database)
  for (const phrase in finglishWordDatabase) {
    if (finglish === phrase) {
      return finglishWordDatabase[phrase];
    }
  }
  
  // Try to convert common multi-word phrases
  for (const phrase in finglishWordDatabase) {
    if (phrase.includes(' ') && finglish.includes(phrase)) {
      finglish = finglish.replace(new RegExp(phrase, 'g'), finglishWordDatabase[phrase]);
    }
  }
  
  // Split into words
  const words = finglish.split(/\s+/);
  
  // Check for multi-word phrases in the database first
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = 2; j <= Math.min(5, words.length - i); j++) {
      const phrase = words.slice(i, i + j).join(' ');
      if (finglishWordDatabase[phrase]) {
        // Replace the phrase words with the Persian equivalent
        words.splice(i, j, finglishWordDatabase[phrase]);
      }
    }
  }
  
  // Process individual words if they're not part of phrases
  const result = words.map(word => {
    // Skip if already in Persian (might have been replaced by a phrase above)
    if (/[\u0600-\u06FF]/.test(word)) {
      return word;
    }
    return convertWord(word);
  });
  
  let output = result.join(' ');
  
  // Apply post-processing rules
  for (const rule of postProcessingRules) {
    output = output.replace(rule.pattern, rule.replacement);
  }
  
  return output;
}
