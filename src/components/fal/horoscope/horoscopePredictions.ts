import { PredictionType } from './horoscopeTypes';
import { 
  ariesPredictions, 
  taurusPredictions, 
  geminiPredictions,
  cancerPredictions,
  leoPredictions,
  virgoPredictions,
  libraPredictions,
  scorpioPredictions,
  sagittariusPredictions,
  capricornPredictions,
  aquariusPredictions,
  piscesPredictions
} from './expandedPredictions';
import { enhancedZodiacSigns, astrologicalHouses } from './advancedAstrology';

// Enhanced horoscope predictions for each sign with comprehensive details
export const horoscopePredictions: Record<string, Record<PredictionType, string[]>> = {
  aries: ariesPredictions,
  taurus: taurusPredictions,
  gemini: geminiPredictions,
  cancer: cancerPredictions,
  leo: leoPredictions,
  virgo: virgoPredictions,
  libra: libraPredictions,
  scorpio: scorpioPredictions,
  sagittarius: sagittariusPredictions,
  capricorn: capricornPredictions,
  aquarius: aquariusPredictions,
  pisces: piscesPredictions,
};
