
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface ApiErrorAlertProps {
  hasApiError: boolean;
}

const ApiErrorAlert: React.FC<ApiErrorAlertProps> = ({ hasApiError }) => {
  if (!hasApiError) return null;
  
  return (
    <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
      <Info className="h-4 w-4" />
      <AlertDescription>
        خطا در اتصال به API دیپ‌سیک. لطفا کلید API خود را بررسی کنید یا بعداً دوباره تلاش کنید. در حال حاضر از پاسخ‌های شبیه‌سازی شده استفاده می‌شود.
      </AlertDescription>
    </Alert>
  );
};

export default ApiErrorAlert;
