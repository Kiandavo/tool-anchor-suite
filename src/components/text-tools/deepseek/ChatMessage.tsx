
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
        className={`max-w-[85%] rounded-2xl p-4 shadow-sm transition-all duration-300 ${
          message.role === 'user' 
            ? 'bg-gradient-to-br from-primary/15 to-primary/5 text-gray-800 border border-primary/10' 
            : 'neo-glass text-gray-700 border border-white/40'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 hover:bg-slate-200/70 hover:text-primary transition-colors" 
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
