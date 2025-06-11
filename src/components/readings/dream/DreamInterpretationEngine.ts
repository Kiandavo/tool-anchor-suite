
import { DreamSymbol, dreamSymbols, interpretationTemplates } from './DreamSymbolsDatabase';

export interface DreamInterpretationResult {
  summary: string;
  symbols: DreamSymbol[];
  advice: string;
  spiritual: string;
}

export class DreamInterpretationEngine {
  static generateInterpretation(dreamText: string): DreamInterpretationResult {
    // Find relevant symbols
    const foundSymbols = dreamSymbols.filter(symbol => 
      dreamText.includes(symbol.symbol)
    );

    // Add some random symbols if none found
    if (foundSymbols.length === 0) {
      foundSymbols.push(
        dreamSymbols[Math.floor(Math.random() * dreamSymbols.length)],
        dreamSymbols[Math.floor(Math.random() * dreamSymbols.length)]
      );
    }

    // Generate interpretation
    const themes = ["رشد شخصی", "حل مسائل", "یافتن هدف", "بهبود روابط", "موفقیت"];
    const emotions = ["امید", "نگرانی", "انتظار", "تغییر", "آرامش"];
    const adviceList = ["به درون خود نگاه کنید", "صبور باشید", "تصمیم مهمی بگیرید", "به احساساتتان اعتماد کنید"];
    
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];

    const template = interpretationTemplates[Math.floor(Math.random() * interpretationTemplates.length)];
    
    const summary = template
      .replace('{theme}', randomTheme)
      .replace('{emotion}', randomEmotion)
      .replace('{advice}', randomAdvice)
      .replace('{insight}', `در حال عبور از دوره‌ای از ${randomEmotion} هستید`)
      .replace('{guidance}', `${randomTheme} در زندگی`);

    return {
      summary,
      symbols: foundSymbols.slice(0, 3),
      advice: `توصیه می‌شود که ${randomAdvice} و بر روی ${randomTheme} تمرکز کنید.`,
      spiritual: `از نظر معنوی، این خواب نشان‌دهنده ارتباط عمیق‌تر شما با ${randomEmotion} درونی است.`
    };
  }
}
