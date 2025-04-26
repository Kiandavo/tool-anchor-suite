
interface QuoteCategory {
  id: string;
  name: string;
  nameEn: string;
  quotes: string[];
}

export const quoteCategories: QuoteCategory[] = [
  {
    id: "motivation",
    name: "انگیزشی",
    nameEn: "Motivational",
    quotes: [
      "بزرگترین لذت زندگی انجام دادن کاری است که دیگران می‌گویند نمی‌توانی انجام دهی.",
      "موفقیت یعنی از شکست به شکست رفتن بدون از دست دادن اشتیاق.",
      "زندگی آن چیزی نیست که برایت اتفاق می‌افتد، بلکه آن چیزی است که تو خلقش می‌کنی.",
      "تنها راه انجام کارهای بزرگ، عشق به آن کار است.",
      "هر کس که جرأت کند، پیروز می‌شود.",
      "مهم نیست چقدر آهسته می‌روی، تا زمانی که متوقف نشوی."
    ]
  },
  {
    id: "wisdom",
    name: "خردمندانه",
    nameEn: "Wisdom",
    quotes: [
      "دانش بدون عمل مانند درخت بدون میوه است.",
      "خردمند کسی است که از اشتباهات دیگران درس می‌گیرد.",
      "بزرگترین دشمن دانش، نه نادانی، بلکه توهم دانستن است.",
      "هر که بامش بیش، برفش بیشتر.",
      "هر سخن جایی و هر نکته مکانی دارد.",
      "از کوزه همان برون تراود که در اوست."
    ]
  },
  {
    id: "success",
    name: "موفقیت",
    nameEn: "Success",
    quotes: [
      "بهترین راه پیش‌بینی آینده، ساختن آن است.",
      "هر شکست، درسی برای موفقیت است.",
      "زندگی یا یک ماجراجویی جسورانه است یا هیچ.",
      "رویاهایت را دنبال کن، آنها می‌دانند راه را.",
      "موفقیت در جزئیات نهفته است.",
      "پیروزی از آن کسی است که بیشترین پشتکار را دارد."
    ]
  }
];

export function getRandomQuote(categoryId?: string): string {
  if (categoryId) {
    const category = quoteCategories.find(cat => cat.id === categoryId);
    if (category) {
      return category.quotes[Math.floor(Math.random() * category.quotes.length)];
    }
  }
  // If no category is specified or category not found, pick from all quotes
  const allQuotes = quoteCategories.flatMap(cat => cat.quotes);
  return allQuotes[Math.floor(Math.random() * allQuotes.length)];
}
