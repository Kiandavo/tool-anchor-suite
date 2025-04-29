
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

export interface ApiErrorInfo {
  status?: number;
  message: string;
  recommendation?: string;
}

export interface DeepseekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }[];
}
