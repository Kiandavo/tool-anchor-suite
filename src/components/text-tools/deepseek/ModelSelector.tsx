
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
          <SelectItem value="deepseek-chat">DeepSeek Chat</SelectItem>
          <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
          <SelectItem value="mixtral-8x7b">Mixtral 8x7B</SelectItem>
          <SelectItem value="deepseek-llm-67b">DeepSeek LLM 67B</SelectItem>
          <SelectItem value="deepseek-chat-v2">DeepSeek Chat V2</SelectItem>
          <SelectItem value="deepseek-coder-v2">DeepSeek Coder V2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
