
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Trash, Eye, EyeOff, AlertTriangle } from "lucide-react";
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
  const [showApiKey, setShowApiKey] = useState(false);
  const [keyError, setKeyError] = useState<string>('');

  const validateApiKey = (key: string): { isValid: boolean; error?: string } => {
    if (!key || key.trim().length === 0) {
      return { isValid: false, error: 'کلید API نمی‌تواند خالی باشد' };
    }
    
    if (!key.startsWith('sk-or-v1-')) {
      return { isValid: false, error: 'کلید API باید با sk-or-v1- شروع شود' };
    }
    
    if (key.length < 30) {
      return { isValid: false, error: 'کلید API خیلی کوتاه است' };
    }
    
    if (key.length > 200) {
      return { isValid: false, error: 'کلید API خیلی طولانی است' };
    }
    
    // Check for suspicious patterns
    if (key.includes(' ') || key.includes('\n') || key.includes('\t')) {
      return { isValid: false, error: 'کلید API نباید شامل فاصله یا کاراکترهای خاص باشد' };
    }
    
    return { isValid: true };
  };

  const handleApiKeyChange = (value: string) => {
    // Sanitize input
    const sanitizedValue = value.trim().replace(/\s+/g, '');
    setApiKey(sanitizedValue);
    
    if (sanitizedValue) {
      const validation = validateApiKey(sanitizedValue);
      if (!validation.isValid) {
        setKeyError(validation.error || '');
      } else {
        setKeyError('');
      }
    } else {
      setKeyError('');
    }
  };

  const saveApiKey = () => {
    const validation = validateApiKey(apiKey);
    
    if (!validation.isValid) {
      setKeyError(validation.error || 'کلید API نامعتبر است');
      toast.error(validation.error || 'کلید API نامعتبر است');
      return;
    }

    try {
      // Use sessionStorage instead of localStorage for better security
      sessionStorage.setItem('deepseek_api_key', apiKey);
      setIsSaved(true);
      setKeyError('');
      toast.success('کلید API ذخیره شد');
      setHasApiError(false);
    } catch (error) {
      toast.error('خطا در ذخیره کلید API');
    }
  };

  const clearApiKey = () => {
    try {
      sessionStorage.removeItem('deepseek_api_key');
      localStorage.removeItem('deepseek_api_key'); // Also clear from localStorage if exists
      setApiKey('');
      setIsSaved(false);
      setKeyError('');
      toast.success('کلید API حذف شد');
    } catch (error) {
      toast.error('خطا در حذف کلید API');
    }
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <div className="flex-1">
      <label htmlFor="apiKey" className="block text-xs font-medium text-gray-700 mb-1">
        کلید API دیپ‌سیک (OpenRouter)
      </label>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="apiKey"
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="sk-or-v1-..."
              className={`pr-10 ${keyError ? 'border-red-500' : ''}`}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={toggleApiKeyVisibility}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          {!isSaved ? (
            <Button 
              onClick={saveApiKey} 
              size="icon" 
              variant="outline"
              disabled={!!keyError || !apiKey.trim()}
            >
              <Key size={16} />
            </Button>
          ) : (
            <Button onClick={clearApiKey} size="icon" variant="outline" className="text-red-500">
              <Trash size={16} />
            </Button>
          )}
        </div>
        
        {keyError && (
          <div className="flex items-center gap-1 text-red-500 text-xs">
            <AlertTriangle size={12} />
            <span>{keyError}</span>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          برای دریافت کلید API، از <a 
            href="https://openrouter.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            OpenRouter.ai
          </a> دیدن کنید
        </div>
      </div>
    </div>
  );
};

export default ApiKeySection;
