
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Message, DeepseekSettings } from './types';
import ModelSelector from './ModelSelector';
import SettingsControls from './SettingsControls';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { fetchDeepseekResponse, generateSimulatedResponse, buildMessageHistory } from './api-service';

const DeepseekAIContainer: React.FC = () => {
  // Using a fixed API key that's hidden from users
  const [apiKey] = useState<string>('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');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-chat-v2');
  const [temperature, setTemperature] = useState(0.7);
  const [contextLength, setContextLength] = useState(5);
  const [hasApiError, setHasApiError] = useState(false);

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

    try {
      let assistantResponse;

      try {
        const messageHistory = buildMessageHistory(messages, userMessage, contextLength);
        assistantResponse = await fetchDeepseekResponse(apiKey, messageHistory, selectedModel, temperature);
        setHasApiError(false);
      } catch (error: any) {
        console.error('Error calling DeepseekAI API:', error);
        setHasApiError(true);
        
        // Fall back to simulation if real API fails
        assistantResponse = generateSimulatedResponse(inputMessage);
        toast.error('خطا در ارتباط با سرور. از پاسخ شبیه‌سازی شده استفاده شد.');
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
                اتصال به سرور با مشکل مواجه شده است. از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
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
