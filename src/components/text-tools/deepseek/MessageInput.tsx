
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Trash, Loader } from "lucide-react";
import { toast } from "sonner";

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
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <Textarea
          placeholder="پیامتان را اینجا بنویسید..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="min-h-[60px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button 
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          size="icon"
        >
          {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Send size={18} />}
        </Button>
        <Button 
          onClick={clearMessages}
          variant="outline" 
          size="icon"
          className="text-gray-500"
          disabled={messagesLength <= 1 || isLoading}
          title="شروع گفتگوی جدید"
        >
          <Trash size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
