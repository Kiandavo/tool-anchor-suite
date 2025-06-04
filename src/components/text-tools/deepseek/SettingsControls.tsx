
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Thermometer, Layers, Bot, RotateCcw } from "lucide-react";

interface SettingsControlsProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  contextLength: number;
  setContextLength: (length: number) => void;
  startNewChat: () => void;
}

const SettingsControls: React.FC<SettingsControlsProps> = ({
  selectedModel,
  setSelectedModel,
  temperature,
  setTemperature,
  contextLength,
  setContextLength,
  startNewChat
}) => {
  const models = [
    { value: 'deepseek-v3-base', label: 'DeepSeek V3 Base' },
    { value: 'deepseek-r1', label: 'DeepSeek R1' },
    { value: 'google-gemini-flash', label: 'Google Gemini Flash' },
    { value: 'llama4-maverick', label: 'Llama 4 Maverick' }
  ];

  return (
    <div className="space-y-4 neo-glass p-4 rounded-2xl bg-white/10 shadow-inner">
      {/* Model Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-4 w-4 ml-2 text-primary" />
            <span className="text-sm font-medium">مدل هوش مصنوعی</span>
          </div>
        </div>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب مدل" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Temperature Control */}
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

      {/* Context Length Control */}
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

      {/* New Chat Button */}
      <div className="pt-2">
        <Button
          onClick={startNewChat}
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2"
        >
          <RotateCcw size={16} />
          شروع گفتگوی جدید
        </Button>
      </div>
    </div>
  );
};

export default SettingsControls;
