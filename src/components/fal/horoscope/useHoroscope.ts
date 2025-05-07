
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
  const [lastPredictionId, setLastPredictionId] = useState<string>("");

  // Load state from session storage on initial render
  useEffect(() => {
    const savedState = loadHoroscopeState();
    if (savedState.selectedSign) setSelectedSign(savedState.selectedSign);
    if (savedState.predictionType) setPredictionType(savedState.predictionType as PredictionType);
    if (savedState.prediction) setPrediction(savedState.prediction);
    if (savedState.lastRefreshTime) setLastRefreshTime(savedState.lastRefreshTime);
    if (savedState.lastPredictionId) setLastPredictionId(savedState.lastPredictionId);
  }, []);

  // Save state to session storage when it changes
  useEffect(() => {
    saveHoroscopeState({ 
      selectedSign, 
      predictionType, 
      prediction, 
      lastRefreshTime,
      lastPredictionId 
    });
  }, [selectedSign, predictionType, prediction, lastRefreshTime, lastPredictionId]);

  // Handle sign selection
  const handleSetSelectedSign = (sign: string) => {
    console.log("Setting selected sign to:", sign);
    setSelectedSign(sign);
    
    // Clear prediction when sign changes
    setPrediction("");
    setLastPredictionId("");
  };
  
  // Handle prediction type selection
  const handleSetPredictionType = (type: PredictionType) => {
    console.log("Setting prediction type to:", type);
    // Only update if the type has changed
    if (type !== predictionType) {
      setPredictionType(type);
      
      // Clear prediction when type changes
      setPrediction("");
      setLastPredictionId("");
      
      // If we have a sign selected, automatically get a new horoscope
      if (selectedSign) {
        // Small delay to ensure state update
        setTimeout(() => {
          getHoroscope();
        }, 100);
      }
    }
  };

  const getHoroscope = () => {
    if (!selectedSign) {
      toast.error("لطفاً نشان ماه تولد خود را انتخاب کنید");
      return;
    }

    setIsAnimating(true);
    console.log("Getting horoscope for sign:", selectedSign, "with prediction type:", predictionType);
    
    // Generate a unique prediction ID for this session
    const predictionSessionId = `${selectedSign}-${predictionType}-${new Date().toDateString()}`;
    
    // Simulate horoscope generation with a delay
    setTimeout(() => {
      const generatedPrediction = generateHoroscopePrediction(
        selectedSign, 
        predictionType, 
        predictionSessionId !== lastPredictionId // force new prediction if date/type/sign changed
      );
      
      if (!generatedPrediction) {
        setIsAnimating(false);
        return;
      }
      
      // Update state with the new prediction
      setLastRefreshTime(Date.now());
      setLastPredictionId(predictionSessionId);
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
