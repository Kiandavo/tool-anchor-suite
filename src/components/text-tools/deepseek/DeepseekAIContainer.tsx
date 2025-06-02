
import React, { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import SecureApiKeyInput from './SecureApiKeyInput';
import { useDeepseekChat } from './hooks/useDeepseekChat';

const DeepseekAIContainer: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('deepseek-v3-base');
  const [temperature, setTemperature] = useState(0.7);
  const [contextLength, setContextLength] = useState(5);
  const [hasValidApiKey, setHasValidApiKey] = useState(false);
  
  const {
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
  } = useDeepseekChat();

  useEffect(() => {
    initializeWithWelcomeMessage();
  }, []);

  const handleSendMessageClick = () => {
    handleSendMessage(inputMessage, selectedModel, temperature, contextLength);
    setInputMessage('');
  };

  const handleRetryConnectionClick = () => {
    handleRetryConnection(selectedModel, temperature, contextLength);
  };

  const startNewChat = () => {
    clearMessages();
  };

  // Show API key input if no valid key is available
  if (!hasValidApiKey) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">تنظیم کلید API</h2>
          <p className="text-gray-600 mb-6">
            برای استفاده از هوش مصنوعی دیپ‌سیک، لطفاً کلید API اپن‌روتر خود را وارد کنید.
          </p>
          <SecureApiKeyInput
            apiKey={apiKey}
            setApiKey={setApiKey}
            onApiKeyChange={setHasValidApiKey}
          />
        </div>
      </div>
    );
  }

  return (
    <ChatContainer
      messages={messages}
      isLoading={isLoading}
      hasApiError={hasApiError}
      apiErrorMessage={apiErrorMessage}
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      selectedModel={selectedModel}
      setSelectedModel={setSelectedModel}
      temperature={temperature}
      setTemperature={setTemperature}
      contextLength={contextLength}
      setContextLength={setContextLength}
      handleSendMessage={handleSendMessageClick}
      handleRetryConnection={handleRetryConnectionClick}
      clearMessages={clearMessages}
      startNewChat={startNewChat}
    />
  );
};

export default DeepseekAIContainer;
