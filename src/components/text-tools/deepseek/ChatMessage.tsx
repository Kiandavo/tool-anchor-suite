
import React from 'react';
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('متن با موفقیت کپی شد'))
      .catch(() => toast.error('خطا در کپی کردن متن'));
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div 
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          message.role === 'user' 
            ? 'bg-primary/10 text-gray-800' 
            : 'bg-white border text-gray-700'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5" 
            onClick={() => copyToClipboard(message.content)}
          >
            <ClipboardCopy className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
