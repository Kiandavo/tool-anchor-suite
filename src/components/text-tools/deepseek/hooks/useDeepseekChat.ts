
import { useState } from 'react';
import { toast } from "sonner";
import { Message } from '../types';
import { fetchDeepseekResponse, generateSimulatedResponse, buildMessageHistory } from '../api-service';

export function useDeepseekChat() {
  // Remove hardcoded API key - now requires user input
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');
  const [retryAttempts, setRetryAttempts] = useState(0);
  const MAX_RETRY_ATTEMPTS = 2; // Reduced retry attempts

  const initializeWithWelcomeMessage = () => {
    setMessages([{
      role: 'assistant',
      content: 'سلام! من دستیار هوشمند AI هستم. چطور می‌توانم به شما کمک کنم؟',
      timestamp: new Date()
    }]);
  };

  const clearMessages = () => {
    initializeWithWelcomeMessage();
    toast.success('گفتگوی جدید آغاز شد');
  };

  const validateApiKey = (apiKey: string): boolean => {
    // Basic API key validation
    if (!apiKey || apiKey.trim().length === 0) {
      return false;
    }
    
    // Check for OpenRouter API key format
    if (!apiKey.startsWith('sk-or-v1-')) {
      return false;
    }
    
    // Basic length check
    if (apiKey.length < 20) {
      return false;
    }
    
    return true;
  };

  const sanitizeInput = (input: string): string => {
    // Basic input sanitization
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
  };

  const handleSendMessage = async (
    inputMessage: string, 
    selectedModel: string, 
    temperature: number, 
    contextLength: number,
    userApiKey: string
  ) => {
    const sanitizedInput = sanitizeInput(inputMessage);
    
    if (!sanitizedInput.trim()) {
      toast.error('لطفا پیام خود را وارد کنید');
      return;
    }
    
    if (!validateApiKey(userApiKey)) {
      toast.error('لطفا کلید API معتبر وارد کنید');
      setHasApiError(true);
      setApiErrorMessage('کلید API نامعتبر است');
      return;
    }
    
    const userMessage: Message = {
      role: 'user',
      content: sanitizedInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetryAttempts(0);
    
    await sendMessageToAPI(userMessage, selectedModel, temperature, contextLength, userApiKey);
  };
  
  const sendMessageToAPI = async (
    userMessage: Message, 
    selectedModel: string, 
    temperature: number, 
    contextLength: number,
    apiKey: string,
    isRetry = false
  ) => {
    try {
      let assistantResponse;

      try {
        console.log(`Sending message to API with model: ${selectedModel} (Attempt: ${retryAttempts + 1})`);
        const messageHistory = buildMessageHistory(messages, userMessage, contextLength);
        
        // Check internet connectivity
        if (!navigator.onLine) {
          throw new Error('اتصال اینترنت برقرار نیست. لطفا اتصال خود را بررسی کنید.');
        }
        
        assistantResponse = await fetchDeepseekResponse(apiKey, messageHistory, selectedModel, temperature);
        
        // Reset error states on success
        setHasApiError(false);
        setApiErrorMessage('');
        
        console.log('Received successful response from API');
      } catch (error: any) {
        console.error('Error calling OpenRouter API:', error);
        
        // Check if we should retry
        if (retryAttempts < MAX_RETRY_ATTEMPTS && 
            (error.message.includes('اتصال به سرور') || 
             error.message.includes('Connection error') ||
             error.message.includes('Failed to fetch'))) {
          setRetryAttempts(prev => prev + 1);
          
          toast.info(`تلاش مجدد برای اتصال... (${retryAttempts + 1}/${MAX_RETRY_ATTEMPTS})`);
          
          setTimeout(() => {
            sendMessageToAPI(userMessage, selectedModel, temperature, contextLength, apiKey, true);
          }, 2000);
          
          return;
        }
        
        setHasApiError(true);
        setApiErrorMessage(error.message || 'خطا در ارتباط با سرور');
        
        // Fall back to simulation if real API fails
        assistantResponse = generateSimulatedResponse(userMessage.content);
        
        if (!isRetry) {
          toast.error('خطا در ارتباط با سرور. از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.');
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
    contextLength: number,
    apiKey: string
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
      
      setTimeout(() => {
        toast.info('تلاش مجدد...');
        sendMessageToAPI(lastUserMessage, selectedModel, temperature, contextLength, apiKey, false);
      }, 500);
    }
  };

  return {
    messages,
    isLoading,
    hasApiError,
    apiErrorMessage,
    handleSendMessage,
    handleRetryConnection,
    clearMessages,
    initializeWithWelcomeMessage
  };
}
