import { useState, useCallback } from 'react';
import { shahnameVerses, ShahnameVerse } from '@/data/shahname-verses';
import { toast } from 'sonner';

export const useShahnameReading = () => {
  const [verse, SetVerse] = useState<ShahnameVerse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasNewReading, setHasNewReading] = useState(false);
  const [showIntention, setShowIntention] = useState(true);
  const [hasSetIntention, setHasSetIntention] = useState(false);

  const prepareForReading = useCallback(() => {
    setShowIntention(false);
    setHasSetIntention(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  }, []);

  const getShahnameVerse = useCallback(() => {
    setIsLoading(true);
    setIsAnimating(true);
    setHasNewReading(false);

    // Simulate API delay for better UX
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * shahnameVerses.length);
      const selectedVerse = shahnameVerses[randomIndex];
      
      SetVerse(selectedVerse);
      setIsLoading(false);
      setHasNewReading(true);
      
      // Animation effect
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }, 2000);
  }, []);

  const copyReading = useCallback(() => {
    if (!verse) return;

    const readingText = `
🏛️ راهنمایی از شاهنامه فردوسی 🏛️

📜 ${verse.title}
👑 شخصیت: ${verse.character}
🏺 دوره: ${verse.era}

📖 متن:
${verse.text}

🌟 ترجمه:
${verse.translation}

💎 تفسیر:
${verse.interpretation}

✨ English Interpretation:
${verse.interpretationEn}

📚 منبع: ${verse.source}

🔗 ایجاد شده با ابزارهای فال و طالع‌بینی
    `.trim();

    navigator.clipboard.writeText(readingText).then(() => {
      toast.success('راهنمایی شاهنامه کپی شد!');
    }).catch(() => {
      toast.error('خطا در کپی کردن');
    });
  }, [verse]);

  const resetReading = useCallback(() => {
    SetVerse(null);
    setShowIntention(true);
    setHasSetIntention(false);
    setIsAnimating(false);
    setHasNewReading(false);
  }, []);

  return {
    verse,
    isLoading,
    isAnimating,
    hasNewReading,
    showIntention,
    hasSetIntention,
    prepareForReading,
    getShahnameVerse,
    copyReading,
    resetReading
  };
};