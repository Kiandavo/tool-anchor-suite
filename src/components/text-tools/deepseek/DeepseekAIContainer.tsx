
import React, { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';
import { useDeepseekChat } from './hooks/useDeepseekChat';

const DeepseekAIContainer: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('deepseek-v3-base');
  const [temperature, setTemperature] = useState(0.7);
  const [contextLength, setContextLength] = useState(5);
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  
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

  // Load saved API key on component mount
  useEffect(() => {
    try {
      // Check sessionStorage first, then localStorage for backward compatibility
      const savedKey = sessionStorage.getItem('deepseek_api_key') || 
                       localStorage.getItem('deepseek_api_key');
      
      if (savedKey) {
        setApiKey(savedKey);
        setIsSaved(true);
        
        // Migrate from localStorage to sessionStorage if needed
        if (localStorage.getItem('deepseek_api_key') && !sessionStorage.getItem('deepseek_api_key')) {
          sessionStorage.setItem('deepseek_api_key', savedKey);
          localStorage.removeItem('deepseek_api_key');
        }
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  }, []);

  // Initialize with welcome message when component mounts
  useEffect(() => {
    initializeWithWelcomeMessage();
  }, []);

  const handleSendMessageClick = () => {
    if (!apiKey.trim()) {
      return; // This will be handled by the validation in the hook
    }
    
    handleSendMessage(inputMessage, selectedModel, temperature, contextLength, apiKey);
    setInputMessage('');
  };

  const handleRetryConnectionClick = () => {
    if (!apiKey.trim()) {
      return;
    }
    
    handleRetryConnection(selectedModel, temperature, contextLength, apiKey);
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
      apiKey={apiKey}
      setApiKey={setApiKey}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
    />
  );
};

export default DeepseekAIContainer;
