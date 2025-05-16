
export function generateRandomString(length: number = 10): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export function pickRandomFromList(items: string[]): string {
  if (!items.length) return "";
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export function generateRandomText(length: number = 50): string {
  // Generate random Latin text for the specified length
  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation"
  ];
  
  let result = "";
  while (result.length < length) {
    result += pickRandomFromList(words) + " ";
  }
  
  return result.trim().substring(0, length);
}

// Add the missing functions
export function generateLorem(paragraphs: number = 1, sentences: number = 5): string {
  const loremStart = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const loremWords = [
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
    "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat",
    "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit",
    "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];
  
  let result = paragraphs > 0 ? loremStart + " " : "";
  
  for (let p = 0; p < paragraphs; p++) {
    let sentenceCount = p === 0 ? sentences - 1 : sentences;
    
    for (let s = 0; s < sentenceCount; s++) {
      const sentenceLength = 5 + Math.floor(Math.random() * 15);
      let sentence = "";
      
      for (let w = 0; w < sentenceLength; w++) {
        sentence += loremWords[Math.floor(Math.random() * loremWords.length)] + " ";
      }
      
      result += sentence.trim() + ". ";
    }
    
    if (p < paragraphs - 1) {
      result += "\n\n";
    }
  }
  
  return result;
}

export function generatePlaceholderText(type: 'short' | 'medium' | 'long' = 'medium'): string {
  const lengths = {
    short: 1,
    medium: 3,
    long: 5
  };
  
  return generateLorem(lengths[type], 3 + Math.floor(Math.random() * 3));
}
