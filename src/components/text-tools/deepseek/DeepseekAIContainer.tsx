
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Message, DeepseekSettings } from './types';
import ModelSelector from './ModelSelector';
import SettingsControls from './SettingsControls';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import ApiErrorAlert from './ApiErrorAlert';
import { fetchDeepseekResponse, generateSimulatedResponse, buildMessageHistory } from './api-service';

const DeepseekAIContainer: React.FC = () => {
  // Using the updated API key that's hidden from users
  const [apiKey] = useState<string>('sk-1d3b5417ac15458c9d2e2a5a1837883c');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-v3-base');
  const [temperature, setTemperature] = useState(0.7);
  const [contextLength, setContextLength] = useState(5);
  const [hasApiError, setHasApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');
  const [retryAttempts, setRetryAttempts] = useState(0);
  const MAX_RETRY_ATTEMPTS = 2;

  // Generate a unique session ID when the component mounts
  useEffect(() => {
    initializeWithWelcomeMessage();
  }, []);

  const initializeWithWelcomeMessage = () => {
    setMessages([{
      role: 'assistant',
      content: 'سلام! من دستیار هوشمند دیپ‌سیک هستم. چطور می‌توانم به شما کمک کنم؟',
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setRetryAttempts(0); // Reset retry attempts for new messages
    
    await sendMessageToAPI(userMessage);
  };
  
  const sendMessageToAPI = async (userMessage: Message, isRetry = false) => {
    try {
      let assistantResponse;

      try {
        const messageHistory = buildMessageHistory(messages, userMessage, contextLength);
        assistantResponse = await fetchDeepseekResponse(apiKey, messageHistory, selectedModel, temperature);
        
        // Reset error states on success
        setHasApiError(false);
        setApiErrorMessage('');
        
      } catch (error: any) {
        console.error('Error calling DeepseekAI API:', error);
        
        // Check if we should retry
        if (retryAttempts < MAX_RETRY_ATTEMPTS && error.message.includes('اتصال به سرور')) {
          setRetryAttempts(prev => prev + 1);
          
          // Show retry toast
          toast.info(`تلاش مجدد برای اتصال... (${retryAttempts + 1}/${MAX_RETRY_ATTEMPTS})`);
          
          // Wait a moment before retrying
          setTimeout(() => {
            sendMessageToAPI(userMessage, true);
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
      console.error('Error in DeepseekAI:', error);
      toast.error('خطا در پردازش پاسخ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryConnection = () => {
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
        sendMessageToAPI(lastUserMessage, false);
      }, 500);
      
      toast.info('تلاش مجدد برای اتصال به سرور...');
    }
  };

  const clearMessages = () => {
    initializeWithWelcomeMessage();
    toast.success('گفتگوی جدید آغاز شد');
  };

  const startNewChat = () => {
    clearMessages();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Settings Section */}
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-end gap-3">
                <div className="flex-1">
                  <button 
                    onClick={startNewChat}
                    className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    گفتگوی جدید
                  </button>
                </div>
                <ModelSelector 
                  selectedModel={selectedModel} 
                  setSelectedModel={setSelectedModel} 
                />
              </div>
              
              <SettingsControls 
                temperature={temperature} 
                setTemperature={setTemperature}
                contextLength={contextLength}
                setContextLength={setContextLength}
              />
            </div>
            
            {hasApiError && (
              <div className="bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg p-3 text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    اتصال به سرور با مشکل مواجه شده است. از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
                    {apiErrorMessage ? <div className="mt-1 text-xs">{apiErrorMessage}</div> : null}
                  </div>
                  <button 
                    onClick={handleRetryConnection}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  >
                    تلاش مجدد
                  </button>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="border rounded-lg bg-slate-50">
              <ChatMessages messages={messages} isLoading={isLoading} />
            </div>
            
            {/* Input Area */}
            <MessageInput 
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              clearMessages={clearMessages}
              isLoading={isLoading}
              messagesLength={messages.length}
            />
            
            <div className="text-xs text-center text-gray-500 pt-2">
              <p>این ابزار به صورت رایگان در اختیار شما قرار گرفته است</p>
              <p className="mt-1">برای شروع مجدد گفتگو از دکمه "گفتگوی جدید" استفاده کنید</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeepseekAIContainer;
