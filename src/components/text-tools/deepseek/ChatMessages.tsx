
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader, Sparkles } from "lucide-react";
import { Message } from './types';
import ChatMessage from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <ScrollArea className="h-[400px] p-4">
        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-4">
          <Sparkles className="mb-2 text-primary/60" size={32} />
          <p className="text-sm">به دیپ‌سیک چت خوش آمدید!</p>
          <p className="text-xs mt-1">سوال یا متن خود را بنویسید تا با قدرت هوش مصنوعی پاسخ دهیم.</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-white border text-gray-700">
              <div className="flex items-center space-x-2">
                <Loader className="h-4 w-4 animate-spin ml-2" />
                <span className="text-sm">در حال نوشتن پاسخ...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
