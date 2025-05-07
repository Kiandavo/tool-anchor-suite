
// Zodiac signs with Persian names and symbols
export const zodiacSigns = [
  { value: "aries", label: "فروردین (حمل)", symbol: "♈" },
  { value: "taurus", label: "اردیبهشت (ثور)", symbol: "♉" },
  { value: "gemini", label: "خرداد (جوزا)", symbol: "♊" },
  { value: "cancer", label: "تیر (سرطان)", symbol: "♋" },
  { value: "leo", label: "مرداد (اسد)", symbol: "♌" },
  { value: "virgo", label: "شهریور (سنبله)", symbol: "♍" },
  { value: "libra", label: "مهر (میزان)", symbol: "♎" },
  { value: "scorpio", label: "آبان (عقرب)", symbol: "♏" },
  { value: "sagittarius", label: "آذر (قوس)", symbol: "♐" },
  { value: "capricorn", label: "دی (جدی)", symbol: "♑" },
  { value: "aquarius", label: "بهمن (دلو)", symbol: "♒" },
  { value: "pisces", label: "اسفند (حوت)", symbol: "♓" }
];

// Types for prediction periods
export type PredictionType = "today" | "week" | "month";

// Key for session storage
export const HOROSCOPE_STATE_KEY = 'horoscope_state';

// Horoscope state interface
export interface HoroscopeState {
  selectedSign: string;
  predictionType: PredictionType;
  prediction: string;
  lastRefreshTime: number;
  lastPredictionId?: string; // Added for tracking unique predictions
}
