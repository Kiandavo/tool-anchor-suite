
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Trash, Eye, EyeOff, AlertTriangle, Shield } from "lucide-react";
import { toast } from "sonner";
import { 
  validateApiKeyFormat, 
  secureStore, 
  secureRetrieve, 
  secureClear,
  sanitizeInput 
} from '@/utils/security/inputSanitizer';
import { securityMonitor } from '@/utils/security/securityMonitor';

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
  const [keyStrength, setKeyStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  const handleApiKeyChange = (value: string) => {
    // Sanitize input first
    const sanitizedValue = sanitizeInput(value, { 
      allowHtml: false, 
      allowSpecialChars: true,
      trimWhitespace: true,
      maxLength: 500 
    });

    // Check for suspicious patterns
    if (securityMonitor.detectSuspiciousInput(sanitizedValue)) {
      setKeyError('ورودی نامعتبر شناسایی شد');
      return;
    }

    setApiKey(sanitizedValue);
    
    if (sanitizedValue) {
      const validation = validateApiKeyFormat(sanitizedValue);
      if (!validation.isValid) {
        setKeyError(validation.error || '');
        setKeyStrength(null);
      } else {
        setKeyError('');
        setKeyStrength(validation.strength || null);
      }
    } else {
      setKeyError('');
      setKeyStrength(null);
    }
  };

  const saveApiKey = () => {
    const validation = validateApiKeyFormat(apiKey);
    
    if (!validation.isValid) {
      setKeyError(validation.error || 'کلید API نامعتبر است');
      toast.error(validation.error || 'کلید API نامعتبر است');
      securityMonitor.logSecurityEvent({
        type: 'invalid_input',
        timestamp: Date.now(),
        details: 'Invalid API key format'
      });
      return;
    }

    // Use secure storage
    const stored = secureStore('deepseek_api_key', apiKey);
    
    if (stored) {
      setIsSaved(true);
      setKeyError('');
      toast.success('کلید API به صورت امن ذخیره شد');
      setHasApiError(false);
    } else {
      toast.error('خطا در ذخیره کلید API');
      securityMonitor.logSecurityEvent({
        type: 'api_error',
        timestamp: Date.now(),
        details: 'Failed to store API key securely'
      });
    }
  };

  const clearApiKey = () => {
    secureClear('deepseek_api_key');
    setApiKey('');
    setIsSaved(false);
    setKeyError('');
    setKeyStrength(null);
    toast.success('کلید API به صورت امن حذف شد');
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const getStrengthColor = () => {
    switch (keyStrength) {
      case 'weak': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'strong': return 'text-green-500';
      default: return '';
    }
  };

  const getStrengthText = () => {
    switch (keyStrength) {
      case 'weak': return 'ضعیف';
      case 'medium': return 'متوسط';
      case 'strong': return 'قوی';
      default: return '';
    }
  };

  return (
    <div className="flex-1">
      <label htmlFor="apiKey" className="block text-xs font-medium text-gray-700 mb-1">
        کلید API دیپ‌سیک (OpenRouter)
        {keyStrength && (
          <span className={`mr-2 ${getStrengthColor()}`}>
            <Shield size={12} className="inline mr-1" />
            امنیت: {getStrengthText()}
          </span>
        )}
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
              maxLength={500}
            />
            <button
              type="button"
              onClick={toggleApiKeyVisibility}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showApiKey ? 'مخفی کردن کلید' : 'نمایش کلید'}
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
              aria-label="ذخیره کلید API"
            >
              <Key size={16} />
            </Button>
          ) : (
            <Button 
              onClick={clearApiKey} 
              size="icon" 
              variant="outline" 
              className="text-red-500"
              aria-label="حذف کلید API"
            >
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
