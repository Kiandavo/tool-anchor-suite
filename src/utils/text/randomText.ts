
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
