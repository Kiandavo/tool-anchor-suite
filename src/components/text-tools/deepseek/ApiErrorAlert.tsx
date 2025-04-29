
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, RefreshCw } from "lucide-react";

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
  
  return (
    <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <AlertDescription>
            {isCorsError ? (
              <>
                خطا در اتصال به API هوش مصنوعی (مشکل CORS). در حال حاضر از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
                <div className="mt-1 text-xs opacity-75">
                  برای رفع این مشکل می‌توانید از VPN یا مرورگر دیگری استفاده کنید.
                </div>
              </>
            ) : (
              <>
                خطا در اتصال به API هوش مصنوعی. در حال حاضر از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
              </>
            )}
            
            {errorMessage && (
              <div className="mt-1 text-xs opacity-75">{errorMessage}</div>
            )}
          </AlertDescription>
        </div>
        <button 
          onClick={onRetry}
          className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
        >
          <RefreshCw className="h-3 w-3" /> تلاش مجدد
        </button>
      </div>
    </Alert>
  );
};

export default ApiErrorAlert;
