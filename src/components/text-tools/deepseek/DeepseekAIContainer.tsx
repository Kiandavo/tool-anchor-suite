
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Message, DeepseekSettings } from './types';
import ApiKeySection from './ApiKeySection';
import ModelSelector from './ModelSelector';
import SettingsControls from './SettingsControls';
import ApiErrorAlert from './ApiErrorAlert';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import { fetchDeepseekResponse, generateSimulatedResponse, buildMessageHistory } from './api-service';

const DeepseekAIContainer: React.FC = () => {
  // Set the default API key to the provided one
  const [apiKey, setApiKey] = useState<string>('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');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-chat');
  const [temperature, setTemperature] = useState(0.7);
  const [contextLength, setContextLength] = useState(5);
  const [isSaved, setIsSaved] = useState(true); // Set to true as we now have a default API key
  const [hasApiError, setHasApiError] = useState(false);

  // Load API key and messages from localStorage when component mounts
  useEffect(() => {
    const savedApiKey = localStorage.getItem('deepseek_api_key');
    const savedMessages = localStorage.getItem('deepseek_messages');
    
    // If there's a saved API key, use it, otherwise use the default one
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      // Save our default API key to localStorage
      localStorage.setItem('deepseek_api_key', apiKey);
    }
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const processedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(processedMessages);
      } catch (e) {
        console.error('Error parsing saved messages', e);
        initializeWithWelcomeMessage();
      }
    } else {
      initializeWithWelcomeMessage();
    }
  }, []);

  const initializeWithWelcomeMessage = () => {
    setMessages([{
      role: 'assistant',
      content: 'سلام! من دستیار هوشمند دیپ‌سیک هستم. چطور می‌توانم به شما کمک کنم؟',
      timestamp: new Date()
    }]);
  };

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('deepseek_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!apiKey) {
      toast.error('لطفا ابتدا کلید API را وارد و ذخیره کنید');
      return;
    }

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

      if (apiKey.startsWith('sk-')) {
        try {
          const messageHistory = buildMessageHistory(messages, userMessage, contextLength);
          assistantResponse = await fetchDeepseekResponse(apiKey, messageHistory, selectedModel, temperature);
          setHasApiError(false);
        } catch (error: any) {
          console.error('Error calling DeepseekAI API:', error);
          setHasApiError(true);
          toast.error(error.message || 'خطا در ارتباط با API دیپ‌سیک');
          
          // Fall back to simulation if real API fails
          assistantResponse = generateSimulatedResponse(inputMessage);
          toast.error('از پاسخ شبیه‌سازی شده استفاده شد.');
        }
      } else {
        // Simulation mode with slightly delayed response for realism
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        assistantResponse = generateSimulatedResponse(inputMessage);
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
    setMessages([{
      role: 'assistant',
      content: 'سلام! من دستیار هوشمند دیپ‌سیک هستم. چطور می‌توانم به شما کمک کنم؟',
      timestamp: new Date()
    }]);
    localStorage.removeItem('deepseek_messages');
    toast.success('تاریخچه گفتگو پاک شد');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Settings Section */}
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-end gap-3">
                <ApiKeySection 
                  apiKey={apiKey} 
                  setApiKey={setApiKey} 
                  isSaved={isSaved} 
                  setIsSaved={setIsSaved}
                  setHasApiError={setHasApiError}
                />
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
            
            <ApiErrorAlert hasApiError={hasApiError} />

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
              <p>توجه: برای استفاده از این ابزار، نیاز به کلید API اختصاصی از سایت دیپ‌سیک دارید.</p>
              <p className="mt-1">داده‌های ارسالی شما ممکن است توسط دیپ‌سیک ذخیره شود.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeepseekAIContainer;
