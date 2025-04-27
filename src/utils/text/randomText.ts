
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
