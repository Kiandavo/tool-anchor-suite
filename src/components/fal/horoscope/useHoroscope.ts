
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { type PredictionType } from './horoscopeTypes';
import { zodiacSigns } from './horoscopeTypes';
import { loadHoroscopeState, saveHoroscopeState } from './horoscopeStorage';
import { generateHoroscopePrediction, copyHoroscope as copyHoroscopeText, getZodiacSymbol } from './horoscopeUtils';

export { zodiacSigns };
export type { PredictionType };

export const useHoroscope = () => {
  const [selectedSign, setSelectedSign] = useState<string>("");
  const [predictionType, setPredictionType] = useState<PredictionType>("today");
  const [prediction, setPrediction] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

  // Load state from session storage on initial render
  useEffect(() => {
    const savedState = loadHoroscopeState();
    if (savedState.selectedSign) setSelectedSign(savedState.selectedSign);
    if (savedState.predictionType) setPredictionType(savedState.predictionType as PredictionType);
    if (savedState.prediction) setPrediction(savedState.prediction);
    if (savedState.lastRefreshTime) setLastRefreshTime(savedState.lastRefreshTime);
  }, []);

  // Save state to session storage when it changes
  useEffect(() => {
    saveHoroscopeState({ 
      selectedSign, 
      predictionType, 
      prediction, 
      lastRefreshTime 
    });
  }, [selectedSign, predictionType, prediction, lastRefreshTime]);

  // Handle sign selection
  const handleSetSelectedSign = (sign: string) => {
    console.log("Setting selected sign to:", sign);
    setSelectedSign(sign);
    
    // Clear prediction when sign changes
    setPrediction("");
  };
  
  // Handle prediction type selection
  const handleSetPredictionType = (type: PredictionType) => {
    console.log("Setting prediction type to:", type);
    setPredictionType(type);
    
    // Clear prediction when type changes
    setPrediction("");
    
    // If we have a sign selected, automatically get a new horoscope
    if (selectedSign) {
      getHoroscope();
    }
  };

  const getHoroscope = () => {
    if (!selectedSign) {
      toast.error("لطفاً نشان ماه تولد خود را انتخاب کنید");
      return;
    }

    setIsAnimating(true);
    console.log("Getting horoscope for sign:", selectedSign, "with prediction type:", predictionType);
    
    // Simulate horoscope generation with a delay
    setTimeout(() => {
      const generatedPrediction = generateHoroscopePrediction(selectedSign, predictionType);
      
      if (!generatedPrediction) {
        setIsAnimating(false);
        return;
      }
      
      // Update state with the new prediction
      setLastRefreshTime(Date.now());
      setPrediction(generatedPrediction);
      setIsAnimating(false);
      toast.success("طالع بینی انجام شد!");
    }, 1000);
  };

  const copyHoroscope = () => {
    copyHoroscopeText(selectedSign, prediction);
  };
  
  // Get the symbol for the selected sign
  const selectedZodiacSymbol = getZodiacSymbol(selectedSign);

  return {
    selectedSign,
    setSelectedSign: handleSetSelectedSign,
    predictionType,
    setPredictionType: handleSetPredictionType,
    prediction,
    isAnimating,
    selectedZodiacSymbol,
    getHoroscope,
    copyHoroscope,
    lastRefreshTime
  };
};
