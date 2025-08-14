
import { type HoroscopeState, HOROSCOPE_STATE_KEY } from './horoscopeTypes';
import { secureSessionStorage } from '@/utils/security/secureStorage';

// Validator for horoscope state
const validateHoroscopeState = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  // Allow only expected keys
  const allowedKeys = ['selectedSign', 'lastGenerated', 'cachedHoroscope'];
  const keys = Object.keys(data);
  return keys.every(key => allowedKeys.includes(key));
};

// Load horoscope state from session storage
export const loadHoroscopeState = (): Partial<HoroscopeState> => {
  const parsedState = secureSessionStorage.getItem(
    HOROSCOPE_STATE_KEY, 
    {}, 
    validateHoroscopeState
  );
  
  if (Object.keys(parsedState).length > 0) {
    console.log("Loaded horoscope state from session storage:", parsedState);
  }
  
  return parsedState;
};

// Save horoscope state to session storage
export const saveHoroscopeState = (state: Partial<HoroscopeState>): void => {
  if (state.selectedSign) {
    console.log("Saving horoscope state to session storage:", state);
    const success = secureSessionStorage.setItem(HOROSCOPE_STATE_KEY, state);
    if (!success) {
      console.warn("Failed to save horoscope state to session storage");
    }
  }
};
