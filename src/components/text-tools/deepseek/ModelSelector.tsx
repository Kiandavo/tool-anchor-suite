
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot } from "lucide-react";

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, setSelectedModel }) => {
  return (
    <div className="md:w-1/3">
      <label htmlFor="model" className="block text-xs font-medium text-gray-700 mb-1 icon-text-sm">
        <Bot className="h-3.5 w-3.5 text-primary/80" />
        انتخاب مدل هوش مصنوعی
      </label>
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger className="glass-effect rounded-xl bg-white/60 border-slate-200/70 shadow-sm">
          <SelectValue placeholder="انتخاب مدل" />
        </SelectTrigger>
        <SelectContent className="rounded-xl glass-effect">
          <SelectItem value="deepseek-v3-base">DeepSeek V3 0324 (free)</SelectItem>
          <SelectItem value="deepseek-r1">DeepSeek R1 (free)</SelectItem>
          <SelectItem value="google-gemini-flash">Google Gemini 2.0 Flash (free)</SelectItem>
          <SelectItem value="llama4-maverick">Llama 4 Maverick (free)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500 mt-1 text-left ltr:pl-1">Powered by OpenRouter</p>
    </div>
  );
};

export default ModelSelector;
