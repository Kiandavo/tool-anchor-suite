
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface DeepseekSettings {
  apiKey: string;
  selectedModel: string;
  temperature: number;
  contextLength: number;
}
