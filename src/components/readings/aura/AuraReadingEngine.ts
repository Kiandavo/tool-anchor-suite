
import { AuraColor, auraColors } from './AuraDatabase';

export interface AuraReadingResult {
  primaryColor: AuraColor;
  secondaryColor: AuraColor;
  energy: number;
  spiritualLevel: number;
  advice: string;
}

export class AuraReadingEngine {
  static generateReading(name: string, birthDate?: string): AuraReadingResult {
    const nameHash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const dateHash = birthDate ? new Date(birthDate).getTime() : Date.now();
    
    const primaryIndex = (nameHash + dateHash) % auraColors.length;
    let secondaryIndex = (nameHash * 2 + dateHash) % auraColors.length;
    
    // Ensure secondary is different from primary
    if (secondaryIndex === primaryIndex) {
      secondaryIndex = (secondaryIndex + 1) % auraColors.length;
    }

    const energy = 70 + (nameHash % 30);
    const spiritualLevel = 60 + ((nameHash + dateHash) % 40);

    const adviceTemplates = [
      "امروز روز مناسبی برای تمرکز بر انرژی درونی است.",
      "ارتباط با طبیعت به شما کمک خواهد کرد.",
      "به شهود خود اعتماد کنید و تصمیمات مهم بگیرید.",
      "زمان مناسبی برای شروع پروژه‌های جدید است.",
      "بر روی روابط شخصی خود کار کنید."
    ];

    return {
      primaryColor: auraColors[primaryIndex],
      secondaryColor: auraColors[secondaryIndex],
      energy,
      spiritualLevel,
      advice: adviceTemplates[nameHash % adviceTemplates.length]
    };
  }
}
