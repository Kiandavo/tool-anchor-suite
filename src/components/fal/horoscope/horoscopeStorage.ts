
import { type HoroscopeState, HOROSCOPE_STATE_KEY } from './horoscopeTypes';

// Load horoscope state from session storage
export const loadHoroscopeState = (): Partial<HoroscopeState> => {
  const savedState = sessionStorage.getItem(HOROSCOPE_STATE_KEY);
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState);
      console.log("Loaded horoscope state from session storage:", parsedState);
      return parsedState;
    } catch (e) {
      console.error("Error parsing horoscope state:", e);
    }
  }
  return {};
};

// Save horoscope state to session storage
export const saveHoroscopeState = (state: Partial<HoroscopeState>): void => {
  if (state.selectedSign) {
    console.log("Saving horoscope state to session storage:", state);
    sessionStorage.setItem(HOROSCOPE_STATE_KEY, JSON.stringify(state));
  }
};
