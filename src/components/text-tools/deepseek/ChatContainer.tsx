
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ModelSelector from './ModelSelector';
import SettingsControls from './SettingsControls';
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import ApiErrorAlert from './ApiErrorAlert';

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
              <ApiErrorAlert
                hasApiError={hasApiError}
                errorMessage={apiErrorMessage}
                onRetry={handleRetryConnection}
              />
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

export default ChatContainer;
