
import React from 'react';

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
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Temperature Setting */}
      <div className="sm:w-1/2">
        <label htmlFor="temperature" className="block text-xs font-medium text-gray-700 mb-1">
          خلاقیت (Temperature): {temperature.toFixed(1)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>دقیق</span>
          <span>متعادل</span>
          <span>خلاق</span>
        </div>
      </div>
      
      {/* Context Length Setting */}
      <div className="sm:w-1/2">
        <label htmlFor="context" className="block text-xs font-medium text-gray-700 mb-1">
          طول حافظه: {contextLength} پیام
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={contextLength}
          onChange={(e) => setContextLength(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>کوتاه</span>
          <span>متوسط</span>
          <span>بلند</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsControls;
