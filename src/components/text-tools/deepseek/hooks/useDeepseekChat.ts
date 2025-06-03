
import { useState } from 'react';
import { toast } from "sonner";
import { Message } from '../types';
import { fetchDeepseekResponse, generateSimulatedResponse, buildMessageHistory } from '../api-service';

export function useDeepseekChat() {
  // Using a default OpenRouter API key, but will allow users to input their own for better reliability
  const [apiKey] = useState<string>('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');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');
  const [retryAttempts, setRetryAttempts] = useState(0);
  const MAX_RETRY_ATTEMPTS = 3;

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

  const handleSendMessage = async (
    inputMessage: string, 
    selectedModel: string, 
    temperature: number, 
    contextLength: number
  ) => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRetryAttempts(0); // Reset retry attempts for new messages
    
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
             error.message.includes('Failed to fetch') ||
             error.message.includes('CORS'))) {
          setRetryAttempts(prev => prev + 1);
          
          // Show retry toast
          toast.info(`تلاش مجدد برای اتصال... (${retryAttempts + 1}/${MAX_RETRY_ATTEMPTS})`);
          
          // Wait a moment before retrying
          setTimeout(() => {
            sendMessageToAPI(userMessage, 
              // Try different models on each retry attempt
              retryAttempts === 1 ? 'google-gemini-flash' : 
                (retryAttempts === 2 ? 'deepseek-r1' : 'llama4-maverick'), 
              temperature, 
              contextLength, 
              true);
          }, 2000);
          
          return; // Exit without setting the message
        }
        
        // If we're out of retries or it's not a connection error, use fallback
        setHasApiError(true);
        setApiErrorMessage(error.message || 'خطا در ارتباط با سرور');
        
        // Fall back to simulation if real API fails
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
    if (messages.length < 2) return; // Need at least one user message to retry
    
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
    
    if (lastUserMessage) {
      setHasApiError(false); // Reset error state
      setApiErrorMessage('');
      setIsLoading(true);
      setRetryAttempts(0); // Reset retry attempts
      
      // Remove the last assistant message if it exists
      const newMessages = [...messages];
      if (newMessages[newMessages.length - 1].role === 'assistant') {
        newMessages.pop();
      }
      setMessages(newMessages);
      
      // Try with a different model on retry
      const retryModel = selectedModel === 'deepseek-v3-base' ? 'google-gemini-flash' : 'deepseek-v3-base';
      
      // Retry sending the message
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
    handleSendMessage,
    handleRetryConnection,
    clearMessages,
    initializeWithWelcomeMessage
  };
}
