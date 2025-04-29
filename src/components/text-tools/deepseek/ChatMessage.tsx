
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
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
    >
      <div 
        className={`max-w-[85%] rounded-2xl p-4 ${
          message.role === 'user' 
            ? 'bg-primary/15 text-gray-800' 
            : 'bg-white shadow-sm border border-slate-200 text-gray-700'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 hover:bg-slate-200/70 hover:text-primary" 
            onClick={() => copyToClipboard(message.content)}
            title="کپی متن"
          >
            <ClipboardCopy className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
