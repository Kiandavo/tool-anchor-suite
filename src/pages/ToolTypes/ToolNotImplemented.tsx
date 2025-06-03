
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ToolNotImplemented() {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-red-100 p-3">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-red-500">ابزار پیاده سازی نشده است.</h3>
        <p className="text-muted-foreground">
          این ابزار در حال توسعه است و به زودی در دسترس قرار می‌گیرد.
        </p>
        <Button asChild>
          <Link to="/">
            بازگشت به صفحه اصلی
          </Link>
        </Button>
      </div>
    </div>
  );
}
