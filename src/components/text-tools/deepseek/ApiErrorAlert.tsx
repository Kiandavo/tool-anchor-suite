
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

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
  
  return (
    <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <AlertDescription>
            خطا در اتصال به API هوش مصنوعی. در حال حاضر از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
            {errorMessage && (
              <div className="mt-1 text-xs opacity-75">{errorMessage}</div>
            )}
          </AlertDescription>
        </div>
        <button 
          onClick={onRetry}
          className="px-3 py-1 text-xs font-medium rounded-md bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    </Alert>
  );
};

export default ApiErrorAlert;
