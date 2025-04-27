
// Text utilities

// Count words in text
export const calculateWordCount = (text: string): number => {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
};

// Count characters in text
export const calculateCharacterCount = (text: string): number => {
  return text.length;
};

// Convert text to uppercase
export const convertToUppercase = (text: string): string => {
  return text.toUpperCase();
};

// Convert text to lowercase
export const convertToLowercase = (text: string): string => {
  return text.toLowerCase();
};

// Capitalize first letter of each word
export const capitalizeText = (text: string): string => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Reverse text
export const reverseText = (text: string): string => {
  return text.split('').reverse().join('');
};

// Remove extra spaces
export const removeExtraSpaces = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};

// Generate random text
export const generateRandomText = (wordCount: number): string => {
  const words = [
    'لورم', 'ایپسوم', 'متن', 'ساختگی', 'با', 'تولید', 'سادگی', 'نامفهوم',
    'از', 'صنعت', 'چاپ', 'طراحی', 'گرافیک', 'چاپگرها', 'متون', 'بلکه',
    'روزنامه', 'مجله', 'در', 'ستون', 'سطر', 'آینده', 'کاربردهای', 'متنوع',
    'مورد', 'نیاز', 'زمان', 'پیوسته', 'اهل', 'دنیای', 'موجود', 'و'
  ];
  const result = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    result.push(words[randomIndex]);
  }
  return result.join(' ');
};

// Replace text
export const replaceText = (text: string, oldText: string, newText: string): string => {
  if (!oldText) return text;
  return text.split(oldText).join(newText);
};

// Extract emails from text
export const extractEmails = (text: string): string[] => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailRegex) || [];
};

// Extract URLs from text
export const extractUrls = (text: string): string[] => {
  const urlRegex = /https?:\/\/[^\s]+/g;
  return text.match(urlRegex) || [];
};

// Count sentences in text
export const countSentences = (text: string): number => {
  if (!text.trim()) return 0;
  return text.split(/[.!?]+/).filter(Boolean).length;
};

// Remove HTML tags from text
export const removeHtmlTags = (text: string): string => {
  return text.replace(/<[^>]*>/g, '');
};

// Convert text to slug format
export const slugifyText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

// Censor specific words in text
export const censorText = (text: string, badWords: string[]): string => {
  if (badWords.length === 0) return text;
  let censoredText = text;
  badWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    censoredText = censoredText.replace(regex, '*'.repeat(word.length));
  });
  return censoredText;
};

// Wrap text at specified length
export const wordWrap = (text: string, maxLength: number): string => {
  if (!text) return '';
  const regex = new RegExp(`.{1,${maxLength}}`, 'g');
  return text.match(regex)?.join('\n') || text;
};

// Convert text to binary
export const textToBinary = (text: string): string => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
};

// Convert binary to text
export const binaryToText = (binary: string): string => {
  return binary
    .split(' ')
    .map(bin => String.fromCharCode(parseInt(bin, 2)))
    .join('');
};

// Remove accents from text
export const removeAccents = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// HTML encode text
export const htmlEncode = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// HTML decode text
export const htmlDecode = (text: string): string => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

// Find and replace text
export const findAndReplace = (text: string, find: string, replace: string): string => {
  if (!find) return text;
  const regex = new RegExp(find, 'g');
  return text.replace(regex, replace);
};

// Convert Persian numbers to English
export const persianNumberToEnglish = (text: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return text.replace(/[۰-۹]/g, match => persianDigits.indexOf(match).toString());
};

// Convert English numbers to Persian
export const englishNumberToPersian = (text: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return text.replace(/\d/g, match => persianDigits[parseInt(match)]);
};

// Remove non-Persian characters
export const removeNonPersianCharacters = (text: string): string => {
  return text.replace(/[^\u0600-\u06FF\s]/g, '');
};

// Normalize Persian text
export const normalizePersianText = (text: string): string => {
  // Replace Arabic Kaf with Persian Kaf
  let normalized = text.replace(/ك/g, 'ک');
  // Replace Arabic Yeh with Persian Yeh
  normalized = normalized.replace(/ي/g, 'ی');
  // Standardize spaces
  normalized = normalized.replace(/\s+/g, ' ');
  // Add proper ZWNJ (Zero-Width Non-Joiner)
  normalized = normalized.replace(/\s?\u200C\s?/g, '\u200C');
  return normalized;
};

// Generate Lorem Ipsum text
export const generateLoremIpsum = (wordCount: number): string => {
  const loremIpsum = "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد";
  const words = loremIpsum.split(' ');
  let result = '';
  
  for (let i = 0; i < wordCount; i++) {
    result += words[i % words.length] + ' ';
  }
  
  return result.trim();
};
