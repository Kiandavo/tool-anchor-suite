
export interface DreamSymbol {
  symbol: string;
  meaning: string;
  category: string;
}

export const dreamSymbols: DreamSymbol[] = [
  { symbol: "آب", meaning: "احساسات، طهارت، یا تغییرات زندگی", category: "طبیعت" },
  { symbol: "پرواز", meaning: "آزادی، رهایی از محدودیت‌ها", category: "حرکت" },
  { symbol: "مار", meaning: "تغییر، تجدید، یا ترس پنهان", category: "حیوانات" },
  { symbol: "خانه", meaning: "امنیت، خانواده، یا وضعیت روحی", category: "مکان" },
  { symbol: "مرگ", meaning: "پایان یک دوره، تولدی دوباره", category: "زندگی" },
  { symbol: "ازدواج", meaning: "اتحاد، تعهد، یا تغییر در روابط", category: "روابط" },
  { symbol: "پول", meaning: "قدرت، ارزش شخصی، یا نگرانی مالی", category: "اجتماعی" },
  { symbol: "بچه", meaning: "بی‌گناهی، شروع تازه، یا مسئولیت", category: "انسان" },
  { symbol: "گل", meaning: "زیبایی، رشد، یا عشق", category: "طبیعت" },
  { symbol: "آتش", meaning: "اشتیاق، خشم، یا تطهیر", category: "عناصر" }
];

export const interpretationTemplates = [
  "این خواب نشان‌دهنده تمایل درونی شما برای {theme} است.",
  "خواب شما احتمالاً بازتابی از {emotion} فعلی شماست.",
  "این رویا ممکن است پیامی باشد که {advice}.",
  "خواب شما نشان می‌دهد که {insight}.",
  "این خواب می‌تواند راهنمایی برای {guidance} باشد."
];
