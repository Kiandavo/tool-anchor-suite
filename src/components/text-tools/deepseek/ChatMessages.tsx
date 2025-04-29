
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
      <ScrollArea className="h-[450px] p-4">
        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-4">
          <div className="mb-4 text-primary/60 bg-primary/5 p-4 rounded-full">
            <Sparkles className="h-10 w-10" />
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">به دیپ‌سیک چت خوش آمدید!</p>
          <p className="text-sm mt-1 max-w-md leading-relaxed">
            از هوش مصنوعی پیشرفته برای دریافت پاسخ سوالات خود بهره ببرید.
            سوال یا متن خود را بنویسید تا با قدرت هوش مصنوعی پاسخ دهیم.
          </p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[450px] p-4">
      <div className="space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="max-w-[85%] rounded-2xl p-4 bg-white shadow-sm border border-slate-200 text-gray-700">
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
