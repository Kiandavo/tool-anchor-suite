
import { finglishWordDatabase } from './finglishWordDatabase';
import { postProcessingRules } from './persianCharacterRules';
import { convertWord } from './wordConverter';

export function finglishToPersian(finglish: string): string {
  if (!finglish || !finglish.trim()) return '';
  
  // Normalize input
  finglish = finglish.toLowerCase().trim();
  
  // Split into words
  const words = finglish.split(/\s+/);
  
  // Try to convert the entire phrase first
  const phraseKey = words.join(' ');
  if (finglishWordDatabase[phraseKey]) {
    return finglishWordDatabase[phraseKey];
  }
  
  // Convert each word
  const result = words.map(convertWord);
  
  let output = result.join(' ');
  
  // Apply post-processing rules
  for (const rule of postProcessingRules) {
    output = output.replace(rule.pattern, rule.replacement);
  }
  
  return output;
}
