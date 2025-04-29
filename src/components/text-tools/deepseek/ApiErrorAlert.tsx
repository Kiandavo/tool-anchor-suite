
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, RefreshCw, WifiOff } from "lucide-react";

interface ApiErrorAlertProps {
  hasApiError: boolean;
  errorMessage?: string;
  onRetry: () => void;
}

const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({ 
  hasApiError, 
  errorMessage,
  onRetry 
}) => {
  if (!hasApiError) return null;
  
  const isCorsError = errorMessage?.toLowerCase().includes('cors');
  const isNetworkError = errorMessage?.toLowerCase().includes('failed to fetch') || 
                        !navigator.onLine;
  
  return (
    <Alert variant="destructive" className="frost-glass bg-red-50/90 text-red-800 border-red-200/50 mb-4 rounded-xl">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          {isNetworkError ? (
            <WifiOff className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-700" />
          ) : (
            <Info className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-700" />
          )}
          <AlertDescription className="text-sm">
            {isNetworkError ? (
              <>
                <span className="font-medium">خطای اتصال به اینترنت.</span> لطفا اتصال خود را بررسی کنید.
                <div className="mt-1 text-xs opacity-90">
                  در حال حاضر از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
                </div>
              </>
            ) : isCorsError ? (
              <>
                <span className="font-medium">خطا در اتصال به API هوش مصنوعی (مشکل CORS).</span>
                <div className="mt-1 text-xs opacity-90">
                  برای رفع این مشکل می‌توانید از VPN یا مرورگر دیگری استفاده کنید.
                  در حال حاضر از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
                </div>
              </>
            ) : (
              <>
                <span className="font-medium">خطا در اتصال به API هوش مصنوعی.</span>
                <div className="mt-1 text-xs opacity-90">
                  در حال حاضر از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
                </div>
              </>
            )}
            
            {errorMessage && !isCorsError && !isNetworkError && (
              <div className="mt-1 text-xs opacity-90">{errorMessage}</div>
            )}
          </AlertDescription>
        </div>
        <button 
          onClick={onRetry}
          className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md vibrant-button bg-red-100 hover:bg-red-200 text-red-800 shadow-sm"
        >
          <RefreshCw className="h-3 w-3 animate-spin-slow" /> تلاش مجدد
        </button>
      </div>
    </Alert>
  );
};

export default ApiErrorAlert;
