
import { toast } from 'sonner';

export const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateRandomEmoji = (): string => {
  const emojis = ['😀', '😂', '🥰', '😎', '🤩', '😊', '🥳', '😇', '🤗', '🌟', '🎉', '🎈', '🎸', '🌺', '🌈', '🍕', '🍦', '🎮', '🎨', '📚'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const rollDice = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

export const generateRandomWord = (): string => {
  const words = [
    'خورشید', 'ماه', 'ستاره', 'آسمان', 'دریا', 'کوه', 'جنگل', 'گل', 
    'پرنده', 'کتاب', 'قلم', 'موسیقی', 'رنگ', 'باران', 'برف', 'باد', 
    'رویا', 'امید', 'عشق', 'زندگی', 'لبخند', 'دوست', 'خانواده', 'سفر'
  ];
  return words[Math.floor(Math.random() * words.length)];
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("در حافظه کپی شد");
};
