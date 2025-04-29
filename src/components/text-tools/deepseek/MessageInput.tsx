
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Trash, Loader } from "lucide-react";

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  clearMessages: () => void;
  isLoading: boolean;
  messagesLength: number;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  clearMessages,
  isLoading,
  messagesLength
}) => {
  return (
    <div className="flex gap-2 relative">
      <div className="flex-1 relative">
        <Textarea
          placeholder="پیامتان را اینجا بنویسید..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="min-h-[80px] pr-4 pl-12 py-3 resize-none shadow-sm text-base focus-visible:ring-primary rounded-xl"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (inputMessage.trim()) handleSendMessage();
            }
          }}
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          size="icon"
          className="absolute bottom-3 left-3 h-8 w-8 bg-primary hover:bg-primary/90 shadow-md"
        >
          {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Send size={16} />}
        </Button>
      </div>
      <Button 
        onClick={clearMessages}
        variant="outline" 
        size="icon"
        className="text-gray-500 h-auto aspect-square shadow-sm hover:bg-red-50 hover:text-red-500 hover:border-red-200"
        disabled={messagesLength <= 1 || isLoading}
        title="شروع گفتگوی جدید"
      >
        <Trash size={18} />
      </Button>
    </div>
  );
};

export default MessageInput;
