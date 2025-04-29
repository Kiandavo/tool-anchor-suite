
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Thermometer, Layers } from "lucide-react";

interface SettingsControlsProps {
  temperature: number;
  setTemperature: (temp: number) => void;
  contextLength: number;
  setContextLength: (length: number) => void;
}

const SettingsControls: React.FC<SettingsControlsProps> = ({ 
  temperature, 
  setTemperature, 
  contextLength, 
  setContextLength 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 frost-glass p-4 rounded-xl shadow-inner">
      {/* Temperature Setting */}
      <div className="sm:w-1/2 space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
          <Thermometer className="h-3.5 w-3.5 text-primary/80" />
          خلاقیت (Temperature): {temperature.toFixed(1)}
        </label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={(values) => setTemperature(values[0])}
          className="py-1"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span className="text-blue-600 font-medium">دقیق</span>
          <span className="text-purple-600 font-medium">متعادل</span>
          <span className="text-pink-600 font-medium">خلاق</span>
        </div>
      </div>
      
      {/* Context Length Setting */}
      <div className="sm:w-1/2 space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
          <Layers className="h-3.5 w-3.5 text-primary/80" />
          طول حافظه: {contextLength} پیام
        </label>
        <Slider
          min={1}
          max={10}
          step={1}
          value={[contextLength]}
          onValueChange={(values) => setContextLength(values[0])}
          className="py-1"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span className="text-blue-600 font-medium">کوتاه</span>
          <span className="text-purple-600 font-medium">متوسط</span>
          <span className="text-pink-600 font-medium">بلند</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsControls;
