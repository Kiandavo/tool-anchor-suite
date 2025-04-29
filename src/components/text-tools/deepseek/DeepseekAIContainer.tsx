
import React, { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import { useDeepseekChat } from './hooks/useDeepseekChat';

const DeepseekAIContainer: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('deepseek-v3-base');
  const [temperature, setTemperature] = useState(0.7);
  const [contextLength, setContextLength] = useState(5);
  
  const {
    messages,
    isLoading,
    hasApiError,
    apiErrorMessage,
    handleSendMessage,
    handleRetryConnection,
    clearMessages,
    initializeWithWelcomeMessage
  } = useDeepseekChat();

  // Initialize with welcome message when component mounts
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
