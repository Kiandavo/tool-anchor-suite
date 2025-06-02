
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Trash, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SecureApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onApiKeyChange?: (hasKey: boolean) => void;
}

const SecureApiKeyInput: React.FC<SecureApiKeyInputProps> = ({ 
  apiKey, 
  setApiKey,
  onApiKeyChange
}) => {
  const [tempKey, setTempKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mask API key for display (show only last 4 characters)
  const getMaskedKey = (key: string) => {
    if (key.length < 8) return key;
    return '*'.repeat(key.length - 4) + key.slice(-4);
  };

  // Load API key from session storage on component mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem('deepseek_api_key_temp');
    if (savedKey) {
      setApiKey(savedKey);
      setTempKey(savedKey);
      setIsSaved(true);
      onApiKeyChange?.(true);
    }
  }, [setApiKey, onApiKeyChange]);

  // Auto-clear API key when browser/tab closes
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('deepseek_api_key_temp');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const validateApiKey = (key: string): boolean => {
    // Basic validation for OpenRouter API keys
    if (!key.trim()) return false;
    if (!key.startsWith('sk-or-')) {
      toast.error('کلید API باید با sk-or- شروع شود');
      return false;
    }
    if (key.length < 20) {
      toast.error('کلید API خیلی کوتاه است');
      return false;
    }
    return true;
  };

  const saveApiKey = () => {
    if (!validateApiKey(tempKey)) return;

    // Store in session storage (more secure than localStorage)
    sessionStorage.setItem('deepseek_api_key_temp', tempKey.trim());
    setApiKey(tempKey.trim());
    setIsSaved(true);
    toast.success('کلید API موقتاً ذخیره شد');
    onApiKeyChange?.(true);
  };

  const clearApiKey = () => {
    sessionStorage.removeItem('deepseek_api_key_temp');
    setApiKey('');
    setTempKey('');
    setIsSaved(false);
    toast.success('کلید API حذف شد');
    onApiKeyChange?.(false);
  };

  const handleInputChange = (value: string) => {
    setTempKey(value);
    // Clear saved state if user modifies the key
    if (isSaved && value !== apiKey) {
      setIsSaved(false);
    }
  };

  return (
    <div className="space-y-4">
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>نکته امنیتی:</strong> کلید API شما فقط در این جلسه ذخیره می‌شود و با بستن مرورگر حذف خواهد شد. 
          هرگز کلید API خود را با دیگران به اشتراک نگذارید.
        </AlertDescription>
      </Alert>

      <div className="flex-1">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
          کلید API اپن‌روتر (OpenRouter)
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="apiKey"
              type={showKey ? "text" : "password"}
              value={isSaved ? getMaskedKey(apiKey) : tempKey}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="sk-or-..."
              className="pr-10"
              disabled={isSaved}
            />
            {(tempKey || apiKey) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </Button>
            )}
          </div>
          
          {!isSaved ? (
            <Button onClick={saveApiKey} size="icon" variant="outline" disabled={!tempKey.trim()}>
              <Key size={16} />
            </Button>
          ) : (
            <Button onClick={clearApiKey} size="icon" variant="outline" className="text-red-500">
              <Trash size={16} />
            </Button>
          )}
        </div>
        
        {!isSaved && (
          <p className="text-xs text-gray-500 mt-1">
            برای دریافت کلید API رایگان، به{' '}
            <a 
              href="https://openrouter.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              openrouter.ai
            </a>
            {' '}مراجعه کنید
          </p>
        )}
      </div>
    </div>
  );
};

export default SecureApiKeyInput;
