
import { useState } from 'react';
import { toast } from "sonner";
import { Message } from '../types';
import { fetchDeepseekResponse, generateSimulatedResponse, buildMessageHistory } from '../api-service';

export function useDeepseekChat() {
  const [apiKey] = useState<string>('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');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');
  const [retryAttempts, setRetryAttempts] = useState(0);
  const MAX_RETRY_ATTEMPTS = 2;

  const initializeWithWelcomeMessage = () => {
    setMessages([{
      role: 'assistant',
      content: 'سلام! من دستیار هوشمند گوگل جمینای هستم. چطور می‌توانم به شما کمک کنم؟',
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
        const messageHistory = buildMessageHistory(messages, userMessage, contextLength);
        assistantResponse = await fetchDeepseekResponse(apiKey, messageHistory, selectedModel, temperature);
        
        // Reset error states on success
        setHasApiError(false);
        setApiErrorMessage('');
        
      } catch (error: any) {
        console.error('Error calling Gemini API:', error);
        
        // Check if we should retry
        if (retryAttempts < MAX_RETRY_ATTEMPTS && error.message.includes('اتصال به سرور')) {
          setRetryAttempts(prev => prev + 1);
          
          // Show retry toast
          toast.info(`تلاش مجدد برای اتصال... (${retryAttempts + 1}/${MAX_RETRY_ATTEMPTS})`);
          
          // Wait a moment before retrying
          setTimeout(() => {
            sendMessageToAPI(userMessage, selectedModel, temperature, contextLength, true);
          }, 2000);
          
          return; // Exit without setting the message
        }
        
        // If we're out of retries or it's not a connection error, use fallback
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
      console.error('Error in Gemini API:', error);
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
      
      // Retry sending the message
      setTimeout(() => {
        sendMessageToAPI(lastUserMessage, selectedModel, temperature, contextLength, false);
      }, 500);
      
      toast.info('تلاش مجدد برای اتصال به سرور...');
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
