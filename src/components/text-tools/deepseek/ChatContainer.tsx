
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChatMessages from './ChatMessages';
import MessageInput from './MessageInput';
import SettingsControls from './SettingsControls';
import ApiKeySection from './ApiKeySection';
import ApiErrorAlert from './ApiErrorAlert';
import { Message } from './types';

interface ChatContainerProps {
  messages: Message[];
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
  apiKey: string;
  setApiKey: (key: string) => void;
  isSaved: boolean;
  setIsSaved: (saved: boolean) => void;
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
  startNewChat,
  apiKey,
  setApiKey,
  isSaved,
  setIsSaved
}) => {
  const setHasApiError = () => {}; // Placeholder for compatibility

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-right">
            هوش مصنوعی دیپ‌سیک
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* API Key Section */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <ApiKeySection
              apiKey={apiKey}
              setApiKey={setApiKey}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
              setHasApiError={setHasApiError}
            />
          </div>

          {/* Settings Controls */}
          <SettingsControls
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            temperature={temperature}
            setTemperature={setTemperature}
            contextLength={contextLength}
            setContextLength={setContextLength}
            startNewChat={startNewChat}
          />

          <Separator />

          {/* Error Alert */}
          {hasApiError && (
            <ApiErrorAlert
              message={apiErrorMessage}
              onRetry={handleRetryConnection}
            />
          )}

          {/* Chat Messages */}
          <ChatMessages messages={messages} isLoading={isLoading} />

          {/* Message Input */}
          <MessageInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            disabled={!isSaved || !apiKey.trim()}
            clearMessages={clearMessages}
            messagesLength={messages.length}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatContainer;
