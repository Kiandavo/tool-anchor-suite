
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
    <div className="space-y-4 neo-glass p-4 rounded-2xl bg-white/10 shadow-inner">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer className="h-4 w-4 ml-2 text-primary" />
            <span className="text-sm font-medium">دمای پاسخ</span>
          </div>
          <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
            {temperature.toFixed(1)}
          </span>
        </div>
        <Slider
          value={[temperature]}
          min={0}
          max={1}
          step={0.1}
          onValueChange={(value) => setTemperature(value[0])}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>دقیق</span>
          <span>خلاقانه</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Layers className="h-4 w-4 ml-2 text-primary" />
            <span className="text-sm font-medium">طول متن</span>
          </div>
          <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
            {contextLength}
          </span>
        </div>
        <Slider
          value={[contextLength]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => setContextLength(value[0])}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>کوتاه</span>
          <span>بلند</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsControls;
