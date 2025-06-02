import { useState } from 'react';
import { toast } from "sonner";
import { Message } from '../types';
import { fetchDeepseekResponse, generateSimulatedResponse, buildMessageHistory } from '../api-service';

export function useDeepseekChat() {
  // Removed hardcoded API key for security - users must provide their own
  const [apiKey, setApiKey] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');
  const [retryAttempts, setRetryAttempts] = useState(0);
  const MAX_RETRY_ATTEMPTS = 3;

  // Load API key from session storage (more secure than localStorage)
  const loadApiKey = () => {
    const savedKey = sessionStorage.getItem('deepseek_api_key_temp');
    if (savedKey) {
      setApiKey(savedKey);
      return true;
    }
    return false;
  };

  const initializeWithWelcomeMessage = () => {
    setMessages([{
      role: 'assistant',
      content: 'سلام! من دستیار هوشمند AI هستم. برای استفاده از این سرویس، لطفاً ابتدا کلید API خود را وارد کنید.',
      timestamp: new Date()
    }]);
    loadApiKey(); // Try to load existing API key
  };

  const clearMessages = () => {
    initializeWithWelcomeMessage();
    toast.success('گفتگوی جدید آغاز شد');
  };

  const handleSendMessage = async (
    inputMessage: string, 
    selectedModel: string, 
    temperature: number, 
    contextLength: number
  ) => {
    if (!inputMessage.trim()) return;
    
    // Check if API key is available
    if (!apiKey.trim()) {
      toast.error('لطفاً ابتدا کلید API خود را وارد کنید');
      setHasApiError(true);
      setApiErrorMessage('کلید API مورد نیاز است');
      return;
    }
    
    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetryAttempts(0);
    
    await sendMessageToAPI(userMessage, selectedModel, temperature, contextLength);
  };
  
  const sendMessageToAPI = async (
    userMessage: Message, 
    selectedModel: string, 
    temperature: number, 
    contextLength: number, 
    isRetry = false
  ) => {
    try {
      let assistantResponse;

      try {
        console.log(`Sending message to API with model: ${selectedModel} (Attempt: ${retryAttempts + 1})`);
        const messageHistory = buildMessageHistory(messages, userMessage, contextLength);
        
        if (!navigator.onLine) {
          throw new Error('اتصال اینترنت برقرار نیست. لطفا اتصال خود را بررسی کنید.');
        }
        
        assistantResponse = await fetchDeepseekResponse(apiKey, messageHistory, selectedModel, temperature);
        
        setHasApiError(false);
        setApiErrorMessage('');
        
        console.log('Received successful response from API');
      } catch (error: any) {
        console.error('Error calling OpenRouter API:', error);
        
        if (retryAttempts < MAX_RETRY_ATTEMPTS && 
            (error.message.includes('اتصال به سرور') || 
             error.message.includes('Connection error') ||
             error.message.includes('Failed to fetch') ||
             error.message.includes('CORS'))) {
          setRetryAttempts(prev => prev + 1);
          
          toast.info(`تلاش مجدد برای اتصال... (${retryAttempts + 1}/${MAX_RETRY_ATTEMPTS})`);
          
          setTimeout(() => {
            sendMessageToAPI(userMessage, 
              retryAttempts === 1 ? 'google-gemini-flash' : 
                (retryAttempts === 2 ? 'deepseek-r1' : 'llama4-maverick'), 
              temperature, 
              contextLength, 
              true);
          }, 2000);
          
          return;
        }
        
        setHasApiError(true);
        setApiErrorMessage(error.message || 'خطا در ارتباط با سرور');
        
        assistantResponse = generateSimulatedResponse(userMessage.content);
        
        if (!isRetry) {
          if (error.message?.includes('CORS')) {
            toast.error('خطا در ارتباط با سرور: مشکل CORS. از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.');
          } else {
            toast.error('خطا در ارتباط با سرور. از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.');
          }
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in OpenRouter API:', error);
      toast.error('خطا در پردازش پاسخ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryConnection = (
    selectedModel: string, 
    temperature: number, 
    contextLength: number
  ) => {
    if (messages.length < 2) return;
    
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
    
    if (lastUserMessage) {
      setHasApiError(false);
      setApiErrorMessage('');
      setIsLoading(true);
      setRetryAttempts(0);
      
      const newMessages = [...messages];
      if (newMessages[newMessages.length - 1].role === 'assistant') {
        newMessages.pop();
      }
      setMessages(newMessages);
      
      const retryModel = selectedModel === 'deepseek-v3-base' ? 'google-gemini-flash' : 'deepseek-v3-base';
      
      setTimeout(() => {
        toast.info(`تلاش مجدد با مدل ${retryModel}...`);
        sendMessageToAPI(lastUserMessage, retryModel, temperature, contextLength, false);
      }, 500);
    }
  };

  return {
    messages,
    isLoading,
    hasApiError,
    apiErrorMessage,
    apiKey,
    setApiKey,
    handleSendMessage,
    handleRetryConnection,
    clearMessages,
    initializeWithWelcomeMessage
  };
}
