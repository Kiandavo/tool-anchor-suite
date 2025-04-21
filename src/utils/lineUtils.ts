
export function reverseText(text: string): string {
  return text.split('').reverse().join('');
}
export function removeDuplicateLines(text: string): string {
  const lines = text.split('\n');
  const uniqueLines = [...new Set(lines)];
  return uniqueLines.join('\n');
}
export function sortLines(text: string, ascending = true): string {
  const lines = text.split('\n');
  const sortedLines = lines.sort((a, b) =>
    ascending ? a.localeCompare(b) : b.localeCompare(a)
  );
  return sortedLines.join('\n');
}
export function trimLines(text: string): string {
  const lines = text.split('\n');
  const trimmedLines = lines.map(line => line.trim());
  return trimmedLines.join('\n');
}
export function removeEmptyLines(text: string): string {
  const lines = text.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  return nonEmptyLines.join('\n');
}
