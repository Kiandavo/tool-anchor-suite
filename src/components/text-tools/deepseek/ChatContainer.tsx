
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ModelSelector from './ModelSelector';
import SettingsControls from './SettingsControls';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import ApiErrorAlert from './ApiErrorAlert';
import { Sparkles } from 'lucide-react';

interface ChatContainerProps {
  messages: any[];
  isLoading: boolean;
  hasApiError: boolean;
  apiErrorMessage: string;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  contextLength: number;
  setContextLength: (length: number) => void;
  handleSendMessage: () => void;
  handleRetryConnection: () => void;
  clearMessages: () => void;
  startNewChat: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading,
  hasApiError,
  apiErrorMessage,
  inputMessage,
  setInputMessage,
  selectedModel,
  setSelectedModel,
  temperature,
  setTemperature,
  contextLength,
  setContextLength,
  handleSendMessage,
  handleRetryConnection,
  clearMessages,
  startNewChat
}) => {
  return (
    <div className="space-y-4">
      <Card className="glass-card border-purple-100/20 bg-gradient-to-br from-[#F2FCE2]/30 to-[#F7FDF0]/30 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Header with Title */}
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-2xl font-bold title-gradient">دستیار هوش مصنوعی دیپ‌سیک</h2>
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
            </div>
            
            {/* Settings Section */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-end gap-3">
                <div className="flex-1">
                  <button 
                    onClick={startNewChat}
                    className="vibrant-button inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300"
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
              <ApiErrorAlert
                hasApiError={hasApiError}
                errorMessage={apiErrorMessage}
                onRetry={handleRetryConnection}
              />
            )}

            {/* Messages Area */}
            <div className="neo-glass rounded-3xl bg-white/50 shadow-inner">
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
            
            <div className="text-xs text-center text-gray-500 pt-2 frost-glass rounded-xl p-3">
              <p>این ابزار به صورت رایگان در اختیار شما قرار گرفته است</p>
              <p className="mt-1">برای شروع مجدد گفتگو از دکمه "گفتگوی جدید" استفاده کنید</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatContainer;
