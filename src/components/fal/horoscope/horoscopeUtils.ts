
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { zodiacSigns } from './horoscopeTypes';
import { horoscopePredictions } from './horoscopePredictions';
import { PredictionType } from './horoscopeTypes';

// Store previously shown predictions to avoid repetition in the same session
const shownPredictions: Record<string, number[]> = {};

// Get a horoscope prediction based on sign and prediction type
export const generateHoroscopePrediction = (
  selectedSign: string, 
  predictionType: PredictionType,
  forceNew: boolean = false
): string => {
  if (!selectedSign) {
    toast.error("لطفاً نشان ماه تولد خود را انتخاب کنید");
    return "";
  }
  
  // Access the correct predictions array based on the prediction type
  const predictions = horoscopePredictions[selectedSign]?.[predictionType] || [];
  
  if (predictions.length === 0) {
    toast.error("متأسفانه پیش‌بینی برای این ماه تولد در دسترس نیست");
    return "";
  }

  // Create key for tracking shown predictions
  const trackingKey = `${selectedSign}-${predictionType}`;
  
  // Initialize tracking array if it doesn't exist
  if (!shownPredictions[trackingKey]) {
    shownPredictions[trackingKey] = [];
  }
  
  // If all predictions have been shown, reset the array
  if (shownPredictions[trackingKey].length >= predictions.length || forceNew) {
    shownPredictions[trackingKey] = [];
  }
  
  // Get predictions that haven't been shown yet
  const availablePredictions = predictions.filter((_, index) => 
    !shownPredictions[trackingKey].includes(index)
  );
  
  // Use the current timestamp + date info as our source of randomness
  const now = Date.now();
  const today = new Date();
  const dateValue = today.getDate() + today.getMonth() * 31;
  
  // Create a more unique seed based on date, sign and prediction type
  const seed = now + dateValue + selectedSign.charCodeAt(0) + predictionType.length;
  
  let selectedIndex: number;
  let selectedPrediction: string;
  
  if (availablePredictions.length > 0) {
    // Get a random prediction from available ones
    selectedIndex = Math.floor(Math.abs(Math.sin(seed)) * availablePredictions.length);
    selectedPrediction = availablePredictions[selectedIndex % availablePredictions.length];
    
    // Find the original index in the full predictions array
    const originalIndex = predictions.indexOf(selectedPrediction);
    shownPredictions[trackingKey].push(originalIndex);
  } else {
    // This is a fallback that shouldn't normally happen
    selectedIndex = Math.floor(Math.abs(Math.sin(seed)) * predictions.length);
    selectedPrediction = predictions[selectedIndex % predictions.length];
  }
  
  console.log("Selected prediction index:", selectedIndex, "Prediction:", selectedPrediction);
  
  let predictionPrefix = "";
  switch(predictionType) {
    case "week":
      predictionPrefix = "در این هفته: ";
      break;
    case "month":
      predictionPrefix = "در این ماه: ";
      break;
    default:
      predictionPrefix = "امروز: ";
  }
  
  const finalPrediction = predictionPrefix + selectedPrediction;
  console.log("Final prediction:", finalPrediction);
  return finalPrediction;
};

// Copy horoscope text to clipboard
export const copyHoroscope = (selectedSign: string, prediction: string): void => {
  if (prediction) {
    const signInfo = selectedSign ? zodiacSigns.find(sign => sign.value === selectedSign) : null;
    const textToCopy = `${signInfo ? `${signInfo.label} ${signInfo.symbol}` : ''}\n\n${prediction}`;
    console.log("Copying horoscope:", textToCopy);
    copyToClipboard(textToCopy);
    toast.success("طالع کپی شد!");
  }
};

// Get the symbol for a zodiac sign
export const getZodiacSymbol = (selectedSign: string): string => {
  return selectedSign ? 
    zodiacSigns.find(sign => sign.value === selectedSign)?.symbol || "" : 
    "";
};
