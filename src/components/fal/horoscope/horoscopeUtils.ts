
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { zodiacSigns } from './horoscopeTypes';
import { horoscopePredictions } from './horoscopePredictions';
import { PredictionType } from './horoscopeTypes';

// Get a horoscope prediction based on sign and prediction type
export const generateHoroscopePrediction = (
  selectedSign: string, 
  predictionType: PredictionType
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
  
  // Use the current timestamp as our source of randomness
  const now = Date.now();
  
  // Use a combination of the current time and sign to generate a pseudo-random index
  // This ensures we get different results even on quick successive clicks
  const seed = now + selectedSign.charCodeAt(0) + predictionType.length;
  const randomIndex = Math.floor(Math.abs(Math.sin(seed)) * predictions.length);
  
  const selectedPrediction = predictions[randomIndex % predictions.length];
  console.log("Selected prediction index:", randomIndex, "Prediction:", selectedPrediction);
  
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
