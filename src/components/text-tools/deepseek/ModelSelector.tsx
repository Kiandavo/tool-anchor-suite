
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, setSelectedModel }) => {
  return (
    <div className="md:w-1/3">
      <label htmlFor="model" className="block text-xs font-medium text-gray-700 mb-1">
        انتخاب مدل
      </label>
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger>
          <SelectValue placeholder="انتخاب مدل" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="deepseek-v3-base">DeepSeek V3 0324 (free)</SelectItem>
          <SelectItem value="deepseek-r1">DeepSeek R1 (free)</SelectItem>
          <SelectItem value="google-gemini-flash">Google Gemini 2.0 Flash (free)</SelectItem>
          <SelectItem value="llama4-maverick">Llama 4 Maverick (free)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500 mt-1">قدرت گرفته از OpenRouter</p>
    </div>
  );
};

export default ModelSelector;
