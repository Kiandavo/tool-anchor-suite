
import React from 'react';
import DeepseekAIContainer from './deepseek/DeepseekAIContainer';

export const DeepseekAI = () => {
  // Clear any stored messages from localStorage when component mounts
  React.useEffect(() => {
    localStorage.removeItem('deepseek_messages');
  }, []);
  
  return <DeepseekAIContainer />;
};

export default DeepseekAI;
