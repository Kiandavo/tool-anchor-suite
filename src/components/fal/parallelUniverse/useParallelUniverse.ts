
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { copyToClipboard } from "@/utils/copyUtils";
import { 
  UniverseCategory, 
  ParallelUniverseData,
  alternativeTimelineData,
  fantasyData,
  historicalData,
  cosmicData,
  technologicalData
} from './universeTypes';

// Keys for session storage
const UNIVERSE_STATE_KEY = 'parallel_universe_state';

export const useParallelUniverse = () => {
  const [universeCategory, setUniverseCategory] = useState<UniverseCategory>('alternative-timeline');
  const [universeData, setUniverseData] = useState<ParallelUniverseData>({
    title: '',
    identity: '',
    description: '',
    traits: [],
    specialNote: '',
    probability: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  
  useEffect(() => {
    // Check if we have previously generated universe data
    const storedState = sessionStorage.getItem(UNIVERSE_STATE_KEY);
    if (storedState) {
      try {
        const { category, data, generated } = JSON.parse(storedState);
        
        if (category) {
          setUniverseCategory(category);
        }
        
        if (data && Object.keys(data).length > 0) {
          setUniverseData(data);
        }
        
        if (generated) {
          setIsGenerated(true);
        }
      } catch (e) {
        console.error("Error parsing stored universe state", e);
      }
    }
  }, []);
  
  // Save state when it changes
  useEffect(() => {
    if (isGenerated) {
      const stateToSave = {
        category: universeCategory,
        data: universeData,
        generated: isGenerated
      };
      sessionStorage.setItem(UNIVERSE_STATE_KEY, JSON.stringify(stateToSave));
    }
  }, [universeCategory, universeData, isGenerated]);

  const generateUniverse = () => {
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      let dataArray: ParallelUniverseData[] = [];
      
      // Select the appropriate data based on the universe category
      switch (universeCategory) {
        case 'alternative-timeline':
          dataArray = alternativeTimelineData;
          break;
        case 'fantasy':
          dataArray = fantasyData;
          break;
        case 'historical':
          dataArray = historicalData;
          break;
        case 'cosmic':
          dataArray = cosmicData;
          break;
        case 'technological':
          dataArray = technologicalData;
          break;
      }
      
      // Select a random universe from the array
      const randomIndex = Math.floor(Math.random() * dataArray.length);
      const selectedUniverse = dataArray[randomIndex];
      
      setUniverseData(selectedUniverse);
      setIsGenerated(true);
      setIsLoading(false);
      
      toast.success("نسخه موازی شما کشف شد!");
    }, 1500);
  };

  const copyUniverse = () => {
    if (isGenerated) {
      const universeText = `جهان موازی: ${universeData.title}\n\nهویت شما: ${universeData.identity}\n\nتوضیحات: ${universeData.description}\n\nویژگی‌های شما:\n${universeData.traits.map(trait => `- ${trait}`).join('\n')}\n\nنکته ویژه: ${universeData.specialNote}\n\nاحتمال وجود: ${universeData.probability}%`;
      
      copyToClipboard(universeText);
      toast.success("اطلاعات جهان موازی کپی شد!");
    }
  };

  return {
    universeCategory,
    universeData,
    isLoading,
    isGenerated,
    setUniverseCategory,
    generateUniverse,
    copyUniverse
  };
};
