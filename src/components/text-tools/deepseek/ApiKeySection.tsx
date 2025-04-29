
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Trash } from "lucide-react";
import { toast } from "sonner";

interface ApiKeySectionProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  isSaved: boolean;
  setIsSaved: (saved: boolean) => void;
  setHasApiError: (hasError: boolean) => void;
}

const ApiKeySection: React.FC<ApiKeySectionProps> = ({ 
  apiKey, 
  setApiKey, 
  isSaved, 
  setIsSaved,
  setHasApiError
}) => {
  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('deepseek_api_key', apiKey.trim());
      setIsSaved(true);
      toast.success('کلید API ذخیره شد');
      setHasApiError(false);
    } else {
      toast.error('لطفا کلید API را وارد کنید');
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('deepseek_api_key');
    setApiKey('');
    setIsSaved(false);
    toast.success('کلید API حذف شد');
  };

  return (
    <div className="flex-1">
      <label htmlFor="apiKey" className="block text-xs font-medium text-gray-700 mb-1">
        کلید API دیپ‌سیک
      </label>
      <div className="flex gap-2">
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="flex-1"
        />
        {!isSaved ? (
          <Button onClick={saveApiKey} size="icon" variant="outline">
            <Key size={16} />
          </Button>
        ) : (
          <Button onClick={clearApiKey} size="icon" variant="outline" className="text-red-500">
            <Trash size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApiKeySection;
